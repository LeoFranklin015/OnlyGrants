// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/math/Math.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { MACI } from "maci-contracts/contracts/MACI.sol";
import { IPollFactory } from "maci-contracts/contracts/interfaces/IPollFactory.sol";
import { IMessageProcessorFactory } from "maci-contracts/contracts/interfaces/IMPFactory.sol";
import { ITallySubsidyFactory } from "maci-contracts/contracts/interfaces/ITallySubsidyFactory.sol";
import { SignUpGatekeeper } from "maci-contracts/contracts/gatekeepers/SignUpGatekeeper.sol";
import { InitialVoiceCreditProxy } from "maci-contracts/contracts/initialVoiceCreditProxy/InitialVoiceCreditProxy.sol";
import { TopupCredit } from "maci-contracts/contracts/TopupCredit.sol";

import { IRecipientRegistry } from "./interfaces/IRecipientRegistry.sol";
import { IFundingRoundTally } from "./interfaces/IFundingRoundTally.sol";

import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

/// @title MinimalQF
/// @notice This contract is a minimal implementation of a Quadratic Funding
/// protocol.
contract MinimalQF is Ownable, MACI {
    using SafeERC20 for IERC20;

    // the round token
    IERC20 public nativeToken;

    // store the contributors
    mapping(address => uint256) public contributors;

    // contract to store the recipient registry
    IRecipientRegistry public recipientRegistry;

    // the tally contract
    IFundingRoundTally public tally;

    // the funding sources
    address[] public fundingSources;

    // events
    event FundingSourceAdded(address _source);
    event RoundFinalized(address _round);

    // custom errors
    error RoundNotCancelled();
    error RoundNotFinalized();

    uint64 public schemaId;
    ISP public spInstance;

    struct Profile {
        address owner;
        string metadata;
        mapping(address => bool) members;
    }

    struct Round {
        uint256 id;
        address profileOwner;
        string metadata;
        uint256 matchingAmount;
        mapping(address => bool) members;
        bool isActive;
        mapping(uint256 => Project) projects;
        uint256[] projectIds;
        uint256 totalDonations;
        uint256 nextProjectId;
        PollContracts pollAddr;
    }

    struct Project {
        uint256 id;
        address owner;
        string metadata;
        uint256 totalDonations;
        uint64 impactAttestationId;
        mapping(address => uint256) donations;
        address[] donors;
    }

    mapping(address => Profile) public profiles;
    mapping(uint256 => Round) public rounds;
    uint256 public nextRoundId;

    event ProfileCreated(address indexed owner);
    event RoundCreated(
        uint256 indexed roundId,
        address indexed profileOwner,
        uint256 matchingAmount,
        string metadata,
        uint256 duration,
        PollContracts pollAddr
    );
    event DonationMade(uint256 indexed roundId, uint256 indexed projectId, address indexed donor, uint256 amount);
    event FundsDistributed(uint256 indexed roundId);
    event RoundCancelled(uint256 indexed roundId);
    event ProjectApplied(
        uint256 indexed roundId,
        uint256 indexed projectId,
        address indexed projectOwner,
        uint64 impactAttestationId
    );

    /// @notice Create a new instance of MinimalQF
    /// @param _fundingRoundFacotory The address of the funding round factory
    /// @param _messageProcessorFactory The address of the message processor factory
    /// @param _tallyFactory The address of the tally factory
    /// @param _subsidyFactory The address of the subsidy factory
    /// @param _signUpGatekeeper The address of the sign up gatekeeper
    /// @param _initialVoiceCreditProxy The address of the initial voice credit proxy
    /// @param _topupCredit The address of the topup credit
    /// @param _stateTreeDepth The depth of the state tree
    /// @param _token The address of the token
    /// @param _recipientRegistry The address of the recipient registry
    constructor(
        IPollFactory _fundingRoundFacotory,
        IMessageProcessorFactory _messageProcessorFactory,
        ITallySubsidyFactory _tallyFactory,
        ITallySubsidyFactory _subsidyFactory,
        SignUpGatekeeper _signUpGatekeeper,
        InitialVoiceCreditProxy _initialVoiceCreditProxy,
        TopupCredit _topupCredit,
        uint8 _stateTreeDepth,
        address _token,
        address _recipientRegistry
    )
        MACI(
            _fundingRoundFacotory,
            _messageProcessorFactory,
            _tallyFactory,
            _subsidyFactory,
            _signUpGatekeeper,
            _initialVoiceCreditProxy,
            _topupCredit,
            _stateTreeDepth
        )
    {
        nativeToken = IERC20(_token);
        recipientRegistry = IRecipientRegistry(_recipientRegistry);
    }

    /// @notice Deploy a Poll (Funding round) and related contracts
    /// @param _duration The duration of the poll
    /// @param _treeDepths The tree depths
    /// @param _coordinatorPubKey The public key of the coordinator
    /// @param _verifier The address of the verifier contract
    /// @param _vkRegistry The address of the Verifying Key registry
    /// @param useSubsidy Whether to use the subsidy feature
    function deployPoll(
        uint256 _duration,
        TreeDepths memory _treeDepths,
        PubKey memory _coordinatorPubKey,
        address _verifier,
        address _vkRegistry,
        bool useSubsidy
    ) public override returns (PollContracts memory pollAddr) {
        // deploy the poll
        pollAddr = super.deployPoll(_duration, _treeDepths, _coordinatorPubKey, _verifier, _vkRegistry, useSubsidy);

        // store the contracts
        tally = IFundingRoundTally(pollAddr.tally);

        // init the tally contract
        IFundingRoundTally(pollAddr.tally).initialize(address(nativeToken), address(recipientRegistry), address(this));
    }

    /// @notice Sign up to the MACI system
    /// @param _pubKey The public key of the user
    /// @param _signUpGatekeeperData The data for the sign up gatekeeper
    /// @param _initialVoiceCreditProxyData The data for the initial voice credit proxy
    function signUp(
        PubKey memory _pubKey,
        bytes memory _signUpGatekeeperData,
        bytes memory _initialVoiceCreditProxyData
    ) public override {
        // the amount must be set in the initial voice credit proxy data
        uint256 amount = abi.decode(_initialVoiceCreditProxyData, (uint256));

        // transfer tokens to this contract
        nativeToken.safeTransferFrom(msg.sender, address(this), amount);

        // the voice credits will be the amount divided by the factor
        // the factor should be decimals of the token
        // normal signup
        super.signUp(_pubKey, _signUpGatekeeperData, _initialVoiceCreditProxyData);

        // store the address of the user signing up and amount so they can be refunded just in case
        // the round is cancelled
        // they will be able to vote from different addresses though
        contributors[msg.sender] = amount;
    }

    /// @notice Withdraw funds
    /// @dev only if the round was cancelled
    /// We cannot allow contributors to withdraw funds if the round was not cancelled
    /// because we cannot revoke their signup to MACI so votes would be valid
    /// regardless of them withdrawing funds or not
    /// @dev If the user lost access to their wallet, we can send to them with
    /// rescueFunds
    function withdraw() external {
        // check if the round was cancelled
        if (!tally.isCancelled()) {
            revert RoundNotCancelled();
        }

        // cache so we can delete before sending
        uint256 amount = contributors[msg.sender];

        // reset to zero
        contributors[msg.sender] = 0;

        // transfer tokens back to the user
        nativeToken.safeTransfer(msg.sender, amount);
    }

    /// @notice Add matching funds source.
    /// @dev Cannot remove a funding source.
    /// @param _source Address of a funding source.
    function addFundingSource(address _source) external onlyOwner {
        fundingSources.push(_source);
        emit FundingSourceAdded(_source);
    }

    /// @notice Get amount of matching funds.
    /// @return matchingPoolSize The amount of matching funds.
    function getMatchingFunds() external view returns (uint256 matchingPoolSize) {
        // get balance of current contract
        matchingPoolSize = nativeToken.balanceOf(address(this));

        // cache the array length
        uint256 len = fundingSources.length;
        for (uint256 index = 0; index < len; ) {
            address fundingSource = fundingSources[index];

            // get both allowance or balance
            uint256 allowance = nativeToken.allowance(fundingSource, address(this));
            uint256 balance = nativeToken.balanceOf(fundingSource);

            unchecked {
                // cannot overflow uint256 with a ERC20 total supply
                // one could set an allowance which is uint256.max
                // to overflow this, but here it would be <
                // balance so it would += balance not allowance
                matchingPoolSize += allowance < balance ? allowance : balance;
                index++;
            }
        }
    }

    /// @dev Transfer funds from matching pool to current funding round and finalize it.
    /// @param _totalSpent Total amount of spent voice credits.
    /// @param _totalSpentSalt The salt.
    function transferMatchingFunds(
        uint256 _totalSpent,
        uint256 _totalSpentSalt,
        uint256 _newResultCommitment,
        uint256 _perVOSpentVoiceCreditsHash
    ) external onlyOwner {
        // cache the native token
        IERC20 _nativeToken = nativeToken;

        // get the balance of this contract first
        uint256 matchingPoolSize = _nativeToken.balanceOf(address(this));

        // cache tally address
        address currentRoundTally = address(tally);

        // transfer to the tally contract
        if (matchingPoolSize > 0) {
            _nativeToken.safeTransfer(currentRoundTally, matchingPoolSize);
        }

        // Pull funds from other funding sources
        uint256 len = fundingSources.length;
        for (uint256 index = 0; index < len; ) {
            address fundingSource = fundingSources[index];

            uint256 allowance = _nativeToken.allowance(fundingSource, address(this));
            uint256 balance = _nativeToken.balanceOf(fundingSource);

            uint256 contribution = allowance < balance ? allowance : balance;

            // if > 0 then transfer
            if (contribution > 0) {
                _nativeToken.safeTransferFrom(fundingSource, currentRoundTally, contribution);
            }

            unchecked {
                index++;
            }
        }

        // finalize the round
        IFundingRoundTally(currentRoundTally).finalize(
            _totalSpent,
            _totalSpentSalt,
            _newResultCommitment,
            _perVOSpentVoiceCreditsHash
        );

        // emit event so we know the round is finished
        emit RoundFinalized(currentRoundTally);
    }

    /// @notice Rescue funds from the contract
    /// @dev Only works on the native token when the round is finalized
    /// @dev Funds are supposed to be sent to the Tally contract, though
    /// they could have been sent back to this contract if a recipient
    /// address is address(0)
    function rescueFunds(uint256 _amount, address _to) external onlyOwner {
        // we first check if the round is finalized
        if (!tally.isFinalized()) {
            revert RoundNotFinalized();
        }

        // then just transfer the tokens to the _to address
        nativeToken.safeTransfer(_to, _amount);
    }

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function createProfile(string calldata metadata) external {
        require(profiles[msg.sender].owner == address(0), "Profile already exists");
        profiles[msg.sender].owner = msg.sender;
        profiles[msg.sender].metadata = metadata;
        emit ProfileCreated(msg.sender);
    }

    /// @notice Adds a member to a profile
    /// @param member The address of the member to add
    function addProfileMember(address member) external {
        require(profiles[msg.sender].owner == msg.sender, "Not profile owner");
        require(member != address(0), "Invalid member address");
        profiles[msg.sender].members[member] = true;
    }

    function isProfileMember(address member) external view returns (bool) {
        return profiles[msg.sender].members[member];
    }

    function createRound(
        uint256 matchingAmount,
        string calldata metadata,
        uint256 _duration,
        TreeDepths memory _treeDepths,
        PubKey memory _coordinatorPubKey,
        address _verifier,
        address _vkRegistry,
        bool useSubsidy
    ) external payable {
        require(profiles[msg.sender].owner == msg.sender, "Not profile owner");
        require(matchingAmount > 0, "Matching amount must be greater than 0");
        require(matchingAmount == msg.value, "Matching amount must be equal to msg.value");

        uint256 roundId = nextRoundId++;
        Round storage round = rounds[roundId];
        round.id = roundId;
        round.profileOwner = msg.sender;
        round.matchingAmount = matchingAmount;
        round.metadata = metadata;
        round.isActive = true;

        // Deploy the poll
        PollContracts memory pollAddr = deployPoll(
            _duration,
            _treeDepths,
            _coordinatorPubKey,
            _verifier,
            _vkRegistry,
            useSubsidy
        );

        round.pollAddr = pollAddr;

        emit RoundCreated(roundId, msg.sender, matchingAmount, metadata, _duration, pollAddr);
    }

    /// @notice Adds a member to a round
    /// @param roundId The ID of the round to add a member to
    /// @param member The address of the member to add
    function addRoundMember(uint256 roundId, address member) external {
        Round storage round = rounds[roundId];
        require(round.profileOwner == msg.sender, "Not round owner");
        round.members[member] = true;
    }

    function isRoundMember(uint256 roundId, address member) external view returns (bool) {
        return rounds[roundId].members[member];
    }

    function editRoundMetadata(uint256 roundId, string calldata newMetadata) external {
        Round storage round = rounds[roundId];
        require(
            round.profileOwner == msg.sender ||
                round.members[msg.sender] ||
                profiles[round.profileOwner].members[msg.sender],
            "Not authorized"
        );
        round.metadata = newMetadata;
    }

    /// @notice Creates a project to apply for a round
    /// @param roundId The ID of the round to apply for
    /// @param metadata The project's metadata
    function applyForRound(uint256 roundId, string calldata metadata, bytes memory data) external {
        Round storage round = rounds[roundId];
        require(round.isActive, "Round is not active");

        uint256 projectId = round.nextProjectId++;
        Project storage project = round.projects[projectId];
        require(project.owner == address(0), "Project ID already exists");

        project.id = projectId;
        project.owner = msg.sender;
        project.metadata = metadata;
        project.totalDonations = 0;
        round.projectIds.push(projectId);

        // Generate an attestation of the project's impact
        bytes[] memory recipients = new bytes[](2);
        recipients[0] = abi.encode(msg.sender);
        Attestation memory a = Attestation({
            schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: data // SignScan assumes this is from `abi.encode(...)`
        });
        uint64 attestationId = spInstance.attest(a, "", "", "");

        emit ProjectApplied(roundId, projectId, msg.sender, attestationId);
    }

    /// @notice Allows a user to donate to a specific project in a round
    /// @param roundId The ID of the round
    /// @param projectId The ID of the project
    /// @param amount The amount of tokens to donate
    function donate(uint256 roundId, uint256 projectId, uint256 amount) external {
        Round storage round = rounds[roundId];
        require(round.isActive, "Round is not active");
        require(amount > 0, "Donation amount must be greater than 0");
        Project storage project = round.projects[projectId];
        require(project.owner != address(0), "Project not found in round");

        if (project.donations[msg.sender] == 0) {
            project.donors.push(msg.sender);
        }
        project.donations[msg.sender] += amount;
        project.totalDonations += amount;
        round.totalDonations += amount;

        emit DonationMade(roundId, projectId, msg.sender, amount);
    }

    /// @notice Distributes funds for a completed round using quadratic funding
    /// @param roundId The ID of the round to distribute funds for
    function distributeFunds(uint256 roundId) external {
        Round storage round = rounds[roundId];
        require(round.profileOwner == msg.sender, "Not round owner");
        require(round.isActive, "Round is not active");
        require(round.totalDonations > 0, "No donations to distribute");

        uint256 totalMatch = round.matchingAmount;
        uint256 totalSqrtDonations = 0;

        // Calculate total square root of donations for all projects
        for (uint256 i = 0; i < round.projectIds.length; i++) {
            Project storage project = round.projects[round.projectIds[i]];
            totalSqrtDonations += Math.sqrt(project.totalDonations);
        }

        // Distribute funds using quadratic funding formula
        for (uint256 i = 0; i < round.projectIds.length; i++) {
            Project storage project = round.projects[round.projectIds[i]];
            uint256 projectShare = (Math.sqrt(project.totalDonations) * totalMatch) / totalSqrtDonations;
            uint256 totalProjectFunds = project.totalDonations + projectShare;
            payable(project.owner).transfer(totalProjectFunds);
        }

        round.isActive = false;
        emit FundsDistributed(roundId);
    }

    function editProfileMetadata(string calldata newMetadata) external {
        require(profiles[msg.sender].owner == msg.sender, "Not profile owner");
        profiles[msg.sender].metadata = newMetadata;
    }

    /// @notice Allows the round owner to cancel an active round and refund donations
    /// @param roundId The ID of the round to cancel
    function cancelRound(uint256 roundId) external {
        Round storage round = rounds[roundId];
        require(round.profileOwner == msg.sender, "Not round owner");
        require(round.isActive, "Round is not active");

        // Refund donations to donors
        for (uint256 i = 0; i < round.projectIds.length; i++) {
            Project storage project = round.projects[round.projectIds[i]];
            for (uint256 j = 0; j < project.donors.length; j++) {
                address donor = project.donors[j];
                uint256 donation = project.donations[donor];
                payable(donor).transfer(donation);
            }
        }

        // Refund matching amount to round creator
        payable(round.profileOwner).transfer(round.matchingAmount);

        round.isActive = false;
        emit RoundCancelled(roundId);
    }
}

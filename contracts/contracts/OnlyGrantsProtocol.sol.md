// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

/// @title OnlyGrantsProtocol
/// @notice A contract for managing grant rounds with quadratic funding
contract OnlyGrantsProtocol is ReentrancyGuard, Ownable {
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
    mapping(address => uint256) public userVoiceCreditBalance;
    uint256 public nextRoundId;

    event ProfileCreated(address indexed owner);
    event RoundCreated(
        uint256 indexed roundId,
        address indexed profileOwner,
        uint256 matchingAmount
    );
    event DonationMade(
        uint256 indexed roundId,
        uint256 indexed projectId,
        address indexed donor,
        uint256 amount
    );
    event FundsDistributed(uint256 indexed roundId);
    event RoundCancelled(uint256 indexed roundId);
    event ProjectApplied(
        uint256 indexed roundId,
        uint256 indexed projectId,
        address indexed projectOwner,
        uint64 impactAttestationId
    );

    /// @notice Creates a new OnlyGrantsProtocol instance
    constructor() Ownable(msg.sender) {}

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function createProfile(string calldata metadata) external {
        require(
            profiles[msg.sender].owner == address(0),
            "Profile already exists"
        );
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

    function createRound(
        uint256 matchingAmount,
        string calldata metadata
    ) external payable {
        require(profiles[msg.sender].owner == msg.sender, "Not profile owner");
        require(matchingAmount > 0, "Matching amount must be greater than 0");
        require(
            matchingAmount == msg.value,
            "Matching amount must be equal to msg.value"
        );

        uint256 roundId = nextRoundId++;
        Round storage round = rounds[roundId];
        round.id = roundId;
        round.profileOwner = msg.sender;
        round.matchingAmount = matchingAmount;
        round.metadata = metadata;
        round.isActive = true;

        emit RoundCreated(roundId, msg.sender, matchingAmount);
    }

    /// @notice Adds a member to a round
    /// @param roundId The ID of the round to add a member to
    /// @param member The address of the member to add
    function addRoundMember(uint256 roundId, address member) external {
        Round storage round = rounds[roundId];
        require(round.profileOwner == msg.sender, "Not round owner");
        round.members[member] = true;
    }

    function buyVoiceCredits(uint256 amount) external payable {
        userVoiceCreditBalance[msg.sender] += amount;
    }

    function editRoundMetadata(
        uint256 roundId,
        string calldata newMetadata
    ) external {
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
    function applyForRound(
        uint256 roundId,
        string calldata metadata,
        bytes memory data
    ) external {
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
    function donate(
        uint256 roundId,
        uint256 projectId,
        uint256 amount
    ) external nonReentrant {
        Round storage round = rounds[roundId];
        require(round.isActive, "Round is not active");
        require(amount > 0, "Donation amount must be greater than 0");
        Project storage project = round.projects[projectId];
        require(project.owner != address(0), "Project not found in round");
        require(
            userVoiceCreditBalance[msg.sender] >= amount,
            "Insufficient voice credits"
        );

        if (project.donations[msg.sender] == 0) {
            project.donors.push(msg.sender);
        }
        project.donations[msg.sender] += amount;
        project.totalDonations += amount;
        round.totalDonations += amount;
        userVoiceCreditBalance[msg.sender] -= amount;

        emit DonationMade(roundId, projectId, msg.sender, amount);
    }

    /// @notice Distributes funds for a completed round using quadratic funding
    /// @param roundId The ID of the round to distribute funds for
    function distributeFunds(uint256 roundId) external nonReentrant {
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
            uint256 projectShare = (Math.sqrt(project.totalDonations) *
                totalMatch) / totalSqrtDonations;
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
    function cancelRound(uint256 roundId) external nonReentrant {
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

pragma solidity >=0.8.19 <0.9.0;

import {Poll} from "./Poll.sol";
import {FHE, euint256, euint64, inEuint64, euint8} from "@fhenixprotocol/contracts/FHE.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract OnlyGrantsProtocol {
  uint256 nextRoundId;

  struct Round {
    uint256 id;
    address profileOwner;
    string metadata;
    uint256 matchingAmount;
    bool isActive;
    mapping(uint256 => Project) projects;
    uint256[] projectIds;
    uint256 nextProjectId;
    Poll poll;
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

  mapping(uint256 => Round) public rounds;
  mapping(address => uint256) public balances;

  event RoundCreated(
    uint256 indexed roundId,
    address indexed profileOwner,
    uint256 matchingAmount
  );
  event DonationMade(
    uint256 indexed roundId,
    uint256 indexed projectId,
    address indexed donor,
    euint64 amount
  );
  event FundsDistributed(uint256 indexed roundId);

  event RoundCancelled(uint256 indexed roundId);
  event ProjectApplied(
    uint256 indexed roundId,
    uint256 indexed projectId,
    address indexed projectOwner
  );
  event BalanceToppedUp(address indexed user, uint256 amount);

  function createRound(
    uint256 ma,
    string calldata m,
    uint256 vp
  ) external payable {
    // require(ma > 0 && ma == msg.value, "Invalid matching amount");

    uint256 rId = nextRoundId++;
    Round storage r = rounds[rId];
    r.id = rId;
    r.profileOwner = msg.sender;
    r.matchingAmount = ma;
    r.metadata = m;
    r.isActive = true;

    r.poll = new Poll(m, new string[](1), vp);

    emit RoundCreated(rId, msg.sender, ma);
  }

  function topUpBalance() external payable {
    // require(msg.value > 0, "Amount must be greater than 0");
    balances[msg.sender] += msg.value;
    payable(msg.sender).transfer(msg.value);
    emit BalanceToppedUp(msg.sender, msg.value);
  }

  function editRoundMetadata(
    uint256 roundId,
    string calldata newMetadata
  ) external {
    Round storage round = rounds[roundId];
    // require(round.profileOwner == msg.sender, "Not authorized");

    round.metadata = newMetadata;
  }

  /// @notice Creates a project to apply for a round
  /// @param roundId The ID of the round to apply for
  /// @param metadata The project's metadata
  function applyForRound(uint256 roundId, string calldata metadata) external {
    Round storage round = rounds[roundId];
    // require(round.isActive, "Round is not active");

    uint256 projectId = round.nextProjectId++;
    Project storage project = round.projects[projectId];
    // require(project.owner == address(0), "Project ID already exists");

    project.id = projectId;
    project.owner = msg.sender;
    project.metadata = metadata;
    project.totalDonations = (0);
    round.projectIds.push(projectId);

    round.poll.addOption(string(abi.encodePacked(projectId)));

    emit ProjectApplied(roundId, projectId, msg.sender);
  }

  /// @notice Allows a user to donate to a specific project in a round
  /// @param roundId The ID of the round
  /// @param projectId The ID of the project
  /// @param amount The amount of tokens to donate
  function donate(
    uint256 roundId,
    uint256 projectId,
    inEuint64 memory amount
  ) external {
    Round storage round = rounds[roundId];
    euint64 encryptedAmount = FHE.asEuint64(amount);
    uint256 decryptedAmount = FHE.decrypt(encryptedAmount);
    // require(round.isActive, "Round is not active");

    // require(balances[msg.sender] >= decryptedAmount, "Insufficient balance");

    Project storage project = round.projects[projectId];
    // require(project.owner != address(0), "Project not found in round");

    uint256 newTotalDonations = project.totalDonations + decryptedAmount;

    project.donations[msg.sender] = decryptedAmount;

    project.totalDonations = newTotalDonations;

    uint8 vote = uint8(projectId);
    euint8 encryptedVote = FHE.asEuint8(vote);
    round.poll.vote(encryptedVote, encryptedAmount);

    balances[msg.sender] -= decryptedAmount;

    emit DonationMade(roundId, projectId, msg.sender, encryptedAmount);
  }

  /// @notice Distributes funds for a completed round using quadratic funding
  /// @param rId The ID of the round to distribute funds for
  function distributeFunds(uint256 rId) external {
    Round storage r = rounds[rId];
    // require(
    //   r.profileOwner == msg.sender && r.isActive,
    //   "Not authorized or inactive"
    // );

    uint256 tMatch = r.matchingAmount;
    uint256 tSqrtDonations = 0;

    for (uint256 i = 0; i < r.projectIds.length; i++) {
      Project storage p = r.projects[r.projectIds[i]];
      tSqrtDonations += Math.sqrt(p.totalDonations);
    }

    for (uint256 i = 0; i < r.projectIds.length; i++) {
      Project storage p = r.projects[r.projectIds[i]];
      uint256 pShare = (Math.sqrt(p.totalDonations) * tMatch) / tSqrtDonations;
      payable(p.owner).transfer(p.totalDonations + pShare);
    }

    r.isActive = false;
    emit FundsDistributed(rId);
  }

  /// @notice Allows the round owner to cancel an active round and refund donations
  /// @param roundId The ID of the round to cancel
  function cancelRound(uint256 roundId) external {
    Round storage round = rounds[roundId];
    // require(round.profileOwner == msg.sender, "Not round owner");
    // require(round.isActive, "Round is not active");

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

  // New function to finalize a round's poll
  function finalizeRoundPoll(uint256 roundId) external {
    Round storage round = rounds[roundId];
    // require(round.isActive, "Round is not active");
    round.poll.finalize();
  }

  // New function to get the winning option of a round's poll
  function getRoundPollWinner(
    uint256 roundId
  ) external view returns (uint8, uint16) {
    Round storage round = rounds[roundId];
    return round.poll.winning();
  }
}

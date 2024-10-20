// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vaquita {
    using SafeERC20 for IERC20;

    enum RoundStatus { Pending, Active, Completed }

    struct Round {
        uint256 paymentAmount;
        IERC20 token;
        uint8 numberOfPlayers;
        address[] players;
        uint256 totalAmountLocked;
        uint8 availableSlots;
        uint256 frequencyOfTurns;
        RoundStatus status;
        mapping(address => bool) withdrawnCollateral;
        mapping(address => uint256) turnAccumulations;
        mapping(address => uint256) paidTurns;
        mapping(address => bool) withdrawnTurns;
        mapping(address => uint8) positions;
    }

    mapping(uint256 roundId => Round round) private _rounds;

    error RoundAlreadyExists();
    error RoundNotPending();
    error RoundFull();
    error RoundNotActive();
    error CannotPayOwnTurn();
    error TurnAlreadyPaid();
    error InvalidTurn();
    error RoundNotCompleted();
    error TurnAlreadyWithdrawn();
    error InsufficientFunds();
    error CollateralAlreadyWithdrawn();

    event RoundInitialized(uint256 indexed roundId, address initializer);
    event PlayerAdded(uint256 indexed roundId, address player);
    event TurnPaid(uint256 indexed roundId, address payer, uint8 turn);
    event TurnWithdrawn(uint256 indexed roundId, address player, uint256 amount);
    event CollateralWithdrawn(uint256 indexed roundId, address player, uint256 amount);

    function initializeRound(
        uint256 roundId,
        uint256 paymentAmount,
        IERC20 token,
        uint8 numberOfPlayers,
        uint256 frequencyOfTurns,
        uint8 position
    ) external {
        if (_rounds[roundId].token != IERC20(address(0))) {
            revert RoundAlreadyExists();
        }

        Round storage round = _rounds[roundId];

        round.paymentAmount = paymentAmount;
        round.token = token;
        round.numberOfPlayers = numberOfPlayers;
        round.totalAmountLocked = 0;
        round.availableSlots = numberOfPlayers;
        round.frequencyOfTurns = frequencyOfTurns;
        round.status = RoundStatus.Pending;

        uint256 amountToLock = paymentAmount * numberOfPlayers;
        token.safeTransferFrom(msg.sender, address(this), amountToLock);

        round.players.push(msg.sender);
        round.positions[msg.sender] = position;
        round.totalAmountLocked += amountToLock;
        round.availableSlots--;

        emit RoundInitialized(roundId, msg.sender);
    }

    function addPlayer(uint256 roundId, uint8 position) external {
        Round storage round = _rounds[roundId];
        if (round.status != RoundStatus.Pending) {
            revert RoundNotPending();
        }
        if (round.availableSlots == 0) {
            revert RoundFull();
        }

        uint256 amountToLock = round.paymentAmount * round.numberOfPlayers;
        round.token.safeTransferFrom(msg.sender, address(this), amountToLock);

        round.players.push(msg.sender);
        round.positions[msg.sender] = position;
        round.totalAmountLocked += amountToLock;
        round.availableSlots--;

        if (round.availableSlots == 0) {
            round.status = RoundStatus.Active;
        }

        emit PlayerAdded(roundId, msg.sender);
    }

    function payTurn(uint256 roundId, uint8 turn) external {
        Round storage round = _rounds[roundId];
        if (round.status != RoundStatus.Active) {
            revert RoundNotActive();
        }
        if (round.positions[msg.sender] == turn) {
            revert CannotPayOwnTurn();
        }
        if ((round.paidTurns[msg.sender] & (1 << turn)) != 0) {
            revert TurnAlreadyPaid();
        }

        address recipient = address(0);
        for (uint8 i = 0; i < round.players.length; i++) {
            if (round.positions[round.players[i]] == turn) {
                recipient = round.players[i];
                break;
            }
        }
        if (recipient == address(0)) {
            revert InvalidTurn();
        }

        round.token.safeTransferFrom(msg.sender, address(this), round.paymentAmount);

        round.turnAccumulations[recipient] += round.paymentAmount;
        round.paidTurns[msg.sender] |= 1 << turn;

        bool allTurnsCompleted = true;
        for (uint8 i = 0; i < round.players.length; i++) {
            if (round.turnAccumulations[round.players[i]] != round.paymentAmount * (round.numberOfPlayers - 1)) {
                allTurnsCompleted = false;
                break;
            }
        }
        if (allTurnsCompleted) {
            round.status = RoundStatus.Completed;
        }

        emit TurnPaid(roundId, msg.sender, turn);
    }

    function withdrawTurn(uint256 roundId) external {
        Round storage round = _rounds[roundId];
        if (round.status != RoundStatus.Active && round.status != RoundStatus.Completed) {
            revert RoundNotActive();
        }
        if (round.withdrawnTurns[msg.sender]) {
            revert TurnAlreadyWithdrawn();
        }

        uint256 expectedAmount = round.paymentAmount * (round.numberOfPlayers - 1);
        if (round.turnAccumulations[msg.sender] != expectedAmount) {
            revert InsufficientFunds();
        }

        round.token.safeTransfer(msg.sender, expectedAmount);
        round.withdrawnTurns[msg.sender] = true;

        emit TurnWithdrawn(roundId, msg.sender, expectedAmount);
    }

    function withdrawCollateral(uint256 roundId) external {
        Round storage round = _rounds[roundId];
        if (round.status != RoundStatus.Completed) {
            revert RoundNotCompleted();
        }
        if (round.withdrawnCollateral[msg.sender]) {
            revert CollateralAlreadyWithdrawn();
        }

        uint256 withdrawAmount = round.paymentAmount * round.numberOfPlayers;
        round.token.safeTransfer(msg.sender, withdrawAmount);
        round.withdrawnCollateral[msg.sender] = true;

        emit CollateralWithdrawn(roundId, msg.sender, withdrawAmount);
    }

    function getRoundInfo(uint256 roundId) external view returns (
        uint256 paymentAmount,
        address tokenAddress,
        uint8 numberOfPlayers,
        uint256 totalAmountLocked,
        uint8 availableSlots,
        uint256 frequencyOfTurns,
        RoundStatus status
    ) {
        Round storage round = _rounds[roundId];
        return (
            round.paymentAmount,
            address(round.token),
            round.numberOfPlayers,
            round.totalAmountLocked,
            round.availableSlots,
            round.frequencyOfTurns,
            round.status
        );
    }
}
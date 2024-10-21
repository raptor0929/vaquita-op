const abi = [
    {
      type: "function",
      name: "addPlayer",
      inputs: [
        { name: "roundId", type: "string", internalType: "string" },
        { name: "position", type: "uint8", internalType: "uint8" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "getRoundInfo",
      inputs: [
        { name: "roundId", type: "string", internalType: "string" }
      ],
      outputs: [
        { name: "paymentAmount", type: "uint256", internalType: "uint256" },
        { name: "tokenAddress", type: "address", internalType: "address" },
        { name: "numberOfPlayers", type: "uint8", internalType: "uint8" },
        { name: "totalAmountLocked", type: "uint256", internalType: "uint256" },
        { name: "availableSlots", type: "uint8", internalType: "uint8" },
        { name: "frequencyOfTurns", type: "uint256", internalType: "uint256" },
        { name: "status", type: "uint8", internalType: "enum Vaquita.RoundStatus" }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "initializeRound",
      inputs: [
        { name: "roundId", type: "string", internalType: "string" },
        { name: "paymentAmount", type: "uint256", internalType: "uint256" },
        { name: "token", type: "address", internalType: "contract IERC20" },
        { name: "numberOfPlayers", type: "uint8", internalType: "uint8" },
        { name: "frequencyOfTurns", type: "uint256", internalType: "uint256" },
        { name: "position", type: "uint8", internalType: "uint8" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "payTurn",
      inputs: [
        { name: "roundId", type: "string", internalType: "string" },
        { name: "turn", type: "uint8", internalType: "uint8" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "withdrawCollateral",
      inputs: [
        { name: "roundId", type: "string", internalType: "string" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "withdrawTurn",
      inputs: [
        { name: "roundId", type: "string", internalType: "string" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "event",
      name: "CollateralWithdrawn",
      inputs: [
        { name: "roundId", type: "string", indexed: true, internalType: "string" },
        { name: "player", type: "address", indexed: false, internalType: "address" },
        { name: "amount", type: "uint256", indexed: false, internalType: "uint256" }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "PlayerAdded",
      inputs: [
        { name: "roundId", type: "string", indexed: true, internalType: "string" },
        { name: "player", type: "address", indexed: false, internalType: "address" }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "RoundInitialized",
      inputs: [
        { name: "roundId", type: "string", indexed: true, internalType: "string" },
        { name: "initializer", type: "address", indexed: false, internalType: "address" }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "TurnPaid",
      inputs: [
        { name: "roundId", type: "string", indexed: true, internalType: "string" },
        { name: "payer", type: "address", indexed: false, internalType: "address" },
        { name: "turn", type: "uint8", indexed: false, internalType: "uint8" }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "TurnWithdrawn",
      inputs: [
        { name: "roundId", type: "string", indexed: true, internalType: "string" },
        { name: "player", type: "address", indexed: false, internalType: "address" },
        { name: "amount", type: "uint256", indexed: false, internalType: "uint256" }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "CannotPayOwnTurn",
      inputs: []
    },
    {
      type: "error",
      name: "CollateralAlreadyWithdrawn",
      inputs: []
    },
    {
      type: "error",
      name: "InsufficientFunds",
      inputs: []
    },
    {
      type: "error",
      name: "InvalidTurn",
      inputs: []
    },
    {
      type: "error",
      name: "RoundAlreadyExists",
      inputs: []
    },
    {
      type: "error",
      name: "RoundFull",
      inputs: []
    },
    {
      type: "error",
      name: "RoundNotActive",
      inputs: []
    },
    {
      type: "error",
      name: "RoundNotCompleted",
      inputs: []
    },
    {
      type: "error",
      name: "RoundNotPending",
      inputs: []
    },
    {
      type: "error",
      name: "SafeERC20FailedOperation",
      inputs: [{ name: "token", type: "address", internalType: "address" }]
    },
    {
      type: "error",
      name: "TurnAlreadyPaid",
      inputs: []
    },
    {
      type: "error",
      name: "TurnAlreadyWithdrawn",
      inputs: []
    }
  ] as const;
  
  export default abi;
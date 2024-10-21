export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const mintContractAddress = '0xA3e40bBe8E8579Cd2619Ef9C6fEA362b760dac9f';
export const VAQUITA_CONTRACT_ADDRESS = "0xe5a822FC8D92FBFb0E1f0ED1B096E3318B6D4702";
export const BASE_SEPOLIA_USDC = "	0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export const USDC_DECIMALS = 1000000;
export const mintABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'public',
    type: 'function',
  },
] as const;

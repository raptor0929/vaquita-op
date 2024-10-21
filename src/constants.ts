export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const mintContractAddress = '0xA3e40bBe8E8579Cd2619Ef9C6fEA362b760dac9f';
export const VAQUITA_CONTRACT_ADDRESS = "0x8522D7762A8C3a71ddf5f52b6DA19849BAB87F1d";
export const BASE_SEPOLIA_USDC = "	0x036CbD53842c5426634e7929541eC2318f3dCF7e".toLowerCase().trim() as `0x${string}`;
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

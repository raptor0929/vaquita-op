export const OPTIMISM_SEPOLIA_CHAIN_ID = 11155420;
export const mintContractAddress = '0xA3e40bBe8E8579Cd2619Ef9C6fEA362b760dac9f';
export const VAQUITA_CONTRACT_ADDRESS = "0x1dA103dac759D5c49710C7923db43481845F8634";
export const OP_SEPOLIA_USDC = "0x5fd84259d66Cd46123540766Be93DFE6D43130D7".toLowerCase().trim() as `0x${string}`;
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

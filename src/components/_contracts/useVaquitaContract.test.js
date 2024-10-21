import { baseSepolia } from 'viem/chains';
import VaquitaABI from './VaquitaABI.ts';
import { useVaquitaContract } from './useVaquitaContract.ts';

describe('useVaquitaContract', () => {
  it('should return correct contract data', () => {
    const contract = useVaquitaContract();
    expect(contract).toEqual({
      abi: VaquitaABI,
      address: '0xe5a822FC8D92FBFb0E1f0ED1B096E3318B6D4702',
      status: 'ready',
      supportedChains: [baseSepolia],
    });
  });
});

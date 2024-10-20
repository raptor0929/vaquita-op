import { GroupResponseDTO } from '@/types';
import { useCallback } from 'react';

export const useVaquinhaWithdrawal = () => {
  
  const withdrawalCollateral = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      const tx = 'test';
      const error = false;
      
      return { tx: tx || '', error, success: !!tx && !error };
    },
    [],
  );
  
  const withdrawalEarnedRound = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      const tx = 'test';
      const error = false;
      
      return { tx: tx || '', error, success: !!tx && !error };
    },
    [],
  );
  
  const withdrawalEarnedInterest = useCallback(
    async (
      group: GroupResponseDTO,
      amount: number,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      const tx = 'testing';
      const error = '';
      
      return { tx: tx || '', error, success: !!tx && !error };
    },
    [],
  );
  
  return {
    withdrawalEarnedRound,
    withdrawalCollateral,
    withdrawalEarnedInterest,
  };
};

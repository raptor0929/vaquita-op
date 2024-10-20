import { GroupResponseDTO } from '@/types';
import { useCallback } from 'react';

export const useVaquinhaDeposit = () => {
  
  const depositCollateralAndCreate = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      const tx = 'test';
      const error = false;
      
      return { tx: tx || '', error, success: !!tx && !error };
    },
    [],
  );
  
  const depositCollateralAndJoin = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      const tx = 'test';
      const error = false;
      
      return { tx: tx || '', error, success: !!tx && !error };
    },
    [],
  );
  
  const depositRoundPayment = useCallback(
    async (
      group: GroupResponseDTO,
      turn: number,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      const tx = 'test';
      const error = false;
      
      return { tx: tx || '', error, success: !!tx && !error };
    },
    [],
  );
  
  return {
    depositCollateralAndCreate,
    depositCollateralAndJoin,
    depositRoundPayment,
  };
};

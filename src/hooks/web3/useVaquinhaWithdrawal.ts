import { GroupResponseDTO } from "@/types";
import { useCallback } from "react";
import { useWriteContracts } from "wagmi/experimental";
import { useVaquitaContract } from "../../components/_contracts/useVaquitaContract";
import {
  BASE_SEPOLIA_USDC,
  USDC_DECIMALS,
  VAQUITA_CONTRACT_ADDRESS,
} from "../../constants";

export const useVaquinhaWithdrawal = () => {
  const { data: callID, writeContracts } = useWriteContracts();
  const contract = useVaquitaContract();

  const withdrawalCollateral = useCallback(
    async (
      group: GroupResponseDTO
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      console.log({ group });
      // const paymentAmount = group.amount * USDC_DECIMALS;
      // const numberOfPlayers = group.totalMembers;
      // const frequencyOfTurns = convertFrequencyToTimestamp(group.period);
      // const tokenMintAddress = BASE_SEPOLIA_USDC; // Circle USDC
      const tx = "test";
      let error; // = false;
      try {
        writeContracts({
          contracts: [
            {
              address: VAQUITA_CONTRACT_ADDRESS,
              abi: contract.abi,
              functionName: "withdrawCollateral",
              args: [group.id],
            },
          ],
        });

        // { name: "roundId", type: "string", internalType: "string" },
        // { name: "position", type: "uint8", internalType: "uint8" }
      } catch (error) {
        console.log({ error });
        error = true;
      }

      return { tx: tx || "", error, success: !!tx && !error };
    },
    []
  );

  const withdrawalEarnedRound = useCallback(
    async (
      group: GroupResponseDTO
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      console.log({ group });
      // const paymentAmount = group.amount * USDC_DECIMALS;
      // const numberOfPlayers = group.totalMembers;
      // const frequencyOfTurns = convertFrequencyToTimestamp(group.period);
      // const tokenMintAddress = BASE_SEPOLIA_USDC; // Circle USDC
      const tx = "test";
      let error; // = false;
      try {
        writeContracts({
          contracts: [
            {
              address: VAQUITA_CONTRACT_ADDRESS,
              abi: contract.abi,
              functionName: "withdrawTurn",
              args: [group.id],
            },
          ],
        });

        // { name: "roundId", type: "string", internalType: "string" },
        // { name: "position", type: "uint8", internalType: "uint8" }
      } catch (error) {
        console.log({ error });
        error = true;
      }

      return { tx: tx || "", error, success: !!tx && !error };
    },
    []
  );

  const withdrawalEarnedInterest = useCallback(
    async (
      group: GroupResponseDTO,
      amount: number
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      const tx = "testing";
      const error = "";

      return { tx: tx || "", error, success: !!tx && !error };
    },
    []
  );

  return {
    withdrawalEarnedRound,
    withdrawalCollateral,
    withdrawalEarnedInterest,
  };
};

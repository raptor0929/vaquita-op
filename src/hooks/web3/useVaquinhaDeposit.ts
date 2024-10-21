import { GroupResponseDTO } from "@/types";
import { useCallback } from "react";
import { useWriteContracts } from "wagmi/experimental";
import { useVaquitaContract } from "../../components/_contracts/useVaquitaContract";
import {
  BASE_SEPOLIA_USDC,
  USDC_DECIMALS,
  VAQUITA_CONTRACT_ADDRESS,
} from "../../constants";

const convertFrequencyToTimestamp = (period: any): BigInt => {
  const SECONDS_PER_DAY = 86400; // 24 hours * 60 minutes * 60 seconds
  const frequencyInDays = period === "weekly" ? 7 : 30;
  const frequencyInSeconds = frequencyInDays * SECONDS_PER_DAY;
  // Return as BN (Big Number) which is commonly used for large integers in Solana
  return BigInt(frequencyInSeconds);
};

export const useVaquinhaDeposit = () => {
  const { data: callID, writeContracts } = useWriteContracts();
  const contract = useVaquitaContract();

  const depositCollateralAndCreate = useCallback(
    async (
      group: GroupResponseDTO
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      console.log({ group });
      const paymentAmount = group.amount * USDC_DECIMALS;
      const numberOfPlayers = group.totalMembers;
      const frequencyOfTurns = convertFrequencyToTimestamp(group.period);
      const tokenMintAddress = BASE_SEPOLIA_USDC; // Circle USDC
      const tx = "test";
      let error; // = false;
      try {
        writeContracts({
          contracts: [
            {
              address: VAQUITA_CONTRACT_ADDRESS,
              abi: contract.abi,
              functionName: "initializeRound",
              args: [
                group.id,
                paymentAmount,
                tokenMintAddress,
                numberOfPlayers,
                frequencyOfTurns,
                group.myPosition,
              ],
            },
          ],
        });

        // { name: "roundId", type: "uint256", internalType: "uint256" },
        //   { name: "paymentAmount", type: "uint256", internalType: "uint256" },
        //   { name: "token", type: "address", internalType: "contract IERC20" },
        //   { name: "numberOfPlayers", type: "uint8", internalType: "uint8" },
        //   { name: "frequencyOfTurns", type: "uint256", internalType: "uint256" },
        //   { name: "position", type: "uint8", internalType: "uint8" }
      } catch (error) {
        console.log({ error });
        error = true;
      }
      return { tx: tx || "", error, success: !!tx && !error };
    },
    []
  );

  const depositCollateralAndJoin = useCallback(
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
              functionName: "addPlayer",
              args: [group.id, group.myPosition],
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

  const depositRoundPayment = useCallback(
    async (
      group: GroupResponseDTO,
      turn: number
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      console.log({ group, turn });
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
              functionName: "payTurn",
              args: [group.id, turn],
            },
          ],
        });

        // { name: "roundId", type: "string", internalType: "string" },
        // { name: "turn", type: "uint8", internalType: "uint8" }
      } catch (error) {
        console.log({ error });
        error = true;
      }
      return { tx: tx || "", error, success: !!tx && !error };
    },
    []
  );

  return {
    depositCollateralAndCreate,
    depositCollateralAndJoin,
    depositRoundPayment,
  };
};

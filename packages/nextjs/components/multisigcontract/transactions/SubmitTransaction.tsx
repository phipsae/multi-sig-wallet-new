import { useEffect, useState } from "react";
import { AddressInput, EtherInput } from "../../scaffold-eth";
import { parseEther } from "viem";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/assets/Spinner";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

export const SubmitTransaction = (multiSigWalletAddress: any) => {
  const [to, setTo] = useState("");

  const [amount, setAmount] = useState("");

  const { data: multiSigWallet } = useScaffoldContract({
    contractName: "MultiSigWallet",
  });

  const { refetch: refetchGetTransactions } = useContractRead({
    address: multiSigWalletAddress.multiSigWalletAddress,
    abi: multiSigWallet?.abi,
    functionName: "getTransactions",
  });
  const { data: dataSubmitTransaction, write: submitTransaction } = useContractWrite({
    address: multiSigWalletAddress.multiSigWalletAddress,
    abi: multiSigWallet?.abi,
    functionName: "submitTransaction",
  });

  const { isLoading: isLoadingSumbitTransactionWait, isSuccess: isSuccessSubmitTransactionWait } =
    useWaitForTransaction({
      hash: dataSubmitTransaction?.hash,
    });

  useEffect(() => {
    if (isSuccessSubmitTransactionWait) {
      notification.success("Transaction successfully submitted");
      refetchGetTransactions();
    }
    if (isLoadingSumbitTransactionWait) {
      notification.success("Waiting for transaction confirmation", { icon: "⏱️" });
    }
  }, [isLoadingSumbitTransactionWait, isSuccessSubmitTransactionWait, refetchGetTransactions]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 mb-4 justify-center items-center">
          <div className="flex flex-row">
            <span className="w-7/8">
              <AddressInput value={to ?? ""} onChange={to => setTo(to)} placeholder="Address Receiver" />
            </span>
            <span className="w-[150px] mx-5">
              <EtherInput value={amount} onChange={amount => setAmount(amount)} placeholder="#" />
            </span>
          </div>
          <button
            className="btn btn-primary h-[2.2rem] min-h-[2.2rem] mt-auto"
            onClick={() => {
              submitTransaction({
                args: [to, parseEther(amount), "0x0"],
              });
            }}
          >
            {isLoadingSumbitTransactionWait ? (
              <div className="flex w-[100px] justify-center">
                <Spinner width="100" height="100"></Spinner>
              </div>
            ) : (
              <div className="flex flex-row w-full">
                <EnvelopeIcon className="h-4 w-4" />
                <span className="mx-3"> Submit a new transaction</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

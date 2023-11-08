import React from "react";
import { useSharedState } from "../sharedStateContext";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { FundContract } from "~~/components/multisigcontract/assetsOwners/FundContract";
import { MultiSigWalletOverview } from "~~/components/multisigcontract/assetsOwners/MultiSigWalletOverview";
import { ContractList } from "~~/components/multisigcontract/createContract/ContractList";
import { ListTransactions } from "~~/components/multisigcontract/transactions/ListTransactions";
import { SubmitTransaction } from "~~/components/multisigcontract/transactions/SubmitTransaction";

const Transactions: NextPage = () => {
  const { multiSigWalletAddress } = useSharedState();
  const { address, isConnected } = useAccount();

  return (
    <>
      <div className="container mx-auto flex flex-col mt-5">
        {!isConnected ? (
          <div className="flex justify-center flex-col h-screen items-center">
            <span className="text-xl font-bold"> No wallet connected </span>
          </div>
        ) : (
          <div className="container mx-auto flex flex-col mt-5">
            <div className="text-center ">
              <span className="block text-2xl font-bold">💸 Transactions</span>
            </div>
            <div className="flex flex-row mt-5 gap-5">
              <div className="flex flex-col flex-1 mt-5 border p-5 bg-white">
                <div className="text-center">
                  <span className="block text-2xl font-bold">Multi Sig Wallet Overview</span>
                </div>
                {multiSigWalletAddress == "" ? (
                  <div className="flex justify-center flex-col h-3/4 items-center">
                    <span className="text-xl font-bold"> Select Multi Sig Wallet </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center mt-5">
                      <MultiSigWalletOverview multiSigWalletAddress={multiSigWalletAddress} />
                    </div>
                    <div className="flex justify-center mt-10">
                      <FundContract multiSigWalletAddress={multiSigWalletAddress} />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 mt-5 border p-5 bg-white">
                <div className="text-center ">
                  <span className="block text-2xl font-bold">Select Multi Sig Wallet</span>
                </div>
                <div className="flex justify-center mt-5">
                  <ContractList myAddress={address} />
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 mt-5 border p-5 bg-white">
              <div className="text-center ">
                <span className="block text-2xl font-bold">📃 Transactions List</span>
              </div>
              {multiSigWalletAddress == "" ? (
                <div className="flex justify-center flex-col h-10 items-center">
                  <span className="text-xl font-bold"> Select Multi Sig Wallet </span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center mt-5">
                    <ListTransactions multiSigWalletAddress={multiSigWalletAddress} />
                  </div>
                  <div className="flex justify-center mt-5">
                    <SubmitTransaction multiSigWalletAddress={multiSigWalletAddress} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;

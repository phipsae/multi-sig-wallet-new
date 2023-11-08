import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShowSigners } from "../assetsOwners/ShowSigners";
import { useAccount } from "wagmi";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useSharedState } from "~~/sharedStateContext";

export const ContractList = (myAddress: any) => {
  const { data: multiSigContracts } = useScaffoldContractRead({
    contractName: "MultiSigFactory",
    functionName: "getMultiSigContracts",
  });
  const { selectedRowIndex, setSelectedRowIndex } = useSharedState();
  const [showSignersFor, setShowSignersFor] = useState<{ [key: string]: boolean }>({});
  const { address } = useAccount();
  const router = useRouter();

  const { multiSigWalletAddress, setMultiSigWalletAddress } = useSharedState();

  const isOwner = () => {
    let hasContracts = false;

    multiSigContracts?.forEach(contract => {
      contract.signers.forEach(signer => {
        if (signer === address) {
          hasContracts = true;
        }
      });
    });
    return hasContracts;
  };

  useEffect(() => {
    console.log("from Use Effect selected Row Index Address", selectedRowIndex);
    console.log("Router Pathname", router.pathname);
  }, [selectedRowIndex, router.pathname]);

  return (
    <>
      <div className="shadow-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="bg-primary">Contract Address</th>
              <th className="bg-primary">Confirmations required</th>
              <th className="bg-primary">Balance</th>
              <th className="bg-primary">Details</th>
              <th className="bg-primary">Select</th>
            </tr>
          </thead>
        </table>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <table className="table w-full ">
            <tbody>
              {!multiSigContracts || !isOwner() ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    No multi sig contracts added yet
                  </td>
                </tr>
              ) : (
                multiSigContracts?.flatMap(contract => {
                  return contract.signers.map(signer => {
                    if (signer == myAddress.myAddress) {
                      return (
                        <React.Fragment key={contract.contractAddress}>
                          <tr
                            key={contract.contractAddress}
                            className={selectedRowIndex === contract.contractAddress ? "bg-blue-100" : ""}
                          >
                            <td className="text-center">
                              <Address address={contract.contractAddress} />
                            </td>
                            <td className="text-center">{Number(contract.requiredConfirmations)}</td>
                            <td className="text-center">
                              <Balance className="text-xl" address={contract.contractAddress} />
                            </td>

                            <td
                              className="text-center"
                              onClick={() => {
                                setSelectedRowIndex(contract.contractAddress);
                                // setOpenTable(contract.contractAddress);
                                setMultiSigWalletAddress(contract.contractAddress);
                                setShowSignersFor(prevState => ({
                                  ...prevState,
                                  [contract.contractAddress]: !prevState[contract.contractAddress] || false,
                                }));
                              }}
                            >
                              <span className="flex justify-center items-center">
                                <ChevronDoubleDownIcon className="text-center h-4 w-4" />
                              </span>
                            </td>
                            <td
                              className="text-center"
                              onClick={() => {
                                setSelectedRowIndex(contract.contractAddress);
                                setMultiSigWalletAddress(contract.contractAddress);
                              }}
                            >
                              <input type="checkbox" checked={selectedRowIndex === contract.contractAddress} readOnly />
                            </td>
                          </tr>
                          {showSignersFor[contract.contractAddress] &&
                            selectedRowIndex === contract.contractAddress && (
                              <tr>
                                <td colSpan={4}>
                                  <ShowSigners multiSigWalletAddress={multiSigWalletAddress} />
                                  {router.pathname === "/createContract" && (
                                    <Link href="/transactions">
                                      <button className="btn btn-primary w-full"> ✉️ Go to transactions </button>
                                    </Link>
                                  )}
                                </td>
                              </tr>
                            )}
                        </React.Fragment>
                      );
                    }
                  });
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

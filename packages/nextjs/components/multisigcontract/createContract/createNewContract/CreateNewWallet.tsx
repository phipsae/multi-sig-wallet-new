import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/assets/Spinner";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useSharedState } from "~~/sharedStateContext";

export const CreateNewWallet = () => {
  const { setConfirmationsSet } = useSharedState();
  const { signers } = useSharedState();
  const { confirmations } = useSharedState();
  const isSignersGreaterConfirmations = signers.length >= confirmations;

  const {
    writeAsync: createContract,
    isLoading: isLoadingCreateContract,
    // isSuccess: isSuccessCreateContract,
  } = useScaffoldContractWrite({
    contractName: "MultiSigFactory",
    functionName: "createContract",
    args: [BigInt(confirmations), signers],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <button
            disabled={!isSignersGreaterConfirmations}
            className="btn btn-primary h-[2.2rem] min-h-[2.2rem] mt-auto"
            onClick={() => {
              setConfirmationsSet(false);
              createContract();
            }}
          >
            {isLoadingCreateContract ? <Spinner /> : `Create Contract with ${Number(confirmations)} confirmations`}
          </button>
          {!isSignersGreaterConfirmations && (
            <span className="text-center mt-4">Add a minium of {confirmations} signers</span>
          )}
        </div>
        <div>
          <button
            className="btn btn-error h-[2.2rem] min-h-[2.2rem] mt-auto mx-2"
            onClick={() => {
              setConfirmationsSet(false);
            }}
          >
            <ArrowUturnLeftIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

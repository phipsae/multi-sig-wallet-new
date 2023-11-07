import { useAccount } from "wagmi";
import { Bytes32Input } from "~~/components/scaffold-eth";
import { useSharedState } from "~~/sharedStateContext";

export const SetConfirmations = () => {
  const { confirmations, setConfirmations } = useSharedState();
  const { setConfirmationsSet } = useSharedState();
  const { setSigners } = useSharedState();
  const { address } = useAccount();

  return (
    <>
      <div>
        <div className="flex flex-row mb-4 justify-center">
          <span className="w-[100px]">
            <Bytes32Input
              value={confirmations.toString()}
              onChange={confirmations => setConfirmations(Number(confirmations))}
            />
          </span>
          <button
            className="btn btn-primary h-[2.2rem] min-h-[2.2rem] mt-auto mx-2"
            onClick={() => {
              setSigners([address || ""]);
              setConfirmationsSet(true);
            }}
          >
            Set confirmations
          </button>
        </div>
        <div className="text-center">
          <span className="text-center">Confirmations needed to approve transactions ✅</span>
        </div>
      </div>
    </>
  );
};

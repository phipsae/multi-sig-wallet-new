import { useEffect } from "react";
import { AddSigners } from "./createNewContract/AddSigner";
import { CreateNewWallet } from "./createNewContract/CreateNewWallet";
import { NewSignerList } from "./createNewContract/NewSignerList";
import { SetConfirmations } from "./createNewContract/SetConfirmations";
import { useSharedState } from "~~/sharedStateContext";

export const CreateNewContract = () => {
  const { confirmations } = useSharedState();
  const { confirmationsSet } = useSharedState();
  const { signers } = useSharedState();

  useEffect(() => {
    console.log(signers);
    console.log(confirmations);
  }, [signers, confirmations]);

  return (
    <>
      <div>
        {confirmationsSet === false ? (
          <SetConfirmations />
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col">
              <NewSignerList />
              <AddSigners />
            </div>
            <div className="flex flex-col mt-4 justify-center">
              <CreateNewWallet />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

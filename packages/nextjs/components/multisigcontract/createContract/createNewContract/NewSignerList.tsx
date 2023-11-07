import { useAccount } from "wagmi";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useSharedState } from "~~/sharedStateContext";

export const NewSignerList = () => {
  const { signers, setSigners } = useSharedState();
  const { address } = useAccount();

  const removeSigner = (index: number) => {
    setSigners(signers => {
      const newSigners = [...signers];
      newSigners.splice(index, 1);
      return newSigners;
    });
  };
  return (
    <>
      {
        <div className="mt-8">
          <div className="overflow-x-auto shadow-lg">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="bg-primary">Signer Address</th>
                  <th className="bg-primary">Remove</th>
                </tr>
              </thead>
              <tbody>
                {!signers || signers.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center">
                      No signers added yet
                    </td>
                  </tr>
                ) : (
                  signers?.map((signer, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">
                          <Address address={signer} />
                        </td>
                        <td className="text-left">
                          <button
                            hidden={signer == address}
                            onClick={() => {
                              removeSigner(index);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
};

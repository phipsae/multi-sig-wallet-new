import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AddressInput } from "~~/components/scaffold-eth";
import { useSharedState } from "~~/sharedStateContext";
import { notification } from "~~/utils/scaffold-eth";

export const AddSigners = () => {
  const { signers, setSigners } = useSharedState();
  const [newAddress, setNewAddress] = useState<string>("");

  const addSigner = (addressSigner: string) => {
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(addressSigner);

    if (signers.includes(addressSigner)) {
      notification.error("Address already added, please add another one");
      return;
    }
    if (!isValidAddress || !addressSigner) {
      notification.error("Add an valid address");
      return;
    }
    setSigners(signers => [...signers, addressSigner]);
  };

  return (
    <>
      <div className="flex flex-row mt-2">
        <span className="h-[2.2rem] min-h-[2.2rem] mt-auto w-full">
          <AddressInput
            placeholder="Address.."
            aria-label="Adress"
            value={newAddress}
            onChange={newAddress => setNewAddress(newAddress)}
          />
        </span>
        <button
          className="btn btn-primary h-[2.2rem] min-h-[2.2rem] mt-auto mx-2"
          onClick={() => addSigner(newAddress)}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};

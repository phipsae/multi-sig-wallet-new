import { Address, Balance } from "~~/components/scaffold-eth";

export const MultiSigWalletOverview = (multiSigWalletAddress: any) => {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1">
          <div className="h-10">
            <Address address={multiSigWalletAddress.multiSigWalletAddress} />
          </div>
          <div className="text-center mt-2">
            <span>Wallet Address</span>
          </div>
        </div>
        <div className="flex flex-col flex-1 mx-10">
          <div className="h-10">
            <Balance className="text-xl" address={multiSigWalletAddress.multiSigWalletAddress} />
          </div>
          <div className="text-center mt-2">
            <span>Wallet Balance</span>
          </div>
        </div>
      </div>
    </>
  );
};

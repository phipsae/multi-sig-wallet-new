import { useEffect } from "react";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface NotficationsConfirmErrorProps {
  isSuccess: boolean;
  successMessage: string;
  isError: boolean;
  errorMessage: string;
}

export const NotficationsConfirmError: React.FC<NotficationsConfirmErrorProps> = ({
  isSuccess,
  successMessage,
  isError,
  errorMessage,
}) => {
  const { data: multiSigWalletInfo } = useDeployedContractInfo("MultiSigWallet");

  useEffect(() => {
    if (multiSigWalletInfo?.abi && (isSuccess || isError)) {
      if (isSuccess) {
        console.log(successMessage);
        notification.success(successMessage);
      }
      if (isError) {
        console.log(errorMessage);
        notification.error(errorMessage);
      }
    }
  }, [isSuccess, successMessage, isError, errorMessage, multiSigWalletInfo?.abi]);

  return null;
};

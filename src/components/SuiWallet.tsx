import React, { useEffect, useState } from "react";
import { ConnectModal, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";

const SuiWallet: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [suiWalletAddress, setSuiWalletAddress] = useState<string | null>(null);

  const currentAccount = useCurrentAccount();
  const { mutate: disconnectSui } = useDisconnectWallet();

  useEffect(() => {
    if (currentAccount) {
      setSuiWalletAddress(currentAccount.address);
      console.log("Sui Wallet connected:", currentAccount.address);
    }
  }, [currentAccount]);

  const handleDisconnect = () => {
    disconnectSui();
    setSuiWalletAddress(null);
  };

  return (
    <div>
      <ConnectModal
        trigger={
          <button className="connect-sui">
            {suiWalletAddress ? `Connected: ${suiWalletAddress}` : "Connect Sui Wallet"}
          </button>
        }
        open={modalOpen}
        onOpenChange={(isOpen: boolean) => setModalOpen(isOpen)}
      />

      {suiWalletAddress && (
        <button className="disconnect-button" onClick={handleDisconnect}>
          Disconnect
        </button>
      )}
    </div>
  );
};

export default SuiWallet;
import React, { useState } from "react";
import { connectWallet } from "../utils/eth"; // Assuming you have a disconnectWallet function

const Wallet: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
      setModalOpen(false); // Close the modal after connecting
    }
  };

  const handleDisconnect = () => {
    //disconnectWallet();
    setWalletAddress(null);
  };

  return (
    <div>
      <button
        className="connect-metamask"
        onClick={() => setModalOpen(true)}
      >
        {walletAddress ? `Connected: ${walletAddress}` : "Connect MetaMask"}
      </button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
          <h2 style={{ color: "black" }}>Connect MetaMask</h2>
            <button onClick={handleConnect}>Connect</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {walletAddress && (
        <button className="disconnect-button" onClick={handleDisconnect}>
          Disconnect
        </button>
      )}
    </div>
  );
};

export default Wallet;
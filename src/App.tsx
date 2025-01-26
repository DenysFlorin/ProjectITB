import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import SuiWallet from "./components/SuiWallet";
import Wallet from "./components/Wallet";
import { burnIBT, mintIBT } from "./utils/eth";
import { burnIBTToken, mintIBTToken, getSuiBalance } from "./utils/sui";
import { ethers } from "ethers";
import "./styles.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<"EthToSui" | "SuiToEth">("EthToSui");
  const [ethBalance, setEthBalance] = useState<number | null>(null);
  const [suiBalance, setSuiBalance] = useState<number | null>(null);

  const fetchEthBalance = async () => {
    const contract = await getEthereumContract();
    if (contract && account) {
      try {
        const balance = await contract.balanceOf(account.address);
        setEthBalance(Number(ethers.formatUnits(balance, 18))); // Convert from Wei to Ether
      } catch (error) {
        console.error("Error fetching Ethereum balance:", error);
      }
    }
  };

  // Fetch Sui balance
  const fetchSuiBalance = async () => {
    if (account) {
      try {
        const balance = await getSuiBalance(account.address);
        setSuiBalance(balance);
      } catch (error) {
        console.error("Error fetching Sui balance:", error);
      }
    }
  };

  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      if (direction === "EthToSui") {
        console.log(`Burning ${amount} IBT on Ethereum...`);
        await burnIBT(Number(amount));

        console.log(`Minting ${amount} IBTToken on Sui...`);
        await mintIBTToken(account.address, Number(amount));
      } else {
        console.log(`Burning ${amount} IBTToken on Sui...`);
        await burnIBTToken(account.address, Number(amount));

        console.log(`Minting ${amount} IBT on Ethereum...`);
        await mintIBT(account.address, Number(amount));
      }

      // Refresh balances after transfer
      fetchEthBalance();
      fetchSuiBalance();

      alert("Transfer successful!");
    } catch (error) {
      console.error("Transfer error:", error);
      alert("Transfer failed. Check console for details.");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider>
        <WalletProvider autoConnect>
          <div className="container">
            <h1>IBT Bridge</h1>
            <div className="wallet-buttons" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              <Wallet />
              <SuiWallet />
            </div>

            <div className="balances">
  <p style={{ color: "red" }}>
    Ethereum Balance: {ethBalance !== null ? `${ethBalance} IBT` : "Loading..."}
  </p>
  <p style={{ color: "blue" }}>
    Sui Balance: {suiBalance !== null ? `${suiBalance} IBTToken` : "Loading..."}
  </p>
</div>


            <div className="transfer-controls">
              <label style={{ color: '#000000' }}>
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                />
              </label>
            </div>

            <div className="transfer-buttons">
              <button onClick={() => setDirection("EthToSui")} className={direction === "EthToSui" ? "active" : ""}>
                Eth → Sui
              </button>
              <button onClick={() => setDirection("SuiToEth")} className={direction === "SuiToEth" ? "active" : ""}>
                Sui → Eth
              </button>
            </div>

            <button className="transfer-button" onClick={handleTransfer}>
              Transfer
            </button>
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default App;

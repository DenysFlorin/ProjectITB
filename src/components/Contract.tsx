import React, { useState, useEffect } from "react";
import { getEthereumContract } from "../utils/eth";

const Contract: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const fetchMessage = async () => {
    const contract = await getEthereumContract(); // Await the contract
    if (contract) {
      try {
        const msg = await contract.message(); // Call the `message` function
        setMessage(msg);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    } else {
      alert("MetaMask not detected or contract not deployed!");
    }
  };

  const updateMessage = async () => {
    const contract = await getEthereumContract(); // Await the contract
    if (contract) {
      try {
        const tx = await contract.setMessage(newMessage); // Call the `setMessage` function
        await tx.wait(); // Wait for the transaction to be mined
        fetchMessage(); // Refresh the message
      } catch (error) {
        console.error("Error updating message:", error);
      }
    } else {
      alert("MetaMask not detected or contract not deployed!");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Smart Contract Interaction</h2>
      <p>Current Message: {message}</p>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Enter new message"
      />
      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
};

export default Contract;
import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Schimbă cu adresa contractului tău
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  export const getEthereumContract = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner(); // Get the signer
      return new ethers.Contract(contractAddress, contractABI, signer);
    }
    return null;
  };

  export const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        return accounts[0];
      } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
      }
    } else {
      alert("Please install MetaMask!");
      return null;
    }
  };

// 🔹 Funcție pentru a arde IBT (Ethereum)
export const burnIBT = async (amount: number) => {
    try {
      const contract = await getEthereumContract(); // Await the contract
      if (!contract) throw new Error("Ethereum contract not found");
  
      // Get the signer from the provider
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
  
      // Get the user's address
      const userAddress = await signer.getAddress();
  
      // Call the burn function on the contract
      const tx = await contract.burn(userAddress, ethers.parseUnits(amount.toString(), 18));
      await tx.wait();
  
      console.log(`🔥 Burned ${amount} IBT on Ethereum`);
      return tx;
    } catch (error) {
      console.error("Error burning IBT:", error);
      throw error;
    }
  };

// 🔹 Funcție pentru a mintui IBT (Ethereum)
export const mintIBT = async (recipient: string, amount: number) => {
    try {
      const contract = await getEthereumContract(); // Await the contract
      if (!contract) throw new Error("Ethereum contract not found");
  
      // Call the mint function on the contract
      const tx = await contract.mint(recipient, ethers.parseUnits(amount.toString(), 18));
      await tx.wait();
  
      console.log(`✅ Minted ${amount} IBT on Ethereum`);
      return tx;
    } catch (error) {
      console.error("Error minting IBT:", error);
      throw error;
    }
  };

  export const getEthereumBalance = async (address: string): Promise<number> => {
    const contract = await getEthereumContract();
    if (contract) {
      const balance = await contract.balanceOf(address);
      return Number(ethers.formatUnits(balance, 18)); // Convert from Wei to Ether
    }
    throw new Error("Ethereum contract not found");
  };
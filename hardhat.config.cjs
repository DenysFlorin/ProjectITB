require("@nomicfoundation/hardhat-toolbox");
require("@typechain/hardhat");

module.exports = {
  solidity: "0.8.20", // Specify the Solidity version
  typechain: {
    outDir: "contracts",
    target: "ethers-v6", // Use ethers-v6 instead of ethers-v5
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat or Anvil node
    },
  },
  paths: {
    sources: "./contracts", // Directory for Solidity contracts
    artifacts: "./artifacts", // Directory for compiled contracts
    cache: "./cache", // Directory for cache
    tests: "./test", // Directory for tests
  },
};
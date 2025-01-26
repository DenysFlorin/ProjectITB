import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const IBT = await hre.ethers.getContractFactory("IBT");
  const ibt = await IBT.deploy();

  // Wait for the deployment to complete
  await ibt.waitForDeployment();

  // Get the contract address
  const ibtAddress = await ibt.getAddress();
  console.log("IBT deployed to:", ibtAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
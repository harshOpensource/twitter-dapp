const hardhat = require("hardhat");

const main = async () => {
  const contractFactory = await hardhat.ethers.getContractFactory("twitter");
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();

  console.log("Contract deployed to: ", contract);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

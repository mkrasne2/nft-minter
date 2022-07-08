
const hre = require("hardhat");

async function main() {
  
  const SuperNFTs = await hre.ethers.getContractFactory("SuperNFTs");
  const superNFTs = await SuperNFTs.deploy(
    "NFT Minter",
    "NFT"
  );

  await superNFTs.deployed();

  console.log("Medium deployed to:", superNFTs.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

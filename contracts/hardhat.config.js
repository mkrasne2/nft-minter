require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    goerli: {
      url: process.env.GOERLI,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: 'Z5QI4J6Y87YAGMIC261DK7MHDI7BW2Z9FX',
  }
};

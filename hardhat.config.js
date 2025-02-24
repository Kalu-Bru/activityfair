/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.28",
    networks: {
        sepolia: {
          chainId: 11155111,
          url: "https://eth-sepolia.g.alchemy.com/v2/hLji9Ff_lKPE631jRXjrHF4KBk9r8GHi",
          accounts: [process.env.PRIVATE_KEY]
        }
    }
};

/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.28",
    networks: {
        sepolia: {
          chainId: 11155111,
          url: process.env.ALCHEMY_URL,
          accounts: [process.env.PRIVATE_KEY]
        }
    }
};

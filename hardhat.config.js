/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.28",
    networks: {
        sepolia: {
          chainId: 11155111,
          url: "https://eth-sepolia.g.alchemy.com/v2/hLji9Ff_lKPE631jRXjrHF4KBk9r8GHi",
          accounts: ["75c7aa1e1b88907d9a2074bde0675f1c9d2b58cf71ff06befff5785c4be21083"]
        }
    }
};

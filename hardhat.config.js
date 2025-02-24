/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.28",
    networks: {
        sepolia: {
          chainId: 11155111,
          url: "https://eth-sepolia.g.alchemy.com/v2/hLji9Ff_lKPE631jRXjrHF4KBk9r8GHi",
          accounts: ["cafaa8e658fef4847a74d0bc1dedf3f609ed17d0f24e21ef657152238edf69b2"]
        }
    }
};

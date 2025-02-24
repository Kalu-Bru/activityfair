const { ethers } = require("hardhat");

async function main() {
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    await nft.deployed();
    console.log("NFT Contract deployed to:", nft.address);

    const [owner] = await ethers.getSigners();
    console.log("Interacting with contract using:", owner.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });




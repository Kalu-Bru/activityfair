require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { ethers } = require("hardhat");
const { createCanvas, loadImage } = require("canvas");
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

const contractAddress = "0xc61f87B1F7ecfF02bFEcf9ad6862A9ce427dDd26";
const abi = require("../artifacts/contracts/NFT.sol/NFT.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function uploadImageToIPFS(username) {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 500, 500);
    gradient.addColorStop(0, "#0093D3");
    gradient.addColorStop(1, "#6FCF97");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 500);

    ctx.fillStyle = "#2F4F2F";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("SMART CONTRACTS LAB", 250, 60);

    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText("Activity Fair FS25", 250, 100);

    const logoPath = path.join(__dirname, "SCL_Logo_alt.png");

    await loadImage(logoPath).then((logo) => {
        ctx.drawImage(logo, 100, 90, 300, 300);

        ctx.fillStyle = "black";
        ctx.font = "bold 22px Arial";
        ctx.fillText("Thank you for participating:", 250, 400);

        ctx.font = "bold 24px Arial";
        ctx.fillText(username, 250, 430);

    }).catch(err => console.error("Error loading logo:", err));

    const imagesDir = path.join(__dirname, "images");
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    const imagePath = path.join(imagesDir, `${username}.png`);
    fs.writeFileSync(imagePath, canvas.toBuffer("image/png"));

    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    formData.append(
        "pinataMetadata",
        JSON.stringify({ name: `${username}.png` })
    );

    formData.append(
        "pinataOptions",
        JSON.stringify({ cidVersion: 0 })
    );

    const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
            headers: {
                ...formData.getHeaders(),
                pinata_api_key: process.env.PINATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
            },
        }
    );

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
}


async function uploadMetadataToIPFS(imageURL, username) {
    const metadata = {
        name: "SCL: Activity Fair FS25",
        description: "We appreciate your interest in the Smart Contracts Lab! Join our team if you are eager to learn more and want to write your Thesis on Blockchain technologies. (https://smartcontractslab.ch/)",
        image: imageURL,
    };

    const result = await pinata.pinJSONToIPFS(metadata);
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
}

app.post("/api/mint", async (req, res) => {
    const { username, account } = req.body;

    try {
        const imageURL = await uploadImageToIPFS(username);
        const metadataURI = await uploadMetadataToIPFS(imageURL, username);

        const tx = await contract.mint(account, metadataURI);
        const receipt = await tx.wait();

        const event = receipt.events.find((e) => e.event === "Transfer");
        const tokenId = event.args.tokenId.toString();
        console.log(tokenId);

        res.json({
            success: true,
            message: "NFT minted successfully!",
            txHash: tx.hash,
            tokenURI: metadataURI,
            tokenId
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


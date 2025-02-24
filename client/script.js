let userAccount = null;

document.getElementById("connectButton").addEventListener("click", async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        userAccount = await signer.getAddress();

        console.log(`Connected: ${userAccount}`);
        document.getElementById("connectButton").style.background = "rgb(131, 249, 131)";
        document.getElementById("connectButton").style.width = "30%";
        document.getElementById("connectButton").innerHTML = `<img src="metamask-logo.png" alt="MetaMask Logo" style="width: 20px; height: 20px; margin-right: 5px;">Connected`;
        document.getElementById("mintButton").disabled = false;
    } catch (error) {
        console.error(error);
        console.log("Failed to connect");
    }
});

function mintToken() {
    document.getElementById('tokenize-buffer').style.display = "block";
    document.querySelector('.container').style.opacity = "0";
}

function canvasAnimation() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let width, height, columns, drops;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    function setupCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        columns = Math.floor(width / 20);
        drops = Array(columns).fill(0);
    }

    function drawMatrixRain() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#00ff88";
        ctx.font = "8px 'Anurati', sans-serif";

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            const x = i * 20;
            const y = drops[i] * 20;

            ctx.fillText(text, x, y);

            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    function startMatrix() {
        setupCanvas();
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "1";
        canvas.style.pointerEvents = "none";

        setInterval(drawMatrixRain, 50);
    }

    startMatrix();
    window.addEventListener("resize", setupCanvas);
};
    

document.getElementById("mintButton").addEventListener("click", async () => {
    mintToken();
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username.");
        return;
    }
    if (!userAccount) {
        alert("Please connect your wallet first.");
        return;
    }

    

    try {
        const response = await fetch("https://activityfair-ede8b4740f18.herokuapp.com/api/mint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, account: userAccount }),
        });

        const result = await response.json();
        if (result.success) {
            console.log(`NFT minted! Tx: ${result.txHash}`);
            document.getElementById('tokenize-buffer').style.display = "none";

            const tokenId = result.tokenId;
            document.getElementById('nft-address').value = "0xc61f87B1F7ecfF02bFEcf9ad6862A9ce427dDd26";
            document.getElementById('token-id').value = tokenId;
            document.querySelector(".metamask-info").style.display = "block";
            canvasAnimation();
            console.log(tokenId);
            // await addNFTToWallet(userAccount, tokenId);
        } else {
            console.log(`Minting failed: ${result.message}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
});

async function addNFTToWallet(account, tokenId) {
    if (!window.ethereum) {
        alert("MetaMask is not installed.");
        return;
    }

    try {
        await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC721",
                options: {
                    address: "0xc61f87B1F7ecfF02bFEcf9ad6862A9ce427dDd26",
                    id: tokenId,
                    symbol: "UNFT",
                    image: `https://your-image-server.com/nft/${tokenId}.png`,
                },
            },
        });

        document.getElementById("status").innerText += " | NFT added to wallet!";
    } catch (error) {
        console.error("Error adding NFT to wallet:", error);
    }
}



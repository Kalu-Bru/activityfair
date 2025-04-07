# NFT Giveaway Activity Fair 2025 - Smart Contracts Lab
A simple landing page to mint a personal NFT and import it into the user's wallet, made for the Smart Contracts Lab at the UZH ActivityFair 2025.

![Alt text](server/images/Kalu.png?raw=true)

## Characteristics
- Environment: Node.js
- Server: Express.js
- Database: -
- Deployment library: Hardhat

## 🚀 Test it yourself

1. Clone the Repository

   Start by cloning the project to your local machine:

   ```bash
   git clone https://github.com/Kalu-Bru/activityfair.git
   cd activityfair
   ```

2. Set Up Environment Variables

   Create a .env file in the root directory and add the following environment variables:
  
   ```env
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_API_KEY=your_pinata_secret_api_key
   ALCHEMY_URL=your_alchemy_network_url
   PRIVATE_KEY=your_wallets_private_key
   CONTRACT_ADDRESS=we_will_update_this_later
   ```

   Replace each value with your own credentials and contract address. If you need help with these, follow the instructions below:
   - **PINATA**: Create an account (select free plan) then navigate to "API Keys" in the sidebar, create a new Key and name it however you want, make sure to give admin permissions (first option) and click enter. The API key and secret key should appear.
   - **ALCHEMY**: Create an account, create an APP and name it however you want, make sure to select ethereum as the network choice, then confirm all the way to create your app. In your App's dashboard, change the network to sepolia and you will see the correct Network URL.

## **Caution**
You will need some Sepolia ETH in order to deploy the contract, you can get some for free from the Alchemy faucet (0.001 ETH Mainnet required for verification):
https://www.alchemy.com/faucets/ethereum-sepolia

![Alt text](server/images/GasFees.png?raw=true)

3. Install Dependencies

   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

4. Compile the contract and deploy

   In the terminal, run:
   
   ```bash
   npx hardhat compile
   ```

   Then deploy the contract with the following command:

   ```bash
   npx hardhat run server/deploy.js --network sepolia
   ```

5. Get contract address

   Copy the contract address printed out in the console and save it in the corresponding environment variable:

   ```bash
   CONTRACT_ADDRESS=paste_contract_address
   ```

6. Run the server

   Start the server with:
   ```bash
   node server/app
   ```

   Or:
  
   ```bash
   nodemon server/app
   ```

## How does the website work

First you will need to connect your metamask wallet, enter your username and then click on "Mint NFT". After the animation, you will need to copy the contract address and the token id and use these to import the token in metamask.

Side notes:
- The minting works with Phantom and OnChain, but these do not offer an import function for NFTs, therefore the app is not optimized for them.
- In order to import the token and see it in your metamask wallet, you will have to select the sepolia network in your wallet first, and then import the NFT there.

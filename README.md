# SPENGU Staking Dashboard

A clean, minimal Solana-based staking dashboard for SPENGU tokens with Phantom wallet integration. Built with React, TypeScript, and TailwindCSS.

## Project Overview

The SPENGU Staking Dashboard is a modern, responsive web application that allows users to stake and manage their SPENGU tokens and NFTs on the Solana blockchain. The dashboard provides a clean interface for users to:

- Connect their Phantom wallet
- View their SOL balance and SPENGU token balance
- Stake NFTs and SPENGU tokens
- Track rewards and yields
- Claim staking rewards

## Features

- **Wallet Integration**: Connect with Phantom wallet to access Solana blockchain
- **NFT Staking**: Stake SPENGU NFTs to earn daily rewards
- **Token Staking**: Stake SPENGU tokens with different APR options
- **Rewards Dashboard**: View estimated yields and claimable rewards
- **Asset Management**: Easily track and manage all staked assets
- **Dark Mode**: Clean, modern dark-themed UI with custom design

## Tech Stack

- React 18 with TypeScript
- TailwindCSS for styling
- Solana Web3.js for blockchain interaction
- Vite for fast development and production builds
- Express.js for backend API

## Installation and Setup

### Prerequisites

- Node.js v18+ and npm
- Git

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spengu-dashboard.git
   cd spengu-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5000`

## Integrating Staking Endpoints

To integrate with real Solana staking contracts:

1. Update the `nft-service.ts` file in `client/src/services/` with your contract addresses and ABI.

2. Replace the mock functions in the service with real contract calls:
   ```typescript
   // Example of updating the getStakedNFTs function
   async getStakedNFTs(walletAddress: string): Promise<StakedNft[]> {
     // Replace with your contract interaction code
     const connection = new Connection(clusterApiUrl('mainnet-beta'));
     const publicKey = new PublicKey(walletAddress);
     
     // Call your staking contract
     const stakingProgramId = new PublicKey('YOUR_PROGRAM_ID');
     
     // Fetch user's staked NFTs
     // ... your implementation here
     
     return nfts;
   }
   ```

3. Update the token staking functions similarly to connect to your token staking contract.

4. Implement the claim and unstake functionality in the dashboard UI components.

## Deployment

The application can be deployed to any static hosting service:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
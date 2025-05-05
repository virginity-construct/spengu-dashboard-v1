# SPENGU Staking Dashboard

![SPENGU Staking Dashboard](https://i.imgur.com/LRzrIOp.png)

A minimal Solana staking dashboard built for the $SPENGU token and Pepenguins NFT project. This dashboard provides a sleek interface for users to connect their wallets, view their staking positions, and interact with the SPENGU ecosystem.

**Live site:** [https://z3r0l4g.dev](https://z3r0l4g.dev)  
**Repo:** [https://github.com/virginity-construct/spengu-dashboard-v1](https://github.com/virginity-construct/spengu-dashboard-v1)

## Features

- **Wallet Integration** - Seamless connection with Phantom wallet
- **NFT Staking** - View and manage staked Pepenguins NFTs
- **Token Staking** - Stake $SPENGU tokens with flexible lock periods
- **Rewards Dashboard** - Track daily yields and claimable rewards
- **Real-time Stats** - Monitor APR and projected earnings
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark Mode** - Sleek, eye-friendly dark theme

## Tech Stack

- **Frontend**
  - React 18 with TypeScript
  - TailwindCSS + shadcn/ui components
  - Framer Motion for animations
  
- **Blockchain Integration**
  - @solana/web3.js for Solana interactions
  - Phantom wallet adapter

- **Developer Experience**
  - Vite for fast builds and HMR
  - ESLint + TypeScript for code quality
  - React Query for data fetching

## Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/virginity-construct/spengu-dashboard-v1.git
   cd spengu-dashboard-v1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The app will be available at http://localhost:5000

## Development Guide

### Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── contexts/        # React contexts (wallet, theme)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.tsx          # Main App component
│   │   └── main.tsx         # Entry point
│   └── index.html           # HTML template
├── server/                  # Express server for API endpoints
├── shared/                  # Shared types and schemas
└── ...
```

### Integrating with Real Contracts

To connect the dashboard to real Solana contracts:

1. Update the `nft-service.ts` file in `client/src/services/` with your contract addresses and ABIs
2. Replace the mock functions with real contract interactions
3. Implement the claim and unstake functionality in the dashboard components

Example integration:

```typescript
// Example contract integration (nft-service.ts)
export class NFTStakingService {
  // ... existing code

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
}
```

### Customization

- **Theme**: Modify the theme variables in `client/src/index.css`
- **UI Components**: Extend or customize components in the `client/src/components/ui` directory
- **API Endpoints**: Add new endpoints in `server/routes.ts`

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For questions or collaboration opportunities:
- Telegram: [@vicecode](https://t.me/vicecode)

## License

This project is open source and available under the [MIT License](LICENSE).

---

> "Built before the fork. Deployed after the hype." — 🐧
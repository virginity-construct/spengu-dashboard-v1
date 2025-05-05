import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export interface StakedNft {
  id: string;
  name: string;
  image?: string;
  dailyReward: number;
  stakedAt: Date;
}

export interface StakedToken {
  amount: number;
  lockPeriod: number; // in days
  apy: number;
  stakedAt: Date;
}

// Mock NFT data - this would be replaced with actual contract calls
const MOCK_NFTS: Record<string, StakedNft[]> = {
  // Sample wallet public key
  'default': [
    {
      id: 'nft1',
      name: 'SPENGU Arcade #123',
      image: 'https://arweave.net/wP9s7QHqjkyzwdCuVJx6gK0iIAoiVuDwXMFJF9BuKt4',
      dailyReward: 25,
      stakedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    },
    {
      id: 'nft2',
      name: 'SPENGU Society #456',
      image: 'https://arweave.net/qxH9zSQ6L7_1SQX0URxaJvUD8fLN83D7w2w3iITSnbs',
      dailyReward: 30,
      stakedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      id: 'nft3',
      name: 'SPENGU Arcade #789',
      image: 'https://arweave.net/j7CsjOkWIKT3yqlY4IfUSyyTmfTd5-6QUPa0pHFJt8s',
      dailyReward: 25,
      stakedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    }
  ]
};

// Mock Token data
const MOCK_TOKENS: Record<string, StakedToken[]> = {
  'default': [
    {
      amount: 5000,
      lockPeriod: 30,
      apy: 12,
      stakedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    }
  ]
};

// A service to fetch NFT staking data
export class NFTStakingService {
  private connection: Connection;
  
  constructor() {
    // Initialize connection to Solana
    this.connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
  }
  
  /**
   * Get staked NFTs for a wallet address
   * 
   * In a real implementation, this would query the staking contract
   * to find all staked NFTs for the given wallet address
   */
  async getStakedNFTs(walletAddress: string): Promise<StakedNft[]> {
    try {
      // In production, this would call the staking contract
      
      // For demonstration, we'll return mock data if we have it for this address
      // or the default dataset if we don't
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return MOCK_NFTS[walletAddress] || MOCK_NFTS['default'] || [];
    } catch (error) {
      console.error('Error fetching staked NFTs:', error);
      return [];
    }
  }
  
  /**
   * Get staked SPENGU tokens for a wallet address
   */
  async getStakedTokens(walletAddress: string): Promise<StakedToken[]> {
    try {
      // In production, this would call the staking contract
      
      // For demonstration, we'll return mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return MOCK_TOKENS[walletAddress] || MOCK_TOKENS['default'] || [];
    } catch (error) {
      console.error('Error fetching staked tokens:', error);
      return [];
    }
  }
  
  /**
   * Calculate total daily rewards from staked NFTs
   */
  calculateDailyRewards(nfts: StakedNft[]): number {
    return nfts.reduce((total, nft) => total + nft.dailyReward, 0);
  }
  
  /**
   * Calculate claimable rewards based on staking duration
   */
  calculateClaimableRewards(nfts: StakedNft[]): number {
    const now = new Date();
    
    return nfts.reduce((total, nft) => {
      const stakedDays = Math.floor((now.getTime() - nft.stakedAt.getTime()) / (24 * 60 * 60 * 1000));
      return total + (nft.dailyReward * stakedDays);
    }, 0);
  }
  
  /**
   * Calculate total value of staked tokens with interest
   */
  calculateStakedTokenValue(tokens: StakedToken[]): { 
    principal: number;
    interest: number;
    total: number;
  } {
    let principal = 0;
    let interest = 0;
    
    tokens.forEach(token => {
      principal += token.amount;
      
      // Calculate accrued interest based on APY and time staked
      const now = new Date();
      const daysPassed = Math.floor((now.getTime() - token.stakedAt.getTime()) / (24 * 60 * 60 * 1000));
      const yearFraction = daysPassed / 365;
      interest += token.amount * (token.apy / 100) * yearFraction;
    });
    
    return {
      principal,
      interest: Math.floor(interest),
      total: principal + Math.floor(interest)
    };
  }
}

// Create and export a singleton instance
export const nftStakingService = new NFTStakingService();
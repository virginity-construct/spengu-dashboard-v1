import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { nftStakingService, StakedNft, StakedToken } from '../services/nft-service';

export interface StakingStats {
  totalNftsStaked: number;
  totalTokensStaked: number;
  dailyYield: number;
  claimableRewards: number;
  tokenValue: {
    principal: number;
    interest: number;
    total: number;
  };
}

export function useStakingData() {
  const { publicKey, connected } = useWallet();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stakedNfts, setStakedNfts] = useState<StakedNft[]>([]);
  const [stakedTokens, setStakedTokens] = useState<StakedToken[]>([]);
  const [stats, setStats] = useState<StakingStats>({
    totalNftsStaked: 0,
    totalTokensStaked: 0,
    dailyYield: 0,
    claimableRewards: 0,
    tokenValue: {
      principal: 0,
      interest: 0,
      total: 0
    }
  });

  // Reset all data to initial state
  const resetData = useCallback(() => {
    setStakedNfts([]);
    setStakedTokens([]);
    setStats({
      totalNftsStaked: 0,
      totalTokensStaked: 0,
      dailyYield: 0,
      claimableRewards: 0,
      tokenValue: {
        principal: 0,
        interest: 0,
        total: 0
      }
    });
    setError(null);
  }, []);

  // Fetch data when wallet is connected
  useEffect(() => {
    // Safely check connected state
    const isConnected = Boolean(connected);
    const hasPublicKey = Boolean(publicKey);
    
    const fetchStakingData = async () => {
      if (!isConnected || !hasPublicKey) {
        // Reset data when wallet is disconnected
        resetData();
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        if (!nftStakingService) {
          throw new Error('NFT staking service not initialized');
        }
        
        // Safely check if the service methods exist
        if (typeof nftStakingService.getStakedNFTs !== 'function' || 
            typeof nftStakingService.getStakedTokens !== 'function') {
          throw new Error('NFT staking service methods not available');
        }
        
        // Fetch staked NFTs and tokens in parallel - verify publicKey exists
        if (!publicKey) {
          throw new Error('Public key is required');
        }
        
        // Safe cast since we've verified publicKey exists
        const walletAddress = publicKey as string;
        
        const [nfts, tokens] = await Promise.all([
          nftStakingService.getStakedNFTs(walletAddress),
          nftStakingService.getStakedTokens(walletAddress)
        ]);

        // Validate returned data
        const validNfts = Array.isArray(nfts) ? nfts : [];
        const validTokens = Array.isArray(tokens) ? tokens : [];

        setStakedNfts(validNfts);
        setStakedTokens(validTokens);
        
        // Calculate stats safely
        try {
          const dailyYield = nftStakingService.calculateDailyRewards(validNfts);
          const claimableRewards = nftStakingService.calculateClaimableRewards(validNfts);
          const tokenValue = nftStakingService.calculateStakedTokenValue(validTokens);
          
          setStats({
            totalNftsStaked: validNfts.length,
            totalTokensStaked: validTokens.reduce((sum, token) => sum + (token.amount || 0), 0),
            dailyYield,
            claimableRewards,
            tokenValue
          });
        } catch (statError) {
          console.error('Error calculating staking stats:', statError);
          setError('Error calculating staking stats');
        }
      } catch (error) {
        console.error('Error fetching staking data:', error);
        setError('Failed to fetch staking data');
        resetData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakingData();
  }, [publicKey, connected, resetData]);

  return {
    isLoading,
    error,
    stakedNfts: Array.isArray(stakedNfts) ? stakedNfts : [],
    stakedTokens: Array.isArray(stakedTokens) ? stakedTokens : [],
    stats
  };
}
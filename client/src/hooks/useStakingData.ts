import { useState, useEffect } from 'react';
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

  // Fetch data when wallet is connected
  useEffect(() => {
    const fetchStakingData = async () => {
      if (!connected || !publicKey) {
        // Reset data when wallet is disconnected
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
        return;
      }

      setIsLoading(true);
      
      try {
        // Fetch staked NFTs and tokens in parallel
        const [nfts, tokens] = await Promise.all([
          nftStakingService.getStakedNFTs(publicKey),
          nftStakingService.getStakedTokens(publicKey)
        ]);

        setStakedNfts(nfts);
        setStakedTokens(tokens);
        
        // Calculate stats
        const dailyYield = nftStakingService.calculateDailyRewards(nfts);
        const claimableRewards = nftStakingService.calculateClaimableRewards(nfts);
        const tokenValue = nftStakingService.calculateStakedTokenValue(tokens);
        
        setStats({
          totalNftsStaked: nfts.length,
          totalTokensStaked: tokens.reduce((sum, token) => sum + token.amount, 0),
          dailyYield,
          claimableRewards,
          tokenValue
        });
      } catch (error) {
        console.error('Error fetching staking data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakingData();
  }, [publicKey, connected]);

  return {
    isLoading,
    stakedNfts,
    stakedTokens,
    stats
  };
}
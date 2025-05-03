import { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

// Define the type for staked NFTs
export interface StakedNft {
  id: string;
  name: string;
  image?: string;
  dailyReward: number;
}

export function useWalletAdapter() {
  const { publicKey, connected } = useWallet();
  const { toast } = useToast();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);
  
  // Mock wallet data for the dashboard
  const [solBalance, setSolBalance] = useState<number>(0);
  const [spenguBalance, setSpenguBalance] = useState<number>(0);
  const [nftsStaked, setNftsStaked] = useState<number>(0);
  const [totalNfts, setTotalNfts] = useState<number>(0);
  const [spenguStaked, setSpenguStaked] = useState<number>(0);
  const [dailyYield, setDailyYield] = useState<number>(0);
  const [apr, setApr] = useState<number>(0);
  const [claimableRewards, setClaimableRewards] = useState<number>(0);
  const [stakedNfts, setStakedNfts] = useState<StakedNft[]>([]);
  
  // Fetch mock SOL balance when wallet is connected
  useEffect(() => {
    if (!publicKey || !connected) {
      setSolBalance(0);
      return;
    }
    
    // Set a mock SOL balance
    setSolBalance(3.52);
  }, [publicKey, connected]);
  
  // Load mock staking data when wallet is connected
  useEffect(() => {
    if (connected) {
      loadMockStakingData();
    } else {
      resetData();
    }
  }, [connected]);
  
  // Load mock staking data - in a real app, this would fetch from a contract
  const loadMockStakingData = () => {
    setIsLoadingData(true);
    
    // Simulate API delay
    setTimeout(() => {
      setSpenguBalance(14250);
      setNftsStaked(12);
      setTotalNfts(15);
      setSpenguStaked(4500);
      setDailyYield(37);
      setApr(8.2);
      setClaimableRewards(112);
      
      // Mock staked NFTs
      setStakedNfts([
        { id: '432', name: 'SPENGU #432', dailyReward: 3.5 },
        { id: '156', name: 'SPENGU #156', dailyReward: 3.2 },
        { id: '298', name: 'SPENGU #298', dailyReward: 2.8 },
        { id: '512', name: 'SPENGU #512', dailyReward: 3.1 }
      ]);
      
      setIsLoadingData(false);
    }, 1000);
  };
  
  // Reset data when wallet disconnects
  const resetData = () => {
    setSpenguBalance(0);
    setNftsStaked(0);
    setTotalNfts(0);
    setSpenguStaked(0);
    setDailyYield(0);
    setApr(0);
    setClaimableRewards(0);
    setStakedNfts([]);
  };
  
  // Refresh staking data
  const refreshData = () => {
    if (!connected) return;
    loadMockStakingData();
  };
  
  // Claim rewards - in a real app, this would call a contract method
  const claimRewards = async () => {
    if (!connected || claimableRewards <= 0) return;
    
    setIsClaimingRewards(true);
    
    // Simulate transaction delay
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Update balances
          setSpenguBalance(prev => prev + claimableRewards);
          setClaimableRewards(0);
          setIsClaimingRewards(false);
          resolve();
        } catch (error) {
          setIsClaimingRewards(false);
          reject(new Error('Failed to claim rewards'));
        }
      }, 2000);
    });
  };
  
  return {
    solBalance: solBalance.toFixed(2),
    spenguBalance,
    nftsStaked,
    totalNfts,
    spenguStaked,
    dailyYield,
    apr,
    claimableRewards,
    stakedNfts,
    isLoadingData,
    isClaimingRewards,
    refreshData,
    claimRewards
  };
}

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
    // Safely check connected state to avoid crashes
    const isConnected = Boolean(connected);
    const hasPublicKey = Boolean(publicKey);
    
    if (!hasPublicKey || !isConnected) {
      setSolBalance(0);
      return;
    }
    
    // Set a mock SOL balance
    setSolBalance(3.52);
  }, [publicKey, connected]);
  
  // Load mock staking data when wallet is connected
  useEffect(() => {
    // Safely check connected state
    const isConnected = Boolean(connected);
    
    if (isConnected) {
      try {
        loadMockStakingData();
      } catch (error) {
        console.error("Error loading staking data:", error);
        resetData();
      }
    } else {
      resetData();
    }
  }, [connected]);
  
  // Load mock staking data - in a real app, this would fetch from a contract
  const loadMockStakingData = () => {
    setIsLoadingData(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
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
      } catch (error) {
        console.error("Error setting mock staking data:", error);
      } finally {
        setIsLoadingData(false);
      }
    }, 1000);
  };
  
  // Reset data when wallet disconnects
  const resetData = () => {
    try {
      setSpenguBalance(0);
      setNftsStaked(0);
      setTotalNfts(0);
      setSpenguStaked(0);
      setDailyYield(0);
      setApr(0);
      setClaimableRewards(0);
      setStakedNfts([]);
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };
  
  // Refresh staking data
  const refreshData = () => {
    const isConnected = Boolean(connected);
    if (!isConnected) return;
    
    try {
      loadMockStakingData();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };
  
  // Claim rewards - in a real app, this would call a contract method
  const claimRewards = async () => {
    const isConnected = Boolean(connected);
    if (!isConnected || claimableRewards <= 0) return;
    
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
          console.error("Error claiming rewards:", error);
          setIsClaimingRewards(false);
          reject(new Error('Failed to claim rewards'));
        }
      }, 2000);
    });
  };
  
  // Return safe values regardless of connection state
  return {
    solBalance: typeof solBalance === 'number' ? solBalance.toFixed(2) : "0.00",
    spenguBalance: typeof spenguBalance === 'number' ? spenguBalance : 0,
    nftsStaked: typeof nftsStaked === 'number' ? nftsStaked : 0,
    totalNfts: typeof totalNfts === 'number' ? totalNfts : 0,
    spenguStaked: typeof spenguStaked === 'number' ? spenguStaked : 0,
    dailyYield: typeof dailyYield === 'number' ? dailyYield : 0,
    apr: typeof apr === 'number' ? apr : 0,
    claimableRewards: typeof claimableRewards === 'number' ? claimableRewards : 0,
    stakedNfts: Array.isArray(stakedNfts) ? stakedNfts : [],
    isLoadingData,
    isClaimingRewards,
    refreshData,
    claimRewards
  };
}

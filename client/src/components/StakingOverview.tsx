import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { RefreshCw, Image, Coins, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useStakingData } from '@/hooks/useStakingData';

export default function StakingOverview() {
  const { connected } = useWallet();
  const { toast } = useToast();
  const { stats, isLoading: isLoadingData } = useStakingData();
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);
  
  // Calculate the staking percentage
  const totalNfts = stats.totalNftsStaked + 5; // Assuming 5 more NFTs are available to stake
  const nftStakedPercentage = totalNfts > 0 ? (stats.totalNftsStaked / totalNfts) * 100 : 0;
  
  // Calculate APR
  const apr = stats.totalTokensStaked > 0 
    ? ((stats.dailyYield * 365) / stats.totalTokensStaked) * 100 
    : 0;
  
  const handleRefresh = () => {
    // In a real implementation, this would trigger a data refresh
    // For now, we'll just show a toast
    toast({
      title: "Refreshed data",
      description: "Staking data has been refreshed",
    });
  };
  
  const handleClaimRewards = async () => {
    if (isClaimingRewards || stats.claimableRewards <= 0) return;
    
    try {
      setIsClaimingRewards(true);
      
      // Simulate API call to claim rewards
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Coming Soon",
        description: "Reward claiming functionality will be available soon",
      });
    } catch (error) {
      toast({
        title: "Failed to claim rewards",
        description: (error as Error).message || "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsClaimingRewards(false);
    }
  };
  
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Your Staking Overview</h2>
        <button
          className="text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-primary))] transition-colors"
          title="Refresh data"
          onClick={handleRefresh}
          disabled={isLoadingData}
        >
          <RefreshCw className={`h-5 w-5 ${isLoadingData ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* NFTs Staked Card */}
        <Card className="card-glass rounded-xl p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-[hsl(var(--spengu-text-secondary))]">NFTs Staked</h3>
            <div className="p-1.5 bg-[hsl(var(--spengu-surface-light))]/50 rounded-lg">
              <Image className="h-5 w-5 text-[hsl(var(--spengu-secondary))]" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold">
              {isLoadingData ? <Loader2 className="h-6 w-6 animate-spin" /> : (connected ? stats.totalNftsStaked : '-')}
            </span>
            <span className="ml-2 text-xs text-[hsl(var(--spengu-text-secondary))]">
              {connected ? `/${totalNfts} total` : 'Connect wallet'}
            </span>
          </div>
          {connected && (
            <div className="mt-4">
              <Progress value={nftStakedPercentage} className="h-1.5 bg-[hsl(var(--spengu-surface-light))]/50" />
              <div className="flex justify-between mt-1.5">
                <span className="text-xs text-[hsl(var(--spengu-text-secondary))]">Staked</span>
                <span className="text-xs text-[hsl(var(--spengu-text-secondary))]">{nftStakedPercentage.toFixed(0)}%</span>
              </div>
            </div>
          )}
        </Card>

        {/* $SPENGU Staked Card */}
        <Card className="card-glass rounded-xl p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-[hsl(var(--spengu-text-secondary))]">$SPENGU Staked</h3>
            <div className="p-1.5 bg-[hsl(var(--spengu-surface-light))]/50 rounded-lg">
              <Coins className="h-5 w-5 text-[hsl(var(--spengu-primary))]" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold">
              {isLoadingData ? <Loader2 className="h-6 w-6 animate-spin" /> : (connected ? stats.totalTokensStaked.toLocaleString() : '-')}
            </span>
            <span className="ml-2 text-xs text-[hsl(var(--spengu-text-secondary))]">tokens</span>
          </div>
          {connected && stats.tokenValue.interest > 0 && (
            <div className="mt-2 flex items-center text-sm text-[hsl(var(--spengu-success))]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>+{stats.tokenValue.interest.toLocaleString()} interest</span>
            </div>
          )}
        </Card>

        {/* Estimated Daily Yield Card */}
        <Card className="card-glass rounded-xl p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-[hsl(var(--spengu-text-secondary))]">Daily Yield</h3>
            <div className="p-1.5 bg-[hsl(var(--spengu-surface-light))]/50 rounded-lg">
              <Clock className="h-5 w-5 text-[hsl(var(--spengu-warning))]" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold">
              {isLoadingData ? <Loader2 className="h-6 w-6 animate-spin" /> : (connected ? stats.dailyYield : '-')}
            </span>
            <span className="ml-2 text-xs text-[hsl(var(--spengu-text-secondary))]">SPENGU per day</span>
          </div>
          {connected && (
            <div className="mt-2 text-sm">
              <span className="text-[hsl(var(--spengu-text-secondary))]">APR:</span>
              <span className="ml-2 text-[hsl(var(--spengu-success))] font-medium">{apr.toFixed(2)}%</span>
            </div>
          )}
        </Card>

        {/* Claimable Rewards Card */}
        <Card className="card-glass rounded-xl p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-[hsl(var(--spengu-text-secondary))]">Claimable Rewards</h3>
            <div className="p-1.5 bg-[hsl(var(--spengu-surface-light))]/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-[hsl(var(--spengu-success))]" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold">
              {isLoadingData ? <Loader2 className="h-6 w-6 animate-spin" /> : (connected ? stats.claimableRewards : '-')}
            </span>
            <span className="ml-2 text-xs text-[hsl(var(--spengu-text-secondary))]">SPENGU</span>
          </div>
          {connected && (
            <div className="mt-4">
              <Button 
                onClick={handleClaimRewards}
                disabled={stats.claimableRewards <= 0 || isClaimingRewards}
                className="w-full py-2 bg-gradient-to-r from-[hsl(var(--spengu-primary))] to-[hsl(var(--spengu-secondary))] hover:from-[hsl(var(--spengu-primary-light))] hover:to-[hsl(var(--spengu-secondary))] text-white rounded-lg font-medium transition-colors"
              >
                {isClaimingRewards ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Claiming...
                  </span>
                ) : 'Claim Rewards'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}

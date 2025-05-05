import { useWallet } from '../contexts/WalletContext';
import { Card } from '@/components/ui/card';
import { Eye, CheckCircle, FilterX, ArrowDownUp, Loader2, Coins } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useStakingData } from '@/hooks/useStakingData';
import { StakedNft, StakedToken } from '@/services/nft-service';

type AssetType = 'all' | 'nfts' | 'tokens';

export default function StakedAssets() {
  const { connected } = useWallet();
  const { stakedNfts, stakedTokens, isLoading } = useStakingData();
  const [activeTab, setActiveTab] = useState<AssetType>('all');
  
  // Don't show assets section if wallet is not connected
  if (!connected) return null;
  
  // Filter assets based on active tab
  const filteredNfts = useMemo(() => {
    if (activeTab === 'all' || activeTab === 'nfts') return stakedNfts;
    return [];
  }, [activeTab, stakedNfts]);
  
  const filteredTokens = useMemo(() => {
    if (activeTab === 'all' || activeTab === 'tokens') return stakedTokens;
    return [];
  }, [activeTab, stakedTokens]);
  
  const hasStakedAssets = filteredNfts.length > 0 || filteredTokens.length > 0;
  
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Your Staked Assets</h2>
        <div className="flex items-center gap-2">
          <button className="text-sm text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-primary))] flex items-center gap-1 transition-colors">
            <FilterX className="h-4 w-4" />
            Filter
          </button>
          <span className="text-[hsl(var(--spengu-text-secondary))]">|</span>
          <button className="text-sm text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-primary))] flex items-center gap-1 transition-colors">
            <ArrowDownUp className="h-4 w-4" />
            Sort
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b border-[hsl(var(--spengu-surface-light))]">
        <div className="flex space-x-6">
          <button 
            className={`px-1 py-3 border-b-2 ${activeTab === 'all' ? 'border-[hsl(var(--spengu-primary))] text-[hsl(var(--spengu-text))]' : 'border-transparent text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-text))]'} font-medium`}
            onClick={() => setActiveTab('all')}
          >
            All Assets
          </button>
          <button 
            className={`px-1 py-3 border-b-2 ${activeTab === 'nfts' ? 'border-[hsl(var(--spengu-primary))] text-[hsl(var(--spengu-text))]' : 'border-transparent text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-text))]'} font-medium`}
            onClick={() => setActiveTab('nfts')}
          >
            NFTs
          </button>
          <button 
            className={`px-1 py-3 border-b-2 ${activeTab === 'tokens' ? 'border-[hsl(var(--spengu-primary))] text-[hsl(var(--spengu-text))]' : 'border-transparent text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-text))]'} font-medium`}
            onClick={() => setActiveTab('tokens')}
          >
            Tokens
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--spengu-primary))] mb-4" />
          <p className="text-[hsl(var(--spengu-text-secondary))]">Loading your staked assets...</p>
        </div>
      )}

      {/* Empty State - Show if no assets are staked */}
      {!isLoading && !hasStakedAssets && (
        <div className="text-center py-12 px-4 bg-[hsl(var(--spengu-surface))]/40 rounded-xl border border-dashed border-[hsl(var(--spengu-surface-light))]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[hsl(var(--spengu-text-secondary))]/70 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-medium mb-2">No staked assets yet</h3>
          <p className="text-[hsl(var(--spengu-text-secondary))] max-w-md mx-auto mb-4">
            Start staking your NFTs or tokens to earn rewards and see them displayed here.
          </p>
          <button className="px-4 py-2 bg-[hsl(var(--spengu-primary))] hover:bg-[hsl(var(--spengu-primary-light))] text-white rounded-lg font-medium transition-colors">
            View Staking Options
          </button>
        </div>
      )}

      {/* NFT Grid - Show if NFTs are staked */}
      {!isLoading && filteredNfts.length > 0 && (activeTab === 'all' || activeTab === 'nfts') && (
        <>
          {activeTab === 'all' && <h3 className="text-xl font-medium mb-4">Staked NFTs</h3>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {filteredNfts.map((nft) => (
              <Card key={nft.id} className="card-glass rounded-xl overflow-hidden group">
                <div className="relative aspect-square bg-[hsl(var(--spengu-surface-light))]/30">
                  {nft.image && (
                    <img 
                      src={nft.image} 
                      alt={nft.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--spengu-dark))]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex justify-between items-center">
                      <button 
                        className="text-white p-2 bg-[hsl(var(--spengu-primary))]/80 rounded-lg hover:bg-[hsl(var(--spengu-primary))] transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-white p-2 bg-[hsl(var(--spengu-error))]/80 rounded-lg hover:bg-[hsl(var(--spengu-error))] transition-colors"
                        title="Unstake (Coming Soon)"
                        disabled
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">{nft.name}</h4>
                    <span className="text-xs bg-[hsl(var(--spengu-surface-light))]/80 text-[hsl(var(--spengu-text-secondary))] px-2 py-0.5 rounded-full">
                      Staked
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[hsl(var(--spengu-text-secondary))]">Daily Reward:</span>
                    <span className="text-[hsl(var(--spengu-success))] font-medium">+{nft.dailyReward} SPENGU</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Token Staking - Show if tokens are staked */}
      {!isLoading && filteredTokens.length > 0 && (activeTab === 'all' || activeTab === 'tokens') && (
        <>
          {activeTab === 'all' && <h3 className="text-xl font-medium mb-4">Staked Tokens</h3>}
          <div className="space-y-4">
            {filteredTokens.map((token, index) => (
              <Card key={index} className="card-glass rounded-xl p-5">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[hsl(var(--spengu-primary))]/10 rounded-full">
                        <Coins className="h-5 w-5 text-[hsl(var(--spengu-primary))]" />
                      </div>
                      <div>
                        <h4 className="font-medium">SPENGU Tokens</h4>
                        <p className="text-sm text-[hsl(var(--spengu-text-secondary))]">
                          Staked on {new Date(token.stakedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div>
                        <p className="text-xs text-[hsl(var(--spengu-text-secondary))]">Amount</p>
                        <p className="font-medium">{token.amount.toLocaleString()} SPENGU</p>
                      </div>
                      <div>
                        <p className="text-xs text-[hsl(var(--spengu-text-secondary))]">Lock Period</p>
                        <p className="font-medium">{token.lockPeriod} days</p>
                      </div>
                      <div>
                        <p className="text-xs text-[hsl(var(--spengu-text-secondary))]">APY</p>
                        <p className="font-medium text-[hsl(var(--spengu-success))]">{token.apy}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center md:items-end gap-2">
                    <button 
                      className="px-4 py-2 text-sm bg-[hsl(var(--spengu-surface-light))] hover:bg-[hsl(var(--spengu-surface-light))]/80 rounded-lg w-full md:w-auto text-center"
                      disabled
                    >
                      Coming Soon: Unstake
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

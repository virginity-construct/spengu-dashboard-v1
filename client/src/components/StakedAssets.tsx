import { useWallet } from '../contexts/WalletContext';
import { Card } from '@/components/ui/card';
import { Eye, CheckCircle, FilterX, ArrowDownUp } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useWalletAdapter } from '@/hooks/useWalletAdapter';

type AssetType = 'all' | 'nfts' | 'tokens';

export default function StakedAssets() {
  const { connected } = useWallet();
  const { stakedNfts } = useWalletAdapter();
  const [activeTab, setActiveTab] = useState<AssetType>('all');
  
  // Don't show assets section if wallet is not connected
  if (!connected) return null;
  
  // Filter assets based on active tab
  const filteredAssets = useMemo(() => {
    if (activeTab === 'all') return stakedNfts;
    if (activeTab === 'nfts') return stakedNfts;
    return [];
  }, [activeTab, stakedNfts]);
  
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

      {/* Empty State - Show if no assets are staked */}
      {filteredAssets.length === 0 && (
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

      {/* Asset Grid - Show if assets are staked */}
      {filteredAssets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((nft) => (
            <Card key={nft.id} className="card-glass rounded-xl overflow-hidden group">
              <div className="relative aspect-square bg-[hsl(var(--spengu-surface-light))]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--spengu-dark))]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex justify-between items-center">
                    <button className="text-white p-2 bg-[hsl(var(--spengu-primary))]/80 rounded-lg hover:bg-[hsl(var(--spengu-primary))] transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-white p-2 bg-[hsl(var(--spengu-error))]/80 rounded-lg hover:bg-[hsl(var(--spengu-error))] transition-colors">
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
      )}
    </section>
  );
}

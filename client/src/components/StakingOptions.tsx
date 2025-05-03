import { useWallet } from '../contexts/WalletContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, ImageIcon } from 'lucide-react';

export default function StakingOptions() {
  const { connected } = useWallet();
  
  // Don't show staking options if wallet is not connected
  if (!connected) return null;
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Staking Options</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NFT Staking Option */}
        <Card className="card-glass rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-spengu-primary to-spengu-secondary rounded-lg">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">NFT Staking</h3>
            </div>
            
            <p className="text-spengu-text-secondary mb-5">
              Stake your SPENGU NFTs to earn daily token rewards. Higher rarity NFTs earn better rewards.
            </p>
            
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-spengu-text-secondary">Base Rewards</span>
                <span>3.0 SPENGU daily</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-spengu-text-secondary">Lockup Period</span>
                <span>None</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-spengu-text-secondary">Boost Available</span>
                <span className="text-spengu-success">Yes</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-spengu-primary hover:bg-spengu-primary-light">
                Stake NFTs
              </Button>
              <Button variant="outline" className="flex-1 border-spengu-surface-light hover:bg-spengu-surface text-spengu-text-secondary">
                Learn More
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Token Staking Option */}
        <Card className="card-glass rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-spengu-secondary to-spengu-primary rounded-lg">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Token Staking</h3>
            </div>
            
            <p className="text-spengu-text-secondary mb-5">
              Stake your $SPENGU tokens to earn interest and participate in governance. Choose from multiple lock periods.
            </p>
            
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-spengu-text-secondary">APR</span>
                <span>5.2% - 8.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-spengu-text-secondary">Lock Periods</span>
                <span>30d / 60d / 90d</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-spengu-text-secondary">Early Unstake</span>
                <span className="text-spengu-error">5% penalty</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-spengu-primary hover:bg-spengu-primary-light">
                Stake Tokens
              </Button>
              <Button variant="outline" className="flex-1 border-spengu-surface-light hover:bg-spengu-surface text-spengu-text-secondary">
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
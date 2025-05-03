import { useWallet } from '../contexts/WalletContext';
import { Button } from '@/components/ui/button';

export default function WelcomeMessage() {
  const { connected, connect } = useWallet();
  
  // Don't show welcome message if wallet is already connected
  if (connected) return null;
  
  return (
    <div className="mb-12 py-16 px-6 text-center rounded-xl bg-gradient-to-r from-spengu-dark to-spengu-surface border border-spengu-surface-light">
      <h2 className="text-3xl font-bold mb-4 text-gradient">Welcome to SPENGU Staking</h2>
      <p className="max-w-2xl mx-auto mb-8 text-spengu-text-secondary text-lg">
        Connect your wallet to view your staked assets, check rewards, and manage your $SPENGU tokens and NFTs.
      </p>
      <Button 
        onClick={connect}
        className="px-8 py-6 text-lg bg-gradient-to-r from-spengu-primary to-spengu-secondary hover:opacity-90 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        Connect Wallet
      </Button>
      <div className="mt-8 flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center max-w-[180px]">
          <div className="w-12 h-12 mb-3 rounded-full bg-spengu-primary/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-spengu-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">Earn Rewards</h3>
          <p className="text-xs text-spengu-text-secondary text-center">
            Stake your assets to earn daily rewards in $SPENGU tokens
          </p>
        </div>
        
        <div className="flex flex-col items-center max-w-[180px]">
          <div className="w-12 h-12 mb-3 rounded-full bg-spengu-secondary/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-spengu-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">Secure Staking</h3>
          <p className="text-xs text-spengu-text-secondary text-center">
            Your assets remain secure while staked on the Solana blockchain
          </p>
        </div>
        
        <div className="flex flex-col items-center max-w-[180px]">
          <div className="w-12 h-12 mb-3 rounded-full bg-spengu-success/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-spengu-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">Flexible Options</h3>
          <p className="text-xs text-spengu-text-secondary text-center">
            Choose from multiple staking options with different reward rates
          </p>
        </div>
      </div>
    </div>
  );
}
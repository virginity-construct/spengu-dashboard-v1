import { useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import Header from '@/components/Header';
import WalletStatusBar from '@/components/WalletStatusBar';
import WelcomeMessage from '@/components/WelcomeMessage';
import StakingOverview from '@/components/StakingOverview';
import StakingOptions from '@/components/StakingOptions';
import StakedAssets from '@/components/StakedAssets';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const { connected } = useWallet();

  // Set document title
  useEffect(() => {
    document.title = 'SPENGU Staking Dashboard';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-16 flex-grow">
        {connected ? <WalletStatusBar /> : <WelcomeMessage />}
        
        {/* Always show staking overview - it will handle displaying appropriate state */}
        <StakingOverview />
        
        {/* Show staking options and assets if connected */}
        <StakingOptions />
        <StakedAssets />
      </main>
      
      <Footer />
    </div>
  );
}

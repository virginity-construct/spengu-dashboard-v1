import { WalletMultiButton } from '@/components/ui/wallet-button';
import SpinguLogo from './SpinguLogo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-spengu-dark/80 border-b border-spengu-surface-light shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <SpinguLogo className="mr-3" />
          <h1 className="text-xl font-bold text-gradient">
            SPENGU
          </h1>
          <div className="hidden sm:block border-l border-spengu-surface-light mx-3 h-6"></div>
          <span className="hidden sm:inline-block text-spengu-text-secondary font-medium">
            Staking Dashboard
          </span>
        </div>
        
        {/* Wallet Connection Button */}
        <div className="w-full sm:w-auto">
          <WalletMultiButton className="w-full sm:w-auto" />
        </div>
      </div>
    </header>
  );
}

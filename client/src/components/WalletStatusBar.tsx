import { useWallet } from '../contexts/WalletContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useWalletAdapter } from '@/hooks/useWalletAdapter';
import { ClipboardCopy, LogOut } from 'lucide-react';

export default function WalletStatusBar() {
  const { publicKey, disconnect } = useWallet();
  const { solBalance, spenguBalance } = useWalletAdapter();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  
  const walletAddress = publicKey || '';
  
  // Shorten the address for display
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  // Copy wallet address to clipboard
  const copyAddress = async () => {
    if (!publicKey) return;
    
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };
  
  // Handle disconnect
  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };
  
  return (
    <div className="mb-8">
      <div className="bg-[hsl(var(--spengu-surface))]/50 rounded-lg p-4 backdrop-blur-sm border border-[hsl(var(--spengu-surface-light))]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--spengu-success))] animate-pulse"></div>
              <span className="text-sm font-medium">Connected to Solana Devnet</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-[hsl(var(--spengu-text-secondary))] font-mono truncate-address">
                {walletAddress}
              </span>
              <button 
                className={`ml-2 p-1 transition-colors ${isCopied ? 'text-[hsl(var(--spengu-success))]' : 'text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-primary))]'}`} 
                title="Copy address"
                onClick={copyAddress}
              >
                <ClipboardCopy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-[hsl(var(--spengu-text-secondary))]">Balance</span>
              <span className="font-medium">{solBalance} SOL</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-[hsl(var(--spengu-text-secondary))]">$SPENGU</span>
              <span className="font-medium">{spenguBalance.toLocaleString()}</span>
            </div>
            <button 
              className="p-2 text-[hsl(var(--spengu-text-secondary))] hover:text-[hsl(var(--spengu-error))] transition-colors rounded" 
              title="Disconnect"
              onClick={handleDisconnect}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

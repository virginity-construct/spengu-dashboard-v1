import { useWallet } from '../../contexts/WalletContext';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type WalletMultiButtonProps = {
  className?: string;
};

export function WalletMultiButton({ className }: WalletMultiButtonProps) {
  const { connected, connect, disconnect, publicKey, walletName, isLoading } = useWallet();
  
  // Format public key for display (first 4 chars + ... + last 4 chars)
  const formatPublicKey = (key: string) => {
    if (!key) return '';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  // Handle button click
  const handleWalletAction = () => {
    if (isLoading) return; // Prevent actions while loading
    connected ? disconnect() : connect();
  };

  return (
    <button
      onClick={handleWalletAction}
      disabled={isLoading}
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
        connected 
          ? "bg-spengu-surface hover:bg-spengu-surface-light text-spengu-text" 
          : "bg-spengu-primary hover:bg-spengu-primary-light text-white",
        isLoading && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{connected ? "Disconnecting..." : "Connecting..."}</span>
        </>
      ) : connected ? (
        <>
          <WalletIcon />
          <span>{walletName}: {formatPublicKey(publicKey || '')}</span>
        </>
      ) : (
        <>
          <WalletIcon />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
}

function WalletIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}
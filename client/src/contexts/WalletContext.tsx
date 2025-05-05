import { FC, ReactNode, createContext, useState, useContext, useCallback, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Add Phantom wallet type to window
declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
        connect: () => Promise<{ publicKey: PublicKey }>;
        disconnect: () => Promise<void>;
        on: (event: string, callback: () => void) => void;
        off: (event: string, callback: () => void) => void;
      };
    };
  }
}

// Create context type
type WalletContextType = {
  connected: boolean;
  publicKey: string | null;
  connect: () => void;
  disconnect: () => void;
  walletName: string | null;
  solBalance: number;
  isLoading: boolean;
};

// Create default values
const defaultContext: WalletContextType = {
  connected: false,
  publicKey: null,
  connect: () => {},
  disconnect: () => {},
  walletName: null,
  solBalance: 0,
  isLoading: false
};

// Create context
const WalletContext = createContext<WalletContextType>(defaultContext);

// Hook to use wallet context
export const useWallet = () => useContext(WalletContext);

interface WalletConnectionProviderProps {
  children: ReactNode;
}

export const WalletConnectionProvider: FC<WalletConnectionProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Create a Solana connection instance
  const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  // Fetch wallet balance
  const fetchBalance = useCallback(async (pubKey: string) => {
    if (!pubKey) return;
    
    try {
      setIsLoading(true);
      const balance = await connection.getBalance(new PublicKey(pubKey));
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      setSolBalance(balance / 1_000_000_000);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

  // Connect to Phantom wallet
  const connect = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Check if Phantom is installed
      const phantom = window.phantom?.solana;
      
      if (!phantom) {
        alert('Phantom wallet is not installed. Please install it from https://phantom.app/');
        setIsLoading(false);
        return;
      }
      
      if (!phantom.isPhantom) {
        alert('Phantom wallet is not detected. Please install it from https://phantom.app/');
        setIsLoading(false);
        return;
      }
      
      // Connect to wallet
      const { publicKey } = await phantom.connect();
      const publicKeyString = publicKey.toString();
      
      setPublicKey(publicKeyString);
      setConnected(true);
      setWalletName('Phantom');
      
      // Fetch balance
      await fetchBalance(publicKeyString);
      
      // Store connection info
      sessionStorage.setItem('walletConnected', 'true');
      sessionStorage.setItem('walletPublicKey', publicKeyString);
      
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
      alert('Failed to connect to wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchBalance]);

  // Disconnect from wallet
  const disconnect = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const phantom = window.phantom?.solana;
      
      if (phantom) {
        await phantom.disconnect();
      }
      
      setPublicKey(null);
      setConnected(false);
      setWalletName(null);
      setSolBalance(0);
      
      // Clear session storage
      sessionStorage.removeItem('walletConnected');
      sessionStorage.removeItem('walletPublicKey');
      
    } catch (error) {
      console.error('Error disconnecting from wallet:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check for existing connection
  useEffect(() => {
    const checkExistingConnection = async () => {
      const isConnected = sessionStorage.getItem('walletConnected') === 'true';
      const storedPublicKey = sessionStorage.getItem('walletPublicKey');
      
      if (isConnected && storedPublicKey) {
        setPublicKey(storedPublicKey);
        setConnected(true);
        setWalletName('Phantom');
        
        // Fetch balance for stored wallet
        await fetchBalance(storedPublicKey);
      }
    };
    
    checkExistingConnection();
  }, [fetchBalance]);

  // Update balance whenever connection status changes
  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance(publicKey);
    }
  }, [connected, publicKey, fetchBalance]);

  return (
    <WalletContext.Provider value={{
      connected,
      publicKey,
      connect,
      disconnect,
      walletName,
      solBalance,
      isLoading
    }}>
      {children}
    </WalletContext.Provider>
  );
};

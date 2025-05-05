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
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  // Create a Solana connection instance with error handling
  let connection: Connection;
  try {
    connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
  } catch (error) {
    console.error("Error creating Solana connection:", error);
    connection = {} as Connection; // Fallback to avoid crashes
  }

  // Fetch wallet balance
  const fetchBalance = useCallback(async (pubKey: string) => {
    if (!pubKey) return;
    
    try {
      setIsLoading(true);
      setConnectionError(null);
      
      // Validate connection is properly initialized
      if (!connection || !connection.getBalance) {
        console.error("Connection not properly initialized");
        setConnectionError("Connection error");
        return;
      }
      
      // Create PublicKey safely
      let publicKeyObj: PublicKey;
      try {
        publicKeyObj = new PublicKey(pubKey);
      } catch (error) {
        console.error("Invalid public key:", error);
        setConnectionError("Invalid wallet address");
        return;
      }
      
      const balance = await connection.getBalance(publicKeyObj);
      
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      setSolBalance(balance / 1_000_000_000);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setConnectionError("Failed to fetch balance");
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

  // Connect to Phantom wallet
  const connect = useCallback(async () => {
    setIsLoading(true);
    setConnectionError(null);
    
    try {
      // Check if Phantom is installed
      const phantom = window.phantom?.solana;
      
      if (!phantom) {
        const errMsg = 'Phantom wallet is not installed. Please install it from https://phantom.app/';
        setConnectionError(errMsg);
        alert(errMsg);
        return;
      }
      
      if (!phantom.isPhantom) {
        const errMsg = 'Phantom wallet is not detected. Please install it from https://phantom.app/';
        setConnectionError(errMsg);
        alert(errMsg);
        return;
      }
      
      // Connect to wallet
      const response = await phantom.connect();
      
      // Safely access the publicKey
      if (!response || !response.publicKey) {
        throw new Error("Failed to connect: No public key returned");
      }
      
      const publicKeyString = response.publicKey.toString();
      
      // Validate public key format
      if (!publicKeyString || publicKeyString.length < 30) {
        throw new Error("Invalid public key format");
      }
      
      setPublicKey(publicKeyString);
      setConnected(true);
      setWalletName('Phantom');
      
      // Fetch balance
      await fetchBalance(publicKeyString);
      
      // Store connection info
      try {
        sessionStorage.setItem('walletConnected', 'true');
        sessionStorage.setItem('walletPublicKey', publicKeyString);
      } catch (storageError) {
        console.error("Could not store wallet info in session storage:", storageError);
        // Continue anyway, it's not critical
      }
      
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
      setConnectionError("Failed to connect to wallet");
      alert('Failed to connect to wallet. Please try again.');
      
      // Reset the connection state to ensure UI is consistent
      setConnected(false);
      setPublicKey(null);
      setWalletName(null);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBalance]);

  // Disconnect from wallet
  const disconnect = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const phantom = window.phantom?.solana;
      
      if (phantom && typeof phantom.disconnect === 'function') {
        await phantom.disconnect();
      }
      
      // Clear all connection state
      setPublicKey(null);
      setConnected(false);
      setWalletName(null);
      setSolBalance(0);
      setConnectionError(null);
      
      // Clear session storage
      try {
        sessionStorage.removeItem('walletConnected');
        sessionStorage.removeItem('walletPublicKey');
      } catch (storageError) {
        console.error("Error clearing session storage:", storageError);
      }
      
    } catch (error) {
      console.error('Error disconnecting from wallet:', error);
      // Even if there's an error, attempt to reset the UI state
      setPublicKey(null);
      setConnected(false);
      setWalletName(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check for existing connection
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const isConnected = sessionStorage.getItem('walletConnected') === 'true';
        const storedPublicKey = sessionStorage.getItem('walletPublicKey');
        
        if (isConnected && storedPublicKey) {
          setPublicKey(storedPublicKey);
          setConnected(true);
          setWalletName('Phantom');
          
          // Fetch balance for stored wallet
          await fetchBalance(storedPublicKey);
        }
      } catch (error) {
        console.error("Error checking existing connection:", error);
        // On error, reset to disconnected state
        setPublicKey(null);
        setConnected(false);
        setWalletName(null);
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

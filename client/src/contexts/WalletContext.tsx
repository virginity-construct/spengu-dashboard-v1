import { FC, ReactNode, createContext, useState, useContext, useCallback } from 'react';

// Create context type
type WalletContextType = {
  connected: boolean;
  publicKey: string | null;
  connect: () => void;
  disconnect: () => void;
  walletName: string | null;
};

// Create default values
const defaultContext: WalletContextType = {
  connected: false,
  publicKey: null,
  connect: () => {},
  disconnect: () => {},
  walletName: null
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

  // Generate a random public key for demonstration
  const generateMockPublicKey = useCallback(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 44; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }, []);

  // Mock connect wallet
  const connect = useCallback(() => {
    const publicKey = generateMockPublicKey();
    setPublicKey(publicKey);
    setConnected(true);
    setWalletName('Phantom');
  }, [generateMockPublicKey]);

  // Mock disconnect wallet
  const disconnect = useCallback(() => {
    setPublicKey(null);
    setConnected(false);
    setWalletName(null);
  }, []);

  return (
    <WalletContext.Provider value={{
      connected,
      publicKey,
      connect,
      disconnect,
      walletName
    }}>
      {children}
    </WalletContext.Provider>
  );
};

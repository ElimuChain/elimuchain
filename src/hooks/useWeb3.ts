import { useState, useEffect } from 'react';
import { web3Service } from '../utils/web3';

export function useWeb3() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWeb3Available] = useState(() => web3Service.isWeb3Available());

  const connect = async () => {
    if (!isWeb3Available) {
      setError("MetaMask is required for this operation");
      return;
    }

    setIsConnecting(true);
    setError(null);
    try {
      const connected = await web3Service.connect();
      setIsConnected(connected);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    web3Service,
    isWeb3Available
  };
}
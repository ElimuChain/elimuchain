import React, { useEffect, useState } from 'react';
import { Wallet, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { web3Service } from '../lib/web3';

const WalletConnect: React.FC = () => {
  const { user, connect, disconnect } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string>('');

  useEffect(() => {
    const handleNetworkChange = (chainId: string) => {
      const networks: { [key: string]: string } = {
        '0x1': 'Ethereum Mainnet',
        '0x3': 'Ropsten',
        '0x4': 'Rinkeby',
        '0x5': 'Goerli',
        '0x2a': 'Kovan'
      };
      setNetworkName(networks[chainId] || 'Unknown Network');
    };

    const cleanup = web3Service.onNetworkChange(handleNetworkChange);
    return () => {
      cleanup();
    };
  }, []);

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);
      await connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      setError(null);
      await disconnect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect wallet');
    } finally {
      setLoading(false);
    }
  };

  const openEtherscan = () => {
    if (user?.address) {
      window.open(`https://etherscan.io/address/${user.address}`, '_blank');
    }
  };

  if (user?.address) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-lg">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">
              {user.address.slice(0, 6)}...{user.address.slice(-4)}
            </span>
          </div>
          <button
            onClick={openEtherscan}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="View on Etherscan"
          >
            <ExternalLink className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        {networkName && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Connected to: {networkName}
          </div>
        )}
        <button
          onClick={handleDisconnect}
          disabled={loading}
          className="w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Disconnect'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <button
        onClick={handleConnect}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <Wallet className="h-5 w-5" />
        )}
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletConnect;
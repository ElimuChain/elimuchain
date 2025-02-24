import { useWeb3 } from "../hooks/useWeb3";
import { Wallet, Download } from "lucide-react";

export default function ConnectWallet() {
  const { isConnected, isConnecting, error, connect, isWeb3Available } =
    useWeb3();

  if (!isWeb3Available) {
    return (
      <a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
          bg-gradient-to-r from-orange-500/80 to-orange-600/80 text-white hover:from-orange-600/80 hover:to-orange-700/80"
      >
        <Download className="w-5 h-5" />
        <span>Get MetaMask</span>
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={connect}
        disabled={isConnecting || isConnected}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isConnected
            ? "bg-green-600/80 text-white"
            : "bg-blue-600/80 hover:bg-blue-700/80 text-white"
        }`}
      >
        <Wallet className="w-5 h-5" />
        <span>
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "Connected"
            : "Connect Wallet"}
        </span>
      </button>
      {error && (
        <div className="absolute top-full mt-2 w-full p-2 bg-red-500/80 text-white text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
}

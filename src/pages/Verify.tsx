import React, { useState } from 'react';
import { Search, FileCheck, AlertCircle, Download } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

export default function Verify() {
  const { isWeb3Available, isConnected } = useWeb3();
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setVerificationStatus('loading');
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus(Math.random() > 0.5 ? 'success' : 'error');
    }, 2000);
  };

  if (!isWeb3Available) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">MetaMask Required</h2>
            <p className="text-gray-300 mb-6">
              To verify credentials, you need to have MetaMask installed. MetaMask allows secure interaction with the blockchain.
            </p>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500/80 text-white rounded-lg font-semibold
                hover:bg-orange-600/80 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Install MetaMask</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              Please connect your wallet using the button in the navigation bar to verify credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Verify Academic Credentials</h1>
          <p className="text-gray-300">Enter the credential ID or scan QR code to verify authenticity</p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 mb-8">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Credential ID"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600/80 text-white rounded-lg font-semibold
                hover:bg-blue-700/80 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Verify Credential</span>
            </button>
          </form>
        </div>

        {verificationStatus !== 'idle' && (
          <div className={`backdrop-blur-lg rounded-3xl p-8 border transition-all duration-300 ${
            verificationStatus === 'loading'
              ? 'bg-white/10 border-white/20'
              : verificationStatus === 'success'
              ? 'bg-green-500/10 border-green-500/20'
              : 'bg-red-500/10 border-red-500/20'
          }`}>
            <div className="flex items-center space-x-4">
              {verificationStatus === 'loading' ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : verificationStatus === 'success' ? (
                <FileCheck className="w-8 h-8 text-green-500" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-500" />
              )}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {verificationStatus === 'loading'
                    ? 'Verifying Credential...'
                    : verificationStatus === 'success'
                    ? 'Credential Verified'
                    : 'Verification Failed'}
                </h3>
                <p className="text-gray-300">
                  {verificationStatus === 'loading'
                    ? 'Please wait while we verify the credential on the blockchain...'
                    : verificationStatus === 'success'
                    ? 'This credential has been verified and is authentic.'
                    : 'Unable to verify this credential. Please check the ID and try again.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
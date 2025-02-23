import React, { useState } from 'react';
import { Upload, Plus, X, Check, Download } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

export default function Issue() {
  const { isWeb3Available, isConnected } = useWeb3();
  const [files, setFiles] = useState<File[]>([]);
  const [issuingStatus, setIssuingStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIssuingStatus('processing');
    // Simulate processing
    setTimeout(() => setIssuingStatus('success'), 3000);
  };

  if (!isWeb3Available) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">MetaMask Required</h2>
            <p className="text-gray-300 mb-6">
              To issue credentials, you need to have MetaMask installed. MetaMask allows secure interaction with the blockchain.
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
              Please connect your wallet using the button in the navigation bar to issue credentials.
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
          <h1 className="text-4xl font-bold text-white mb-4">Issue Academic Credentials</h1>
          <p className="text-gray-300">Create and issue blockchain-verified academic credentials</p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white">Institution Details</label>
              <input
                type="text"
                placeholder="Institution Name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-white">Credential Information</label>
              <input
                type="text"
                placeholder="Credential Title"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Credential Description"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-white">Upload Documents</label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-gray-300">Drop files here or click to upload</span>
                </label>
              </div>
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                    >
                      <span className="text-gray-300">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={issuingStatus !== 'idle'}
              className={`w-full px-6 py-3 bg-blue-600/80 text-white rounded-lg font-semibold
                transition-all duration-300 flex items-center justify-center space-x-2
                ${issuingStatus !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700/80'}`}
            >
              {issuingStatus === 'idle' && (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Issue Credential</span>
                </>
              )}
              {issuingStatus === 'processing' && (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              )}
              {issuingStatus === 'success' && (
                <>
                  <Check className="w-5 h-5" />
                  <span>Credential Issued!</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
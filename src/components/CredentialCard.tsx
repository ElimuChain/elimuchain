import React, { useState } from 'react';
import { Shield, ExternalLink, Download, CheckCircle, Clock, AlertTriangle, Eye, Share2, Lock } from 'lucide-react';

interface CredentialProps {
  id: string;
  title: string;
  description: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  txHash?: string;
  status: 'verified' | 'pending' | 'unverified' | 'revoked';
  category?: string;
  onView?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onVerify?: () => void;
}

const CredentialCard: React.FC<CredentialProps> = ({
  title,
  description,
  issuer,
  recipient,
  issueDate,
  txHash,
  status,
  category,
  onView,
  onShare,
  onDownload,
  onVerify
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    verified: {
      color: 'bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400',
      icon: CheckCircle,
      label: 'Verified',
      gradient: 'from-green-500/20 to-green-500/5'
    },
    pending: {
      color: 'bg-yellow-50 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400',
      icon: Clock,
      label: 'Pending',
      gradient: 'from-yellow-500/20 to-yellow-500/5'
    },
    unverified: {
      color: 'bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400',
      icon: Shield,
      label: 'Unverified',
      gradient: 'from-gray-500/20 to-gray-500/5'
    },
    revoked: {
      color: 'bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400',
      icon: AlertTriangle,
      label: 'Revoked',
      gradient: 'from-red-500/20 to-red-500/5'
    }
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <div 
      className="relative group transform transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig[status].gradient} dark:opacity-75 backdrop-blur-sm rounded-xl transition-all duration-300 group-hover:backdrop-blur-md`} />
      
      <div className="relative p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        {txHash && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-sm">
            <Shield className="h-4 w-4" />
            <span>Blockchain Verified</span>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {description}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">Issuer</p>
              <p className="truncate">{issuer}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">Recipient</p>
              <p className="truncate">{recipient}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">Issue Date</p>
              <p>{new Date(issueDate).toLocaleDateString()}</p>
            </div>
            {category && (
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Category</p>
                <p className="truncate">{category}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig[status].color} backdrop-blur-sm`}>
            <StatusIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{statusConfig[status].label}</span>
          </div>

          <div className="flex gap-2">
            {onView && (
              <button
                onClick={onView}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors tooltip-trigger"
                title="View Details"
              >
                <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            )}
            {onShare && (
              <button
                onClick={onShare}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors tooltip-trigger"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            )}
            {onDownload && (
              <button
                onClick={onDownload}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors tooltip-trigger"
                title="Download"
              >
                <Download className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            )}
            {status === 'unverified' && onVerify && (
              <button
                onClick={onVerify}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Verify Now
              </button>
            )}
          </div>
        </div>

        {txHash && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <a
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all flex items-center gap-2"
            >
              <span>View on Etherscan</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
};

export default CredentialCard;
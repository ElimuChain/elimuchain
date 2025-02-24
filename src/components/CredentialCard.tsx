import React from 'react';
import { Shield, Calendar, User, Link as LinkIcon } from 'lucide-react';

interface CredentialCardProps {
  id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  status: 'valid' | 'pending' | 'revoked';
  metadataURI?: string;
}

export default function CredentialCard({ id, title, issuer, issueDate, status, metadataURI }: CredentialCardProps) {
  const statusColors = {
    valid: 'bg-green-500/20 text-green-400 border-green-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    revoked: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">ID: {id.substring(0, 8)}...</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-300">
          <User className="w-4 h-4 mr-2" />
          <span>Issued by: {issuer}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Issue Date: {issueDate.toLocaleDateString()}</span>
        </div>
        {metadataURI && (
          <div className="flex items-center text-gray-300">
            <LinkIcon className="w-4 h-4 mr-2" />
            <a href={metadataURI} target="_blank" rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-colors">
              View Metadata
            </a>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center text-gray-300">
          <Shield className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-sm">Blockchain Verified</span>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import ConnectWallet from './ConnectWallet';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">ElimuChain</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              <NavLink to="/" active={isActive('/')}>Home</NavLink>
              <NavLink to="/verify" active={isActive('/verify')}>Verify</NavLink>
              <NavLink to="/issue" active={isActive('/issue')}>Issue</NavLink>
              <NavLink to="/about" active={isActive('/about')}>About</NavLink>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        active
          ? 'bg-white/20 text-white'
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}
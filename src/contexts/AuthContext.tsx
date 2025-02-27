import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { web3Service } from '../lib/web3';
import LoadingSpinner from '../components/LoadingSpinner';

interface User {
  address: string;
  type: 'institution' | 'student' | 'employer' | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  setUserType: (type: 'institution' | 'student' | 'employer') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const isConnected = await web3Service.isConnected();
      if (isConnected) {
        const address = await web3Service.connect();
        // Get user type from local storage
        const userType = localStorage.getItem(`userType_${address}`);
        setUser({
          address,
          type: userType as User['type']
        });
      }
    } catch (error) {
      console.error('Connection check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const connect = async () => {
    try {
      setLoading(true);
      const address = await web3Service.connect();
      const userType = localStorage.getItem(`userType_${address}`);
      setUser({
        address,
        type: userType as User['type']
      });

      if (!userType) {
        navigate('/get-started');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Connection failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      setLoading(true);
      await web3Service.disconnect();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Disconnect failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setUserType = async (type: 'institution' | 'student' | 'employer') => {
    if (!user?.address) throw new Error('No wallet connected');
    
    try {
      setLoading(true);
      // Store user type in local storage
      localStorage.setItem(`userType_${user.address}`, type);
      setUser(prev => prev ? { ...prev, type } : null);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to set user type:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, connect, disconnect, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
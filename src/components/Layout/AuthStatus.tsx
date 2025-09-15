import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import apiService from '../../services/api';

const AuthStatus: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'not-authenticated'>('checking');
  const [debugInfo, setDebugInfo] = useState<string>('');

  const checkAuth = async () => {
    try {
      setAuthStatus('checking');
      setDebugInfo('Checking authentication...');
      
      const isAuthenticated = await apiService.checkAuth();
      
      if (isAuthenticated) {
        setAuthStatus('authenticated');
        setDebugInfo('✅ Authenticated - API calls should work');
      } else {
        setAuthStatus('not-authenticated');
        setDebugInfo('❌ Not authenticated - Need to login with Google');
      }
    } catch (error) {
      setAuthStatus('not-authenticated');
      setDebugInfo(`❌ Auth check failed: ${error}`);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const getStatusIcon = () => {
    switch (authStatus) {
      case 'checking':
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'authenticated':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'not-authenticated':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (authStatus) {
      case 'checking':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'authenticated':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'not-authenticated':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className={`fixed top-4 left-4 z-50 p-4 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <div>
          <p className="font-medium">
            {authStatus === 'checking' && 'Checking Authentication...'}
            {authStatus === 'authenticated' && 'Authenticated'}
            {authStatus === 'not-authenticated' && 'Not Authenticated'}
          </p>
          <p className="text-sm">{debugInfo}</p>
        </div>
        <button
          onClick={checkAuth}
          className="ml-2 px-2 py-1 text-xs bg-white bg-opacity-50 hover:bg-opacity-75 rounded transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default AuthStatus;

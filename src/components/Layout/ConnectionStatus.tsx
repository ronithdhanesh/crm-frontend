import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  onRetry: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected, onRetry }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  if (!show && isConnected) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg ${
        isConnected 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        {isConnected ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <div>
          <p className="font-medium">
            {isConnected ? 'Connected to server' : 'Server connection failed'}
          </p>
          {!isConnected && (
            <p className="text-sm">
              Make sure the backend server is running on port 5002
            </p>
          )}
        </div>
        {!isConnected && (
          <button
            onClick={onRetry}
            className="ml-2 px-2 py-1 text-xs bg-red-200 hover:bg-red-300 rounded transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ConnectionStatus from './ConnectionStatus';
import AuthStatus from './AuthStatus';
import CookieChecker from './CookieChecker';
import apiService from '../../services/api';

const Layout: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);

  const checkConnection = async () => {
    try {
      await apiService.checkAuth();
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      <ConnectionStatus isConnected={isConnected} onRetry={checkConnection} />
      <AuthStatus />
      <CookieChecker />
    </div>
  );
};

export default Layout;

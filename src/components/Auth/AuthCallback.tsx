import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 AuthCallback: Handling OAuth callback...');
        console.log('🔄 AuthCallback: Current URL:', window.location.href);
        console.log('🔄 AuthCallback: Document cookies:', document.cookie);
        
        // Wait a moment for the session cookie to be set
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user is authenticated
        console.log('🔄 AuthCallback: Checking authentication...');
        const isAuthenticated = await checkAuth();
        
        if (isAuthenticated) {
          console.log('✅ AuthCallback: Authentication successful, redirecting to dashboard...');
          navigate('/', { replace: true });
        } else {
          console.log('❌ AuthCallback: Authentication failed, redirecting to login...');
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('❌ AuthCallback: Auth callback failed:', error);
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [checkAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we verify your login</p>
        <p className="text-xs text-gray-400 mt-1">Setting up session...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

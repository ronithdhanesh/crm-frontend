import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManualRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user lands here, it means they were redirected from the backend
    // We'll redirect them to the dashboard
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your CRM...</p>
        <p className="text-sm text-gray-500 mt-2">
          If you're not redirected automatically, 
          <button 
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 underline ml-1"
          >
            click here
          </button>
        </p>
      </div>
    </div>
  );
};

export default ManualRedirect;

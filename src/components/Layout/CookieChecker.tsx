import React, { useState, useEffect } from 'react';
import { Cookie, AlertCircle } from 'lucide-react';

const CookieChecker: React.FC = () => {
  const [hasSessionCookie, setHasSessionCookie] = useState<boolean>(false);
  const [cookieValue, setCookieValue] = useState<string>('');

  const checkCookies = () => {
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('connect.sid='));
    
    if (sessionCookie) {
      setHasSessionCookie(true);
      setCookieValue(sessionCookie.split('=')[1] || '');
    } else {
      setHasSessionCookie(false);
      setCookieValue('');
    }
  };

  useEffect(() => {
    checkCookies();
    // Check cookies every 2 seconds
    const interval = setInterval(checkCookies, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-4 left-4 z-50 p-3 rounded-lg border ${
      hasSessionCookie 
        ? 'bg-green-100 text-green-800 border-green-200' 
        : 'bg-red-100 text-red-800 border-red-200'
    }`}>
      <div className="flex items-center space-x-2">
        {hasSessionCookie ? (
          <Cookie className="w-4 h-4" />
        ) : (
          <AlertCircle className="w-4 h-4" />
        )}
        <div>
          <p className="text-sm font-medium">
            {hasSessionCookie ? 'Session Cookie Found' : 'No Session Cookie'}
          </p>
          {hasSessionCookie && (
            <p className="text-xs opacity-75">
              ID: {cookieValue.substring(0, 20)}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieChecker;

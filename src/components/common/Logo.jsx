import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <Link to="/dashboard" className="flex items-center space-x-3 group">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl animate-pulse opacity-50"></div>
        <div className={`${sizes[size]} relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <svg className="w-1/2 h-1/2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent`}>
          TaskFlow
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Project Management</span>
      </div>
    </Link>
  );
};

export default Logo;
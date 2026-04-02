import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  
  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <Link to="/dashboard" className="flex items-center space-x-2 group">
      {/* Logo Icon */}
      <div className={`${sizes[size]} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105`}>
        <svg className="w-2/3 h-2/3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
          TaskFlow
        </span>
        <span className="text-xs text-gray-500 -mt-1">Project Management</span>
      </div>
    </Link>
  );
};

export default Logo;
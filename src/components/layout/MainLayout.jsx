import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { useTheme } from '../../context/ThemeContext';

const MainLayout = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'
    }`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
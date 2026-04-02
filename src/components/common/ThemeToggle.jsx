import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative p-2 rounded-xl transition-all duration-500 transform hover:scale-110 ${
        darkMode 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25' 
          : 'bg-gradient-to-r from-purple-100 to-pink-100 shadow-md'
      }`}
    >
      <div className="relative w-5 h-5">
        <FiSun 
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
            darkMode 
              ? 'opacity-0 rotate-90 scale-0 text-yellow-400' 
              : 'opacity-100 rotate-0 scale-100 text-purple-600'
          }`}
        />
        <FiMoon 
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
            darkMode 
              ? 'opacity-100 rotate-0 scale-100 text-white' 
              : 'opacity-0 -rotate-90 scale-0 text-purple-600'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
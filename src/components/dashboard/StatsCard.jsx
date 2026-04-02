import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiFolder, FiCheckCircle, FiClock, FiList } from 'react-icons/fi';

const icons = {
  projects: FiFolder,
  tasks: FiList,
  completed: FiCheckCircle,
  pending: FiClock,
};

const lightGradients = {
  projects: 'from-purple-500 to-purple-600',
  tasks: 'from-pink-500 to-pink-600',
  completed: 'from-green-500 to-emerald-600',
  pending: 'from-orange-500 to-red-500',
};

const darkGradients = {
  projects: 'from-purple-400 to-purple-500',
  tasks: 'from-pink-400 to-pink-500',
  completed: 'from-green-400 to-emerald-500',
  pending: 'from-orange-400 to-red-500',
};

const StatsCard = ({ title, value, type }) => {
  const { darkMode } = useTheme();
  const Icon = icons[type];
  const gradient = darkMode ? darkGradients[type] : lightGradients[type];

  return (
    <div className={`group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 hover:scale-[1.02] ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-white border border-purple-100'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-400' : 'text-purple-600'
          }`}>
            {title}
          </p>
          <p className={`text-4xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {value}
          </p>
        </div>
        <div className={`bg-gradient-to-br ${gradient} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className={`mt-4 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-purple-100'}`}>
        <div className="flex items-center justify-between text-xs">
          <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>Last updated</span>
          <span className={darkMode ? 'text-gray-400' : 'text-purple-500'}>Just now</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
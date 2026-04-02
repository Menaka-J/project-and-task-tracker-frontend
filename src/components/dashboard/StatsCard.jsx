import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiFolder, FiCheckCircle, FiClock, FiList } from 'react-icons/fi';

const icons = {
  projects: FiFolder,
  tasks: FiList,
  completed: FiCheckCircle,
  pending: FiClock,
};

const gradients = {
  projects: 'from-blue-500 to-blue-600',
  tasks: 'from-purple-500 to-purple-600',
  completed: 'from-green-500 to-emerald-600',
  pending: 'from-orange-500 to-red-500',
};

const StatsCard = ({ title, value, type }) => {
  const { darkMode } = useTheme();
  const Icon = icons[type];
  const gradient = gradients[type];

  return (
    <div className={`rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.02] ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${gradient} p-3 rounded-2xl shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
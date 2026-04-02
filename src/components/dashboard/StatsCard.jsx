import React from 'react';
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
  const Icon = icons[type];
  const gradient = gradients[type];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:scale-[1.02] group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${gradient} p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
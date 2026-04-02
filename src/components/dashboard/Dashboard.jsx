import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import dashboardService from '../../services/dashboardService';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTheme } from '../../context/ThemeContext';
import { FiRefreshCw, FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState('');
  const { darkMode } = useTheme();

  // Get greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  const completionRate = stats?.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  // Get motivational message based on completion rate
  const getMotivationalMessage = () => {
    if (completionRate === 100) return "Perfect! You're a superstar! 🌟";
    if (completionRate >= 75) return "Amazing progress! Keep going! 🚀";
    if (completionRate >= 50) return "Great job! You're halfway there! 💪";
    if (completionRate >= 25) return "Good start! Every task counts! ✨";
    return "Let's get started on your first task! 🎯";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`relative overflow-hidden rounded-2xl p-8 ${
        darkMode 
          ? 'bg-gradient-to-r from-indigo-950/50 via-purple-950/50 to-pink-950/50' 
          : 'bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100'
      } border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {greeting}
            </span>
          </div>
          
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome back!
          </h1>
          
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {getMotivationalMessage()}
          </p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Projects" value={stats?.totalProjects || 0} type="projects" />
        <StatsCard title="Total Tasks" value={stats?.totalTasks || 0} type="tasks" />
        <StatsCard title="Completed Tasks" value={stats?.completedTasks || 0} type="completed" />
        <StatsCard title="Pending Tasks" value={stats?.pendingTasks || 0} type="pending" />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Progress & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Card */}
        <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <FiTrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Progress Overview
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Circular Progress */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(completionRate / 100) * 440}, 440`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {completionRate}%
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Complete
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</span>
                </div>
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats?.completedTasks || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</span>
                </div>
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats?.pendingTasks || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
              <FiAward className="h-5 w-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Achievements
            </h3>
          </div>
          
          <div className="space-y-4">
            {stats?.totalProjects > 0 && (
              <div className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FiTarget className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Project Creator
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    You've created {stats?.totalProjects} project{stats?.totalProjects > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-3xl">
                  🏆
                </div>
              </div>
            )}
            
            {stats?.completedTasks > 0 && (
              <div className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FiAward className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Task Master
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Completed {stats?.completedTasks} task{stats?.completedTasks > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-3xl">
                  ⭐
                </div>
              </div>
            )}

            {stats?.totalProjects === 0 && stats?.completedTasks === 0 && (
              <div className="text-center py-8">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Complete your first task to earn achievements! 🎯
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex gap-4 justify-center pt-4">
        <button 
          onClick={fetchStats}
          className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            darkMode 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FiRefreshCw className="h-4 w-4" />
          Refresh Stats
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
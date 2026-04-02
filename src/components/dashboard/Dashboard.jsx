import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import dashboardService from '../../services/dashboardService';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTheme } from '../../context/ThemeContext';
import { FiRefreshCw, FiTrendingUp, FiAward, FiTarget, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState('');
  const { darkMode } = useTheme();

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

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "Perfect! You're a superstar! 🌟";
    if (completionRate >= 75) return "Amazing progress! Keep going! 🚀";
    if (completionRate >= 50) return "Great job! You're halfway there! 💪";
    if (completionRate >= 25) return "Good start! Every task counts! ✨";
    return "Let's get started on your first task! 🎯";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className={`relative overflow-hidden rounded-2xl p-8 shadow-xl ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800' 
          : 'bg-gradient-to-r from-purple-50 via-pink-50 to-red-50'
      } border ${darkMode ? 'border-gray-700' : 'border-purple-100'}`}>
        
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <FiStar className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`text-sm font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {greeting}
            </span>
          </div>
          
          <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Welcome back!
          </h1>
          
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {getMotivationalMessage()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Projects" value={stats?.totalProjects || 0} type="projects" />
        <StatsCard title="Total Tasks" value={stats?.totalTasks || 0} type="tasks" />
        <StatsCard title="Completed Tasks" value={stats?.completedTasks || 0} type="completed" />
        <StatsCard title="Pending Tasks" value={stats?.pendingTasks || 0} type="pending" />
      </div>

      {error && (
        <div className={`px-4 py-3 rounded-xl ${
          darkMode 
            ? 'bg-red-900/20 border border-red-700 text-red-400' 
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          {error}
        </div>
      )}

      {/* Progress & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Card */}
        <div className={`rounded-2xl shadow-xl p-6 transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-white border border-purple-100'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <FiTrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Progress Overview
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke={darkMode ? "#374151" : "#e9d5ff"}
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(completionRate / 100) * 440}, 440`}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {completionRate}%
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Complete
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Completed</span>
                </div>
                <span className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {stats?.completedTasks || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pending</span>
                </div>
                <span className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                  {stats?.pendingTasks || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className={`rounded-2xl shadow-xl p-6 transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-white border border-purple-100'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
              <FiAward className="h-5 w-5 text-white" />
            </div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Your Achievements
            </h3>
          </div>
          
          <div className="space-y-4">
            {stats?.totalProjects > 0 && (
              <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-800' 
                  : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
              }`}>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <FiTarget className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Project Creator
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    You've created {stats?.totalProjects} project{stats?.totalProjects > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-3xl animate-bounce">🏆</div>
              </div>
            )}
            
            {stats?.completedTasks > 0 && (
              <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                darkMode 
                  ? 'bg-gradient-to-r from-green-950/50 to-emerald-950/50 border border-green-800' 
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
              }`}>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <FiAward className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Task Master
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Completed {stats?.completedTasks} task{stats?.completedTasks > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-3xl animate-pulse">⭐</div>
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
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl transform hover:scale-105 ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
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
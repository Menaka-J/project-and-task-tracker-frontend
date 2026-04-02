import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import dashboardService from '../../services/dashboardService';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTheme } from '../../context/ThemeContext';
import { FiRefreshCw, FiTrendingUp, FiAward, FiTarget, FiStar, FiZap, FiSun, FiSmile, FiFlag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState('');
  const [showMagic, setShowMagic] = useState(false);
  const { darkMode } = useTheme();

  // Get greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    
    // Show magic effect on first load
    setTimeout(() => setShowMagic(true), 500);
    setTimeout(() => setShowMagic(false), 3000);
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

  const getMotivationalEmoji = () => {
    if (completionRate === 100) return "🏆";
    if (completionRate >= 75) return "🎉";
    if (completionRate >= 50) return "⚡";
    if (completionRate >= 25) return "💫";
    return "✨";
  };

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* Magic Particles Animation */}
      <AnimatePresence>
        {showMagic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                  scale: 0
                }}
                animate={{ 
                  y: -100,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: 0
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${['#8b5cf6', '#3b82f6', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)]}, transparent)`,
                  boxShadow: '0 0 10px currentColor'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Banner with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`relative overflow-hidden rounded-2xl p-8 ${
          darkMode 
            ? 'bg-gradient-to-r from-indigo-950/50 via-purple-950/50 to-pink-950/50' 
            : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50'
        } border border-white/20 dark:border-gray-800/50`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <motion.div 
              className="flex items-center gap-2 mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FiSun className="h-6 w-6 text-yellow-500 animate-spin-slow" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {greeting}
              </span>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome back, <span className="gradient-text-premium">User!</span>
            </motion.h1>
            
            <motion.p 
              className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getMotivationalMessage()}
            </motion.p>
          </div>
          
          <motion.div 
            className="text-6xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 1,
              delay: 0.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            {getMotivationalEmoji()}
          </motion.div>
        </div>
        
        {/* Decorative floating elements */}
        <motion.div 
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </motion.div>

      {/* Stats Cards with Stagger Animation */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {[
          { title: "Total Projects", value: stats?.totalProjects || 0, type: "projects", icon: FiStar, color: "from-blue-500 to-cyan-500" },
          { title: "Total Tasks", value: stats?.totalTasks || 0, type: "tasks", icon: FiZap, color: "from-purple-500 to-pink-500" },
          { title: "Completed Tasks", value: stats?.completedTasks || 0, type: "completed", icon: FiAward, color: "from-green-500 to-emerald-500" },
          { title: "Pending Tasks", value: stats?.pendingTasks || 0, type: "pending", icon: FiTarget, color: "from-orange-500 to-red-500" }
        ].map((item, index) => (
          <motion.div
            key={item.type}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
            <StatsCard title={item.title} value={item.value} type={item.type} />
          </motion.div>
        ))}
      </motion.div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Progress & Achievements with Animation */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Progress Card with Radial Chart */}
        <div className="card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg animate-pulse-slow">
              <FiTrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Progress Overview
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Animated Circular Progress */}
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
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0, 440" }}
                    animate={{ strokeDasharray: `${(completionRate / 100) * 440}, 440` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    className="text-3xl font-bold gradient-text-premium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    {completionRate}%
                  </motion.span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Complete
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</span>
                </div>
                <motion.span 
                  className="text-xl font-bold text-green-600 dark:text-green-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {stats?.completedTasks || 0}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</span>
                </div>
                <motion.span 
                  className="text-xl font-bold text-orange-600 dark:text-orange-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {stats?.pendingTasks || 0}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Card with Trophies */}
        <div className="card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg animate-bounce-slow">
              <FiAward className="h-5 w-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Achievements
            </h3>
          </div>
          
          <div className="space-y-4">
            {stats?.totalProjects > 0 && (
              <motion.div 
                className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} border border-white/20 group-hover:scale-105 transition-all duration-300`}
                whileHover={{ x: 10 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <FiTarget className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Project Creator
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    You've created {stats?.totalProjects} project{stats?.totalProjects > 1 ? 's' : ''}
                  </p>
                </div>
                <motion.div 
                  className="text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  🏆
                </motion.div>
              </motion.div>
            )}
            
            {stats?.completedTasks > 0 && (
              <motion.div 
                className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-r from-green-50 to-emerald-50'} border border-white/20 group-hover:scale-105 transition-all duration-300`}
                whileHover={{ x: 10 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <FiFlag className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Task Master
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Completed {stats?.completedTasks} task{stats?.completedTasks > 1 ? 's' : ''}
                  </p>
                </div>
                <motion.div 
                  className="text-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  ⭐
                </motion.div>
              </motion.div>
            )}

            {stats?.totalProjects === 0 && stats?.completedTasks === 0 && (
              <motion.div 
                className="text-center py-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiSmile className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Complete your first task to earn achievements! 🎯
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div 
        className="flex gap-4 justify-center pt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          onClick={fetchStats}
          className="btn-secondary flex items-center gap-2"
        >
          <FiRefreshCw className="h-4 w-4" />
          Refresh Stats
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
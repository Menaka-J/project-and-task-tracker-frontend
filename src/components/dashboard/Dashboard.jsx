// import React, { useState, useEffect } from 'react';
// import StatsCard from './StatsCard';
// import dashboardService from '../../services/dashboardService';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { FiRefreshCw } from 'react-icons/fi';

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const data = await dashboardService.getStats();
//       setStats(data);
//       setError('');
//     } catch (err) {
//       setError('Failed to load dashboard stats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <button
//           onClick={fetchStats}
//           className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <FiRefreshCw className="h-4 w-4" />
//           Refresh
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard title="Total Projects" value={stats?.totalProjects || 0} type="projects" />
//         <StatsCard title="Total Tasks" value={stats?.totalTasks || 0} type="tasks" />
//         <StatsCard title="Completed Tasks" value={stats?.completedTasks || 0} type="completed" />
//         <StatsCard title="Pending Tasks" value={stats?.pendingTasks || 0} type="pending" />
//       </div>

//       <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
//         <h2 className="text-2xl font-bold mb-2">Welcome to Project Manager!</h2>
//         <p className="text-blue-100">
//           You have {stats?.pendingTasks || 0} pending tasks. Keep up the great work!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import dashboardService from '../../services/dashboardService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiRefreshCw, FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your project overview</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FiRefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Projects" value={stats?.totalProjects || 0} type="projects" />
        <StatsCard title="Total Tasks" value={stats?.totalTasks || 0} type="tasks" />
        <StatsCard title="Completed Tasks" value={stats?.completedTasks || 0} type="completed" />
        <StatsCard title="Pending Tasks" value={stats?.pendingTasks || 0} type="pending" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
              <FiTrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Overview</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.completedTasks || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.pendingTasks || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <FiAward className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
          </div>
          <div className="space-y-3">
            {stats?.totalProjects > 0 && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FiTarget className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Project Creator</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Created {stats?.totalProjects} project(s)</p>
                </div>
              </div>
            )}
            {stats?.completedTasks > 0 && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FiAward className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Task Master</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed {stats?.completedTasks} task(s)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
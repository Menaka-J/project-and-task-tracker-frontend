import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import dashboardService from '../../services/dashboardService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiRefreshCw } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getStats();
      setStats(data);
      setError('');
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiRefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Projects" value={stats?.totalProjects || 0} type="projects" />
        <StatsCard title="Total Tasks" value={stats?.totalTasks || 0} type="tasks" />
        <StatsCard title="Completed Tasks" value={stats?.completedTasks || 0} type="completed" />
        <StatsCard title="Pending Tasks" value={stats?.pendingTasks || 0} type="pending" />
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Project Manager!</h2>
        <p className="text-blue-100">
          You have {stats?.pendingTasks || 0} pending tasks. Keep up the great work!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
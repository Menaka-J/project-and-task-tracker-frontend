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
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      transition: 'all 0.3s',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>{title}</p>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginTop: '0.5rem' }}>{value}</p>
        </div>
        <div style={{
          background: `linear-gradient(to bottom right, ${gradient.split(' ')[1]}, ${gradient.split(' ')[3]})`,
          padding: '0.75rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <Icon style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
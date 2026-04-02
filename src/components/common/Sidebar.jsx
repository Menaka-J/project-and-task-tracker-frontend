import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiList, FiUser, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/projects', icon: FiFolder, label: 'Projects' },
    { path: '/tasks', icon: FiList, label: 'Task Board' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <FiUser className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Check your project progress and manage tasks efficiently
            </p>
            <div className="text-xs text-gray-500">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
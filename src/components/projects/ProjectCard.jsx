import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiCalendar, FiChevronRight, FiUserPlus, FiStar } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ project, isAdmin, onAddMember }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const getRandomGradient = () => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-pink-500 to-red-500',
      'from-purple-600 to-indigo-600',
      'from-pink-600 to-purple-600',
      'from-red-500 to-orange-500',
    ];
    const index = project.id % gradients.length;
    return gradients[index];
  };

  const gradient = getRandomGradient();

  return (
    <div className={`group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-white'
    } border ${darkMode ? 'border-gray-700' : 'border-purple-100'}`}>
      
      {/* Colored top bar */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg bg-gradient-to-r ${gradient} shadow-md`}>
                <FiStar className="h-3 w-3 text-white" />
              </div>
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {project.name}
              </h3>
            </div>
            <p className={`text-sm line-clamp-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {project.description || 'No description'}
            </p>
          </div>
          <div className={`rounded-full px-3 py-1 ml-2 shadow-md ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300' 
              : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
          }`}>
            <span className="text-xs font-bold">
              {project.totalTasks || 0} tasks
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className={`flex items-center gap-2 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <FiUsers className="h-4 w-4 text-purple-500" />
            <span>{project.members?.length || 1} members</span>
          </div>

          <div className={`flex items-center gap-2 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <FiCalendar className="h-4 w-4 text-pink-500" />
            <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => navigate(`/tasks?projectId=${project.id}`)}
            className={`flex-1 px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl transform hover:scale-105 ${
              darkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            }`}
          >
            View Tasks
            <FiChevronRight className="h-4 w-4" />
          </button>
          
          {isAdmin && (
            <button
              onClick={onAddMember}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              <FiUserPlus className="h-4 w-4" />
              Add Member
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
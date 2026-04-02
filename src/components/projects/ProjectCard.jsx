import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiCalendar, FiChevronRight, FiUserPlus } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ project, isAdmin, onAddMember }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border hover:scale-[1.02] ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {project.name}
          </h3>
          <p className={`text-sm line-clamp-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {project.description || 'No description'}
          </p>
        </div>
        <div className={`rounded-full px-2 py-1 ml-2 ${
          darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
        }`}>
          <span className={`text-xs font-medium ${
            darkMode ? 'text-blue-400' : 'text-blue-700'
          }`}>
            {project.totalTasks || 0} tasks
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className={`flex items-center gap-2 text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <FiUsers className="h-4 w-4" />
          <span>{project.members?.length || 1} members</span>
        </div>

        <div className={`flex items-center gap-2 text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <FiCalendar className="h-4 w-4" />
          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => navigate(`/tasks?projectId=${project.id}`)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            View Tasks
            <FiChevronRight className="h-4 w-4" />
          </button>
          
          {isAdmin && (
            <button
              onClick={onAddMember}
              className={`px-3 py-2 border rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
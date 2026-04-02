import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiCalendar, FiChevronRight, FiUserPlus } from 'react-icons/fi';

const ProjectCard = ({ project, isAdmin, onAddMember }) => {
  const navigate = useNavigate();

  return (
    <div className="card hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
        </div>
        <div className="bg-blue-100 rounded-full px-2 py-1">
          <span className="text-xs font-medium text-blue-600">
            {project.totalTasks || 0} tasks
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiUsers className="h-4 w-4" />
          <span>{project.members?.length || 1} members</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiCalendar className="h-4 w-4" />
          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => navigate(`/tasks?projectId=${project.id}`)}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            View Tasks
            <FiChevronRight className="h-4 w-4" />
          </button>
          
          {isAdmin && (
            <button
              onClick={onAddMember}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
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
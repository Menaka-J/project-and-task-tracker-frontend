import React from 'react';
import { FiUser, FiCalendar, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const TaskCard = ({ task, onUpdateStatus, nextStatus, prevStatus }) => {
  const getStatusColor = () => {
    switch (task.status) {
      case 'TO_DO': return 'border-l-4 border-l-blue-500';
      case 'IN_PROGRESS': return 'border-l-4 border-l-yellow-500';
      case 'DONE': return 'border-l-4 border-l-green-500';
      default: return '';
    }
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'DONE';

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all ${getStatusColor()}`}>
      <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="space-y-2 mb-3">
        {task.assignee && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiUser className="h-4 w-4" />
            <span>{task.assignee.name}</span>
          </div>
        )}
        
        {task.deadline && (
          <div className="flex items-center gap-2 text-sm">
            <FiCalendar className="h-4 w-4" />
            <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}>
              Due: {new Date(task.deadline).toLocaleDateString()}
              {isOverdue && ' (Overdue)'}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {prevStatus && (
          <button
            onClick={() => onUpdateStatus(task.id, prevStatus)}
            className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
          >
            <FiArrowLeft className="h-3 w-3" />
            Previous
          </button>
        )}
        
        {nextStatus && (
          <button
            onClick={() => onUpdateStatus(task.id, nextStatus)}
            className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
          >
            {task.status === 'TO_DO' ? 'Start' : 'Complete'}
            <FiArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
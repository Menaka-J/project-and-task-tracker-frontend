import React, { useState } from 'react';
import { FiUser, FiCalendar, FiArrowRight, FiArrowLeft, FiAlertCircle, FiFlag, FiTrash2 } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const priorityColors = {
  HIGH: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-400 font-bold',
    border: 'border-red-500',
    icon: 'text-red-600 dark:text-red-400'
  },
  MEDIUM: {
    bg: 'bg-amber-100 dark:bg-yellow-900/30',
    text: 'text-amber-800 dark:text-yellow-400 font-bold',
    border: 'border-yellow-500',
    icon: 'text-amber-600 dark:text-yellow-400'
  },
  LOW: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-400 font-bold',
    border: 'border-green-500',
    icon: 'text-green-600 dark:text-green-400'
  }
};

const TaskCard = ({ task, onUpdateStatus, onDeleteTask, nextStatus, prevStatus, isAdmin }) => {
  const { darkMode } = useTheme();
  const [showConfirm, setShowConfirm] = useState(false);
  const priority = task.priority || 'MEDIUM';
  const priorityStyle = priorityColors[priority];
  
  const getStatusColor = () => {
    switch (task.status) {
      case 'TO_DO': return 'border-l-4 border-l-blue-500';
      case 'IN_PROGRESS': return 'border-l-4 border-l-amber-500';
      case 'DONE': return 'border-l-4 border-l-green-500';
      default: return '';
    }
  };

  const getDueDateStatus = () => {
    if (!task.deadline) return null;
    const today = new Date();
    const deadline = new Date(task.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    
    if (task.status === 'DONE') return null;
    if (daysLeft < 0) return { text: 'Overdue!', color: 'text-red-700 dark:text-red-400 font-bold', bg: 'bg-red-100 dark:bg-red-900/20' };
    if (daysLeft === 0) return { text: 'Due today!', color: 'text-orange-700 dark:text-orange-400 font-bold', bg: 'bg-orange-100 dark:bg-orange-900/20' };
    if (daysLeft <= 2) return { text: `${daysLeft} days left`, color: 'text-amber-700 dark:text-yellow-400 font-bold', bg: 'bg-amber-100 dark:bg-yellow-900/20' };
    return null;
  };

  const dueDateStatus = getDueDateStatus();

  const handleDelete = () => {
    if (showConfirm) {
      onDeleteTask(task.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className={`rounded-xl shadow-sm hover:shadow-md transition-all p-4 ${getStatusColor()} ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${priorityStyle.bg}`}>
          <FiFlag className={`h-3 w-3 ${priorityStyle.icon}`} />
          <span className={`text-xs font-bold ${priorityStyle.text}`}>{priority}</span>
        </div>
        <div className="flex items-center gap-2">
          {dueDateStatus && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${dueDateStatus.bg}`}>
              <FiAlertCircle className={`h-3 w-3 ${dueDateStatus.color.split(' ')[0]}`} />
              <span className={`text-xs font-bold ${dueDateStatus.color}`}>{dueDateStatus.text}</span>
            </div>
          )}
          {isAdmin && (
            <button
              onClick={handleDelete}
              className={`p-1 rounded-lg transition-colors ${
                showConfirm 
                  ? 'bg-red-500 text-white' 
                  : darkMode 
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
              }`}
              title="Delete task"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      <h3 className={`font-semibold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {task.title}
      </h3>
      <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {task.description}
      </p>
      
      <div className="space-y-2 mb-3">
        {task.assignee && (
          <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FiUser className="h-4 w-4" />
            <span>{task.assignee.name}</span>
          </div>
        )}
        
        {task.deadline && (
          <div className="flex items-center gap-2 text-sm">
            <FiCalendar className="h-4 w-4" />
            <span className={dueDateStatus?.color || (darkMode ? 'text-gray-400' : 'text-gray-600')}>
              Due: {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {prevStatus && (
          <button
            onClick={() => onUpdateStatus(task.id, prevStatus)}
            className={`flex-1 px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-center gap-1 font-medium ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiArrowLeft className="h-3 w-3" />
            Previous
          </button>
        )}
        
        {nextStatus && (
          <button
            onClick={() => onUpdateStatus(task.id, nextStatus)}
            className={`flex-1 px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md font-semibold ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            }`}
          >
            {task.status === 'TO_DO' ? 'Start' : task.status === 'IN_PROGRESS' ? 'Complete' : 'Move'}
            <FiArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
      
      {showConfirm && (
        <div className="mt-3 text-center">
          <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Click again to confirm delete
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
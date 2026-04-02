import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { useTheme } from '../../context/ThemeContext';
import { FiInbox } from 'react-icons/fi';

const TaskColumn = ({ id, title, status, tasks, onUpdateStatus, onDeleteTask, color, isAdmin }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const { darkMode } = useTheme();

  const getColumnClass = () => {
    switch(color) {
      case 'blue': return darkMode 
        ? 'bg-blue-950/30 border border-blue-800' 
        : 'bg-blue-50 border border-blue-200';
      case 'yellow': return darkMode 
        ? 'bg-amber-950/30 border border-amber-800' 
        : 'bg-amber-50 border border-amber-200';
      case 'green': return darkMode 
        ? 'bg-emerald-950/30 border border-emerald-800' 
        : 'bg-emerald-50 border border-emerald-200';
      default: return darkMode 
        ? 'bg-blue-950/30 border border-blue-800' 
        : 'bg-blue-50 border border-blue-200';
    }
  };

  const getTitleColor = () => {
    switch(color) {
      case 'blue': return darkMode ? 'text-blue-400' : 'text-blue-700';
      case 'yellow': return darkMode ? 'text-amber-400' : 'text-amber-700';
      case 'green': return darkMode ? 'text-emerald-400' : 'text-emerald-700';
      default: return darkMode ? 'text-blue-400' : 'text-blue-700';
    }
  };

  const getBadgeClass = () => {
    switch(color) {
      case 'blue': return darkMode 
        ? 'bg-blue-900/40 text-blue-300' 
        : 'bg-blue-100 text-blue-700';
      case 'yellow': return darkMode 
        ? 'bg-amber-900/40 text-amber-300' 
        : 'bg-amber-100 text-amber-700';
      case 'green': return darkMode 
        ? 'bg-emerald-900/40 text-emerald-300' 
        : 'bg-emerald-100 text-emerald-700';
      default: return darkMode 
        ? 'bg-blue-900/40 text-blue-300' 
        : 'bg-blue-100 text-blue-700';
    }
  };

  const getNextStatus = () => {
    if (status === 'TO_DO') return 'IN_PROGRESS';
    if (status === 'IN_PROGRESS') return 'DONE';
    return null;
  };

  const getPrevStatus = () => {
    if (status === 'IN_PROGRESS') return 'TO_DO';
    if (status === 'DONE') return 'IN_PROGRESS';
    return null;
  };

  return (
    <div ref={setNodeRef} className={`rounded-2xl p-4 min-h-[500px] transition-all duration-300 ${getColumnClass()}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`font-semibold text-lg ${getTitleColor()}`}>{title}</h2>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeClass()}`}>
          {tasks.length} tasks
        </span>
      </div>

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={onUpdateStatus}
              onDeleteTask={onDeleteTask}
              nextStatus={getNextStatus()}
              prevStatus={getPrevStatus()}
              isAdmin={isAdmin}
            />
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <div className={`rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <FiInbox className={`h-6 w-6 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                No tasks in {title.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
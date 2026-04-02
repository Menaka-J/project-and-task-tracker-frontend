import React, { useState } from 'react';
import { FiX, FiPlusCircle, FiFlag } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const CreateTaskModal = ({ isOpen, onClose, onCreate, users, projectName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !assigneeId) return;
    
    setLoading(true);
    try {
      await onCreate({ title, description, assigneeId, deadline, priority });
      setTitle('');
      setDescription('');
      setAssigneeId('');
      setDeadline('');
      setPriority('MEDIUM');
      onClose();
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className={`rounded-2xl w-full max-w-md p-6 shadow-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-purple-100'}`}>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FiPlusCircle className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Create New Task
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className={`p-1 rounded-lg transition-colors ${
              darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {projectName && (
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Project: <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{projectName}</span>
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              placeholder="Enter task description"
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Priority
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPriority('HIGH')}
                className={`flex-1 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  priority === 'HIGH'
                    ? 'bg-red-500 text-white shadow-md'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiFlag className="h-4 w-4" />
                High
              </button>
              <button
                type="button"
                onClick={() => setPriority('MEDIUM')}
                className={`flex-1 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  priority === 'MEDIUM'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiFlag className="h-4 w-4" />
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority('LOW')}
                className={`flex-1 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  priority === 'LOW'
                    ? 'bg-green-500 text-white shadow-md'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiFlag className="h-4 w-4" />
                Low
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Assign to *
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              required
            >
              <option value="">Select assignee...</option>
              {users && users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl font-semibold transition-all ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-xl ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              } disabled:opacity-50`}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
import React, { useState } from 'react';
import { FiX, FiUserPlus } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const AddMemberModal = ({ isOpen, onClose, onAdd, users, projectName }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId) return;
    
    setLoading(true);
    await onAdd(selectedUserId);
    setLoading(false);
    setSelectedUserId('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className={`rounded-2xl w-full max-w-md p-6 shadow-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-purple-100'}`}>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FiUserPlus className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Add Team Member
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

        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Adding member to: <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{projectName}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Select User
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              required
            >
              <option value="">Choose a user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email}) - {user.role}
                </option>
              ))}
            </select>
          </div>

          {users.length === 0 && (
            <div className={`p-3 rounded-xl mb-4 ${
              darkMode ? 'bg-yellow-900/20 border border-yellow-800 text-yellow-400' : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
            }`}>
              <p className="text-sm">No available users to add. All users are already members.</p>
            </div>
          )}

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
              disabled={loading || users.length === 0}
              className={`flex-1 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-xl ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              } disabled:opacity-50`}
            >
              {loading ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
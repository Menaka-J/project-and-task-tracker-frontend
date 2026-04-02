import React, { useState } from 'react';
import { FiX, FiUserPlus, FiUser } from 'react-icons/fi';

const AddMemberModal = ({ isOpen, onClose, onAdd, users, projectName }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FiUserPlus className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Add Team Member</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Adding member to: <span className="font-semibold">{projectName}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select User
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="input-field"
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800">
                No available users to add. All users are already members.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || users.length === 0}
              className="flex-1 btn-primary"
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
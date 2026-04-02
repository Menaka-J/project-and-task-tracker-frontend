// import React, { useState } from 'react';
// import { FiX, FiPlusCircle, FiUser } from 'react-icons/fi';

// const CreateTaskModal = ({ isOpen, onClose, onCreate, users, projectName }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [assigneeId, setAssigneeId] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !assigneeId) return;

//     setLoading(true);
//     await onCreate({ title, description, assigneeId, deadline });
//     setLoading(false);
//     setTitle('');
//     setDescription('');
//     setAssigneeId('');
//     setDeadline('');
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <FiPlusCircle className="h-6 w-6 text-blue-600" />
//             <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <FiX className="h-6 w-6" />
//           </button>
//         </div>

//         {projectName && (
//           <p className="text-sm text-gray-600 mb-4">
//             Project: <span className="font-semibold">{projectName}</span>
//           </p>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Task Title *
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="input-field"
//               placeholder="Enter task title"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="input-field"
//               rows="3"
//               placeholder="Enter task description"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Assign to *
//             </label>
//             <select
//               value={assigneeId}
//               onChange={(e) => setAssigneeId(e.target.value)}
//               className="input-field"
//               required
//             >
//               <option value="">Select assignee...</option>
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name} ({user.email})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Deadline
//             </label>
//             <input
//               type="date"
//               value={deadline}
//               onChange={(e) => setDeadline(e.target.value)}
//               className="input-field"
//             />
//           </div>

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 btn-secondary"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 btn-primary"
//             >
//               {loading ? 'Creating...' : 'Create Task'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTaskModal;

import React, { useState } from 'react';
import { FiX, FiPlusCircle, FiFlag } from 'react-icons/fi';

const CreateTaskModal = ({ isOpen, onClose, onCreate, users, projectName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !assigneeId) return;
    console.log("Sending priority:", priority); // ADD THIS LINE

    setLoading(true);
    try {
      await onCreate({
        title,
        description,
        assigneeId,
        deadline,
        priority  // Make sure priority is sent
      });
      // Reset form
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FiPlusCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Task</h2>
          </div>
          <button
            onClick={() => {
              onClose();
              setPriority('MEDIUM');
            }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {projectName && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Project: <span className="font-semibold text-gray-900 dark:text-white">{projectName}</span>
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              rows="3"
              placeholder="Enter task description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPriority('HIGH')}
                className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${priority === 'HIGH'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                <FiFlag className="h-4 w-4" />
                High
              </button>
              <button
                type="button"
                onClick={() => setPriority('MEDIUM')}
                className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${priority === 'MEDIUM'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                <FiFlag className="h-4 w-4" />
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority('LOW')}
                className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${priority === 'LOW'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                <FiFlag className="h-4 w-4" />
                Low
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assign to *
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="input-field"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                setPriority('MEDIUM');
              }}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary"
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
// import React from 'react';
// import TaskCard from './TaskCard';

// const colors = {
//   blue: {
//     bg: 'bg-blue-50',
//     border: 'border-blue-200',
//     text: 'text-blue-700',
//     badge: 'bg-blue-100 text-blue-800'
//   },
//   yellow: {
//     bg: 'bg-yellow-50',
//     border: 'border-yellow-200',
//     text: 'text-yellow-700',
//     badge: 'bg-yellow-100 text-yellow-800'
//   },
//   green: {
//     bg: 'bg-green-50',
//     border: 'border-green-200',
//     text: 'text-green-700',
//     badge: 'bg-green-100 text-green-800'
//   }
// };

// const TaskColumn = ({ title, status, tasks, onUpdateStatus, color }) => {
//   const colorStyles = colors[color];

//   const getNextStatus = () => {
//     if (status === 'TO_DO') return 'IN_PROGRESS';
//     if (status === 'IN_PROGRESS') return 'DONE';
//     return null;
//   };

//   const getPrevStatus = () => {
//     if (status === 'IN_PROGRESS') return 'TO_DO';
//     if (status === 'DONE') return 'IN_PROGRESS';
//     return null;
//   };

//   return (
//     <div className={`${colorStyles.bg} rounded-xl p-4 min-h-[500px]`}>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className={`font-semibold text-lg ${colorStyles.text}`}>{title}</h2>
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorStyles.badge}`}>
//           {tasks.length} tasks
//         </span>
//       </div>

//       <div className="space-y-3">
//         {tasks.map((task) => (
//           <TaskCard
//             key={task.id}
//             task={task}
//             onUpdateStatus={onUpdateStatus}
//             nextStatus={getNextStatus()}
//             prevStatus={getPrevStatus()}
//           />
//         ))}
        
//         {tasks.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-500 text-sm">No tasks in {title.toLowerCase()}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskColumn;

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const colors = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300'
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-700 dark:text-yellow-400',
    badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-400',
    badge: 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
  }
};

const TaskColumn = ({ id, title, status, tasks, onUpdateStatus, color }) => {
  const colorStyles = colors[color];
  const { setNodeRef } = useDroppable({ id: status });

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
    <div ref={setNodeRef} className={`${colorStyles.bg} rounded-xl p-4 min-h-[500px]`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`font-semibold text-lg ${colorStyles.text}`}>{title}</h2>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorStyles.badge}`}>
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
              nextStatus={getNextStatus()}
              prevStatus={getPrevStatus()}
            />
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks in {title.toLowerCase()}</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
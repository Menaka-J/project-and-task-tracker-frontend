// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import TaskColumn from './TaskColumn';
// import CreateTaskModal from './CreateTaskModal';
// import taskService from '../../services/taskService';
// import projectService from '../../services/projectService';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { FiPlus } from 'react-icons/fi';

// const TaskBoard = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const projectIdFromUrl = queryParams.get('projectId');
  
//   const [tasks, setTasks] = useState({ TO_DO: [], IN_PROGRESS: [], DONE: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [selectedProjectId, setSelectedProjectId] = useState(projectIdFromUrl || '');
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);
  
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isAdmin = user?.role?.includes('ADMIN');

//   const fetchProjects = async () => {
//     try {
//       const data = await projectService.getAllProjects();
//       setProjects(data);
//       if (!selectedProjectId && data.length > 0) {
//         setSelectedProjectId(data[0].id);
//       }
//     } catch (err) {
//       setError('Failed to load projects');
//     }
//   };

//   const fetchUsers = async () => {
//     if (isAdmin) {
//       try {
//         const data = await projectService.getAllUsers();
//         setUsers(data);
//       } catch (err) {
//         console.error('Failed to load users');
//       }
//     }
//   };

//   const fetchTasks = async () => {
//     if (!selectedProjectId) return;
    
//     try {
//       setLoading(true);
//       const data = await taskService.getTasksByProject(selectedProjectId);
//       const grouped = {
//         TO_DO: data.filter(task => task.status === 'TO_DO'),
//         IN_PROGRESS: data.filter(task => task.status === 'IN_PROGRESS'),
//         DONE: data.filter(task => task.status === 'DONE'),
//       };
//       setTasks(grouped);
//     } catch (err) {
//       setError('Failed to load tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (selectedProjectId) {
//       fetchTasks();
//     }
//   }, [selectedProjectId]);

//   const handleUpdateStatus = async (taskId, newStatus) => {
//     try {
//       await taskService.updateTaskStatus(taskId, newStatus);
//       fetchTasks();
//     } catch (err) {
//       alert('Failed to update task status');
//     }
//   };

//   const handleCreateTask = async (taskData) => {
//     try {
//       await taskService.createTask(selectedProjectId, taskData);
//       setIsCreateModalOpen(false);
//       fetchTasks();
//     } catch (err) {
//       alert('Failed to create task');
//     }
//   };

//   if (loading && projects.length === 0) return <LoadingSpinner />;

//   const currentProject = projects.find(p => p.id === parseInt(selectedProjectId));

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
//           <p className="text-gray-600 mt-1">Drag and drop tasks to update status</p>
//         </div>
        
//         <div className="flex gap-3">
//           <select
//             value={selectedProjectId}
//             onChange={(e) => setSelectedProjectId(e.target.value)}
//             className="input-field w-64"
//           >
//             <option value="">Select Project</option>
//             {projects.map(project => (
//               <option key={project.id} value={project.id}>
//                 {project.name}
//               </option>
//             ))}
//           </select>
          
//           {selectedProjectId && isAdmin && (
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="btn-primary flex items-center gap-2"
//             >
//               <FiPlus className="h-5 w-5" />
//               Add Task
//             </button>
//           )}
//         </div>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
//           {error}
//         </div>
//       )}

//       {!selectedProjectId ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500">Please select a project to view tasks</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <TaskColumn
//             title="To Do"
//             status="TO_DO"
//             tasks={tasks.TO_DO}
//             onUpdateStatus={handleUpdateStatus}
//             color="blue"
//           />
//           <TaskColumn
//             title="In Progress"
//             status="IN_PROGRESS"
//             tasks={tasks.IN_PROGRESS}
//             onUpdateStatus={handleUpdateStatus}
//             color="yellow"
//           />
//           <TaskColumn
//             title="Done"
//             status="DONE"
//             tasks={tasks.DONE}
//             onUpdateStatus={handleUpdateStatus}
//             color="green"
//           />
//         </div>
//       )}

//       <CreateTaskModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onCreate={handleCreateTask}
//         users={users}
//         projectName={currentProject?.name}
//       />
//     </div>
//   );
// };

// export default TaskBoard;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import TaskColumn from './TaskColumn';
import CreateTaskModal from './CreateTaskModal';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiPlus, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { triggerConfetti } from '../../utils/confetti';

const TaskBoard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectIdFromUrl = queryParams.get('projectId');
  
  const [tasks, setTasks] = useState({ TO_DO: [], IN_PROGRESS: [], DONE: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(projectIdFromUrl || '');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role?.includes('ADMIN');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
      if (!selectedProjectId && data.length > 0) {
        setSelectedProjectId(data[0].id);
      }
    } catch (err) {
      setError('Failed to load projects');
    }
  };

  const fetchUsers = async () => {
    if (isAdmin) {
      try {
        const data = await projectService.getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users',err);
      }
    }
  };

  const fetchTasks = async () => {
    if (!selectedProjectId) return;
    
    try {
      setLoading(true);
      const data = await taskService.getTasksByProject(selectedProjectId);
      
      // Filter tasks based on search and priority
      let filteredTasks = data;
      
      if (searchTerm) {
        filteredTasks = filteredTasks.filter(task => 
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (filterPriority) {
        filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
      }
      
      const grouped = {
        TO_DO: filteredTasks.filter(task => task.status === 'TO_DO'),
        IN_PROGRESS: filteredTasks.filter(task => task.status === 'IN_PROGRESS'),
        DONE: filteredTasks.filter(task => task.status === 'DONE'),
      };
      setTasks(grouped);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchTasks();
    }
  }, [selectedProjectId, searchTerm, filterPriority]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id;
    const newStatus = over.id;
    
    // Find the task
    let taskToUpdate = null;
    for (const status in tasks) {
      taskToUpdate = tasks[status].find(t => t.id === activeId);
      if (taskToUpdate) break;
    }
    
    if (taskToUpdate && taskToUpdate.status !== newStatus) {
      try {
        await taskService.updateTaskStatus(activeId, newStatus);
        
        // If task is being marked as DONE, trigger confetti
        if (newStatus === 'DONE') {
          triggerConfetti();
        }
        
        fetchTasks();
      } catch (err) {
        alert('Failed to update task status');
      }
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      
      // If task is being marked as DONE, trigger confetti
      if (newStatus === 'DONE') {
        triggerConfetti();
      }
      
      fetchTasks();
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(selectedProjectId, taskData);
      setIsCreateModalOpen(false);
      fetchTasks();
    } catch (err) {
      alert('Failed to create task');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterPriority('');
  };

  if (loading && projects.length === 0) return <LoadingSpinner />;

  const currentProject = projects.find(p => p.id === parseInt(selectedProjectId));

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Task Board</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Drag and drop tasks to update status</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="input-field w-64"
          >
            <option value="">Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2"
          >
            <FiFilter className="h-4 w-4" />
            Filters
            {(searchTerm || filterPriority) && (
              <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
          
          {selectedProjectId && isAdmin && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus className="h-5 w-5" />
              Add Task
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="w-48">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="input-field"
              >
                <option value="">All Priorities</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
            {(searchTerm || filterPriority) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <FiX className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      {!selectedProjectId ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Please select a project to view tasks</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              id="TO_DO"
              title="To Do"
              status="TO_DO"
              tasks={tasks.TO_DO}
              onUpdateStatus={handleUpdateStatus}
              color="blue"
            />
            <TaskColumn
              id="IN_PROGRESS"
              title="In Progress"
              status="IN_PROGRESS"
              tasks={tasks.IN_PROGRESS}
              onUpdateStatus={handleUpdateStatus}
              color="yellow"
            />
            <TaskColumn
              id="DONE"
              title="Done"
              status="DONE"
              tasks={tasks.DONE}
              onUpdateStatus={handleUpdateStatus}
              color="green"
            />
          </div>
        </DndContext>
      )}

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTask}
        users={users}
        projectName={currentProject?.name}
      />
    </div>
  );
};

export default TaskBoard;
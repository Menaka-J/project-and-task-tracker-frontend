import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import TaskColumn from './TaskColumn';
import CreateTaskModal from './CreateTaskModal';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiPlus, FiSearch, FiFilter, FiX, FiInbox, FiSmile } from 'react-icons/fi';
import { triggerConfetti } from '../../utils/confetti';
import { useTheme } from '../../context/ThemeContext';

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
  const { darkMode } = useTheme(); // <-- Make sure this is here!

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
        console.error('Failed to load users');
      }
    }
  };

  const fetchTasks = async () => {
    if (!selectedProjectId) return;

    try {
      setLoading(true);
      const data = await taskService.getTasksByProject(selectedProjectId);

      // Filter tasks based on user role
      let filteredTasks = data;
      if (!isAdmin) {
        // Members only see tasks assigned to them
        filteredTasks = data.filter(task => task.assignee?.id === user.id);
      }

      // Apply search filter
      if (searchTerm) {
        filteredTasks = filteredTasks.filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply priority filter
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

    let taskToUpdate = null;
    for (const status in tasks) {
      taskToUpdate = tasks[status].find(t => t.id === activeId);
      if (taskToUpdate) break;
    }

    if (taskToUpdate && taskToUpdate.status !== newStatus) {
      try {
        await taskService.updateTaskStatus(activeId, newStatus);

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

  // Check if user has any tasks
  const hasNoTasks = !isAdmin &&
    tasks.TO_DO.length === 0 &&
    tasks.IN_PROGRESS.length === 0 &&
    tasks.DONE.length === 0;

  if (loading && projects.length === 0) return <LoadingSpinner />;

  const currentProject = projects.find(p => p.id === parseInt(selectedProjectId));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Task Board
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isAdmin ? 'Drag and drop tasks to update status' : 'View and manage your assigned tasks'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className={`px-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${darkMode
                ? 'bg-gray-800 border-gray-700 text-white focus:ring-purple-500'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
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
        <div className={`p-4 rounded-xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'
          } animate-slide-up`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500'
                  }`}
              />
            </div>
            <div className="w-48">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:outline-none transition-all ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                  }`}
              >
                <option value="">All Priorities</option>
                <option value="HIGH">🔴 High Priority</option>
                <option value="MEDIUM">🟡 Medium Priority</option>
                <option value="LOW">🟢 Low Priority</option>
              </select>
            </div>
            {(searchTerm || filterPriority) && (
              <button
                onClick={clearFilters}
                className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${darkMode
                  ? 'text-gray-300 hover:text-red-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                  }`}
              >
                <FiX className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {!selectedProjectId ? (
        <div className="text-center py-12">
          <div className={`rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
            <FiInbox className={`h-10 w-10 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          </div>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No Project Selected
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Please select a project to view tasks
          </p>
        </div>
      ) : hasNoTasks ? (
        // No Tasks Message for Members
        <div className="text-center py-16 animate-fade-in">
          <div className={`rounded-full p-6 w-32 h-32 mx-auto mb-6 flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
            <FiSmile className={`h-16 w-16 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          </div>
          <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No Tasks Assigned Yet! 🎉
          </h3>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            You don't have any tasks in <span className="font-semibold text-indigo-600 dark:text-indigo-400">{currentProject?.name}</span>
          </p>
          <div className={`max-w-md mx-auto p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-indigo-50'
            }`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              💡 When tasks are assigned to you, they will appear here.
              You can then drag them between columns as you make progress!
            </p>
          </div>
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
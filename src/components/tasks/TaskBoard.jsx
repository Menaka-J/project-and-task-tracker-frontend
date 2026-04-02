import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TaskColumn from './TaskColumn';
import CreateTaskModal from './CreateTaskModal';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiPlus } from 'react-icons/fi';

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
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role?.includes('ADMIN');

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
      const grouped = {
        TO_DO: data.filter(task => task.status === 'TO_DO'),
        IN_PROGRESS: data.filter(task => task.status === 'IN_PROGRESS'),
        DONE: data.filter(task => task.status === 'DONE'),
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
  }, [selectedProjectId]);

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
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

  if (loading && projects.length === 0) return <LoadingSpinner />;

  const currentProject = projects.find(p => p.id === parseInt(selectedProjectId));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <p className="text-gray-600 mt-1">Drag and drop tasks to update status</p>
        </div>
        
        <div className="flex gap-3">
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

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!selectedProjectId ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Please select a project to view tasks</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            status="TO_DO"
            tasks={tasks.TO_DO}
            onUpdateStatus={handleUpdateStatus}
            color="blue"
          />
          <TaskColumn
            title="In Progress"
            status="IN_PROGRESS"
            tasks={tasks.IN_PROGRESS}
            onUpdateStatus={handleUpdateStatus}
            color="yellow"
          />
          <TaskColumn
            title="Done"
            status="DONE"
            tasks={tasks.DONE}
            onUpdateStatus={handleUpdateStatus}
            color="green"
          />
        </div>
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
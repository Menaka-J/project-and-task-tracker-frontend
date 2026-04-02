import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import CreateProjectModal from './CreateProjectModal';
import AddMemberModal from './AddMemberModal';
import projectService from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiPlus, FiFolder } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role?.includes('ADMIN');
  const { darkMode } = useTheme();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
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

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectService.createProject(projectData);
      setProjects([newProject, ...projects]);
      setIsCreateModalOpen(false);
    } catch (err) {
      alert('Failed to create project');
    }
  };

  const handleAddMember = async (userId) => {
    try {
      await projectService.addMember(selectedProject.id, userId);
      alert('Member added successfully');
      setIsMemberModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert('Failed to add member');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? All tasks will also be deleted. This action cannot be undone.')) {
      try {
        await projectService.deleteProject(projectId);
        fetchProjects();
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  const handleRemoveMember = async (projectId, userId) => {
    if (window.confirm('Are you sure you want to remove this member from the project?')) {
      try {
        await projectService.removeMember(projectId, userId);
        fetchProjects();
      } catch (err) {
        alert('Failed to remove member');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Projects
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your projects and team members
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            }`}
          >
            <FiPlus className="h-5 w-5" />
            New Project
          </button>
        )}
      </div>

      {error && (
        <div className={`px-4 py-3 rounded-xl ${
          darkMode 
            ? 'bg-red-900/20 border border-red-700 text-red-400' 
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <div className={`rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <FiFolder className={`h-10 w-10 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          </div>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No projects yet
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Create your first project to get started
          </p>
          {isAdmin && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className={`mt-4 px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              }`}
            >
              Create Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isAdmin={isAdmin}
              onAddMember={() => {
                setSelectedProject(project);
                setIsMemberModalOpen(true);
              }}
              onDeleteProject={handleDeleteProject}
              onRemoveMember={handleRemoveMember}
            />
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />

      <AddMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onAdd={handleAddMember}
        users={users.filter(u => !selectedProject?.members?.some(m => m.id === u.id))}
        projectName={selectedProject?.name}
      />
    </div>
  );
};

export default Projects;
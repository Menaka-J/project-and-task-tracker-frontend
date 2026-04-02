import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import CreateProjectModal from './CreateProjectModal';
import AddMemberModal from './AddMemberModal';
import projectService from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiPlus, FiUsers, FiFolder } from 'react-icons/fi';  // Add FiFolder here

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your projects and team members</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus className="h-5 w-5" />
            New Project
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FiFolder className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-500">Create your first project to get started</p>
          {isAdmin && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary mt-4"
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
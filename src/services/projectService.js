import api from './api';

const projectService = {
  getAllProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/projects/users');
    return response.data;
  },

  addMember: async (projectId, userId) => {
    const response = await api.post(`/projects/${projectId}/members`, { userId });
    return response.data;
  },

  // Add delete project method
  deleteProject: async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  },

  // Add remove member method
  removeMember: async (projectId, userId) => {
    const response = await api.delete(`/projects/${projectId}/members/${userId}`);
    return response.data;
  },
  
};

export default projectService;
import api from './api';

const taskService = {
  getTasksByProject: async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  },

  createTask: async (projectId, taskData) => {
    const response = await api.post(`/tasks/project/${projectId}`, taskData);
    return response.data;
  },

  updateTaskStatus: async (taskId, status) => {
    const response = await api.put(`/tasks/${taskId}`, { status });
    return response.data;
  },

  getTasksByStatus: async (projectId, status) => {
    const response = await api.get(`/tasks/project/${projectId}/status/${status}`);
    return response.data;
  },
};

export default taskService;
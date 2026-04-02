import api from './api';

const taskService = {
  getTasksByProject: async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  },

  // createTask: async (projectId, taskData) => {
  //   const response = await api.post(`/tasks/project/${projectId}`, taskData);
  //   return response.data;
  // },
  createTask: async (projectId, taskData) => {
    console.log("Sending to API:", taskData); // ADD THIS LINE
    const response = await api.post(`/tasks/project/${projectId}`, {
      title: taskData.title,
      description: taskData.description,
      assigneeId: taskData.assigneeId,
      deadline: taskData.deadline,
      priority: taskData.priority  // Make sure this line exists
    });
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
import api from './axios.js';

export const createCRUD = (endpoint) => {
  return {
    getAll: (params = {}) => api.get(endpoint, { params }),
    getById: (id) => api.get(`${endpoint}/${id}`),
    create: (data) => {
      const isFormData = data instanceof FormData;
      return api.post(endpoint, data, {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      });
    },
    update: (id, data) => {
      const isFormData = data instanceof FormData;
      return api.put(`${endpoint}/${id}`, data, {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      });
    },
    delete: (id) => api.delete(`${endpoint}/${id}`),
  };
};

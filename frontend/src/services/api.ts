import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({ 
  baseURL: API_BASE_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  async login(email: string, password: string) {
    try {
      const response: AxiosResponse = await api.post('/auth/login', {
        email,
        password
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    try {
      const response: AxiosResponse = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getProfile() {
    try {
      const response: AxiosResponse = await api.get('/auth/profile');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

// AI Models Service
export const aiModelsService = {
  async getModels() {
    try {
      const response: AxiosResponse = await api.get('/ai-models');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async createModel(modelData: any) {
    try {
      const response: AxiosResponse = await api.post('/ai-models', modelData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async trainModel(modelId: string, data: any) {
    try {
      const response: AxiosResponse = await api.post(`/ai-models/${modelId}/train`, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

// Data Service
export const dataService = {
  async uploadDataset(formData: FormData) {
    try {
      const response: AxiosResponse = await api.post('/data/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getDatasets() {
    try {
      const response: AxiosResponse = await api.get('/data/datasets');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async processData(datasetId: string, options: any) {
    try {
      const response: AxiosResponse = await api.post(`/data/${datasetId}/process`, options);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

// Analytics Service
export const analyticsService = {
  async getMetrics() {
    try {
      const response: AxiosResponse = await api.get('/analytics/metrics');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getModelPerformance(modelId: string) {
    try {
      const response: AxiosResponse = await api.get(`/analytics/models/${modelId}/performance`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};
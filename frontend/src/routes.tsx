import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AIModels from './pages/AIModels';
import DataUpload from './pages/DataUpload';
import Analytics from './pages/Analytics';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/ai-models', element: <AIModels /> },
  { path: '/data-upload', element: <DataUpload /> },
  { path: '/analytics', element: <Analytics /> }
];
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import auth from './middleware/auth';
import authRoutes from './routes/auth';
import dataRoutes from './routes/data';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet({ 
  contentSecurityPolicy: false, 
  crossOriginEmbedderPolicy: false 
}));

// CORS configuration
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true 
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (_, res) => {
  res.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// Protected routes
app.get('/api/auth/profile', auth, (req, res) => {
  const user = (req as any).user;
  res.json({ 
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    createdAt: user?.createdAt
  });
});

app.use('/api/data', auth, dataRoutes);

// AI Models routes (to be implemented)
app.get('/api/ai-models', auth, (req, res) => {
  // Mock data for AI models
  const models = [
    {
      id: '1',
      name: 'CNN Image Classifier',
      type: 'CNN',
      status: 'ready',
      accuracy: 94.2,
      lastTrained: '2024-01-15',
      dataset: 'CIFAR-10',
      description: 'Clasificador de imágenes usando CNN para el dataset CIFAR-10',
      parameters: 1250000,
      size: 4.8
    },
    {
      id: '2',
      name: 'LSTM Sentiment Analysis',
      type: 'LSTM',
      status: 'training',
      accuracy: 87.5,
      lastTrained: '2024-01-14',
      dataset: 'IMDB Reviews',
      description: 'Análisis de sentimientos usando LSTM en reseñas de películas',
      parameters: 890000,
      size: 3.4
    }
  ];
  
  res.json({ success: true, data: models });
});

// Analytics routes (to be implemented)
app.get('/api/analytics/metrics', auth, (req, res) => {
  const metrics = {
    totalModels: 3,
    activeModels: 2,
    totalDatasets: 3,
    totalProcessingTime: 1247,
    averageAccuracy: 92.8,
    monthlyGrowth: 15.3,
    userEngagement: 78.5
  };
  
  res.json({ success: true, data: metrics });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid JSON format' 
    });
  }
  
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// 404 handler
app.use((_, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 AI Platform Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
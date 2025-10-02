import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  hash: string;
  role: 'user' | 'admin' | 'researcher' | 'developer';
  createdAt: string;
}

export interface AIModel {
  id: string;
  name: string;
  type: string;
  status: 'training' | 'ready' | 'error' | 'idle';
  accuracy: number;
  lastTrained: string;
  dataset: string;
  description: string;
  parameters: number;
  size: number;
  userId: string;
  createdAt: string;
}

export interface Dataset {
  id: string;
  name: string;
  size: number;
  records: number;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'error';
  userId: string;
  fileType: string;
  description?: string;
}

export interface Analytics {
  totalModels: number;
  activeModels: number;
  totalDatasets: number;
  totalProcessingTime: number;
  averageAccuracy: number;
  monthlyGrowth: number;
  userEngagement: number;
}

// Initialize database with sample data
const initializeDatabase = async () => {
  const adminHash = await bcrypt.hash('admin123', 12);
  const userHash = await bcrypt.hash('user123', 12);
  
  return {
    users: [
      {
        id: '1',
        name: 'Administrador',
        email: 'admin@aiplatform.com',
        hash: adminHash,
        role: 'admin' as const,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Usuario Demo',
        email: 'user@aiplatform.com',
        hash: userHash,
        role: 'user' as const,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Investigador IA',
        email: 'researcher@aiplatform.com',
        hash: userHash,
        role: 'researcher' as const,
        createdAt: new Date().toISOString()
      }
    ],
    models: [
      {
        id: '1',
        name: 'CNN Image Classifier',
        type: 'CNN',
        status: 'ready' as const,
        accuracy: 94.2,
        lastTrained: '2024-01-15',
        dataset: 'CIFAR-10',
        description: 'Clasificador de imágenes usando CNN para el dataset CIFAR-10',
        parameters: 1250000,
        size: 4.8,
        userId: '1',
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: '2',
        name: 'LSTM Sentiment Analysis',
        type: 'LSTM',
        status: 'training' as const,
        accuracy: 87.5,
        lastTrained: '2024-01-14',
        dataset: 'IMDB Reviews',
        description: 'Análisis de sentimientos usando LSTM en reseñas de películas',
        parameters: 890000,
        size: 3.4,
        userId: '2',
        createdAt: '2024-01-12T14:30:00Z'
      },
      {
        id: '3',
        name: 'BERT Text Classification',
        type: 'BERT',
        status: 'ready' as const,
        accuracy: 96.8,
        lastTrained: '2024-01-13',
        dataset: 'News Articles',
        description: 'Clasificación de texto usando BERT pre-entrenado',
        parameters: 110000000,
        size: 420.0,
        userId: '3',
        createdAt: '2024-01-08T09:15:00Z'
      }
    ],
    datasets: [
      {
        id: '1',
        name: 'CIFAR-10',
        size: 162.5,
        records: 60000,
        uploadedAt: '2024-01-10T10:00:00Z',
        status: 'ready' as const,
        userId: '1',
        fileType: 'images',
        description: 'Dataset de imágenes para clasificación de objetos'
      },
      {
        id: '2',
        name: 'IMDB Reviews',
        size: 45.2,
        records: 50000,
        uploadedAt: '2024-01-12T14:30:00Z',
        status: 'ready' as const,
        userId: '2',
        fileType: 'text',
        description: 'Reseñas de películas para análisis de sentimientos'
      },
      {
        id: '3',
        name: 'News Articles',
        size: 78.9,
        records: 120000,
        uploadedAt: '2024-01-14T16:45:00Z',
        status: 'processing' as const,
        userId: '3',
        fileType: 'text',
        description: 'Artículos de noticias para clasificación de categorías'
      }
    ],
    analytics: {
      totalModels: 3,
      activeModels: 2,
      totalDatasets: 3,
      totalProcessingTime: 1247,
      averageAccuracy: 92.8,
      monthlyGrowth: 15.3,
      userEngagement: 78.5
    }
  };
};

// Initialize database
let dbInstance: any = null;

const initDb = async () => {
  if (!dbInstance) {
    dbInstance = await initializeDatabase();
  }
  return dbInstance;
};

export { initDb };

// For backward compatibility, we'll initialize synchronously with a simple structure
export const db = {
  users: [
    {
      id: '1',
      name: 'Administrador',
      email: 'admin@aiplatform.com',
      hash: '$2a$12$V4dL3P0Tf9uXXolxtJZDXedsr01vK0ilRJBFdRBIKbEOaoDjo02kW', // admin123
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Usuario Demo',
      email: 'user@aiplatform.com',
      hash: '$2a$12$elee6ykJBhqAH8BcBzwFeOLUs28dVVMk5wDfnpjp.BJU1aT935nQG', // user123
      role: 'user',
      createdAt: new Date().toISOString()
    }
  ],
  models: [],
  datasets: [],
  data: [] as any[],
  analytics: {
    totalModels: 0,
    activeModels: 0,
    totalDatasets: 0,
    totalProcessingTime: 0,
    averageAccuracy: 0,
    monthlyGrowth: 0,
    userEngagement: 0
  }
};
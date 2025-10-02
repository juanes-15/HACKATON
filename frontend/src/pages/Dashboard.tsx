import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBrain, 
  FaRobot, 
  FaChartLine, 
  FaDatabase, 
  FaCog, 
  FaPlay, 
  FaPause, 
  FaStop,
  FaUpload,
  FaDownload,
  FaEye,
  FaTrash,
  FaEdit
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { aiModelsService, dataService, analyticsService } from '../services/api';
import { toast } from 'react-toastify';

interface AIModel {
  id: string;
  name: string;
  type: string;
  status: 'training' | 'ready' | 'error' | 'idle';
  accuracy: number;
  lastTrained: string;
  dataset: string;
}

interface Dataset {
  id: string;
  name: string;
  size: number;
  records: number;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'error';
}

export default function Dashboard() {
  const { user } = useAuth();
  const [models, setModels] = useState<AIModel[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [trainingModels, setTrainingModels] = useState<Set<string>>(new Set());

  // Mock data for charts
  const performanceData = [
    { name: 'Ene', accuracy: 85, loss: 0.15 },
    { name: 'Feb', accuracy: 87, loss: 0.13 },
    { name: 'Mar', accuracy: 89, loss: 0.11 },
    { name: 'Abr', accuracy: 91, loss: 0.09 },
    { name: 'May', accuracy: 93, loss: 0.07 },
    { name: 'Jun', accuracy: 94, loss: 0.06 }
  ];

  const modelTypesData = [
    { name: 'CNN', value: 35, color: '#8884d8' },
    { name: 'RNN', value: 25, color: '#82ca9d' },
    { name: 'Transformer', value: 20, color: '#ffc658' },
    { name: 'GAN', value: 15, color: '#ff7300' },
    { name: 'Otros', value: 5, color: '#00ff00' }
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setModels([
        {
          id: '1',
          name: 'CNN Image Classifier',
          type: 'CNN',
          status: 'ready',
          accuracy: 94.2,
          lastTrained: '2024-01-15',
          dataset: 'CIFAR-10'
        },
        {
          id: '2',
          name: 'LSTM Sentiment Analysis',
          type: 'RNN',
          status: 'training',
          accuracy: 87.5,
          lastTrained: '2024-01-14',
          dataset: 'IMDB Reviews'
        },
        {
          id: '3',
          name: 'BERT Text Classification',
          type: 'Transformer',
          status: 'ready',
          accuracy: 96.8,
          lastTrained: '2024-01-13',
          dataset: 'News Articles'
        }
      ]);

      setDatasets([
        {
          id: '1',
          name: 'CIFAR-10',
          size: 162.5,
          records: 60000,
          uploadedAt: '2024-01-10',
          status: 'ready'
        },
        {
          id: '2',
          name: 'IMDB Reviews',
          size: 45.2,
          records: 50000,
          uploadedAt: '2024-01-12',
          status: 'ready'
        },
        {
          id: '3',
          name: 'News Articles',
          size: 78.9,
          records: 120000,
          uploadedAt: '2024-01-14',
          status: 'processing'
        }
      ]);

      setMetrics({
        totalModels: 3,
        activeModels: 2,
        totalDatasets: 3,
        totalProcessingTime: 1247,
        averageAccuracy: 92.8
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleTrainModel = async (modelId: string) => {
    try {
      setTrainingModels(prev => new Set(prev).add(modelId));
      toast.info('Iniciando entrenamiento del modelo...');
      
      // Simulate training process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setModels(prev => prev.map(model => 
        model.id === modelId 
          ? { ...model, status: 'ready', accuracy: Math.min(99, model.accuracy + Math.random() * 5) }
          : model
      ));
      
      toast.success('Modelo entrenado exitosamente');
    } catch (error) {
      toast.error('Error al entrenar el modelo');
    } finally {
      setTrainingModels(prev => {
        const newSet = new Set(prev);
        newSet.delete(modelId);
        return newSet;
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: {[key: string]: string} = {
      ready: 'success',
      training: 'warning',
      error: 'danger',
      idle: 'secondary',
      processing: 'info'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <Spinner animation="border" size="lg" />
          <p className="mt-3">Cargando dashboard...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="dashboard-page">
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 mb-1">Dashboard de IA</h1>
                <p className="text-muted mb-0">
                  Bienvenido, {user?.name || 'Usuario'} - Panel de control de tu plataforma de IA
                </p>
              </div>
              <div>
                <Button variant="primary" as={Link} to="/data-upload" className="me-2">
                  <FaUpload className="me-2" />
                  Subir Datos
                </Button>
                <Button variant="outline-primary" as={Link} to="/ai-models">
                  <FaBrain className="me-2" />
                  Gestionar Modelos
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaBrain size={32} className="text-primary mb-2" />
                <h3 className="text-primary fw-bold">{metrics.totalModels}</h3>
                <p className="text-muted mb-0">Modelos Totales</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaRobot size={32} className="text-success mb-2" />
                <h3 className="text-success fw-bold">{metrics.activeModels}</h3>
                <p className="text-muted mb-0">Modelos Activos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaDatabase size={32} className="text-info mb-2" />
                <h3 className="text-info fw-bold">{metrics.totalDatasets}</h3>
                <p className="text-muted mb-0">Datasets</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <FaChartLine size={32} className="text-warning mb-2" />
                <h3 className="text-warning fw-bold">{metrics.averageAccuracy}%</h3>
                <p className="text-muted mb-0">Precisión Promedio</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Models Section */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Modelos de IA</h5>
                  <Button variant="outline-primary" size="sm" as={Link} to="/ai-models">
                    Ver Todos
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  {models.map((model) => (
                    <Col md={6} key={model.id} className="mb-3">
                      <Card className="h-100 border">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="mb-0">{model.name}</h6>
                            {getStatusBadge(model.status)}
                          </div>
                          <p className="text-muted small mb-2">Tipo: {model.type}</p>
                          <p className="text-muted small mb-2">Dataset: {model.dataset}</p>
                          <div className="mb-2">
                            <small className="text-muted">Precisión: {model.accuracy}%</small>
                            <ProgressBar 
                              now={model.accuracy} 
                              variant="success" 
                              size="sm" 
                              className="mt-1"
                            />
                          </div>
                          <div className="d-flex gap-1">
                            {model.status === 'ready' && (
                              <Button 
                                size="sm" 
                                variant="outline-primary"
                                onClick={() => handleTrainModel(model.id)}
                                disabled={trainingModels.has(model.id)}
                              >
                                {trainingModels.has(model.id) ? (
                                  <Spinner size="sm" />
                                ) : (
                                  <FaPlay />
                                )}
                              </Button>
                            )}
                            <Button size="sm" variant="outline-secondary">
                              <FaEye />
                            </Button>
                            <Button size="sm" variant="outline-secondary">
                              <FaEdit />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Performance Chart */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Rendimiento de Modelos</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="accuracy" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="loss" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Recent Datasets */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Datasets Recientes</h5>
              </Card.Header>
              <Card.Body>
                {datasets.map((dataset) => (
                  <div key={dataset.id} className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-0">{dataset.name}</h6>
                      <small className="text-muted">
                        {dataset.records.toLocaleString()} registros • {dataset.size} MB
                      </small>
                    </div>
                    {getStatusBadge(dataset.status)}
                  </div>
                ))}
                <Button variant="outline-primary" size="sm" as={Link} to="/data-upload" className="w-100">
                  <FaUpload className="me-2" />
                  Subir Nuevo Dataset
                </Button>
              </Card.Body>
            </Card>

            {/* Model Types Distribution */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Distribución de Modelos</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={modelTypesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {modelTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {modelTypesData.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center">
                        <div 
                          className="me-2" 
                          style={{ 
                            width: 12, 
                            height: 12, 
                            backgroundColor: item.color,
                            borderRadius: '50%' 
                          }} 
                        />
                        <small>{item.name}</small>
                      </div>
                      <small className="fw-bold">{item.value}%</small>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
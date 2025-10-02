import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Dropdown, Form } from 'react-bootstrap';
import { FaChartLine, FaDownload, FaFilter, FaCalendarAlt, FaEye } from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { analyticsService } from '../services/api';

interface Metric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface ChartData {
  name: string;
  [key: string]: any;
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedModel, setSelectedModel] = useState('all');
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // Mock data for charts
  const performanceData: ChartData[] = [
    { name: 'Ene', accuracy: 85, loss: 0.15, precision: 0.87, recall: 0.82 },
    { name: 'Feb', accuracy: 87, loss: 0.13, precision: 0.89, recall: 0.84 },
    { name: 'Mar', accuracy: 89, loss: 0.11, precision: 0.91, recall: 0.86 },
    { name: 'Abr', accuracy: 91, loss: 0.09, precision: 0.93, recall: 0.88 },
    { name: 'May', accuracy: 93, loss: 0.07, precision: 0.95, recall: 0.90 },
    { name: 'Jun', accuracy: 94, loss: 0.06, precision: 0.96, recall: 0.91 }
  ];

  const modelPerformanceData: ChartData[] = [
    { name: 'CNN Image Classifier', accuracy: 94.2, training_time: 45, inference_time: 0.8 },
    { name: 'LSTM Sentiment', accuracy: 87.5, training_time: 32, inference_time: 1.2 },
    { name: 'BERT Text Classifier', accuracy: 96.8, training_time: 120, inference_time: 2.1 },
    { name: 'GAN Face Generator', accuracy: 89.3, training_time: 180, inference_time: 0.5 }
  ];

  const dataDistributionData = [
    { name: 'Entrenamiento', value: 70, color: '#8884d8' },
    { name: 'Validación', value: 20, color: '#82ca9d' },
    { name: 'Prueba', value: 10, color: '#ffc658' }
  ];

  const errorAnalysisData: ChartData[] = [
    { name: 'Falsos Positivos', value: 12, color: '#ff7300' },
    { name: 'Falsos Negativos', value: 8, color: '#ff0000' },
    { name: 'Verdaderos Positivos', value: 156, color: '#00ff00' },
    { name: 'Verdaderos Negativos', value: 124, color: '#0080ff' }
  ];

  const resourceUsageData: ChartData[] = [
    { name: 'Ene', cpu: 45, memory: 62, gpu: 78 },
    { name: 'Feb', cpu: 52, memory: 68, gpu: 82 },
    { name: 'Mar', cpu: 48, memory: 65, gpu: 75 },
    { name: 'Abr', cpu: 55, memory: 70, gpu: 85 },
    { name: 'May', cpu: 58, memory: 72, gpu: 88 },
    { name: 'Jun', cpu: 61, memory: 75, gpu: 90 }
  ];

  useEffect(() => {
    loadAnalytics();
  }, [timeRange, selectedModel]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics([
        { name: 'Precisión Promedio', value: 92.8, change: 2.3, trend: 'up' },
        { name: 'Tiempo de Entrenamiento', value: 94.5, change: -5.2, trend: 'down' },
        { name: 'Uso de GPU', value: 78.2, change: 1.8, trend: 'up' },
        { name: 'Modelos Activos', value: 12, change: 0, trend: 'stable' }
      ]);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <span className="text-success">↗</span>;
      case 'down': return <span className="text-danger">↘</span>;
      default: return <span className="text-muted">→</span>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'success';
      case 'down': return 'danger';
      default: return 'secondary';
    }
  };

  const exportData = () => {
    // Simulate data export
    const data = {
      timeRange,
      selectedModel,
      metrics,
      performanceData,
      modelPerformanceData,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timeRange}-${selectedModel}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="analytics-page">
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 mb-1">
                  <FaChartLine className="me-2 text-primary" />
                  Analytics
                </h1>
                <p className="text-muted mb-0">
                  Métricas y análisis de rendimiento de tus modelos de IA
                </p>
              </div>
              <div className="d-flex gap-2">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="time-range-dropdown">
                    <FaCalendarAlt className="me-2" />
                    {timeRange === '7d' ? 'Últimos 7 días' : 
                     timeRange === '30d' ? 'Últimos 30 días' : 
                     timeRange === '90d' ? 'Últimos 90 días' : 'Último año'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTimeRange('7d')}>Últimos 7 días</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTimeRange('30d')}>Últimos 30 días</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTimeRange('90d')}>Últimos 90 días</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTimeRange('1y')}>Último año</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="model-dropdown">
                    <FaFilter className="me-2" />
                    {selectedModel === 'all' ? 'Todos los modelos' : selectedModel}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedModel('all')}>Todos los modelos</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedModel('CNN Image Classifier')}>CNN Image Classifier</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedModel('LSTM Sentiment')}>LSTM Sentiment</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedModel('BERT Text Classifier')}>BERT Text Classifier</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                <Button variant="primary" onClick={exportData}>
                  <FaDownload className="me-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Metrics Cards */}
        <Row className="mb-4">
          {metrics.map((metric, index) => (
            <Col md={3} key={index}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-1">{metric.name}</h6>
                      <h3 className="mb-0">{metric.value}{metric.name.includes('Tiempo') ? ' min' : metric.name.includes('Uso') ? '%' : metric.name.includes('Modelos') ? '' : '%'}</h3>
                    </div>
                    <div className="text-end">
                      <Badge bg={getTrendColor(metric.trend)} className="mb-1">
                        {getTrendIcon(metric.trend)} {Math.abs(metric.change)}%
                      </Badge>
                      <div className="small text-muted">
                        vs período anterior
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          {/* Performance Trends */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Tendencias de Rendimiento</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="accuracy" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="precision" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="recall" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>

            {/* Model Comparison */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Comparación de Modelos</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={modelPerformanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" fill="#8884d8" name="Precisión (%)" />
                    <Bar dataKey="training_time" fill="#82ca9d" name="Tiempo Entrenamiento (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Data Distribution */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Distribución de Datos</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={dataDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {dataDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {dataDistributionData.map((item, index) => (
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

            {/* Error Analysis */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Análisis de Errores</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={errorAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>

            {/* Resource Usage */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Uso de Recursos</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={resourceUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#82ca9d" strokeWidth={2} name="Memoria %" />
                    <Line type="monotone" dataKey="gpu" stroke="#ffc658" strokeWidth={2} name="GPU %" />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

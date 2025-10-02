import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FaBrain, FaPlus, FaPlay, FaPause, FaStop, FaEdit, FaTrash, FaEye, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { aiModelsService } from '../services/api';

interface AIModel {
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
}

export default function AIModels() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [trainingModels, setTrainingModels] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: '',
    type: 'CNN',
    description: '',
    dataset: ''
  });

  const modelTypes = [
    { value: 'CNN', label: 'Convolutional Neural Network (CNN)' },
    { value: 'RNN', label: 'Recurrent Neural Network (RNN)' },
    { value: 'LSTM', label: 'Long Short-Term Memory (LSTM)' },
    { value: 'Transformer', label: 'Transformer' },
    { value: 'BERT', label: 'BERT' },
    { value: 'GAN', label: 'Generative Adversarial Network (GAN)' },
    { value: 'ResNet', label: 'Residual Network (ResNet)' },
    { value: 'VGG', label: 'Visual Geometry Group (VGG)' }
  ];

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setModels([
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
        },
        {
          id: '3',
          name: 'BERT Text Classification',
          type: 'BERT',
          status: 'ready',
          accuracy: 96.8,
          lastTrained: '2024-01-13',
          dataset: 'News Articles',
          description: 'Clasificación de texto usando BERT pre-entrenado',
          parameters: 110000000,
          size: 420.0
        },
        {
          id: '4',
          name: 'GAN Face Generator',
          type: 'GAN',
          status: 'idle',
          accuracy: 0,
          lastTrained: '2024-01-10',
          dataset: 'CelebA',
          description: 'Generador de caras usando GAN con dataset CelebA',
          parameters: 25000000,
          size: 95.2
        }
      ]);
    } catch (error) {
      console.error('Error loading models:', error);
      toast.error('Error al cargar los modelos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateModel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newModel: AIModel = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        status: 'idle',
        accuracy: 0,
        lastTrained: new Date().toISOString().split('T')[0],
        dataset: formData.dataset,
        description: formData.description,
        parameters: Math.floor(Math.random() * 10000000),
        size: Math.random() * 100
      };
      
      setModels(prev => [newModel, ...prev]);
      setShowCreateModal(false);
      setFormData({ name: '', type: 'CNN', description: '', dataset: '' });
      toast.success('Modelo creado exitosamente');
    } catch (error) {
      toast.error('Error al crear el modelo');
    }
  };

  const handleTrainModel = async (modelId: string) => {
    try {
      setTrainingModels(prev => new Set(prev).add(modelId));
      toast.info('Iniciando entrenamiento del modelo...');
      
      // Simulate training process
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      setModels(prev => prev.map(model => 
        model.id === modelId 
          ? { 
              ...model, 
              status: 'ready', 
              accuracy: Math.min(99, model.accuracy + Math.random() * 10),
              lastTrained: new Date().toISOString().split('T')[0]
            }
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

  const handleDeleteModel = async (modelId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este modelo?')) {
      try {
        setModels(prev => prev.filter(model => model.id !== modelId));
        toast.success('Modelo eliminado exitosamente');
      } catch (error) {
        toast.error('Error al eliminar el modelo');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: {[key: string]: {bg: string, text: string}} = {
      ready: { bg: 'success', text: 'Listo' },
      training: { bg: 'warning', text: 'Entrenando' },
      error: { bg: 'danger', text: 'Error' },
      idle: { bg: 'secondary', text: 'Inactivo' }
    };
    const variant = variants[status] || { bg: 'secondary', text: status };
    return <Badge bg={variant.bg}>{variant.text}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <FaPlay className="text-success" />;
      case 'training': return <Spinner size="sm" className="text-warning" />;
      case 'error': return <FaStop className="text-danger" />;
      default: return <FaPause className="text-secondary" />;
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <Spinner animation="border" size="lg" />
          <p className="mt-3">Cargando modelos de IA...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="ai-models-page">
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 mb-1">
                  <FaBrain className="me-2 text-primary" />
                  Modelos de IA
                </h1>
                <p className="text-muted mb-0">
                  Gestiona y entrena tus modelos de inteligencia artificial
                </p>
              </div>
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                <FaPlus className="me-2" />
                Crear Modelo
              </Button>
            </div>
          </Col>
        </Row>

        {/* Models Grid */}
        <Row>
          {models.map((model) => (
            <Col lg={6} xl={4} key={model.id} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{model.name}</h5>
                    {getStatusBadge(model.status)}
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <small className="text-muted">Tipo: {model.type}</small>
                    <p className="mt-2 mb-3">{model.description}</p>
                  </div>
                  
                  <div className="row text-center mb-3">
                    <div className="col-4">
                      <div className="border-end">
                        <h6 className="text-primary mb-0">{model.accuracy}%</h6>
                        <small className="text-muted">Precisión</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border-end">
                        <h6 className="text-info mb-0">{(model.parameters / 1000000).toFixed(1)}M</h6>
                        <small className="text-muted">Parámetros</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <h6 className="text-warning mb-0">{model.size.toFixed(1)}MB</h6>
                      <small className="text-muted">Tamaño</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">Dataset: {model.dataset}</small><br />
                    <small className="text-muted">Último entrenamiento: {model.lastTrained}</small>
                  </div>

                  <div className="d-flex gap-2">
                    {model.status === 'idle' && (
                      <Button 
                        size="sm" 
                        variant="outline-primary"
                        onClick={() => handleTrainModel(model.id)}
                        disabled={trainingModels.has(model.id)}
                        className="flex-fill"
                      >
                        {trainingModels.has(model.id) ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <FaPlay className="me-1" />
                            Entrenar
                          </>
                        )}
                      </Button>
                    )}
                    <Button size="sm" variant="outline-secondary">
                      <FaEye />
                    </Button>
                    <Button size="sm" variant="outline-secondary">
                      <FaEdit />
                    </Button>
                    <Button size="sm" variant="outline-danger">
                      <FaTrash />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Create Model Modal */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <FaBrain className="me-2" />
              Crear Nuevo Modelo
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleCreateModel}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre del Modelo</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ej: CNN Image Classifier"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Modelo</Form.Label>
                    <Form.Select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    >
                      {modelTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Dataset</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.dataset}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataset: e.target.value }))}
                  placeholder="Ej: CIFAR-10, IMDB Reviews"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe el propósito y características del modelo"
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Crear Modelo
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar, Table, Badge } from 'react-bootstrap';
import { FaUpload, FaFile, FaTrash, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { dataService } from '../services/api';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  progress: number;
  records?: number;
  uploadedAt: string;
  error?: string;
}

export default function DataUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      'text/csv',
      'application/json',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (file.size > maxSize) {
      return `El archivo ${file.name} es demasiado grande. Máximo 100MB.`;
    }

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|json|txt|xlsx?)$/i)) {
      return `El archivo ${file.name} no es un formato válido. Formatos permitidos: CSV, JSON, TXT, XLSX.`;
    }

    return null;
  };

  const handleFiles = async (fileList: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Validate files
    fileList.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
    }

    if (validFiles.length === 0) return;

    setUploading(true);

    // Process each file
    for (const file of validFiles) {
      const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        uploadedAt: new Date().toISOString()
      };

      setFiles(prev => [...prev, newFile]);

      try {
        // Simulate upload progress
        await simulateUpload(fileId, file);
      } catch (error) {
        console.error('Upload error:', error);
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'error', error: 'Error al subir el archivo' }
            : f
        ));
        toast.error(`Error al subir ${file.name}`);
      }
    }

    setUploading(false);
  };

  const simulateUpload = async (fileId: string, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', `Dataset: ${file.name}`);

      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Simulate processing
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, status: 'processing' }
              : f
          ));

          // Simulate processing completion
          setTimeout(() => {
            const records = Math.floor(Math.random() * 100000) + 1000;
            setFiles(prev => prev.map(f => 
              f.id === fileId 
                ? { 
                    ...f, 
                    status: 'ready', 
                    records,
                    progress: 100
                  }
                : f
            ));
            toast.success(`${file.name} procesado exitosamente (${records.toLocaleString()} registros)`);
            resolve();
          }, 2000);
        } else {
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, progress }
              : f
          ));
        }
      }, 200);
    });
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast.info('Archivo eliminado');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    const variants: {[key: string]: {bg: string, text: string, icon: React.ReactNode}} = {
      uploading: { bg: 'info', text: 'Subiendo', icon: <FaSpinner className="fa-spin" /> },
      processing: { bg: 'warning', text: 'Procesando', icon: <FaSpinner className="fa-spin" /> },
      ready: { bg: 'success', text: 'Listo', icon: <FaCheck /> },
      error: { bg: 'danger', text: 'Error', icon: <FaTimes /> }
    };
    const variant = variants[status] || { bg: 'secondary', text: status, icon: null };
    return (
      <Badge bg={variant.bg} className="d-flex align-items-center gap-1">
        {variant.icon}
        {variant.text}
      </Badge>
    );
  };

  return (
    <div className="data-upload-page">
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="h2 mb-1">
              <FaUpload className="me-2 text-primary" />
              Carga de Datos
            </h1>
            <p className="text-muted mb-0">
              Sube y procesa datasets para entrenar tus modelos de IA
            </p>
          </Col>
        </Row>

        <Row>
          {/* Upload Area */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Subir Archivos</h5>
              </Card.Header>
              <Card.Body>
                <div
                  className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <FaUpload size={48} className="text-muted mb-3" />
                    <h5>Arrastra archivos aquí o haz clic para seleccionar</h5>
                    <p className="text-muted mb-3">
                      Formatos soportados: CSV, JSON, TXT, XLSX<br />
                      Tamaño máximo: 100MB por archivo
                    </p>
                    <Button variant="outline-primary" disabled={uploading}>
                      {uploading ? 'Subiendo...' : 'Seleccionar Archivos'}
                    </Button>
                  </div>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".csv,.json,.txt,.xlsx,.xls"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </Card.Body>
            </Card>

            {/* Upload Progress */}
            {files.length > 0 && (
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <h5 className="mb-0">Progreso de Carga</h5>
                </Card.Header>
                <Card.Body>
                  {files.map((file) => (
                    <div key={file.id} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <FaFile className="me-2 text-muted" />
                          <span className="fw-medium">{file.name}</span>
                          <span className="text-muted ms-2">({formatFileSize(file.size)})</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {getStatusBadge(file.status)}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleRemoveFile(file.id)}
                            disabled={file.status === 'uploading' || file.status === 'processing'}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                      
                      {(file.status === 'uploading' || file.status === 'processing') && (
                        <ProgressBar 
                          now={file.progress} 
                          variant={file.status === 'uploading' ? 'info' : 'warning'}
                          className="mb-2"
                        />
                      )}
                      
                      {file.status === 'ready' && file.records && (
                        <Alert variant="success" className="mb-0 py-2">
                          <FaCheck className="me-2" />
                          Procesado exitosamente: {file.records.toLocaleString()} registros
                        </Alert>
                      )}
                      
                      {file.status === 'error' && (
                        <Alert variant="danger" className="mb-0 py-2">
                          <FaTimes className="me-2" />
                          {file.error || 'Error al procesar el archivo'}
                        </Alert>
                      )}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Upload Guidelines */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Guías de Carga</h5>
              </Card.Header>
              <Card.Body>
                <h6>Formatos Soportados:</h6>
                <ul className="list-unstyled">
                  <li><Badge bg="secondary" className="me-2">CSV</Badge> Datos tabulares</li>
                  <li><Badge bg="secondary" className="me-2">JSON</Badge> Datos estructurados</li>
                  <li><Badge bg="secondary" className="me-2">TXT</Badge> Texto plano</li>
                  <li><Badge bg="secondary" className="me-2">XLSX</Badge> Hojas de cálculo</li>
                </ul>
                
                <h6 className="mt-3">Recomendaciones:</h6>
                <ul className="small text-muted">
                  <li>Usa encabezados descriptivos en CSV</li>
                  <li>Evita caracteres especiales en nombres</li>
                  <li>Verifica la codificación UTF-8</li>
                  <li>Limpia datos antes de subir</li>
                </ul>
              </Card.Body>
            </Card>

            {/* Recent Uploads */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">Cargas Recientes</h5>
              </Card.Header>
              <Card.Body>
                {files.filter(f => f.status === 'ready').length === 0 ? (
                  <p className="text-muted text-center mb-0">No hay archivos procesados</p>
                ) : (
                  <div className="space-y-2">
                    {files.filter(f => f.status === 'ready').slice(0, 5).map((file) => (
                      <div key={file.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <div>
                          <small className="fw-medium">{file.name}</small>
                          <br />
                          <small className="text-muted">
                            {file.records?.toLocaleString()} registros
                          </small>
                        </div>
                        <Badge bg="success">Listo</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .upload-area {
          border: 2px dashed #dee2e6;
          border-radius: 8px;
          padding: 3rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: #f8f9fa;
        }
        
        .upload-area:hover {
          border-color: #0d6efd;
          background-color: #e7f1ff;
        }
        
        .upload-area.drag-active {
          border-color: #0d6efd;
          background-color: #e7f1ff;
        }
        
        .upload-area.uploading {
          pointer-events: none;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}

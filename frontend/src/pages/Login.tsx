import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/api';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }

    setLoading(true);
    
    try {
      const response = await authService.login(formData.email, formData.password);
      
      if (response.success) {
        login(response.token, response.user);
        toast.success('¡Bienvenido! Has iniciado sesión correctamente');
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Error al iniciar sesión');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        toast.error('Credenciales incorrectas');
      } else if (error.response?.status === 429) {
        toast.error('Demasiados intentos. Intenta más tarde');
      } else {
        toast.error('Error de conexión. Intenta nuevamente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <FaBrain size={48} className="text-primary mb-3" />
                  <h2 className="fw-bold">Iniciar Sesión</h2>
                  <p className="text-muted">Accede a tu plataforma de IA</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!errors.email}
                      placeholder="tu@email.com"
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        isInvalid={!!errors.password}
                        placeholder="Tu contraseña"
                        disabled={loading}
                      />
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-50 translate-middle-y text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        style={{ border: 'none', background: 'none' }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-0">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-decoration-none">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>

                <div className="mt-4">
                  <hr />
                  <div className="text-center">
                    <small className="text-muted">
                      <strong>Credenciales de prueba:</strong><br />
                      Email: admin@aiplatform.com<br />
                      Contraseña: admin123
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

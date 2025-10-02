import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBrain, FaRobot, FaChartLine, FaDatabase, FaCog, FaRocket } from 'react-icons/fa';

export default function Home() {
  const features = [
    {
      icon: <FaBrain className="text-primary" size={48} />,
      title: "Modelos de IA",
      description: "Explora y gestiona modelos de inteligencia artificial avanzados",
      link: "/ai-models"
    },
    {
      icon: <FaDatabase className="text-success" size={48} />,
      title: "Gestión de Datos",
      description: "Sube y procesa datasets para entrenar tus modelos",
      link: "/data-upload"
    },
    {
      icon: <FaChartLine className="text-info" size={48} />,
      title: "Analytics",
      description: "Visualiza métricas y rendimiento de tus modelos",
      link: "/analytics"
    },
    {
      icon: <FaCog className="text-warning" size={48} />,
      title: "Dashboard",
      description: "Panel de control completo para gestionar tu plataforma",
      link: "/dashboard"
    }
  ];

  const stats = [
    { label: "Modelos Activos", value: "1,247", color: "primary" },
    { label: "Usuarios Registrados", value: "3,891", color: "success" },
    { label: "Procesos Completados", value: "15,632", color: "info" },
    { label: "Precisión Promedio", value: "94.2%", color: "warning" }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-primary text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <div className="hero-content">
                <Badge bg="light" text="dark" className="mb-3 px-3 py-2">
                  <FaRocket className="me-2" />
                  Plataforma de IA Avanzada
                </Badge>
                <h1 className="display-4 fw-bold mb-4">
                  Inteligencia Artificial
                  <span className="text-warning"> para Todos</span>
                </h1>
                <p className="lead mb-4">
                  Desarrolla, entrena y despliega modelos de inteligencia artificial 
                  con nuestra plataforma integral. Desde machine learning hasta deep learning.
                </p>
                <div className="d-flex gap-3">
                  <Button variant="light" size="lg" as={Link} to="/register">
                    Comenzar Ahora
                  </Button>
                  <Button variant="outline-light" size="lg" as={Link} to="/ai-models">
                    Explorar Modelos
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image text-center">
                <div className="ai-visualization">
                  <FaRobot size={200} className="text-warning mb-3" />
                  <div className="neural-network">
                    <div className="node"></div>
                    <div className="node"></div>
                    <div className="node"></div>
                    <div className="connection"></div>
                    <div className="connection"></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 bg-light">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col md={3} key={index} className="text-center mb-4">
                <div className="stat-card">
                  <h3 className={`text-${stat.color} fw-bold`}>{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold">Características Principales</h2>
              <p className="lead text-muted">
                Todo lo que necesitas para desarrollar y desplegar IA
              </p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 feature-card border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">{feature.icon}</div>
                    <Card.Title className="h5">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                    <Button variant="outline-primary" as={Link} to={feature.link}>
                      Explorar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-dark text-white py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="display-6 fw-bold mb-3">
                ¿Listo para comenzar tu viaje en IA?
              </h2>
              <p className="lead mb-4">
                Únete a miles de desarrolladores que ya están creando el futuro con IA
              </p>
              <Button variant="primary" size="lg" as={Link} to="/register">
                Crear Cuenta Gratuita
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
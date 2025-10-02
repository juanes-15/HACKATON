import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBrain, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer mt-auto bg-dark text-light py-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaBrain className="me-2 text-primary" size={24} />
              <h5 className="mb-0 fw-bold">AI Platform</h5>
            </div>
            <p className="text-muted">
              Plataforma integral para el desarrollo, entrenamiento y despliegue de modelos 
              de inteligencia artificial. Construido con las tecnologías más avanzadas.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-muted">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-muted">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-muted">
                <FaEnvelope size={20} />
              </a>
            </div>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6 className="fw-bold mb-3">Plataforma</h6>
            <ul className="list-unstyled">
              <li><a href="/ai-models" className="text-muted text-decoration-none">Modelos IA</a></li>
              <li><a href="/data-upload" className="text-muted text-decoration-none">Carga de Datos</a></li>
              <li><a href="/analytics" className="text-muted text-decoration-none">Analytics</a></li>
              <li><a href="/dashboard" className="text-muted text-decoration-none">Dashboard</a></li>
            </ul>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6 className="fw-bold mb-3">Recursos</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Documentación</a></li>
              <li><a href="#" className="text-muted text-decoration-none">API Reference</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Tutoriales</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Ejemplos</a></li>
            </ul>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6 className="fw-bold mb-3">Soporte</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Centro de Ayuda</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Comunidad</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Contacto</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Estado del Sistema</a></li>
            </ul>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Términos de Uso</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Privacidad</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Cookies</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Licencias</a></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0">
              &copy; 2024 AI Platform. Desarrollado con React, TypeScript, Node.js y Bootstrap 5.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-muted mb-0">
              <small>
                Ingeniería de Sistemas - Proyecto de Inteligencia Artificial
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
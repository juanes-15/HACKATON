import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaBrain className="me-2 text-primary" size={24} />
          <span className="fw-bold">AI Platform</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/ai-models">Modelos IA</Nav.Link>
            <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
                  <FaCog className="me-1" />
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/data-upload" className="d-flex align-items-center">
                  Subir Datos
                </Nav.Link>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    <FaUser className="me-1" />
                    {user?.name || 'Usuario'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/dashboard">
                      <FaCog className="me-2" />
                      Panel de Control
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Button variant="outline-light" as={Link} to="/login" className="me-2">
                  Iniciar Sesión
                </Button>
                <Button variant="primary" as={Link} to="/register">
                  Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
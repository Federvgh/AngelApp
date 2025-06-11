import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { 
  Bell, 
  User, 
  LogOut,
  Settings,
  FileText,
  FolderOpen,
  CheckSquare,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
          <span>Proyecto Ángel</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Proyectos" id="proyectos-dropdown">
              <NavDropdown.Item href="/projects">
                <FolderOpen size={16} className="me-2" />
                Ver Todos los Proyectos
              </NavDropdown.Item>
              {user?.type === 'administrador' && (
                <NavDropdown.Item href="/projects/new">
                  Crear Nuevo Proyecto
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/projects?status=active">
                Proyectos Activos
              </NavDropdown.Item>
              <NavDropdown.Item href="/projects?status=completed">
                Proyectos Completados
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Tareas" id="tareas-dropdown">
              <NavDropdown.Item href="/tasks/my">
                <CheckSquare size={16} className="me-2" />
                Mis Tareas
              </NavDropdown.Item>
              <NavDropdown.Item href="/tasks">
                Todas las Tareas
              </NavDropdown.Item>
              {user?.type === 'administrador' && (
                <NavDropdown.Item href="/tasks/new">
                  Crear Nueva Tarea
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tasks?status=pending">
                Tareas Pendientes
              </NavDropdown.Item>
              <NavDropdown.Item href="/tasks?status=completed">
                Tareas Completadas
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Reportes" id="reportes-dropdown">
              <NavDropdown.Item href="/reports/new">
                <FileText size={16} className="me-2" />
                Crear Reporte Diario
              </NavDropdown.Item>
              <NavDropdown.Item href="/reports">
                Ver Reportes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/reports?filter=date">
                Reportes por Fecha
              </NavDropdown.Item>
              <NavDropdown.Item href="/reports?filter=project">
                Reportes por Proyecto
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Documentos" id="documentos-dropdown">
              <NavDropdown.Item href="/documents/plans">
                Planos
              </NavDropdown.Item>
              <NavDropdown.Item href="/documents/materials">
                Materiales
              </NavDropdown.Item>
              <NavDropdown.Item href="/documents/photos">
                Fotos del Proyecto
              </NavDropdown.Item>
              {user?.type === 'administrador' && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/documents/upload">
                    Subir Documentos
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <Nav.Link href="/google-sheets">
              <BarChart3 size={16} className="me-1" />
              Google Sheets
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link href="/notifications" className="d-flex align-items-center">
              <Bell size={18} />
            </Nav.Link>
            
            <NavDropdown 
              title={
                <span className="d-flex align-items-center">
                  <User size={16} className="me-2" />
                  {user?.name}
                </span>
              } 
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item href="/profile">
                <User size={16} className="me-2" />
                Perfil
              </NavDropdown.Item>
              <NavDropdown.Item href="/notifications">
                <Bell size={16} className="me-2" />
                Notificaciones
              </NavDropdown.Item>
              <NavDropdown.Item href="/settings">
                <Settings size={16} className="me-2" />
                Configuración
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                <LogOut size={16} className="me-2" />
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;


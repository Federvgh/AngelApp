import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { Plus, Search, Filter, FolderOpen, Calendar, User, MoreVertical, Eye, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Projects = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Casa Residencial - Familia García',
      status: 'En Progreso',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      manager: 'Juan Pérez',
      tasksTotal: 45,
      tasksCompleted: 29,
      lastUpdate: '2024-06-10'
    },
    {
      id: 2,
      name: 'Oficinas Corporativas - TechCorp',
      status: 'En Progreso',
      progress: 40,
      startDate: '2024-03-01',
      endDate: '2024-08-15',
      manager: 'María López',
      tasksTotal: 78,
      tasksCompleted: 31,
      lastUpdate: '2024-06-09'
    },
    {
      id: 3,
      name: 'Remodelación Cocina - Apartamento 5B',
      status: 'Completado',
      progress: 100,
      startDate: '2024-02-01',
      endDate: '2024-05-15',
      manager: 'Carlos Ruiz',
      tasksTotal: 23,
      tasksCompleted: 23,
      lastUpdate: '2024-05-15'
    },
    {
      id: 4,
      name: 'Centro Comercial - Plaza Norte',
      status: 'Planificación',
      progress: 10,
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      manager: 'Ana Martínez',
      tasksTotal: 120,
      tasksCompleted: 12,
      lastUpdate: '2024-06-08'
    }
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'En Progreso':
        return 'danger';
      case 'Completado':
        return 'success';
      case 'Planificación':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getProgressVariant = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'danger';
    if (progress >= 25) return 'warning';
    return 'secondary';
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Container fluid className="fade-in">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1 className="display-6 fw-bold text-white mb-2">
                <FolderOpen className="me-3" size={40} />
                Proyectos
              </h1>
              <p className="text-muted">Gestiona todos tus proyectos de construcción</p>
            </div>
            {user?.type === 'administrador' && (
              <Button variant="danger" size="lg" className="btn-primary-custom">
                <Plus className="me-2" size={18} />
                Nuevo Proyecto
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Body className="card-body-custom">
              <Row className="g-3">
                <Col md={8}>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark border-secondary">
                      <Search size={16} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Buscar proyectos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control-custom"
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark border-secondary">
                      <Filter size={16} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="form-control-custom"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="En Progreso">En Progreso</option>
                      <option value="Completado">Completado</option>
                      <option value="Planificación">Planificación</option>
                    </Form.Select>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Projects Grid */}
      <Row>
        {filteredProjects.map((project) => (
          <Col key={project.id} lg={6} xl={4} className="mb-4">
            <Card className="card-custom h-100">
              <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1 text-white fw-bold">{project.name}</h5>
                  <Badge bg={getStatusVariant(project.status)} className="mt-1">
                    {project.status}
                  </Badge>
                </div>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-white p-0 border-0">
                    <MoreVertical size={18} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Eye size={14} className="me-2" />
                      Ver Detalles
                    </Dropdown.Item>
                    {user?.type === 'administrador' && (
                      <Dropdown.Item>
                        <Edit size={14} className="me-2" />
                        Editar
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>

              <Card.Body className="card-body-custom">
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">Progreso</small>
                    <small className="fw-bold text-white">{project.progress}%</small>
                  </div>
                  <div className="progress progress-custom">
                    <div
                      className={`progress-bar bg-${getProgressVariant(project.progress)}`}
                      role="progressbar"
                      style={{ width: `${project.progress}%` }}
                      aria-valuenow={project.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="mb-3">
                  <div className="d-flex align-items-center text-muted mb-2">
                    <Calendar size={14} className="me-2" />
                    <small>{project.startDate} - {project.endDate}</small>
                  </div>
                  <div className="d-flex align-items-center text-muted mb-2">
                    <User size={14} className="me-2" />
                    <small>Manager: {project.manager}</small>
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <FolderOpen size={14} className="me-2" />
                    <small>{project.tasksCompleted}/{project.tasksTotal} tareas completadas</small>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <Button variant="danger" className="btn-primary-custom">
                    Ver Detalles
                  </Button>
                  {user?.type === 'administrador' && (
                    <Button variant="outline-secondary" className="btn-secondary-custom">
                      Editar Proyecto
                    </Button>
                  )}
                </div>

                {/* Last Update */}
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Última actualización: {project.lastUpdate}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Row>
          <Col>
            <Card className="card-custom">
              <Card.Body className="card-body-custom text-center py-5">
                <FolderOpen size={64} className="text-muted mb-3" />
                <h4 className="text-white mb-3">No se encontraron proyectos</h4>
                <p className="text-muted mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Intenta ajustar tus filtros de búsqueda'
                    : 'Comienza creando tu primer proyecto'
                  }
                </p>
                {user?.type === 'administrador' && !searchTerm && filterStatus === 'all' && (
                  <Button variant="danger" size="lg" className="btn-primary-custom">
                    <Plus className="me-2" size={18} />
                    Crear Primer Proyecto
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Projects;


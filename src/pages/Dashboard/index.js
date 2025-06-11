import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { 
  FolderOpen,
  CheckSquare,
  FileText,
  Camera,
  Package,
  Calendar,
  AlertTriangle,
  BarChart3,
  Settings,
  TrendingUp,
  Clock,
  Users,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const modules = [
    {
      title: 'Reporte Diario',
      description: 'Crear y enviar reporte del día',
      icon: FileText,
      href: '/reports/new',
      color: '#dc2626'
    },
    {
      title: 'Tareas del Proyecto',
      description: 'Ver y gestionar tareas asignadas',
      icon: CheckSquare,
      href: '/tasks',
      color: '#dc2626'
    },
    {
      title: 'Planos y Documentos',
      description: 'Acceder a documentos del proyecto',
      icon: FolderOpen,
      href: '/documents',
      color: '#dc2626'
    },
    {
      title: 'Galería de Fotos',
      description: 'Ver fotos del progreso',
      icon: Camera,
      href: '/documents/photos',
      color: '#dc2626'
    },
    {
      title: 'Lista de Materiales',
      description: 'Materiales confirmados',
      icon: Package,
      href: '/documents/materials',
      color: '#dc2626'
    },
    {
      title: 'Cronograma',
      description: 'Visualizar cronograma del proyecto',
      icon: Calendar,
      href: '/schedule',
      color: '#dc2626'
    },
    {
      title: 'Impedimentos',
      description: 'Registrar y ver bloqueos',
      icon: AlertTriangle,
      href: '/impediments',
      color: '#dc2626'
    },
    {
      title: 'Progreso (Sheets)',
      description: 'Ver avance calculado',
      icon: BarChart3,
      href: '/google-sheets',
      color: '#dc2626'
    }
  ];

  // Add admin-only modules
  if (user?.type === 'administrador') {
    modules.push({
      title: 'Configuración Proyecto',
      description: 'Editar detalles del proyecto',
      icon: Settings,
      href: '/projects/settings',
      color: '#dc2626'
    });
  }

  const stats = [
    {
      title: 'Proyectos Activos',
      value: '3',
      icon: TrendingUp,
      change: '+2 este mes',
      variant: 'success'
    },
    {
      title: 'Tareas Pendientes',
      value: '12',
      icon: Clock,
      change: '5 vencen hoy',
      variant: 'warning'
    },
    {
      title: 'Reportes Enviados',
      value: '28',
      icon: FileText,
      change: 'Último: Hoy',
      variant: 'info'
    },
    {
      title: 'Miembros del Equipo',
      value: '6',
      icon: Users,
      change: '2 activos hoy',
      variant: 'primary'
    }
  ];

  const recentActivities = [
    {
      icon: FileText,
      title: 'Reporte diario enviado',
      time: 'Hace 2 horas',
      type: 'success'
    },
    {
      icon: CheckSquare,
      title: 'Tarea "Instalación marcos" completada',
      time: 'Hace 4 horas',
      type: 'success'
    },
    {
      icon: Camera,
      title: '3 fotos nuevas subidas',
      time: 'Ayer',
      type: 'info'
    },
    {
      icon: AlertTriangle,
      title: 'Impedimento reportado en Proyecto A',
      time: 'Hace 1 día',
      type: 'warning'
    }
  ];

  return (
    <Container fluid className="fade-in">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Body className="card-body-custom p-4">
              <h1 className="display-6 fw-bold text-white mb-2">
                Bienvenido, {user?.name}
              </h1>
              <p className="text-muted mb-0">
                Panel de control - {user?.type === 'administrador' ? 'Administrador' : 'Carpintero'}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats Grid */}
      <Row className="mb-5">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} lg={3} className="mb-3">
            <Card className="stats-card h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="stats-label">{stat.title}</div>
                  <div className="stats-number">{stat.value}</div>
                  <Badge bg={stat.variant} className="mt-1">
                    {stat.change}
                  </Badge>
                </div>
                <div className="ms-3">
                  <stat.icon size={40} className="text-white opacity-75" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modules Grid */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-white mb-4 fw-bold">
            <Activity className="me-2" size={28} />
            Módulos del Proyecto
          </h2>
        </Col>
      </Row>
      
      <Row>
        {modules.map((module, index) => (
          <Col key={index} xs={12} sm={6} lg={4} xl={3} className="mb-4">
            <a href={module.href} className="text-decoration-none">
              <Card className="module-card h-100">
                <Card.Body className="text-center">
                  <div className="module-icon">
                    <module.icon size={28} className="text-white" />
                  </div>
                  <h5 className="module-title">{module.title}</h5>
                  <p className="module-description mb-0">
                    {module.description}
                  </p>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>

      {/* Recent Activity */}
      <Row>
        <Col lg={8}>
          <Card className="card-custom">
            <Card.Header className="card-header-custom">
              <h4 className="mb-0 fw-bold">
                <Clock className="me-2" size={20} />
                Actividad Reciente
              </h4>
            </Card.Header>
            <Card.Body className="card-body-custom">
              {recentActivities.map((activity, index) => (
                <div key={index} className="d-flex align-items-center mb-3 slide-in">
                  <div className={`p-2 rounded-circle me-3 bg-${activity.type}`}>
                    <activity.icon size={16} className="text-white" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-white fw-medium">{activity.title}</div>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="card-custom">
            <Card.Header className="card-header-custom">
              <h4 className="mb-0 fw-bold">
                <BarChart3 className="me-2" size={20} />
                Progreso General
              </h4>
            </Card.Header>
            <Card.Body className="card-body-custom">
              <div className="text-center mb-3">
                <div className="display-4 fw-bold text-white">67%</div>
                <div className="text-muted">Completado</div>
              </div>
              <div className="progress progress-custom mb-3" style={{ height: '10px' }}>
                <div 
                  className="progress-bar progress-bar-custom" 
                  role="progressbar" 
                  style={{ width: '67%' }}
                  aria-valuenow="67" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="text-center">
                <small className="text-muted">
                  Última actualización: Hoy 14:30
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;


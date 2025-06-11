import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Square,
  User,
  FolderOpen
} from 'lucide-react';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [filterPriority, setFilterPriority] = useState('todas');

  // Datos de ejemplo
  const tasks = [
    {
      id: 1,
      title: 'Instalación de módulos de cocina',
      description: 'Instalar todos los módulos superiores e inferiores según plano actualizado',
      project: 'Casa Familia García',
      projectId: 1,
      status: 'pendiente',
      priority: 'alta',
      dueDate: '2024-01-12',
      assignedTo: 'Juan Pérez',
      estimatedHours: 8,
      completedHours: 0,
      tags: ['instalación', 'cocina']
    },
    {
      id: 2,
      title: 'Medición de banquina',
      description: 'Tomar medidas exactas para la banquina de granito',
      project: 'Oficina Centro Comercial',
      projectId: 2,
      status: 'en_progreso',
      priority: 'media',
      dueDate: '2024-01-13',
      assignedTo: 'Juan Pérez',
      estimatedHours: 2,
      completedHours: 1,
      tags: ['medición', 'banquina']
    },
    {
      id: 3,
      title: 'Revisión de planos actualizados',
      description: 'Revisar los nuevos planos enviados por el arquitecto',
      project: 'Baño Principal Martínez',
      projectId: 4,
      status: 'completada',
      priority: 'baja',
      dueDate: '2024-01-11',
      assignedTo: 'Juan Pérez',
      estimatedHours: 1,
      completedHours: 1,
      tags: ['planos', 'revisión']
    },
    {
      id: 4,
      title: 'Instalación de grifería',
      description: 'Instalar toda la grifería del baño principal',
      project: 'Remodelación Cocina López',
      projectId: 3,
      status: 'completada',
      priority: 'alta',
      dueDate: '2024-01-10',
      assignedTo: 'Juan Pérez',
      estimatedHours: 4,
      completedHours: 4,
      tags: ['instalación', 'grifería']
    },
    {
      id: 5,
      title: 'Preparación de superficie',
      description: 'Preparar las paredes para la instalación de azulejos',
      project: 'Departamento Completo Rodríguez',
      projectId: 5,
      status: 'pendiente',
      priority: 'alta',
      dueDate: '2024-01-14',
      assignedTo: 'Juan Pérez',
      estimatedHours: 6,
      completedHours: 0,
      tags: ['preparación', 'azulejos']
    },
    {
      id: 6,
      title: 'Control de calidad final',
      description: 'Inspección final de todos los trabajos realizados',
      project: 'Casa Familia García',
      projectId: 1,
      status: 'pendiente',
      priority: 'media',
      dueDate: '2024-01-15',
      assignedTo: 'Juan Pérez',
      estimatedHours: 3,
      completedHours: 0,
      tags: ['control', 'calidad']
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todas' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'todas' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completada':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'en_progreso':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pendiente':
        return <Square className="w-5 h-5 text-gray-400" />;
      default:
        return <Square className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completada':
        return 'bg-green-100 text-green-800';
      case 'en_progreso':
        return 'bg-blue-100 text-blue-800';
      case 'pendiente':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completada':
        return 'Completada';
      case 'en_progreso':
        return 'En Progreso';
      case 'pendiente':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'alta':
        return 'Alta';
      case 'media':
        return 'Media';
      case 'baja':
        return 'Baja';
      default:
        return 'Sin prioridad';
    }
  };

  const isOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tareas</h1>
            <p className="text-gray-600 mt-1">Gestiona todas tus tareas y actividades</p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tarea
          </button>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="todas">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="input-field"
            >
              <option value="todas">Todas las prioridades</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
            <button className="btn-secondary flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Tareas */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de Tareas ({filteredTasks.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(task.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {task.title}
                        {isOverdue(task.dueDate) && task.status !== 'completada' && (
                          <AlertCircle className="w-4 h-4 text-red-500 inline ml-2" />
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FolderOpen className="w-4 h-4 mr-1" />
                          <span>{task.project}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span>{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className={isOverdue(task.dueDate) && task.status !== 'completada' ? 'text-red-600 font-medium' : ''}>
                            {task.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{task.completedHours}h / {task.estimatedHours}h</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                          Prioridad {getPriorityText(task.priority)}
                        </span>
                        {task.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      {task.status !== 'completada' && (
                        <button className="btn-primary text-sm py-1 px-3">
                          {task.status === 'pendiente' ? 'Iniciar' : 'Continuar'}
                        </button>
                      )}
                      <button className="btn-secondary text-sm py-1 px-3">
                        Ver Detalles
                      </button>
                    </div>
                  </div>

                  {task.status === 'en_progreso' && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progreso</span>
                        <span>{Math.round((task.completedHours / task.estimatedHours) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(task.completedHours / task.estimatedHours) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tareas</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'todas' || filterPriority !== 'todas'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primera tarea'
            }
          </p>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Crear Primera Tarea
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;


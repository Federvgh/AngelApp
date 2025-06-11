import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Camera,
  Upload,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Datos de ejemplo
  const reports = [
    {
      id: 1,
      date: '2024-01-12',
      project: 'Casa Familia García',
      projectId: 1,
      title: 'Instalación de módulos de cocina - Día 1',
      description: 'Se completó la instalación de los módulos superiores. Pendiente instalación de módulos inferiores para mañana.',
      tasksCompleted: [
        'Medición y marcado de puntos de fijación',
        'Instalación de módulos superiores (8 unidades)',
        'Verificación de nivelación'
      ],
      tasksPending: [
        'Instalación de módulos inferiores',
        'Ajuste de puertas',
        'Instalación de herrajes'
      ],
      hoursWorked: 8,
      photos: ['cocina_modulos_1.jpg', 'cocina_modulos_2.jpg'],
      issues: 'Encontramos una diferencia de 2cm en la medida del plano vs realidad. Se ajustó sobre la marcha.',
      status: 'enviado',
      createdAt: '2024-01-12 18:30'
    },
    {
      id: 2,
      date: '2024-01-11',
      project: 'Oficina Centro Comercial',
      projectId: 2,
      title: 'Preparación de superficies',
      description: 'Día dedicado a la preparación de paredes y superficies para la instalación.',
      tasksCompleted: [
        'Lijado de paredes',
        'Aplicación de primer',
        'Marcado de puntos de instalación'
      ],
      tasksPending: [
        'Instalación de paneles',
        'Colocación de molduras'
      ],
      hoursWorked: 7,
      photos: ['oficina_prep_1.jpg'],
      issues: 'Sin inconvenientes reportados.',
      status: 'enviado',
      createdAt: '2024-01-11 17:45'
    },
    {
      id: 3,
      date: '2024-01-10',
      project: 'Remodelación Cocina López',
      projectId: 3,
      title: 'Finalización del proyecto',
      description: 'Último día de trabajo. Se completaron todos los detalles finales y se realizó la entrega.',
      tasksCompleted: [
        'Instalación de grifería final',
        'Ajuste de puertas y cajones',
        'Limpieza general',
        'Entrega al cliente'
      ],
      tasksPending: [],
      hoursWorked: 6,
      photos: ['cocina_final_1.jpg', 'cocina_final_2.jpg', 'cocina_final_3.jpg'],
      issues: 'Proyecto completado exitosamente. Cliente muy satisfecho.',
      status: 'aprobado',
      createdAt: '2024-01-10 16:20'
    },
    {
      id: 4,
      date: '2024-01-09',
      project: 'Casa Familia García',
      projectId: 1,
      title: 'Preparación para instalación',
      description: 'Día de preparación y organización de materiales.',
      tasksCompleted: [
        'Recepción de materiales',
        'Verificación de inventario',
        'Preparación de herramientas'
      ],
      tasksPending: [
        'Inicio de instalación de módulos'
      ],
      hoursWorked: 4,
      photos: ['materiales_1.jpg'],
      issues: 'Faltaron 2 bisagras en el pedido. Se solicitó reposición.',
      status: 'borrador',
      createdAt: '2024-01-09 15:10'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || report.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'aprobado':
        return 'bg-green-100 text-green-800';
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'borrador':
        return 'bg-yellow-100 text-yellow-800';
      case 'rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aprobado':
        return <CheckCircle className="w-4 h-4" />;
      case 'enviado':
        return <Clock className="w-4 h-4" />;
      case 'borrador':
        return <FileText className="w-4 h-4" />;
      case 'rechazado':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'aprobado':
        return 'Aprobado';
      case 'enviado':
        return 'Enviado';
      case 'borrador':
        return 'Borrador';
      case 'rechazado':
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reportes Diarios</h1>
            <p className="text-gray-600 mt-1">Gestiona y revisa todos los reportes de trabajo</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Reporte
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
              placeholder="Buscar reportes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="input-field"
            />
            <button className="btn-secondary flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Reportes */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    <span className="ml-1">{getStatusText(report.status)}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{report.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>{report.project}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{report.hoursWorked}h trabajadas</span>
                  </div>
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 mr-1" />
                    <span>{report.photos.length} fotos</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{report.description}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="btn-secondary text-sm py-1 px-3 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver
                </button>
                <button className="btn-secondary text-sm py-1 px-3 flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tareas Completadas */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Tareas Completadas ({report.tasksCompleted.length})
                </h4>
                <ul className="space-y-1">
                  {report.tasksCompleted.map((task, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tareas Pendientes */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                  Tareas Pendientes ({report.tasksPending.length})
                </h4>
                {report.tasksPending.length > 0 ? (
                  <ul className="space-y-1">
                    {report.tasksPending.map((task, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {task}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">No hay tareas pendientes</p>
                )}
              </div>
            </div>

            {/* Inconvenientes */}
            {report.issues && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
                  Observaciones e Inconvenientes
                </h4>
                <p className="text-sm text-gray-700">{report.issues}</p>
              </div>
            )}

            {/* Fotos */}
            {report.photos.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Camera className="w-4 h-4 mr-2 text-blue-600" />
                  Fotos del Trabajo ({report.photos.length})
                </h4>
                <div className="flex space-x-2">
                  {report.photos.map((photo, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              Creado el {report.createdAt}
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron reportes</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterDate
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primer reporte diario'
            }
          </p>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear Primer Reporte
          </button>
        </div>
      )}

      {/* Modal de Crear Reporte (simplificado) */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Nuevo Reporte Diario</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
                <select className="input-field">
                  <option>Seleccionar proyecto...</option>
                  <option>Casa Familia García</option>
                  <option>Oficina Centro Comercial</option>
                  <option>Baño Principal Martínez</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título del Reporte</label>
                <input type="text" className="input-field" placeholder="Ej: Instalación de módulos - Día 1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción General</label>
                <textarea className="input-field" rows="3" placeholder="Describe el trabajo realizado hoy..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horas Trabajadas</label>
                <input type="number" className="input-field" placeholder="8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fotos del Trabajo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Arrastra fotos aquí o haz clic para seleccionar</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button className="btn-primary">Guardar Borrador</button>
              <button className="btn-primary">Enviar Reporte</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;


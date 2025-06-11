import React, { useState } from 'react';
import { 
  Sheet, 
  RefreshCw, 
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Calendar,
  Download
} from 'lucide-react';

const GoogleSheets = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState('2024-01-12 09:30');
  const [isLoading, setIsLoading] = useState(false);

  // Datos de ejemplo de Google Sheets
  const sheetsData = [
    {
      id: 1,
      projectName: 'Casa Familia García',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1abc123...',
      lastUpdated: '2024-01-12 18:30',
      totalTasks: 15,
      completedTasks: 11,
      progress: 73,
      status: 'activo',
      categories: [
        { name: 'Cocina', total: 8, completed: 6, items: ['Banquina', 'Módulos superiores', 'Módulos inferiores', 'Grifería', 'Electrodomésticos', 'Iluminación', 'Azulejos', 'Pintura'] },
        { name: 'Baño', total: 4, completed: 3, items: ['Sanitarios', 'Grifería', 'Azulejos', 'Espejo'] },
        { name: 'General', total: 3, completed: 2, items: ['Limpieza', 'Entrega', 'Documentación'] }
      ]
    },
    {
      id: 2,
      projectName: 'Oficina Centro Comercial',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/2def456...',
      lastUpdated: '2024-01-11 17:45',
      totalTasks: 20,
      completedTasks: 9,
      progress: 45,
      status: 'activo',
      categories: [
        { name: 'Preparación', total: 6, completed: 4, items: ['Medición', 'Marcado', 'Lijado', 'Primer', 'Protección', 'Herramientas'] },
        { name: 'Instalación', total: 10, completed: 3, items: ['Paneles', 'Molduras', 'Herrajes', 'Iluminación', 'Cableado', 'Switches', 'Tomacorrientes', 'Acabados', 'Pintura', 'Limpieza'] },
        { name: 'Finalización', total: 4, completed: 2, items: ['Inspección', 'Ajustes', 'Entrega', 'Documentación'] }
      ]
    },
    {
      id: 3,
      projectName: 'Baño Principal Martínez',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/3ghi789...',
      lastUpdated: '2024-01-09 15:20',
      totalTasks: 12,
      completedTasks: 2,
      progress: 17,
      status: 'planificado',
      categories: [
        { name: 'Demolición', total: 3, completed: 1, items: ['Azulejos', 'Sanitarios', 'Grifería'] },
        { name: 'Instalación', total: 6, completed: 1, items: ['Plomería', 'Electricidad', 'Azulejos', 'Sanitarios', 'Grifería', 'Accesorios'] },
        { name: 'Acabados', total: 3, completed: 0, items: ['Pintura', 'Limpieza', 'Entrega'] }
      ]
    }
  ];

  const handleSync = async () => {
    setIsLoading(true);
    // Simular sincronización
    setTimeout(() => {
      setLastSync(new Date().toLocaleString('es-ES'));
      setIsLoading(false);
    }, 2000);
  };

  const handleConnect = () => {
    setIsConnected(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'planificado':
        return 'bg-yellow-100 text-yellow-800';
      case 'completado':
        return 'bg-blue-100 text-blue-800';
      case 'pausado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'activo':
        return 'Activo';
      case 'planificado':
        return 'Planificado';
      case 'completado':
        return 'Completado';
      case 'pausado':
        return 'Pausado';
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
            <h1 className="text-2xl font-bold text-gray-900">Integración con Google Sheets</h1>
            <p className="text-gray-600 mt-1">Sincroniza y visualiza el progreso de tus proyectos desde Google Sheets</p>
          </div>
          <div className="flex items-center space-x-3">
            {isConnected ? (
              <>
                <button 
                  onClick={handleSync}
                  disabled={isLoading}
                  className="btn-secondary flex items-center"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Sincronizando...' : 'Sincronizar'}
                </button>
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Conectado
                </div>
              </>
            ) : (
              <button 
                onClick={handleConnect}
                className="btn-primary flex items-center"
              >
                <Sheet className="w-4 h-4 mr-2" />
                Conectar Google Sheets
              </button>
            )}
          </div>
        </div>
      </div>

      {!isConnected ? (
        /* Estado No Conectado */
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Sheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Conecta tu cuenta de Google</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Para sincronizar tus hojas de cálculo de Google Sheets con la aplicación, necesitas autorizar el acceso a tu cuenta de Google.
          </p>
          <button 
            onClick={handleConnect}
            className="btn-primary flex items-center mx-auto"
          >
            <Sheet className="w-5 h-5 mr-2" />
            Autorizar Acceso a Google Sheets
          </button>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
            <h4 className="font-medium text-blue-900 mb-2">¿Cómo funciona?</h4>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Conecta tu cuenta de Google de forma segura</li>
              <li>• La aplicación lee tus hojas de cálculo de proyectos</li>
              <li>• Se sincroniza automáticamente el progreso de tareas</li>
              <li>• Genera reportes de avance en tiempo real</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Estado Conectado */
        <>
          {/* Estado de Sincronización */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Estado de Sincronización</h2>
                <p className="text-sm text-gray-600">Última sincronización: {lastSync}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {sheetsData.length} hojas conectadas
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Sincronizado
                </div>
              </div>
            </div>
          </div>

          {/* Resumen General */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Tareas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sheetsData.reduce((acc, sheet) => acc + sheet.totalTasks, 0)}
                  </p>
                </div>
                <div className="bg-blue-500 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tareas Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sheetsData.reduce((acc, sheet) => acc + sheet.completedTasks, 0)}
                  </p>
                </div>
                <div className="bg-green-500 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progreso Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(sheetsData.reduce((acc, sheet) => acc + sheet.progress, 0) / sheetsData.length)}%
                  </p>
                </div>
                <div className="bg-purple-500 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Hojas de Cálculo */}
          <div className="space-y-6">
            {sheetsData.map((sheet) => (
              <div key={sheet.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{sheet.projectName}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(sheet.status)}`}>
                        {getStatusText(sheet.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Actualizado: {sheet.lastUpdated}</span>
                      </div>
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        <span>{sheet.completedTasks}/{sheet.totalTasks} tareas</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button className="btn-secondary text-sm py-1 px-3 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Abrir Sheet
                    </button>
                    <button className="btn-secondary text-sm py-1 px-3 flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Exportar
                    </button>
                  </div>
                </div>

                {/* Barra de Progreso General */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progreso General</span>
                    <span>{sheet.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${sheet.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Categorías */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sheet.categories.map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <span className="text-sm text-gray-600">
                          {category.completed}/{category.total}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(category.completed / category.total) * 100}%` }}
                        ></div>
                      </div>

                      <div className="space-y-1">
                        {category.items.slice(0, 3).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center text-xs text-gray-600">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              itemIndex < category.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                            <span className={itemIndex < category.completed ? 'line-through' : ''}>{item}</span>
                          </div>
                        ))}
                        {category.items.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{category.items.length - 3} más...
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleSheets;


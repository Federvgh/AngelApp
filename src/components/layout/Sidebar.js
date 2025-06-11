import React from 'react';
import { Home, Folder, List, FileText, BarChart2, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-dark-900 text-white p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary-500">Proyecto Ángel</h2>
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <LogOut className="w-6 h-6" /> {/* Using LogOut icon for closing sidebar on mobile */}
        </button>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-dark-700'}`
              }
              onClick={toggleSidebar} // Close sidebar on mobile after clicking a link
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-dark-700'}`
              }
              onClick={toggleSidebar}
            >
              <Folder className="w-5 h-5 mr-3" />
              Proyectos
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-dark-700'}`
              }
              onClick={toggleSidebar}
            >
              <List className="w-5 h-5 mr-3" />
              Tareas
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink 
              to="/reports" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-dark-700'}`
              }
              onClick={toggleSidebar}
            >
              <FileText className="w-5 h-5 mr-3" />
              Reportes
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink 
              to="/google-sheets" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-dark-700'}`
              }
              onClick={toggleSidebar}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              Google Sheets
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <button 
          onClick={logout} 
          className="flex items-center p-2 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-dark-700 w-full"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


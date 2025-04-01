
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home,
  Package, 
  Calendar, 
  Map, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useState } from 'react';

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Package size={20} />, text: 'Tour Packages', path: '/admin/tour-packages' },
    { icon: <Map size={20} />, text: 'Tour Types', path: '/admin/tour-types' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-40 h-full bg-white shadow-md w-64 transition-all duration-300 transform 
                  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-spiti-forest">Admin Panel</h1>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors
                ${isActive ? 'bg-spiti-forest text-white' : 'hover:bg-gray-100'}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.text}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center" 
            onClick={logout}
          >
            <LogOut size={18} className="mr-2" />
            <span>Log Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;


import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-spiti-forest text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Spiti Valley Admin</h1>
          <Link to="/" className="flex items-center gap-1 hover:underline">
            <Home size={18} />
            <span>Back to Website</span>
          </Link>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-md py-6">
          <div className="px-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          </div>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/admin/tours" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 hover:bg-gray-100",
                  isActive('/admin/tours') ? "bg-gray-100 font-medium text-spiti-forest border-r-4 border-spiti-forest" : ""
                )}
              >
                <Package size={18} />
                <span>Tour Packages</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

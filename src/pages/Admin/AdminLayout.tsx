
import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Package, LogOut } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-spiti-forest text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-white/20">
          Spiti Admin
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="flex items-center p-2 rounded hover:bg-white/10">
                <Home size={20} className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/tours" className="flex items-center p-2 rounded hover:bg-white/10">
                <Package size={20} className="mr-3" />
                Tour Packages
              </Link>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/10 hover:text-white px-2" 
                onClick={handleLogout}
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

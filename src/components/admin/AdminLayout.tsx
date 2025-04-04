
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminSidebar from './AdminSidebar';
import { Loader2 } from 'lucide-react';

const AdminLayout = () => {
  const { isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && isAdmin === false) {
      navigate('/admin-login');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-spiti-forest" />
        <span className="ml-2">Verifying admin access...</span>
      </div>
    );
  }

  if (!isAdmin && !loading) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

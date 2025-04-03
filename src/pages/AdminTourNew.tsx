
import React, { useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import TourForm from '@/components/admin/TourForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminTourNew = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Tour</h1>
        <TourForm />
      </div>
    </AdminLayout>
  );
};

export default AdminTourNew;

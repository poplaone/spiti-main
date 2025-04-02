
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import TourForm from '@/components/admin/TourForm';

const AdminTourNew = () => {
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

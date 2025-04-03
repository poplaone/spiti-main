
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

const Admin = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-2">Tours</h2>
            <p className="text-gray-600">Manage your tour packages</p>
            <button 
              onClick={() => window.location.href = '/admin/tours'}
              className="mt-4 px-4 py-2 bg-spiti-blue text-white rounded-md hover:bg-spiti-blue/90"
            >
              View Tours
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-2">New Tour</h2>
            <p className="text-gray-600">Create a new tour package</p>
            <button 
              onClick={() => window.location.href = '/admin/tours/new'}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create Tour
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;

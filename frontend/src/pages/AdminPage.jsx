import React from 'react';
import AdminLayout from '../components/layouts/AdminLayout';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const AdminPage = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default AdminPage;
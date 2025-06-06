"use client";

import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";

export default function AdminPage() {
  return (
    <ProtectedAdminRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Dashboard Content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600">Manage users and their roles</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Content Management</h2>
            <p className="text-gray-600">Manage website content</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600">Configure system settings</p>
          </div>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
} 
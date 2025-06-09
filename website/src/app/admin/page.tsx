"use client";

import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to Admin Dashboard</h1>
        <p className="text-gray-300">
          Use the sidebar to navigate between different management sections. You can manage teams, drivers, races, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Teams</span>
              <span className="text-white font-semibold">10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Drivers</span>
              <span className="text-white font-semibold">20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Races</span>
              <span className="text-white font-semibold">24</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Recent Activity</h2>
          <div className="space-y-4">
            <div className="text-gray-300">
              No recent activity to display
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

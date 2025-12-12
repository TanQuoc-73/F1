"use client";

import React, { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
  baseCountry: string;
  logoUrl: string;
  principal: string;
  powerUnit: string;
}

const TeamAdminPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    baseCountry: "",
    logoUrl: "",
    principal: "",
    powerUnit: ""
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/teams`);
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.baseCountry.trim() || !formData.principal.trim() || !formData.powerUnit.trim()) {
        throw new Error("Name, base country, principal and power unit are required");
      }

      const url = editingTeam
        ? `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/teams/${editingTeam.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/teams`;
      
      const method = editingTeam ? "PUT" : "POST";
      const payload = {
        name: formData.name.trim(),
        baseCountry: formData.baseCountry.trim(),
        logoUrl: formData.logoUrl.trim(),
        principal: formData.principal.trim(),
        powerUnit: formData.powerUnit.trim()
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to save team");
      }

      await fetchTeams();
      setIsModalOpen(false);
      setEditingTeam(null);
      setFormData({
        name: "",
        baseCountry: "",
        logoUrl: "",
        principal: "",
        powerUnit: ""
      });
    } catch (error) {
      console.error("Error saving team:", error);
      alert(error instanceof Error ? error.message : "Failed to save team");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      baseCountry: team.baseCountry,
      logoUrl: team.logoUrl,
      principal: team.principal,
      powerUnit: team.powerUnit
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/teams/${id}`, {
        method: "DELETE"
      });
      setTeams(teams.filter(t => t.id !== id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Team Management</h1>
          <button
            onClick={() => {
              setEditingTeam(null);
              setFormData({
                name: "",
                baseCountry: "",
                logoUrl: "",
                principal: "",
                powerUnit: ""
              });
              setIsModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Add Team
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left">Logo</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Base Country</th>
                <th className="p-4 text-left">Principal</th>
                <th className="p-4 text-left">Power Unit</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => (
                <tr key={team.id} className="border-t border-gray-700 hover:bg-gray-700 group">
                  <td className="p-4">
                    {team.logoUrl ? (
                      <img
                        src={team.logoUrl}
                        alt={team.name}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No logo</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">{team.name}</td>
                  <td className="p-4">{team.baseCountry}</td>
                  <td className="p-4">{team.principal}</td>
                  <td className="p-4">{team.powerUnit}</td>
                  <td className="p-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(team)}
                        className="text-blue-400 hover:text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(team.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Team Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">
                {editingTeam ? "Edit Team" : "Add New Team"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Base Country</label>
                  <input
                    type="text"
                    value={formData.baseCountry}
                    onChange={(e) => setFormData({ ...formData, baseCountry: e.target.value })}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Logo URL</label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Principal</label>
                  <input
                    type="text"
                    value={formData.principal}
                    onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Power Unit</label>
                  <input
                    type="text"
                    value={formData.powerUnit}
                    onChange={(e) => setFormData({ ...formData, powerUnit: e.target.value })}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingTeam(null);
                      setFormData({
                        name: "",
                        baseCountry: "",
                        logoUrl: "",
                        principal: "",
                        powerUnit: ""
                      });
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this team? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamAdminPage;


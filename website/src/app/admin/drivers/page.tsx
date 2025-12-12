"use client";

import { useEffect, useState } from "react";
import DriverFormModal from "@/components/DriverFormModal";

interface Team {
  id: number;
  name: string;
}

interface Driver {
  id?: number;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  imageUrl: string;
  number: number;
  team: Team;
}

const initialFormState = {
    firstName: "",
    lastName: "",
    nationality: "",
    dateOfBirth: "",
    imageUrl: "",
    number: 0,
    teamId: 0,
};

export default function DriversAdminPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchDrivers();
    fetchTeams();
  }, []);

  const fetchDrivers = async () => {
    const res = await fetch("${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/drivers");
    const data = await res.json();
    setDrivers(data);
  };

  const fetchTeams = async () => {
    const res = await fetch("${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/teams");
    const data = await res.json();
    setTeams(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/drivers/${editingId}`
      : "${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/drivers";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        team: teams.find((t) => t.id === form.teamId),
      }),
    });

    setForm(initialFormState);
    setEditingId(null);
    setIsModalOpen(false);
    fetchDrivers();
  };

  const handleEdit = (driver: Driver) => {
    setEditingId(driver.id!);
    setForm({
      firstName: driver.firstName || "",
      lastName: driver.lastName || "",
      nationality: driver.nationality || "",
      dateOfBirth: driver.dateOfBirth || "",
      imageUrl: driver.imageUrl || "",
      number: driver.number || 0,
      teamId: driver.team?.id || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/drivers/${id}`, {
      method: "DELETE",
    });
    fetchDrivers();
  };

  const openModal = () => {
    setEditingId(null);
    setForm(initialFormState);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Driver Management</h1>
        <button
          onClick={openModal}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Driver
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-gray-900 p-4 rounded shadow">
            {driver.imageUrl && (
              <img
                src={driver.imageUrl}
                alt={`${driver.firstName} ${driver.lastName}`}
                className="w-full h-48 object-contain bg-white p-2 rounded mb-4"
              />
            )}
            <h2 className="text-xl font-bold">
              #{driver.number} {driver.firstName} {driver.lastName}
            </h2>
            <p className="text-gray-400">{driver.nationality}</p>
            <p className="text-sm text-gray-500">DOB: {driver.dateOfBirth}</p>
            <p className="text-sm text-gray-500">Team: {driver.team.name}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(driver)}
                className="px-3 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(driver.id!)}
                className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <DriverFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        teams={teams}
        editingId={editingId}
      />
    </div>
  );
}


import React from "react";

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

interface DriverFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  form: {
    firstName: string;
    lastName: string;
    nationality: string;
    dateOfBirth: string;
    imageUrl: string;
    number: number;
    teamId: number;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      nationality: string;
      dateOfBirth: string;
      imageUrl: string;
      number: number;
      teamId: number;
    }>
  >;
  teams: Team[];
  editingId: number | null;
}

const DriverFormModal: React.FC<DriverFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  teams,
  editingId,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "number" || name === "teamId" ? Number(value) : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            {editingId ? "Edit Driver" : "Add New Driver"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={form.nationality}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Number"
              value={form.number}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <select
              name="teamId"
              value={form.teamId}
              onChange={handleInputChange}
              className="col-span-2 p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value={0}>Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingId ? "Update" : "Create"} Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverFormModal; 

import React, { useState, useEffect } from 'react';
import { Circuit } from '../../types/circuit';

interface CircuitFormProps {
    circuit?: Circuit;
    onSubmit: (circuit: Omit<Circuit, 'id'>) => void;
    onCancel: () => void;
}

const CircuitForm: React.FC<CircuitFormProps> = ({ circuit, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Circuit, 'id'>>({
        name: '',
        location: '',
        country: '',
        lengthKm: 0,
        laps: 0,
        imageUrl: ''
    });

    useEffect(() => {
        if (circuit) {
            setFormData({
                name: circuit.name,
                location: circuit.location,
                country: circuit.country,
                lengthKm: circuit.lengthKm,
                laps: circuit.laps,
                imageUrl: circuit.imageUrl
            });
        }
    }, [circuit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'lengthKm' || name === 'laps' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Country</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Length (km)</label>
                <input
                    type="number"
                    step="0.001"
                    name="lengthKm"
                    value={formData.lengthKm}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Laps</label>
                <input
                    type="number"
                    name="laps"
                    value={formData.laps}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                    {circuit ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default CircuitForm; 

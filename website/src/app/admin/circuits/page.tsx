'use client';

import React, { useState, useEffect } from 'react';
import { Circuit } from '../../../types/circuit';
import { circuitService } from '../../../services/circuitService';
import CircuitForm from '../../../components/admin/CircuitForm';

export default function CircuitsPage() {
    const [circuits, setCircuits] = useState<Circuit[]>([]);
    const [selectedCircuit, setSelectedCircuit] = useState<Circuit | undefined>();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCircuits = async () => {
        try {
            const data = await circuitService.getAllCircuits();
            setCircuits(data);
            setError(null);
        } catch (err) {
            setError('Failed to load circuits');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCircuits();
    }, []);

    const handleCreate = async (circuit: Omit<Circuit, 'id'>) => {
        try {
            await circuitService.createCircuit(circuit);
            setIsFormOpen(false);
            loadCircuits();
        } catch (err) {
            setError('Failed to create circuit');
            console.error(err);
        }
    };

    const handleUpdate = async (circuit: Omit<Circuit, 'id'>) => {
        if (!selectedCircuit) return;
        try {
            const circuitData = { ...circuit, id: selectedCircuit.id };
            console.log('Selected Circuit:', selectedCircuit);
            console.log('Form Data:', circuit);
            console.log('Combined Data:', circuitData);
            const updatedCircuit = await circuitService.updateCircuit(selectedCircuit.id, circuitData);
            setIsFormOpen(false);
            setSelectedCircuit(undefined);
            loadCircuits();
        } catch (err: any) {
            console.error('Error updating circuit:', err);
            console.error('Request data:', err.config?.data);
            console.error('Response:', err.response?.data);
            setError(err.response?.data?.message || 'Failed to update circuit');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this circuit?')) return;
        try {
            await circuitService.deleteCircuit(id);
            loadCircuits();
        } catch (err) {
            setError('Failed to delete circuit');
            console.error(err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Circuit Management</h1>
                <button
                    onClick={() => {
                        setSelectedCircuit(undefined);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Add New Circuit
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4 text-white">
                            {selectedCircuit ? 'Edit Circuit' : 'Add New Circuit'}
                        </h2>
                        <CircuitForm
                            circuit={selectedCircuit}
                            onSubmit={selectedCircuit ? handleUpdate : handleCreate}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setSelectedCircuit(undefined);
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {circuits.map((circuit) => (
                    <div key={circuit.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-sm">
                        {circuit.imageUrl && (
                            <img
                                src={circuit.imageUrl}
                                alt={circuit.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                        )}
                        <h3 className="text-lg font-semibold text-white">{circuit.name}</h3>
                        <p className="text-gray-300">{circuit.location}, {circuit.country}</p>
                        <p className="text-sm text-gray-400">
                            Length: {circuit.lengthKm}km | Laps: {circuit.laps}
                        </p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => {
                                    setSelectedCircuit(circuit);
                                    setIsFormOpen(true);
                                }}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(circuit.id)}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 
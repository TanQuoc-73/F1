"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Circuit } from '@/types/circuit';
import { circuitService } from '@/services/circuitService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, MapPin, Flag, Ruler, Timer, Image as ImageIcon, X, Search, Filter } from 'lucide-react';

export default function CircuitPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCircuit, setEditingCircuit] = useState<Circuit | null>(null);
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: '',
    lengthKm: '',
    laps: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadCircuits();
  }, []);

  const loadCircuits = async () => {
    try {
      const data = await circuitService.getAllCircuits();
      setCircuits(data);
    } catch (error) {
      console.error('Error loading circuits:', error);
      toast.error('Failed to load circuits');
    } finally {
      setLoading(false);
    }
  };

  const handleCircuitClick = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
  };

  const handleCloseDetail = () => {
    setSelectedCircuit(null);
  };

  const handleEdit = (circuit: Circuit) => {
    setEditingCircuit(circuit);
    setFormData({
      name: circuit.name,
      location: circuit.location,
      country: circuit.country,
      lengthKm: circuit.lengthKm.toString(),
      laps: circuit.laps.toString(),
      imageUrl: circuit.imageUrl || ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCircuit) return;

    try {
      const updatedCircuit = {
        ...editingCircuit,
        ...formData,
        lengthKm: parseFloat(formData.lengthKm),
        laps: parseInt(formData.laps)
      };

      await circuitService.updateCircuit(editingCircuit.id, updatedCircuit);
      toast.success('Circuit updated successfully');
      setEditingCircuit(null);
      loadCircuits();
    } catch (error) {
      console.error('Error updating circuit:', error);
      toast.error('Failed to update circuit');
    }
  };

  // Get unique countries for filter
  const countries = Array.from(new Set(circuits.map(circuit => circuit.country))).sort();

  // Filter circuits based on search query and selected country
  const filteredCircuits = circuits.filter(circuit => {
    const matchesSearch = 
      circuit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circuit.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circuit.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry === '' || circuit.country === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">F1 Circuits</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search circuits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Found {filteredCircuits.length} circuits</span>
          {(searchQuery || selectedCountry) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('');
              }}
              className="text-gray-400 hover:text-white"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCircuits.map((circuit) => (
          <Card 
            key={circuit.id} 
            className="bg-gray-800 hover:bg-gray-700 transition-colors border-gray-700 cursor-pointer"
            onClick={() => handleCircuitClick(circuit)}
          >
            <CardHeader className="relative">
              {circuit.imageUrl && (
                <div className="absolute inset-0 overflow-hidden rounded-t-lg">
                  <img
                    src={circuit.imageUrl}
                    alt={circuit.name}
                    className="w-full h-48 object-cover opacity-10"
                  />
                </div>
              )}
              <CardTitle className="relative z-10 text-2xl font-bold text-white">
                {circuit.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>{circuit.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flag className="w-5 h-5 text-red-400" />
                <span>{circuit.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Ruler className="w-5 h-5 text-red-400" />
                <span>{circuit.lengthKm} km</span>
              </div>
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-red-400" />
                <span>{circuit.laps} laps</span>
              </div>
              {user?.role === 'ADMIN' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(circuit);
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  variant="outline"
                >
                  Edit Circuit
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCircuit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl bg-gray-800 border-gray-700">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                onClick={handleCloseDetail}
              >
                <X className="h-6 w-6" />
              </Button>
              <CardTitle className="text-2xl font-bold text-white">
                {selectedCircuit.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedCircuit.imageUrl && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedCircuit.imageUrl}
                    alt={selectedCircuit.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-lg text-white">{selectedCircuit.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Flag className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-sm text-gray-400">Country</p>
                      <p className="text-lg text-white">{selectedCircuit.country}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Ruler className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-sm text-gray-400">Circuit Length</p>
                      <p className="text-lg text-white">{selectedCircuit.lengthKm} km</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Timer className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-sm text-gray-400">Number of Laps</p>
                      <p className="text-lg text-white">{selectedCircuit.laps} laps</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {editingCircuit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Edit Circuit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Circuit Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-300">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-gray-300">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lengthKm" className="text-gray-300">Length (km)</Label>
                    <Input
                      id="lengthKm"
                      type="number"
                      step="0.001"
                      value={formData.lengthKm}
                      onChange={(e) => setFormData({ ...formData, lengthKm: e.target.value })}
                      required
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="laps" className="text-gray-300">Number of Laps</Label>
                    <Input
                      id="laps"
                      type="number"
                      value={formData.laps}
                      onChange={(e) => setFormData({ ...formData, laps: e.target.value })}
                      required
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-gray-300">Image URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.open(formData.imageUrl, '_blank')}
                      disabled={!formData.imageUrl}
                      className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingCircuit(null)}
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

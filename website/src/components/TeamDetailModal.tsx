import React from 'react';

interface Team {
  id: number;
  name: string;
  logoUrl?: string;
  carImageUrl?: string;
  baseCountry?: string;
  principal?: string;
  powerUnit?: string;
}

interface Driver {
  team: any;
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  nationality?: string;
  dateOfBirth?: string;
  number?: number;
}

interface TeamStanding {
  id: number;
  team: Team;
  points: number;
  position: number;
}

interface TeamDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamStanding: TeamStanding | null;
  drivers: Driver[];
}

export default function TeamDetailModal({ isOpen, onClose, teamStanding, drivers }: TeamDetailModalProps) {
  if (!isOpen || !teamStanding) return null;

  const teamDrivers = drivers.filter(d => d.team?.id === teamStanding.team.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            {teamStanding.team.logoUrl && (
              <img 
                src={teamStanding.team.logoUrl} 
                alt={teamStanding.team.name} 
                className="h-16 w-16 object-contain" 
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">{teamStanding.team.name}</h2>
              {teamStanding.team.baseCountry && (
                <p className="text-gray-400">{teamStanding.team.baseCountry}</p>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Standing</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-yellow-400">{teamStanding.position}</span>
              <span className="text-gray-400">position</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-white">{teamStanding.points}</span>
              <span className="text-gray-400 ml-2">points</span>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Team Info</h3>
            <div className="space-y-2">
              {teamStanding.team.principal && (
                <div>
                  <span className="text-gray-400">Team Principal:</span>
                  <p className="text-white font-medium">{teamStanding.team.principal}</p>
                </div>
              )}
              {teamStanding.team.powerUnit && (
                <div>
                  <span className="text-gray-400">Power Unit:</span>
                  <p className="text-white font-medium">{teamStanding.team.powerUnit}</p>
                </div>
              )}
              {teamStanding.team.baseCountry && (
                <div>
                  <span className="text-gray-400">Base Country:</span>
                  <p className="text-white font-medium">{teamStanding.team.baseCountry}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {teamStanding.team.carImageUrl && (
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Car</h3>
            <img 
              src={teamStanding.team.carImageUrl} 
              alt={`${teamStanding.team.name} car`} 
              className="w-full h-32 object-contain" 
            />
          </div>
        )}

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Drivers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamDrivers.map((driver) => (
              <div key={driver.id} className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
                {driver.imageUrl && (
                  <img 
                    src={driver.imageUrl} 
                    alt={`${driver.firstName} ${driver.lastName}`} 
                    className="h-16 w-16 object-contain rounded-full border-2 border-gray-600" 
                  />
                )}
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {driver.firstName} {driver.lastName}
                  </h4>
                  {driver.number && (
                    <p className="text-gray-400">#{driver.number}</p>
                  )}
                  {driver.nationality && (
                    <p className="text-gray-400">{driver.nationality}</p>
                  )}
                  {driver.dateOfBirth && (
                    <p className="text-gray-400">
                      {new Date(driver.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
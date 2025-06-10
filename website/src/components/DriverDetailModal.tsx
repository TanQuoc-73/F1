import React from 'react';

interface Team {
  id: number;
  name: string;
  baseCountry: string;
  logoUrl: string;
  principal: string;
  powerUnit: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  imageUrl: string;
  number: number;
  team: Team;
}

interface DriverDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
}

export default function DriverDetailModal({ isOpen, onClose, driver }: DriverDetailModalProps) {
  if (!isOpen || !driver) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={driver.imageUrl}
              alt={`${driver.firstName} ${driver.lastName}`}
              className="h-64 object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Driver Info */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-orange-400 font-bold uppercase tracking-widest">
                  {driver.firstName}
                </span>
                {driver.nationality && (
                  <img
                    src={`https://flagcdn.com/24x18/${getCountryCode(driver.nationality)}.png`}
                    alt={driver.nationality}
                    className="h-4 w-6 object-cover rounded-sm"
                  />
                )}
              </div>
              <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white leading-tight" style={{ fontFamily: 'F1Bold,Arial,sans-serif' }}>
                {driver.lastName}
              </h2>
              <div className="text-2xl font-bold text-yellow-400 mt-1">#{driver.number}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Team</div>
              <div className="text-xl font-bold text-white">{driver.team.name}</div>
            </div>
          </div>

          {/* Team Info */}
          <div className="bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              {driver.team.logoUrl && (
                <img
                  src={driver.team.logoUrl}
                  alt={driver.team.name}
                  className="h-16 w-16 object-contain"
                />
              )}
              <div>
                <div className="text-sm text-gray-400">Team Details</div>
                <div className="text-white">
                  <div className="font-bold">{driver.team.name}</div>
                  <div className="text-sm text-gray-300">Base: {driver.team.baseCountry}</div>
                  <div className="text-sm text-gray-300">Team Principal: {driver.team.principal}</div>
                  <div className="text-sm text-gray-300">Power Unit: {driver.team.powerUnit}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Nationality</div>
              <div className="text-white font-medium">{driver.nationality}</div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Date of Birth</div>
              <div className="text-white font-medium">
                {new Date(driver.dateOfBirth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for country code
function getCountryCode(nationality: string): string {
  const map: Record<string, string> = {
    Australia: "au",
    "United Kingdom": "gb",
    Netherlands: "nl",
    Monaco: "mc",
    Italy: "it",
    France: "fr",
    Spain: "es",
    Germany: "de",
    Finland: "fi",
    Mexico: "mx",
    Canada: "ca",
    Japan: "jp",
    China: "cn",
    Brazil: "br",
    USA: "us",
  };
  return map[nationality] || "us";
} 
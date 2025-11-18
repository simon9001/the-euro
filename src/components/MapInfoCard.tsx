// src/components/MapInfoCard.tsx
import { type MapLocation } from '../types/MapLocation';

interface MapInfoCardProps {
  location: MapLocation;
  onGetDirections: () => void;
  onClose: () => void;
}

export default function MapInfoCard({ location, onGetDirections, onClose }: MapInfoCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 w-80">
      {/* Header with Close Button */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-memorial-dark pr-4">{location.name}</h3>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-700"
          aria-label="Close location details"
        >
          ✕
        </button>
      </div>

      {/* Location Image */}
      <div className="mb-4 rounded-xl overflow-hidden shadow-lg bg-gray-100">
        <div className="w-full h-32 bg-gradient-to-br from-memorial-gold/20 to-memorial-dark/20 flex items-center justify-center">
          <span className="text-4xl">🕯️</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {location.description}
      </p>

      {/* Visiting Hours */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-memorial-light rounded-lg">
        <div className="text-memorial-gold text-lg">🕒</div>
        <div>
          <p className="font-semibold text-memorial-dark text-sm">Visiting Hours</p>
          <p className="text-gray-600 text-sm">{location.visitingHours}</p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-memorial-light rounded-lg">
        <div className="text-memorial-gold text-lg">📍</div>
        <div>
          <p className="font-semibold text-memorial-dark text-sm">Location</p>
          <p className="text-gray-600 text-sm">{location.address}</p>
        </div>
      </div>

      {/* Directions Button */}
      <button
        onClick={onGetDirections}
        className="w-full bg-memorial-gold text-memorial-dark font-semibold py-3 px-6 rounded-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <span>🗺️</span>
        Get Directions
      </button>

      {/* Prayer Note */}
      <p className="text-center text-gray-500 text-xs mt-4 italic">
        May this space bring peace and comfort to all who visit
      </p>
    </div>
  );
}
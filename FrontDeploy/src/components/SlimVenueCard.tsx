import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface SlimVenueCardProps {
  name?: string;
  address?: string;
}

const SlimVenueCard: React.FC<SlimVenueCardProps> = ({ name, address }) => {
  return (
    <div className="w-full h-full border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between p-4 bg-gradient-to-r from-[#110069] to-indigo-600 text-white">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <div className="flex items-center">
        <FaMapMarkerAlt className="mr-2 text-lg" />
        <p className="text-md">{address}</p>
      </div>
    </div>
  );
};

export default SlimVenueCard;

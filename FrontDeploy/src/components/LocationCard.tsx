import React from 'react';
import { Link } from 'react-router-dom';

interface LocationCardProps {
  locationName: string;
  imageUrl: string;
  venuesLink: string;
  vendorsLink: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ locationName, imageUrl, venuesLink, vendorsLink }) => {
  return (
    <div className="w-full max-w-lg rounded overflow-hidden shadow-lg m-auto transform transition-transform hover:scale-105 hover:shadow-2xl">
      <img className="w-full h-64 object-cover" src={imageUrl} alt={locationName} />
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-2xl mb-4 text-gray-900">{locationName}</div>
        <div className="flex justify-between">
          <Link
            to={venuesLink}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200 m-2"
          >
            Venues
          </Link>
          <Link
            to={vendorsLink}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200 m-2"
          >
            Vendors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

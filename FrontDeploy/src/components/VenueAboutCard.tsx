import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

interface VenueAboutCardProps {
  about?: string;
  contactNumber?: string;
}

const VenueAboutCard: React.FC<VenueAboutCardProps> = ({ about, contactNumber }) => {
  return (
    <div className="w-full bg-gradient-to-r from-white to-slate-100 text-black p-8 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">About This Venue</h2>
        <p className="text-lg">{about}</p>
      </div>
      <div className="flex items-center">
        <FaPhoneAlt className="text-xl mr-2" />
        <p className="text-xl font-bold">{contactNumber}</p>
      </div>
    </div>
  );
};

export default VenueAboutCard;

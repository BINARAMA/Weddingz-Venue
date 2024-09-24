import React, { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [minGuests, setMinGuests] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [foodPackage, setFoodPackage] = useState('');
  const [facilities, setFacilities] = useState('');
  const [venueTypes, setVenueTypes] = useState('');

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = {
      businessName: businessName || undefined,
      city: city || undefined,
      minGuests: minGuests || undefined,
      maxGuests: maxGuests || undefined,
      foodPackage: foodPackage || undefined,
      facilities: facilities || undefined,
      venueTypes: venueTypes || undefined,
    };
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleFilterSubmit} className="bg-gray-100 shadow-lg rounded-lg px-8 mt-4 py-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Venue Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Min Guests"
          value={minGuests}
          onChange={(e) => setMinGuests(e.target.value)}
        />
        <input
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Max Guests"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
        />
        <input
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Food Package"
          value={foodPackage}
          onChange={(e) => setFoodPackage(e.target.value)}
        />
        <input
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Facilities (comma-separated)"
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
        />
        <input
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Venue Types (comma-separated)"
          value={venueTypes}
          onChange={(e) => setVenueTypes(e.target.value)}
        />
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="bg-blue-600 text-white font-semibold text-sm py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          type="submit"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default FilterBar;
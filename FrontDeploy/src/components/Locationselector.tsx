import React, { useState } from 'react';

const LocationSelector: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>(''); // State to store the selected location

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value); // Update the selected location when user changes it
  };

  return (
    <div className="mt-8 text-center">
      <label htmlFor="location" className="block text-white text-3xl font-bold mb-4 tracking-wider uppercase">Select Location</label>
      <select
        id="location"
        className="appearance-none border border-gray-300 rounded-lg w-64 md:w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <option value="">Select a location...</option>
        <option value="delhi">Delhi</option>
        <option value="ghaziabad">Ghaziabad</option>
        {/* Add more locations as needed */}
      </select>
    </div>
  );
};

export default LocationSelector;

import React from 'react';
import LocationCard from './LocationCard';

interface Location {
  id: number;
  name: string;
  imageUrl: string;
  venuesLink: string;
  vendorsLink: string;
}

interface LocationCardHolderProps {
  locations: Location[];
}

const LocationCardHolder: React.FC<LocationCardHolderProps> = ({ locations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-56 px-8 py-12">
      {locations.map(location => (
        <LocationCard
          key={location.id}
          locationName={location.name}
          imageUrl={location.imageUrl}
          venuesLink={location.venuesLink}
          vendorsLink={location.vendorsLink}
        />
      ))}
    </div>
  );
};

export default LocationCardHolder;

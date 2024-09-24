// src/components/HeroBanner.tsx
import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/800/400)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">Vendors</h1>
      </div>
    </div>
  );
};

export default HeroBanner;

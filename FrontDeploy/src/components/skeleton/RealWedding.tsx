
import React from 'react';

const SkeletonWeddingCard: React.FC = () => {
  return (
    <div className="animate-pulse border rounded-lg overflow-hidden shadow-lg">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonWeddingCard;

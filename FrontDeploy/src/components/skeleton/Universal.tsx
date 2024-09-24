import React from "react";

const Universal: React.FC = () => {
  return (
    <div className="space-y-6 p-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div 
          key={index} 
          className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 
                     rounded w-full h-8 shadow-lg">
        </div>
      ))}
    </div>
  );
};

export default Universal;

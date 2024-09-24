import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse flex justify-center">
      <div className="h-[400px] w-[425px] bg-gray-300 rounded shadow-xl flex flex-col">
        <div className="h-[200px] bg-gray-400 rounded-lg"></div>
        <div className="px-6 py-2 flex-grow flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <div className="h-6 bg-gray-400 rounded w-3/4 mt-4"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
            <div className="flex justify-between w-full mt-4">
              <div className="h-4 bg-gray-400 rounded w-1/3"></div>
              <div className="h-4 bg-gray-400 rounded w-1/3"></div>
            </div>
            <div className="h-4 bg-gray-400 rounded w-3/4 mt-4"></div>
          </div>
          <div className="text-center mt-4">
            <div className="h-10 bg-gray-400 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

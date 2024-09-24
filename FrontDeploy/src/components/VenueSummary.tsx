import React, { useState } from 'react';

interface VenueSummaryProps {
  summary?: string;
  maxCharacters?: number;
}

const VenueSummary: React.FC<VenueSummaryProps> = ({ summary, maxCharacters = 150 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displaySummary = expanded ? summary : summary?.slice(0, maxCharacters) + '...';

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg m-8">
      <h3 className="text-2xl font-bold mb-4">Venue Summary</h3>
      <p>{displaySummary}</p>
      {(summary?.length ?? 0) > maxCharacters &&  (
        <button
          onClick={toggleExpanded}
          className="text-indigo-600 hover:text-indigo-800 font-semibold mt-2 focus:outline-none"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default VenueSummary;
import React, { useState } from 'react';

interface DescriptionCardProps {
    title: string | undefined;
    description: string | undefined;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ title, description }) => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpansion = () => {
        setExpanded(expanded);
    };

    return (
        <div className="border border-gray-200 rounded p-4">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-600">
                {expanded ? description : `${description?.slice(0, 10)}...`}
                <span
                    className="text-blue-500 cursor-pointer ml-2"
                    onClick={toggleExpansion}
                >
                    {expanded ? "Read Less" : "Read More"}
                </span>
            </p>
        </div>
    );
};

export default DescriptionCard;

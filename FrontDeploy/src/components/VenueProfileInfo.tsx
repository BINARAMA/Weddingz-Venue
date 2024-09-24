import React from 'react';

interface VenueProfileInfoProps {
    businessName: string | undefined;
    address?: string | undefined;
}

const VenueProfileInfo: React.FC<VenueProfileInfoProps> = ({ businessName, address }) => {
    return (
        <div className="bg-gray-200 rounded-lg p-8 mx-auto max-w-full mt-6 mb-2">
            <div className="flex items-center justify-center">
                <div className="flex-grow">
                    <div className="mb-8 border-b pb-4">
                        <p className="text-[#110069] text-3xl font-bold text-center mb-4">Business Name:</p>
                        <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                            {businessName}
                        </p>
                    </div>
                    <div className="mb-8 border-b pb-4">
                        <p className="text-[#110069] text-3xl font-bold text-center mb-4">Address:</p>
                        <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                            {address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueProfileInfo;

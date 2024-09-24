import React from "react";

import Caro from "../../venue/components/Carousel3";

interface Props {
  phone?: string;
  images?: string[] | undefined;
  featuresOfVenue?: string;
  guestCapacity?: string | undefined;
  howToReach?: string | undefined;
  summary?: string;
  venuePolicies: string | undefined;
}

const ServiceDetailsFormVenue: React.FC<Props> = ({
  phone,
  images,
  featuresOfVenue,
  guestCapacity,
  howToReach,
  summary,
  venuePolicies,
}) => {
  return (
    <div className="bg-gray-200 rounded-lg p-8 mx-auto max-w-full mb-12">
      <div className="flex items-center justify-center">
        <div className="flex-grow">
          <>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">Contact:</p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                {phone}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">
                Features Of Venue:
              </p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                {featuresOfVenue}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">
                Guest Capacity:
              </p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                {guestCapacity}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">How To Reach:</p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                {howToReach ? "Yes" : "No"}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">Summary:</p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center h-auto w-3/6 mx-auto">
                {summary}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">
                Venue Policies:
              </p>

              <div className="flex gap-4 mb-4">
                <p className="text-lg bg-white text-[#110069] p-2 rounded-md">
                  {venuePolicies}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <p className="text-[#110069] text-xl font-bold">images:</p>
              {images &&
                images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`images ${index + 1}`}
                    className="w-48 h-48 object-cover m-2 rounded-md"
                  />
                ))}
            </div>
            <div>
              <Caro portfolio={images} />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsFormVenue;

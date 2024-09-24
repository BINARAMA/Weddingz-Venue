import React from "react";

import Caro from "../components/Carousel3";

interface Package {
  name?: string;
  days?: string;
  price?: string;
  minAdvance?: string;
}

interface Props {
  price?: string;
  portfolio?: string[] | undefined;
  experience?: string;
  event_completed?: number;
  willingToTravel?: boolean;
  summary?: string;
  packages: Package | undefined;
  id?: string | undefined;
}

const ServiceDetailsForm: React.FC<Props> = ({
  price,
  portfolio,
  experience,
  event_completed,
  willingToTravel,
  summary,
  packages,
}) => {
  console.log("packages", packages?.days);

  return (
    <div className="bg-gray-200 rounded-lg p-8 mx-auto max-w-full mb-12">
      <div className="flex items-center justify-center">
        <div className="flex-grow">
          <>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">Price:</p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                ₹{price}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">
                Years of Experience:
              </p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                {experience}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">
                Events Completed:
              </p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                {event_completed}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">
                Willing to Travel:
              </p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
                {willingToTravel ? "Yes" : "No"}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">Summary:</p>
              <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center h-auto w-3/6 mx-auto">
                {summary}
              </p>
            </div>
            <div className="mb-8 border-b pb-4">
              <p className="text-[#110069] text-xl font-bold">Packages:</p>

              <div className="flex gap-4 mb-4">
                <p className="text-lg bg-white text-[#110069] p-2 rounded-md">
                  {packages?.name}
                </p>
                <p className="text-lg bg-white text-[#110069] p-2 rounded-md">
                  {packages?.days}
                </p>
                <p className="text-lg bg-white text-[#110069] p-2 rounded-md">
                  ₹{packages?.price}
                </p>
                <p className="text-lg bg-white text-[#110069] p-2 rounded-md">
                  {packages?.minAdvance}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <p className="text-[#110069] text-xl font-bold">Portfolio:</p>
              {portfolio &&
                portfolio.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Portfolio ${index + 1}`}
                    className="w-48 h-48 object-cover m-2 rounded-md"
                  />
                ))}
            </div>
            <div>
              <Caro portfolio={portfolio} />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsForm;

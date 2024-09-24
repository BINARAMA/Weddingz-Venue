import React from "react";

interface Props {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;

  profile?: string | undefined;

  city?: string | undefined;
}

const VendorProfileCard: React.FC<Props> = ({
  name,
  profile,
  phone,
  email,
  city,
}) => {
  return (
    <div className="flex h-full">
      <div className="bg-[#110069] w-80 p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-8 w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <>
              <h3 className="text-4xl font-semibold my-2 text-white">{name}</h3>
              <p className="text-gray-100">{email}</p>
              <p className="text-gray-100">{phone}</p>
              <p className="text-gray-100">{city}</p>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VendorProfileCard;

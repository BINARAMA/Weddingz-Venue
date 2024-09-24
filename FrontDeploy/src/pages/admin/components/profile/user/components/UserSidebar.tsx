import React from "react";

interface Props {
  yourName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password?: string | undefined;
  profile?: string | undefined;
  id?: string | undefined;
}

const UserSidebar: React.FC<Props> = ({ yourName, profile, phone, email }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-blue-900 w-80 p-6 flex flex-col items-center">
        <div className="mt-8 w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 text-center">
          <>
            <h3 className="text-4xl font-semibold my-2 text-white">
              {yourName}
            </h3>
            <p className="text-gray-300">{email}</p>
            <p className="text-gray-300">{phone}</p>
          </>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;

import { FC, useState } from "react";
import { useGetAdminQuery, useUpdateAdminMutation } from "../../../../redux/api/admin";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

// Define interface for props
interface ProfileProps {
  avatar?: string;
  name?: string;
  email?: string;
  contact?: string;
  address?: string;
  city?: string;
}

// Use interface in component props
const Profile: FC<ProfileProps> = ({
  avatar = "default-avatar.jpg",
  name,
  email,
  contact,
  address,
  city,
}) => {
  const id = useSelector((state: RootState) => state?.auth?.user?._id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAvatar, setEditedAvatar] = useState(avatar);
  const [editedName, setEditedName] = useState(name || undefined);
  const [editedContact, setEditedContact] = useState(contact || undefined);
  const [editedCity, setEditedCity] = useState(city || undefined);
  const [editedAddress, setEditedAddress] = useState(address || undefined);
  const [editedPassword, setEditedPassword] = useState("");
  const { data: admin, refetch } = useGetAdminQuery(id || "");
  const [updateAdmin] = useUpdateAdminMutation();

  if (admin) {
    avatar = "default-avatar.jpg";
    name = admin?.profile?.name;
    email = admin?.profile.email;
    contact = admin?.profile.contact;
    address = admin?.profile.address;
    city = admin?.profile.city;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const updatedData = {
      id: id ?? "",
      admin: {
        name: editedName,
        contact: editedContact,
        address: editedAddress,
        city: editedCity,
      },
    };

    try {
      const response = await updateAdmin(updatedData).unwrap();
      refetch();
      console.log("updatedAdmin", response);
    } catch (error) {
      console.error("Failed to update user: ", error);
    }

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedAvatar(avatar);
    setEditedName(name);
    setEditedContact(contact);
    setEditedPassword("");
    setEditedAddress(address);
    setEditedCity(city);

    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-md p-6 flex flex-col lg:flex-row h-screen">
      <div className="lg:w-3/4 w-full mb-4 lg:mb-0 shadow-2xl rounded-md border-2 bg-white p-6">
        {isEditing ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <label htmlFor="avatarInput" className="mb-2 font-semibold text-lg">
                Avatar URL:
              </label>
              <input
                id="avatarInput"
                type="text"
                value={editedAvatar}
                onChange={(e) => setEditedAvatar(e.target.value)}
                placeholder="Avatar URL"
                className="w-full rounded-md p-2 border-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="nameInput" className="mb-2 font-semibold text-lg">
                Name:
              </label>
              <input
                id="nameInput"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-md p-2 border-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="contactInput" className="mb-2 font-semibold text-lg">
                Contact:
              </label>
              <input
                id="contactInput"
                type="text"
                value={editedContact}
                onChange={(e) => setEditedContact(e.target.value)}
                placeholder="Contact"
                className="w-full rounded-md p-2 border-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="passwordInput" className="mb-2 font-semibold text-lg">
                Password:
              </label>
              <input
                id="passwordInput"
                type="password"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-md p-2 border-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="cityInput" className="mb-2 font-semibold text-lg">
                City:
              </label>
              <input
                id="cityInput"
                type="text"
                value={editedCity}
                onChange={(e) => setEditedCity(e.target.value)}
                placeholder="City"
                className="w-full rounded-md p-2 border-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="addressInput" className="mb-2 font-semibold text-lg">
                Address:
              </label>
              <input
                id="addressInput"
                type="text"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                placeholder="Address"
                className="w-full rounded-md p-2 border-2 border-gray-300"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full bg-blue-900"
            />
            <h3 className="text-lg font-semibold">Name: {name}</h3>
            <p>Email: {email}</p>
            <p>Contact: {contact}</p>
            <p>City: {city}</p>
            <p>Address: {address}</p>
          </div>
        )}
      </div>

      <div className="lg:w-1/4 w-full mb-4 lg:mb-0 border-2 shadow-2xl rounded-md lg:ml-4 bg-white flex flex-col justify-center items-center p-6">
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-xl font-semibold shadow-md mt-4 lg:mt-0"
          >
            Edit
          </button>
        )}
        {isEditing && (
          <div className="flex flex-col w-full space-y-4">
            <button
              onClick={handleSaveClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-xl font-semibold shadow-md"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-xl font-semibold shadow-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

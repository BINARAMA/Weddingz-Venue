import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateVenueMutation } from '../redux/api/venue';





  

interface Props {
  yourName?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  password?: string | undefined;
  profile?: string | undefined;
  id?: string | undefined;
}



const VenueProfileCard: React.FC<Props> = ({ yourName, profile, phone, email, password, id }) => {
  const [updateVenue] = useUpdateVenueMutation();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    yourName,
    email,
    phone,
    password,
    profile,
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [value]: name });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 2) {
      const file = files[1];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    await updateVenue({ venueId:id, formData: formData });
    setEditing(false);
  };

  const handleEditClick = () => {
    setEditing(false);
  };

  const handleTabClick = (tabName: string) => {
    switch (tabName) {
      case 'My venues':
        navigate('/my-venues');
        break;
      case 'My services':
        navigate('/my-services');
        break;
      case 'List a new service':
        navigate('/list-service');
        break;
      case 'Logout':
         // Perform logout logic here
         navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-full bg-gray-100">
      <div className="bg-blue-900 w-80 p-6 flex flex-col items-center">
        <div className="mt-8 w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
          <img src={profile} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="mt-4 text-center">
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-white">Name:</label>
                <input
                  type="text"
                  id="yourName"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-white">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 text-white">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="profilePic" className="block mb-1 text-white">Profile Picture:</label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-md border-gray-300 px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Update
              </button>
            </form>
          ) : (
            <>
              <h3 className="text-4xl font-semibold my-2 text-white">{yourName}</h3>
              <p className="text-gray-300">{email}</p>
              <p className="text-gray-300">{phone}</p>
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white px-8 py-2 rounded-md mx-4 my-8 hover:bg-blue-600"
              >
                Edit
              </button>
            </>
          )}
        </div>
        <div className="mt-16 text-xl w-full">
          {['Logout'].map(tab => (
            <div
              key={tab}
              className="cursor-pointer text-white my-4 py-2 px-4 rounded-md border border-transparent hover:bg-blue-500 hover:text-white hover:border-[#110069] transition-colors"
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueProfileCard;

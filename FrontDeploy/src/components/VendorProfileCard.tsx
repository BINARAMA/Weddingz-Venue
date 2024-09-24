import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useUpdateVendorMutation } from '../redux/api/vendor';
import {  logout } from '../redux/reducer/auth';
import { useDispatch } from 'react-redux';


interface Props {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password?: string | undefined;
  profile?: string | undefined;
  // role: string | undefined;
  id?: string |undefined;
}



const VendorProfileCard: React.FC<Props> = ({name, profile, phone, email, password, id}) => {
  // const dispatch = useDispatch<AppDispatch>();
  const [updateVendor, ] = useUpdateVendorMutation();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    password,
    profile,
    // role: vendor.role
  });

  const navigate = useNavigate(); // Create history object for navigation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("id is " , "id");
    console.log("dta is :" , formData)
    if (!id) return; // Ensure id is present
    const res = await updateVendor({vendorId:id , formData: formData   })
    console.log(res);
    setEditing(true); 
  }

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleTabClick = (tabName: string) => {
    // Navigate to different pages based on the tab clicked
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
    <div className="flex h-full">
      <div className="bg-[#110069] w-80 p-6">
        <div className='flex flex-col items-center justify-center'>
          <div className="mt-8 w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="mt-4">
            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1">Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-md border-gray-300 px-3 py-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1">Email:</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-md border-gray-300 px-3 py-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="profilePic" className="block mb-1">Profile Picture:</label>
                  <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="w-full rounded-md border-gray-300 px-3 py-2" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
              </form>
            ) : (
              <>
                <h3 className="text-4xl font-semibold my-2 text-white">{name}</h3>
                <button onClick={handleEditClick} className="bg-blue-500 text-white px-8 py-2 rounded-md mx-4 my-8">Edit</button>
              </>
            )}
          </div>  
          <div className="mt-auto text-xl">
            {/* Navigation Tabs */}
            <div className="cursor-pointer text-white my-4 hover:bg-blue-500 hover:text-white hover:border-[#110069] py-2 px-4 rounded-md border border-transparent" onClick={() => handleTabClick('Logout')}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VendorProfileCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import {  logout } from '../redux/reducer/auth';
import { useDispatch } from 'react-redux';
import {  AppDispatch } from '../redux/store';

interface Props {
  yourName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password?: string | undefined;
  profile?: string | undefined;
  id?: string | undefined;
}

const UserSidebar: React.FC<Props> = ({ yourName, profile, phone, email }) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

 

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
         dispatch(logout());
         navigate('/');
 
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-blue-900 w-80 p-6 flex flex-col items-center">
        <div className="mt-8 w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
          <img src={profile} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="mt-4 text-center">
           
            <>
              <h3 className="text-4xl font-semibold my-2 text-white">{yourName}</h3>
              <p className="text-gray-300">{email}</p>
              <p className="text-gray-300">{phone}</p>
              
            </>
          
        </div>
        <div className=" text-xl mt-auto mb-[30%] w-full">
          {['Logout'].map(tab => (
            <div
              key={tab}
              className="flex justify-center cursor-pointer text-white my-4 py-2 px-4 rounded-md border border-transparent hover:bg-blue-500 hover:text-white hover:border-[#110069] transition-colors"
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

export default UserSidebar;

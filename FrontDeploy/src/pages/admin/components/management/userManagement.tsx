import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useGetAllUserQuery } from "../../../../redux/api/user";
import { useDeleteUserMutation } from "../../../../redux/api/user";
import { useNavigate } from "react-router-dom";

const UserManagement: React.FC = () => {
  const navigate = useNavigate();

  const { data: user, refetch } = useGetAllUserQuery();

  const [deleteUser] = useDeleteUserMutation();

  const admins = user?.data.users;
  // console.log("user data", admins);

  const [reloadTrigger, setReloadTrigger] = useState(true); // State to trigger reload

  useEffect(() => {
    // Effect to reload data when reloadTrigger state changes
    if (reloadTrigger) {
      setReloadTrigger(true);
    }
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this User?");
    
    // If user confirms deletion, proceed with deletion
    if (confirmDelete) {
     await deleteUser(id);
    setReloadTrigger(false); // Trigger reload after deletion
    // console.log("admin deleted", res);
    }
  };

  function viewUser(id: any): void {
    navigate(`/UserProfile/${id}`);
  }

  return (
    <>
      <h2 className="text-center font-bold text-3xl mb-6">User Management</h2>
      <hr className="border-2 mb-6" />
      <div className="bg-white shadow-md rounded-md px-6 pb-6 pt-2 h-screen">
        <div className="w-full mb-4 shadow-lg rounded-md overflow-hidden border">
          <div className="flex bg-gray-200 text-gray-700 font-bold text-lg">
            <div className="w-1/12 p-2">Index</div>
            <div className="w-3/12 p-2">Name</div>
            <div className="w-4/12 p-2">Email</div>

          </div>
          <div className="bg-gray-50">
            {admins?.map((admin, index) => (
              <div key={index} className="flex text-center items-center hover:bg-gray-100">
                <div className="w-1/12 p-2">{index + 1}</div>
                <div className="w-3/12 p-2">{admin?.fullName}</div>
                <div className="w-1/12 p-2">{admin?.city}</div>
                <div
                  className="w-1/12 p-2 cursor-pointer flex justify-center items-center"
                  onClick={() => viewUser(admin?._id)}
                >
                  <FaEye size={20} />
                </div>
                <div
                  className="w-1/12 p-2 cursor-pointer flex justify-center items-center"
                  onClick={() => admin?._id}
                >
                  <FaTrash />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
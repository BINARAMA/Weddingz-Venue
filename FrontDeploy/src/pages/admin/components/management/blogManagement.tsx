import React, { useEffect, useState } from "react";
import { FaEye, FaTrash, FaPlus } from "react-icons/fa"; // Import FaPlus for the add button
import { useGetAllBlogsQuery } from "../../../../redux/api/blog";
// import { useDeleteUserMutation } from "../../../../redux/api/user";
import { useDeleteBlogMutation } from "../../../../redux/api/blog";
import { useNavigate } from "react-router-dom";

const BlogManagement: React.FC = () => {
  const navigate = useNavigate();

  const { data: user, refetch } = useGetAllBlogsQuery('');

  const [deleteUser] = useDeleteBlogMutation();

  const admins = user?.data.blog;

  const [reloadTrigger, setReloadTrigger] = useState(false); // State to trigger reload

  useEffect(() => {
    // Effect to reload data when reloadTrigger state changes
    if (reloadTrigger) {
      refetch();
      setReloadTrigger(false);
    }
  }, [reloadTrigger, refetch]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Blog?");
    
    if (confirmDelete) {
     await deleteUser(id);
    //   console.log("res",res)
      setReloadTrigger(true); // Trigger reload after deletion
    }
  };

  function viewUser(id: any): void {
    navigate(`/blog/${id}`);
  }

  function addNewBlog(): void {
    navigate("/blog/new"); // Navigate to the add new blog page
  }

  return (
    <>
      <h2 className="text-center font-bold text-3xl mb-6">Blog Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={addNewBlog}
        >
          <FaPlus className="mr-2" />
          Add New Blog
        </button>
      </div>
      <hr className="border-2 mb-6" />
      <div className="bg-white shadow-md rounded-md px-6 pb-6 pt-2 h-screen">
        <div className="w-full mb-4 shadow-lg rounded-md overflow-hidden border">
          <div className="flex bg-gray-200 text-gray-700 font-bold text-lg">
            <div className="w-1/12 p-2">Index</div>
            <div className="w-5/12 p-2">Title</div>
            <div className="w-4/12 p-2">Created At</div>
            <div className="w-1/12 p-2">View</div>
            <div className="w-1/12 p-2">Delete</div>
          </div>
          <div className="bg-gray-50">
            {admins?.map((admin, index) => (
              <div key={index} className="flex text-center items-center hover:bg-gray-100">
                <div className="w-1/12 p-2">{index + 1}</div>
                <div className="w-5/12 p-2">{admin?.title}</div>
                <div className="w-4/12 p-2">{admin?.createdAt}</div>
                <div
                  className="w-1/12 p-2 cursor-pointer flex justify-center items-center"
                  onClick={() => viewUser(admin?._id)}
                >
                  <FaEye size={20} />
                </div>
                <div
                  className="w-1/12 p-2 cursor-pointer flex justify-center items-center"
                  onClick={() => admin?._id && handleDelete(admin._id)}
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

export default BlogManagement;

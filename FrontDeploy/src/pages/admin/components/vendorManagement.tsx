import React, { useState, useEffect } from "react";
import { FaCheckSquare, FaEye, FaRegSquare, FaTrash } from "react-icons/fa";

interface Admin {
  index: number;
  name: string;
  email: string;
  contact: string;
}

const VendorManagement: React.FC = () => {
  // Sample list of admins
  const admins: Admin[] = [
    { index: 1, name: "Admin 1", email: "email", contact: "2344" },
    { index: 2, name: "Admin 2", email: "email", contact: "2344" },
    { index: 3, name: "Admin 3", email: "email", contact: "2344" },
    { index: 4, name: "Admin 4", email: "email", contact: "2344" },
    { index: 5, name: "Admin 5", email: "email", contact: "2344" },
    // Add more admins here as needed
  ];

  const add = () => {
    // Add functionality
    console.log("Add clicked");
  };

  const remove = () => {
    // Remove functionality
    console.log("Remove clicked");
  };

  const [checkboxStates, setCheckboxStates] = useState(Array(admins.length).fill(false));
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
  const [areAllCheckboxesSelected, setAreAllCheckboxesSelected] = useState(false);

  const toggleCheckbox = (index: number) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const handleDelete = (index: number) => {
    // Remove the admin at the specified index
   // const updatedAdmins = admins.filter((_, i) => i !== index);
    // Update the state to reflect the new list of admins
    console.log("admin deleted", index)
    // setAdmins(updatedAdmins);
    // You may want to perform other actions related to deletion here
  };

  useEffect(() => {
    // Check if any checkbox is checked
    const anyChecked = checkboxStates.some((checked) => checked);
    setIsAnyCheckboxChecked(anyChecked);
  }, [checkboxStates]);

  useEffect(() => {
    // Check if any checkbox is checked
    const anyChecked = checkboxStates.some((checked) => checked);
    setAreAllCheckboxesSelected(anyChecked && checkboxStates.every(checked => checked));
  }, [checkboxStates]);

  const selectAll = () => {
    const allChecked = checkboxStates.every(checked => checked);
    const newCheckboxStates = Array(admins.length).fill(!allChecked);
    setCheckboxStates(newCheckboxStates);
  };

  const unselectAll = () => {
    const newCheckboxStates = Array(admins.length).fill(false);
    setCheckboxStates(newCheckboxStates);
  };

  function viewUser(index: number): void {
    console.log(index)
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-white shadow-md rounded-md p-6 flex h-screen">
      <div className="w-3/4 mb-4 shadow-2xl shadow-slate-400 border-2">
        <div className="flex w-full bg-slate-300">
          <div className="h-fit flex w-full text-lg font-bold text-center">
            <div className="w-1/12 bg-blue-300 ml-2 mt-2 mr-1">Index</div>
            <div className="w-3/12 bg-green-300 font-bold mt-2 mr-1">Name</div>
            <div className="w-3/12 bg-green-300 font-bold mt-2 mr-1">Email</div>
            <div className="w-2/12 bg-green-300 font-bold mt-2 mr-1">Contact</div>
            <div className="w-1/12 bg-pink-300 mt-2 mr-1">View</div>
            <div className="w-1/12 bg-pink-300 mt-2 mr-1">Select</div>
            <div className="w-1/12 bg-cyan-300 mt-2 mr-2">Delete</div>
          </div>
        </div>
        <div className=" w-full bg-slate-300">
          {admins.map((admin, index) => (
            <React.Fragment key={index}>
              <div className="flex w-full bg-slate-300 text-center ">
                <div className="w-1/12 bg-blue-300 mt-2 ml-2 mr-1">{admin.index}</div>
                <div className="w-3/12 bg-green-300 font-bold mt-2 mr-1">{admin.name}</div>
                <div className="w-3/12 bg-green-300 font-bold mt-2 mr-1">{admin.email}</div>
                <div className="w-2/12 bg-green-300 font-bold mt-2 mr-1">{admin.contact}</div>
                <div className="w-1/12 bg-pink-300 mt-2 mr-1 cursor-pointer flex justify-center items-center" onClick={() => viewUser(index)}>
  {<FaEye size={20} />}
</div>
                <div className="w-1/12 bg-pink-300 mt-2 mr-1 cursor-pointer flex justify-center items-center" onClick={() => toggleCheckbox(index)}>
                  {checkboxStates[index] ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                </div>
                <div className="w-1/12 bg-cyan-300 mt-2 mr-2 cursor-pointer flex justify-center items-center" onClick={() => handleDelete(index)}>
                  <FaTrash />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="w-1/4 mb-4 border-2 shadow-2xl shadow-slate-400 ml-4 flex flex-col">
        <button
          onClick={add}
          className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white py-2 px-4 m-2 rounded-lg shadow-md"
        >
          Add
        </button>
        {isAnyCheckboxChecked && (
        <button
          onClick={remove}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 m-2 rounded-lg shadow-md"
        >
          Delete All
        </button>
        )}
        
        {isAnyCheckboxChecked && !areAllCheckboxesSelected && (
          <button
            onClick={unselectAll}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 m-2 rounded-lg shadow-md"
          >
            Unselect the selected
          </button>
        )}
        <button
          onClick={selectAll}
          className={`bg-gradient-to-r ${areAllCheckboxesSelected ? 'from-green-500 to-green-400 hover:from-green-600 hover:to-green-500' : 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'} text-white py-2 px-4 m-2 rounded-lg shadow-md`}
        >
          {areAllCheckboxesSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
    </div>
  );
};

export default VendorManagement;

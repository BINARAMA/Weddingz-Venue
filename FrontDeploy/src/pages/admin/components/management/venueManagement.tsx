
import React, { useEffect, useState } from "react";
import { FaCheck, FaEye, FaTimes, FaTrash, FaPencilAlt, FaSave } from "react-icons/fa";
import { useAllVenueQuery } from "../../../../redux/api/venue";
import { useUpdateVenueMutation } from "../../../../redux/api/venue";
import { useDeleteVenueByIdMutation } from "../../../../redux/api/venue";
import { useNavigate } from "react-router-dom";
import { Venue } from "../../../../types/types";

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { AllVenuesResponse } from "../../../../types/api-types";

const VenueManagement: React.FC = () => {
  const adminId = useSelector((state: RootState) => state?.auth?.user?._id);
  console.log("admin", adminId);

  const navigate = useNavigate();
  const { data: venueData, refetch } = useAllVenueQuery("");
  const venues = (venueData as AllVenuesResponse)?.data || [];
  console.log("Venue data structure:", venueData);
  const [verify] = useUpdateVenueMutation();
  const [deleteVenue] = useDeleteVenueByIdMutation();
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [editModeMap, setEditModeMap] = useState<{ [key: string]: boolean }>({});
  const [editableRank, setEditableRank] = useState<number>(0);

  console.log("here is the data", venueData?.data);

  useEffect(() => {
    if (reloadTrigger) {
      refetch();
      setReloadTrigger(false);
    }
  }, [reloadTrigger, refetch]);

  const handleApproval = async (id: string) => {
    const verificationStatus = "Approved";
    console.log("data");
    const res = await verify({  venueId: id || "", formData: { isVerified: verificationStatus } });
    console.log("data", res);
  };

  const handleRejection = async (id: string) => {
    const verificationStatus = "Rejected";
    await verify({  venueId: id || "", formData: { isVerified: verificationStatus } });
   // { vendorId: id || "", formData: formDataToSend }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Venue?"
    );
    const user = adminId ?? "1213"
    if (confirmDelete) {
      await deleteVenue({id , user});
      setReloadTrigger(true);
    }
  };

  const viewUser = (id: string): void => {
    navigate(`/VenueProfile/${id}`);
  };

  const handleRankChange = async (id: string, newRank: number) => {
    console.log("newrank" ,newRank )
     const clampedRank = Math.min(Math.max(newRank, 0), 10);
    // const clampedRank = newRank

    const res = await verify({ venueId: id || "", formData: { rank: clampedRank } });
    console.log("Rank updated:", res);

    toggleEditMode(id);
  };

  const toggleEditMode = (id: string) => {
    setEditModeMap((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <h2 className="text-center font-bold text-3xl mb-6">Venue Management</h2>
      <div className="bg-white shadow-md rounded-md px-6 pb-6 pt-2 h-screen">
        <div className="w-full mb-4 shadow-lg rounded-md overflow-hidden border">
          <div className="flex bg-gray-200 text-gray-700 font-bold text-lg">
            <div className="w-1/12 p-2">Index</div>
            <div className="w-2/12 p-2">Name</div>
            <div className="w-3/12 p-2">Email</div>
            <div className="w-1/12 p-2">Rank</div>
            <div className="w-1/12 p-2">Contact</div>
            <div className="w-1/12 p-2">City</div>
            <div className="w-1/12 p-2">View</div>
            <div className="w-1/12 p-2">Approval</div>
            <div className="w-1/12 p-2">Delete</div>
          </div>
          <div className="bg-gray-50">
          
          {venues.map((admin: Venue, index: number) => (
              <div key={index} className="flex text-center items-center hover:bg-gray-100">
                <div className="w-1/12 p-2">{index + 1}</div>
                <div className="w-2/12 p-2">{admin.yourName}</div>
                <div className="w-3/12 p-2">{admin.email}</div>
                <div className="w-1/12 p-2">
                  {editModeMap[admin._id ?? ""] ? (
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        className="border border-gray-300 rounded-md px-1 py-1 w-8"
                        value={editableRank !== undefined ? editableRank : ''}
                        onChange={(e) => setEditableRank(parseInt(e.target.value))}
                      />
                      <button className="ml-2 bg-green-500 text-white rounded-md px-1 py-1 flex items-center" onClick={() => admin._id && handleRankChange(admin._id, editableRank)}>
                        <FaSave fontSize={14} className="" />
                      </button>
                      <button className="ml-2 bg-red-500 text-white rounded-md px-1 py-1 flex items-center" onClick={() => admin._id && toggleEditMode(admin._id)}>
                        <FaTimes fontSize={14} className="" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <span>{admin.rank}</span>
                      <div
                        className="cursor-pointer ml-4"
                        onClick={() => admin._id && toggleEditMode(admin._id)}
                      >
                        <FaPencilAlt fontSize={14} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-1/12 p-2">{admin.phone}</div>
                <div className="w-1/12 p-2">{admin.city}</div>
                <div
                  className="w-1/12 p-2 cursor-pointer flex justify-center items-center"
                  onClick={() => admin._id && viewUser(admin._id)}
                >
                  <FaEye size={20} />
                </div>
                <div className="w-1/12 p-2 flex justify-center items-center">
                  {admin.isVerified === "Approved" ? (
                    <span className="bg-green-500 text-white rounded-full px-2 py-1 font-semibold">
                      Approved
                    </span>
                  ) : admin.isVerified === "Rejected" ? (
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 font-semibold">
                      Rejected
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => admin._id && handleApproval(admin._id)}
                        className="bg-green-500 text-white rounded-full p-1 mr-2"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => admin._id && handleRejection(admin._id)}
                        className="bg-red-500 text-white rounded-full p-1"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </div>
                <div
                  className="w-1/12 p-2 cursor-pointer flex justify-center items-center"
                  onClick={() => admin._id && handleDelete(admin._id)}
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

export default VenueManagement;
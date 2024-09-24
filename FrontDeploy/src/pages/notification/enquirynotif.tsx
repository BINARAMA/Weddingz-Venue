import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useGetBookingbyIdQuery,
  useUpdateIsVerifiedMutation,
} from "../../redux/api/booking";
import { FaCheck, FaTimes } from "react-icons/fa";
import NavBar from "../../components/navbar";

const EnquiryNotif = () => {
  const vId = useSelector((state: RootState) => state?.auth?.user?._id);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  console.log("otpppp", otp);

  const { data, refetch } = useGetBookingbyIdQuery({ vId: vId as string });
  const [verify] = useUpdateIsVerifiedMutation();
  const [reloadTrigger, setReloadTrigger] = useState(false);
  console.log("data", data);

  useEffect(() => {
    if (reloadTrigger) {
      refetch();
      setReloadTrigger(false);
    }
  }, [reloadTrigger, refetch]);

  const handleApproval = async (uId: string) => {
    try {
      console.log("approved");
      const res = await verify({
        vId: vId as string,
        uId: uId as string,
        bookingId: otp,
      });
      setReloadTrigger(true);
      return res;
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleRejection = async (uId: string) => {
    try {
      console.log("rejected", uId);
      console.log("rejected");
      await verify({
        vId: vId as string,
        uId: uId as string,
        bookingId: "Rejected",
      });
      setReloadTrigger(true);
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      if (selectedUserId) {
        const res = await handleApproval(selectedUserId);
        console.log("res", res);
        if ((res as any).data === "Approved") {
          setShowOTPPopup(false);
        }
      }
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((user: any, index: number) => (
          <div
            key={index}
            className={`p-4 m-4 border border-gray-200 rounded shadow-md`}
          >
            <div className="mb-4">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-gray-500">{user.address}</p>
            </div>
            <div className="mb-2">
              <p className="text-gray-600">Contact: {user.contact}</p>
              <p className="text-gray-600">Guest: {user.guests}</p>
              <p className="text-gray-600">Location: {user.location}</p>
              <p className="text-gray-600">Message: {user.message}</p>
            </div>

            <div className="w-1/12 p-2 flex justify-center items-center">
              {user.isVerified === "Approved" ? (
                <span className="bg-green-500 text-white rounded-full px-2 py-1 font-semibold">
                  Approved
                </span>
              ) : user.isVerified === "Rejected" ? (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 font-semibold">
                  Rejected
                </span>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setSelectedUserId(user.uId);
                      setShowOTPPopup(true);
                    }}
                    className="bg-green-500 text-white rounded-full p-1 mr-2"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(user.uId)}
                    className="bg-red-500 text-white rounded-full p-1"
                  >
                    <FaTimes />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {showOTPPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <button
              onClick={handleOTPSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Submit
            </button>
            <button
              onClick={() => setShowOTPPopup(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquiryNotif;

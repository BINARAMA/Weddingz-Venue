import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Profile from "./components/profile/profile"; // Assuming 'profile' is the name of the file containing the Profile component
import VendorManagement from "./components/management/vendorManagement";
import VenueManagement from "./components/management/venueManagement";
import UserManagement from "./components/management/userManagement";
import BlogManagement from "./components/management/blogManagement";
import RealWeddingManagement from "./components/management/realWeddingManagement";
// import BookingManagement from './components/bookingManagement';
import NotificationManagement from "./components/management/notificationManagement"

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [selectedSection, setSelectedSection] = useState<string | undefined>("");

  useEffect(() => {
    if (page) {
      setSelectedSection(page);
    }
  }, [page]);

  const handleButtonClick = (sectionName: string) => {
    setSelectedSection(sectionName);
    navigate(`/adminDashboard`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "Admin Management":
      case "Vendor Management":
        return <VendorManagement />;
      case "Venue Management":
        return <VenueManagement />;
      case "User Management":
        return <UserManagement />;
      case "Blog Management":
        return <BlogManagement />;
      case "Real Wedding Management":
        return <RealWeddingManagement />;
      case "Notification Management":
        return <NotificationManagement />;
      default:
        return <Profile />; // Render Profile by default
    }
  };

  return (
    <div className="flex h-screen  ">
      <div className="w-1/3 bg-gray-800 text-white p-2 flex flex-col items-center ">
        <div className="flex items-center mb-6 ">
          <div className="flex justify-center flex-col">
          <img src="/weddingz_venue_logo.png" alt="Logo" className=" h-16 m-4 " />
          <h1 className=" sm:text-sm lg:text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
        <ul className="mt-4 w-full space-y-2 flex flex-col items-center">
          {["Profile", "Admin Management", "Vendor Management", "Venue Management", "User Management", "Blog Management", "Real Wedding Management" , "Notification Management"].map((section) => (
            <li
              key={section}
              className={`py-2 px-4 align-middle rounded-lg hover:bg-blue-800 cursor-pointer text-center lg:w-1/2 ${
                selectedSection === section ? "bg-blue-800" : "bg-blue-700"
              }`}
              onClick={() => handleButtonClick(section)}
            >
              {section}
            </li>
          ))}
          {/* Uncomment the following line if Booking Management is needed */}
          {/* <li className={`py-2 px-4 bg-blue-700 hover:bg-blue-800 cursor-pointer ${selectedSection === "Booking Management" ? 'bg-blue-800' : ''}`} onClick={() => handleButtonClick("Booking Management")}>Booking Management</li> */}
        </ul>
        <button onClick={handleLogout} className="mt-auto bg-red-600 hover:bg-red-500 py-2 px-4 rounded-lg text-lg font-semibold scale-90 lg:w-1/2">
          Logout
        </button>
      </div>
      <div className="flex-1 p-8 bg-gray-50">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;

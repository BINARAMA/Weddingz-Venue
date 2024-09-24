import React, { useState } from 'react';
import { VenueRegistrationForm, VendorRegistrationForm } from './businessRegistration';


const Business: React.FC = () => {
  const [showVendorForm, setShowVendorForm] = useState(true);

  const handleToggleForm = () => {
    setShowVendorForm(prevState => !prevState);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Business Registration</h2>
      <div className="flex justify-center mb-4 sm:mb-6">
        <button
          className={`py-1 px-2 sm:py-2 sm:px-4 rounded-md ${showVendorForm ? 'bg-[#173445] text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={handleToggleForm}
        >
          Vendor Registration
        </button>
        <button
          className={`ml-2 sm:ml-4 py-1 px-2 sm:py-2 sm:px-4 rounded-md ${!showVendorForm ? 'bg-[#173445] text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={handleToggleForm}
        >
          Venue Registration
        </button>
      </div>
      <div className="p-4 sm:p-6 bg-gray-100 rounded-md">
        {showVendorForm ? <VendorRegistrationForm /> : <VenueRegistrationForm />}
      </div>
    </div>
  );
};

export default Business;

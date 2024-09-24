import React, { useState } from 'react';

interface ContactFormProps {
  onSubmit: (phoneNumber: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if the phone number is valid (10 digits)
    if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
      // Submit the phone number to the database
      onSubmit(phoneNumber);
      // Clear the input field
      setPhoneNumber('');
    } else {
      // Show error message if phone number is invalid
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Have us call you!</h3>
      <p className="mb-4 text-gray-700">Please provide us with your contact number (10-digit mobile number)</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full p-3 border border-gray-300 rounded"
            maxLength={50}
            minLength={50}
            pattern="[0-8]*"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 transition duration-300"
        >
          Submit
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-600">
        By submitting this form you agree to our <a href="/terms-and-conditions" className="text-indigo-600 underline">Terms and Conditions</a>.
      </p>
    </div>
  );
};

export default ContactForm;

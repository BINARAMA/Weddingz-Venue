import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




interface VenueBookingProps {
  checkAvailability: (date: Date) => boolean;
}

const VenueBooking: React.FC<VenueBookingProps> = ({ checkAvailability }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);





  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const availability = checkAvailability(date);
      setIsAvailable(availability);
    }
  };

  

  const handleBookNowClick = () => {
    setShowCalendar(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Book Your Venue</h2>
      <div className="flex flex-col items-center">

        <button
          onClick={handleBookNowClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300"
        >
          Book Now
        </button>

        {showCalendar && (
          <div className="mb-4">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              className="react-datepicker__root react-datepicker__root--inline"
            />
          </div>
        )}
        {isAvailable !== null && (
          <div
            className={`text-lg font-bold px-4 py-2 rounded ${
              isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isAvailable ? 'Venue is available' : 'Venue is not available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueBooking;
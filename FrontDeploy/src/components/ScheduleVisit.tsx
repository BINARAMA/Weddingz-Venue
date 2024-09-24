import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

interface ScheduleVisitProps {
  onScheduleVisit: (date: Date, time: string) => void;
}

const ScheduleVisit: React.FC<ScheduleVisitProps> = ({ onScheduleVisit }) => {
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [visitTime, setVisitTime] = useState('');

  const handleSubmit = () => {
    if (visitDate && visitTime) {
      onScheduleVisit(visitDate, visitTime);
    } else {
      alert('Please select both date and time.');
    }
  };

  return (
    <div className="w-80 h-80 m-10 mt-14 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between p-4 bg-gradient-to-r from-[#110069] to-indigo-600 text-white scale-110">
      <div>
        <h3 className="text-xl font-bold mb-4">Schedule a Visit</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 flex items-center">
            <FaCalendarAlt className="mr-2" /> Visit Date
          </label>
          <DatePicker
            selected={visitDate}
            onChange={(date) => setVisitDate(date)}
            className="w-full p-2 border border-gray-300 rounded text-gray-700"
            placeholderText="Select a date"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 flex items-center">
            <FaClock className="mr-2" /> Visit Time
          </label>
          <input
            type="time"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-700"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-white text-indigo-600 hover:text-indigo-800 font-extrabold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none"
      >
        Schedule Visit
      </button>
    </div>
  );
};

export default ScheduleVisit;

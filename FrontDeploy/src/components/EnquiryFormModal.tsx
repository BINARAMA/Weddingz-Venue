import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface EnquiryFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (formData: any) => void;
}

const EnquiryFormModal: React.FC<EnquiryFormModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    guests: '',
    date: '',
    address: '',
    message: '',
    typeOfEvent: ''
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'cuntact') {
      setContactError('');
    }
  };

  const [contactError, setContactError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if contact is exactly 10 digits
    if (!/\d{10}/.test(formData.contact)) {
      setContactError('Contact must be exactly 10 digits');
      return;
    }

    onSubmit(formData);
    onRequestClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Enquiry Form"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Send Enquiry</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="guests">Guests:</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="typeOfEvent">Type of Event:</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded h-24"
            />
          </div>
          <div className="col-span-2 flex justify-end space-x-2">
            <button type="button" onClick={onRequestClose} className="bg-gray-400 text-white font-medium py-2 px-4 rounded hover:bg-gray-500 transition duration-300">Close</button>
            <button type="submit" className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Send</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EnquiryFormModal;

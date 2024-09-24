// OTPPopup.tsx
import React, { useState } from 'react';

type OTPPopupProps = {
    onClose: () => void;
    onSubmit: (otp: string) => void;
};

const OTPPopup: React.FC<OTPPopupProps> = ({ onClose, onSubmit }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = () => {
        onSubmit("sumitisking");
    };

    return (
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
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                    Submit
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OTPPopup;

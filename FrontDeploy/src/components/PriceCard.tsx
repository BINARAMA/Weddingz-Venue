import React, { useEffect, useState } from 'react';
import { useAddWishlistMutation, useDeleteWishlistMutation, useGetWishlistQuery } from '../redux/api/wishlist';
import EnquiryFormModal from './EnquiryFormModal';
import { useAddBookingEnquiryMutation, useGetBookingByUserAndVenueQuery } from '../redux/api/booking';

const userId = "665d6d766063ea750000e096";

interface Props {
  price: string | undefined;
  rating: number;
  vendorId: string;
  itemType?: string;
}

const OtpPopup: React.FC<{ otp: string | undefined }> = ({ otp }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg text-gray-800 font-semibold mb-2">Your OTP</h3>
      <p className="text-xl text-black font-bold">{otp || 'N/A'}</p>
    </div>
  </div>
);

const PriceCard: React.FC<Props> = ({ price, rating, vendorId, itemType = "vendor" }) => {
  const [isWishlistSelected, setIsWishlistSelected] = useState(false);
  const [isEnquirySelected, setIsEnquirySelected] = useState(false);
  const [hasSentEnquiry, setHasSentEnquiry] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  
  const [addWishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [sendEnquiry] = useAddBookingEnquiryMutation();
  const { data: wishlistData, refetch } = useGetWishlistQuery(userId);
  const { data: bookingData } = useGetBookingByUserAndVenueQuery({ uId: userId, vId: vendorId as string });
  const itemId = vendorId;

  console.log("Booking data received:", bookingData?.bookingId);
  const otp = bookingData?.bookingId;

  useEffect(() => {
    if (wishlistData) {
      const isWishlisted = wishlistData?.wishlist?.items?.some(item => item.itemId === itemId) ?? false;
      setIsWishlistSelected(isWishlisted);
    }
  }, [wishlistData, itemId]);

  useEffect(() => {
    if (bookingData && bookingData.message === "True") {
      setHasSentEnquiry(true);
    }
  }, [bookingData]);

  const handleWishlistClick = async () => {
    try {
      if (isWishlistSelected) {
        await deleteWishlist({ userId, itemId, itemType }).unwrap();
        console.log("Item removed from wishlist");
      } else {
        await addWishlist({ userId, itemId, itemType }).unwrap();
        console.log("Item added to wishlist");
      }
      refetch();
      setIsWishlistSelected(!isWishlistSelected);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleEnquirySubmit = async (formData: any) => {
    try {
      const res = await sendEnquiry({ ...formData, vId: itemId, uId: userId }).unwrap();
      console.log("status of the request", res);

      if (res.message === "True") {
        setHasSentEnquiry(true);
      }
    } catch (error) {
      console.error("Failed to send enquiry:", error);
    }
  };

  const handleEnquirySentClick = () => {
    if (hasSentEnquiry) {
      setShowOtpPopup(true);
      setTimeout(() => setShowOtpPopup(false), 5000);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-500 scale-150 mx-1">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="text-gray-400 scale-150 mx-1">&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg shadow-xl p-8 max-w-full transition-all duration-300 transform hover:scale-105">
      <h2 className="text-gray-800 text-4xl font-bold text-center mb-4">Package Price</h2>
      <p className="text-gray-600 text-3xl font-semibold text-center mb-8">₹{price}</p>
      <div className="flex justify-center items-center mb-8">
        {renderStars(rating)}
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          className={`${hasSentEnquiry
            ? "bg-purple-500 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
            } py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 mb-4 w-full`}
          onClick={hasSentEnquiry ? handleEnquirySentClick : () => setIsEnquirySelected(!isEnquirySelected)}
        >
          {hasSentEnquiry ? "Enquiry Sent" : "Send Enquiry"}
        </button>
        <button
          className={`${isWishlistSelected
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700"
            } py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 mb-4 w-full`}
          onClick={handleWishlistClick}
        >
          {isWishlistSelected ? "Added to Wishlist" : "Add to Wishlist"}
        </button>
      </div>
      {!hasSentEnquiry && (
        <EnquiryFormModal
          isOpen={isEnquirySelected}
          onRequestClose={() => setIsEnquirySelected(false)}
          onSubmit={handleEnquirySubmit}
        />
      )}
      {showOtpPopup && <OtpPopup otp={otp} />}
    </div>
  );
};

export default PriceCard;
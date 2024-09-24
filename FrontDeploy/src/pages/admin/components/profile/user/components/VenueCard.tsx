import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaCarrot, FaDrumstickBite, FaHeart } from 'react-icons/fa';

import { useGetWishlistQuery } from '../../../../../../redux/api/wishlist';

const userId = "665d6d766063ea750000e096";

interface VenueProps {
  venue: {
    name: string | undefined;
    location: string | undefined;
    maxGuests: string | undefined;
    contact: string | undefined;
    description?: string; // Make description optional
    vegPrice: number | undefined;
    nonVegPrice: number | undefined;
    images?: string[]; // Make images optional
    id: string | undefined;
  };
}

const VenueCard: React.FC<VenueProps> = ({ venue }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: wishlistData } = useGetWishlistQuery(userId);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (wishlistData) {
      const isWishlisted = wishlistData?.wishlist?.items?.some((item :any) => item.itemId === venue.id) ?? false;
      setIsInWishlist(isWishlisted);
    }
  }, [wishlistData, venue.id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? (venue?.images?.length ?? 0) - 1 : currentImageIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === (venue?.images?.length ?? 0) - 1 ? 0 : currentImageIndex + 1
    );
  };

  return (
    <div className="flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden mx-4 my-4 border-2 border-gray-300">
      <div className="relative md:w-1/2 max-h-80">
        <img
          src={venue?.images?.[currentImageIndex]}
          alt={`Venue ${currentImageIndex}`}
          className="w-full h-80 md:h-auto object-cover"
        />
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={handlePrevImage}
            className="bg-white rounded-full p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextImage}
            className="bg-white rounded-full p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="md:w-1/2 p-4 text-center">
        <div
          className={`text-end items-end ${isInWishlist ? "text-red-500 transform scale-125" : "text-white transform scale-125 "}`}
        >
          <FaHeart size={25} />
        </div>
        <h2 className="text-3xl font-bold mb-2">{venue.name}</h2>
        <p className="text-xl text-gray-600 mb-2">{venue.location}</p>
        <div className="mb-4 flex justify-center">
          <p className="text-lg text-gray-600 mr-4">
            <span className="font-bold">Max Guests:</span> {venue.maxGuests}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-bold">Contact:</span> {venue.contact}
          </p>
        </div>
        <div className="mb-4 text-lg text-gray-700">
          {showFullDescription
            ? venue.description
            : `${venue.description?.slice(0, 100)}...`}
          {venue.description?.length && venue.description?.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              {showFullDescription ? ' Read Less' : ' Read More'}
              {showFullDescription ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
            </button>
          )}
        </div>
        <div className="mb-4 flex justify-center">
          <div className="mr-8 text-lg text-gray-600 flex items-center">
            <FaCarrot size={20} className="mr-2" />
            <span className="font-bold">Veg Price:</span> {venue.vegPrice}
          </div>
          <div className="text-lg text-gray-600 flex items-center">
            <FaDrumstickBite size={20} className="mr-2" />
            <span className="font-bold">Non-Veg Price:</span> {venue.nonVegPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;

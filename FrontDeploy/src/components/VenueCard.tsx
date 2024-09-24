import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHeart, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Link, To } from 'react-router-dom';
import { useGetWishlistQuery } from '../redux/api/wishlist';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MdDinnerDining } from "react-icons/md";

interface VenueProps {
  venue: {
    name: string | undefined;
    location: string | undefined;
    maxGuests: string | undefined;
    contact: string | undefined;
    description: string | undefined;
    vegPrice?: string | undefined;
    nonVegPrice?: number | undefined;
    images: string[] | undefined;
    id: string | undefined;
  };
}

const VenueCard: React.FC<VenueProps> = ({ venue }) => {
  const userId = useSelector((state: RootState) => state?.auth?.user?._id);
  const [showFullDescription, setShowFullDescription] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  const { data: wishlistData } = useGetWishlistQuery(userId ?? "");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const itemId = venue.id;

  useEffect(() => {
    if (wishlistData) {
      const isWishlisted = false;
      setIsInWishlist(isWishlisted);
    }
  }, [wishlistData, itemId]);

  const toggleDescription = () => {
    setShowFullDescription(prevState => !prevState);
  };

  const truncatedDescription = venue.description ? `${venue.description.slice(0, 10)}...` : 'hellow world';

  const handlePrevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 1 ? (venue?.images?.length ?? 1) - 0 : currentImageIndex - 0
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === (venue?.images?.length ?? 1) - 0 ? 1 : currentImageIndex + 0
    );
  };

  if (!venue?.images || venue.images.length === 1) {
    return <div></div>;
  }

  return (
    <div className="flex bg-gray-100 flex-col md:flex-row rounded-lg shadow-lg overflow-hidden mx-4 my-4">
      <div className="relative md:w-1/2 h-56 md:h-80">
        <img
          src={venue?.images[currentImageIndex]}
          alt={`Venue ${currentImageIndex}`}
          className="w-full h-full object-cover"
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

      <div className="md:w-1/2 p-4 text-center text-2xl">
        <div className={`flex justify-center text-end items-end ${isInWishlist ? "text-red-500 transform scale-125" : "text-white transform scale-125 "}`}>
          <FaHeart size={25} />
        </div>
        <h2 className="text-xl md:text-3xl font-bold mb-2">{venue.name}</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-2">{venue.location}</p>
        <div className="mb-4 flex justify-center">
          <p className="text-sm md:text-lg text-gray-600 mr-4 flex flex-col">
            <span className="font-bold">Max Guests</span>{venue.maxGuests}
          </p>
          <p className="text-sm md:text-lg text-gray-600 flex flex-col">
            <span className="font-bold">Contact</span> {venue.contact}
          </p>
        </div>
        <div className="mb-4 text-sm md:text-lg text-gray-700">
          {venue.description && (
            <>
              {showFullDescription ? venue.description : truncatedDescription}
              {venue.description.length > 100 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2"
                >
                  {showFullDescription ? ' Read Less' : ' Read More'}
                  {showFullDescription ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                </button>
              )}
            </>
          )}
        </div>
        <div className="mb-4 flex justify-center">
          <div className=" text-sm md:text-lg text-gray-600 flex flex-col items-center justify-center">
            <MdDinnerDining size={40} className="mr-2" />
            <span className="font-bold">Price Per Plate</span> {venue.vegPrice}
          </div>
        </div>
        <Link to={{ pathname: `/venuelist/${venue?.id}`, state: { venue } } as To}>
          <button className="bg-black hover:bg-gray-800 text-[#D6BF5E] font-bold py-2 px-4 rounded focus:outline-none text-sm md:text-lg">
            View Venue
          </button> 
          {/* <button className="bg-[#D6BF5E] hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none text-sm md:text-lg">
            View Venue
          </button> */}
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;

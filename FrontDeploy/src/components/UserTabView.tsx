import React, { useState, ChangeEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome,  } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useGetWishlistQuery } from '../redux/api/wishlist';
import { useAllVenueQuery } from '../redux/api/venue';
import VenueCard from './VenueCard';
import { Venue, Vendor } from '../types/types';
import { useAllVendorQuery } from '../redux/api/vendor';
import VendorCard from './card/Vendorcard';
import { useGetUserQuery } from '../redux/api/user';
// const userId = "665d6d766063ea750000e096"
import { useUpdateUserMutation } from '../redux/api/user';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


interface ProfileData {
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
    avatarUrl: string;
}

interface OverviewTabProps {
    profileData: ProfileData;
    isEditing: boolean;
    handleEditClick: () => void;
    handleSaveClick: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// const userId = "665d6d766063ea750000e096";






const UserTabView = () => {

    const userId = useSelector((state: RootState) => state?.auth?.user?._id);

    const { data: user, refetch } = useGetUserQuery(userId ?? "")
    const [updateUser] = useUpdateUserMutation()
    console.log("checking for data", user?.data?.user)

    const userData = user?.data?.user

    const [activeTab, setActiveTab] = useState('Profile');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: userData?.fullName || '',
        phoneNumber: userData?.phone || '',
        address: userData?.city || '',
        email: userData?.email || '',
        avatarUrl: 'https://via.placeholder.com/150',
    });

    useEffect(() => {
        if (userData) {
            setProfileData({
                name: userData.fullName ?? "",
                phoneNumber: userData.phone ?? "",
                address: userData.city ?? "",
                email: userData.email ?? "",
                avatarUrl: 'https://via.placeholder.com/150',
            });
        }
    }, [userData]); 

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

   
    const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(false);

        try {
            console.log("ispe kuchlikhdo comment", profileData);
            const updatedUser = await updateUser({
                id: userId ?? "",
                user: {
                    fullName: profileData.name,
                    phone: profileData.phoneNumber,
                    city: profileData.address,
                    email: profileData.email,
                    avatarUrl: profileData.avatarUrl,
                }
            }).unwrap();
            
            setProfileData({
                name: updatedUser.fullName ?? "",
                phoneNumber: updatedUser.phone ?? "",
                address: updatedUser.city ?? "",
                email: updatedUser.email ?? "",
                avatarUrl: updatedUser.avatarUrl ?? "",
            });
            refetch(); // Optionally refetch user data to ensure it's up to date
        } catch (error) {
            console.error("Failed to update user: ", error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="border p-2 border-white overflow-scroll h-screen ">
            <nav className="flex max-w-full">
                <button
                    className={`${activeTab === 'Profile' ? 'bg-gray-200 border-b-2 border-blue-500' : 'bg-white'} py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto w-1/4`}
                    onClick={() => handleTabClick('Profile')}
                >
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Profile
                </button>
                <button
                    className={`${activeTab === 'Wishlist' ? 'bg-gray-200 border-b-2 border-blue-500' : 'bg-white'} py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto w-1/4`}
                    onClick={() => handleTabClick('Wishlist')}
                >
                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                    Wishlist
                </button>
                {/* <button
                    className={`${activeTab === 'Bookings' ? 'bg-gray-200 border-b-2 border-blue-500' : 'bg-white'} py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto w-1/4`}
                    onClick={() => handleTabClick('Bookings')}
                >
                    <FontAwesomeIcon icon={faImages} className="mr-2" />
                    Bookings
                </button>
                <button
                    className={`${activeTab === 'History' ? 'bg-gray-200 border-b-2 border-blue-500' : 'bg-white'} py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto w-1/4`}
                    onClick={() => handleTabClick('History')}
                >
                    <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                    History
                </button> */}
            </nav>
            <div className="mt-4">
                {activeTab === 'Profile' && <OverviewTab profileData={profileData} isEditing={isEditing} handleEditClick={handleEditClick} handleSaveClick={handleSaveClick} handleChange={handleChange} />}
                {activeTab === 'Wishlist' && <Wishlist />}
                {/* {activeTab === 'Bookings' && <PortfolioTab />} */}
                {/* {activeTab === 'History' && <PackageTab packages={dummyPackages} />} */}
                {/* {activeTab === 'Ratings' && <RatingsTab />} */}
            </div>
        </div>
    );
};


const OverviewTab: React.FC<OverviewTabProps> = ({ profileData, isEditing, handleEditClick, handleSaveClick, handleChange }) => {
    const [editImage, setEditImage] = useState(false);
    const [imageUrl, setImageUrl] = useState(profileData.avatarUrl);

    const handleImageChange = (newImageUrl: string) => {
        handleChange({ target: { name: 'avatarUrl', value: newImageUrl } } as ChangeEvent<HTMLInputElement>);
    };

    const handleSaveImage = () => {
        handleImageChange(imageUrl);
        setEditImage(false);
    };

    const { name, phoneNumber, address, email} = profileData;

    return (
        <div className="flex flex-col my-4 p-6 bg-white rounded-lg shadow-md text-black">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">Profile</h2>
            <div className="flex w-full ">
                <div className="flex-1 mr-20">
                    {isEditing ? (
                        <form className="flex flex-col gap-4" onSubmit={handleSaveClick}>
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">NAME :</h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    className="font-roboto w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">Phone Number:</h3>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handleChange}
                                    className="font-roboto w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">Address:</h3>
                                <input
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={handleChange}
                                    className="font-roboto w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">Email:</h3>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    className="font-roboto w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded font-roboto transition-colors duration-300 hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">NAME :</h3>
                                <p className="font-roboto">{name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">Phone Number:</h3>
                                <p className="font-roboto">{phoneNumber}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">Address:</h3>
                                <p className="font-roboto">{address}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold font-roboto text-gray-600">Email:</h3>
                                <p className="font-roboto">{email}</p>
                            </div>
                            <div>
                                <button
                                    onClick={handleEditClick}
                                    className="bg-blue-500 text-white px-4 py-2 rounded font-roboto transition-colors duration-300 hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <img
                        src={imageUrl}
                        alt="Avatar"
                        className="w-60 h-60 rounded-full shadow-md object-cover"
                    />
                </div>
                <div>
                    {editImage ? (
                        <div className="mt-2">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="font-roboto w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                placeholder="Enter new image URL"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveImage}
                                    className="bg-blue-500 text-white px-4 py-2 rounded font-roboto transition-colors duration-300 hover:bg-blue-600 mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditImage(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded font-roboto transition-colors duration-300 hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setEditImage(true)}
                            className="bg-blue-500 text-white px-4 py-2  rounded-full font-roboto transition-colors duration-300 hover:bg-blue-600 mt-2"
                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};






const Wishlist = () => {
    const userId = useSelector((state: RootState) => state?.auth?.user?._id);
    
    const { data: wishlistData, error: wishlistError, isLoading: wishlistLoading } = useGetWishlistQuery(userId ?? "");
    const { data: allVenuesData, error: venueError, isLoading: venueLoading } = useAllVenueQuery("");
    const { data: allVendorsData, error: vendorError, isLoading: vendorLoading } = useAllVendorQuery("");

    const [wishlistVenues, setWishlistVenues] = useState<Venue[]>([]);
    const [wishlistVendors, setWishlistVendors] = useState<Vendor[]>([]);

    useEffect(() => {
        console.log("Effect triggered. Checking data:", { wishlistData, allVenuesData, allVendorsData });

        if (!wishlistData || !allVenuesData || !allVendorsData) {
            console.log("Some data is missing. Skipping effect.");
            return;
        }

        const itemArray = wishlistData.wishlist?.items;
        if (!itemArray || !Array.isArray(itemArray)) {
            console.error("Wishlist items are not in expected format:", wishlistData);
            return;
        }

        const wishlistVendorItems = itemArray.filter(item => item.itemType === 'vendor');
        const wishlistVenueItems = itemArray.filter(item => item.itemType === 'venue');

        console.log("Filtered wishlist items:", { wishlistVendorItems, wishlistVenueItems });

        const allVenues = allVenuesData?.data;
        const allVendors = allVendorsData.data?.vendors;

        if (!Array.isArray(allVenues) || !Array.isArray(allVendors)) {
            console.error("Venues or Vendors data is not in expected format:", { allVenues, allVendors });
            return;
        }

        console.log("All venues and vendors:", { allVenues, allVendors });

        const filteredVenues = allVenues.filter(venue => 
            wishlistVenueItems.some(item => item.itemId === venue._id)
        );
        const filteredVendors = allVendors.filter(vendor => 
            wishlistVendorItems.some(item => item.itemId === vendor._id)
        );

        console.log("Filtered venues and vendors:", { filteredVenues, filteredVendors });

        setWishlistVenues(filteredVenues);
        setWishlistVendors(filteredVendors);

    }, [wishlistData, allVenuesData, allVendorsData]);

    if (wishlistError || venueError || vendorError) {
        console.error("Errors:", { wishlistError, venueError, vendorError });
        return <h1>Error while loading data</h1>;
    }

    if (wishlistLoading || venueLoading || vendorLoading) {
        return <h1>Loading</h1>;
    }

  

    if (!wishlistVenues.length && !wishlistVendors.length) {
        return <h1>Your wishlist is empty</h1>;
    }


    return (
        <div className="flex flex-col items-center">
            <div className='flex'>
                <div className="w-[50%] overflow-scroll border-2 border-white">
                    <h3 className="text-xl font-semibold font-roboto mt-4 mb-12 text-center">Vendors</h3>
                    {wishlistVendors.length > 0 ? wishlistVendors.map((vendor) => (
                        <div key={vendor._id} className='mix-blend-screen scale-90'>
                            <VendorCard
                                _id={vendor._id}
                                businessName={vendor.name}
                                city={vendor.city}
                                packagePrice={vendor.packages?.price}
                                summary={vendor.summary}
                                image={vendor.portfolio ? vendor.portfolio[4] : ""}

                            />
                        </div>
                    )) : <div>No Vendor found</div>}
                </div>
                <div className="w-[50%] overflow-scroll border-2 border-white">
                    <h3 className="text-xl font-semibold mt-4 mb-2 font-roboto text-center">Venues</h3>
                    {wishlistVenues.length > 0 ? wishlistVenues.map((venue) => (
                        <div key={venue._id} className='mix-blend-screen -ml-24 pr-2 my-32 text-black scale-75 h-[20%] w-[135%]'>
                            <VenueCard
                                venue={{
                                    name: venue.businessName,
                                    location: venue.city,
                                    maxGuests: venue.guestCapacity,
                                    contact: venue.phone,
                                    description: venue.summary,
                                    vegPrice: venue.foodPackages,
                                    images: venue.images,
                                    id: venue._id
                                }}
                            />
                        </div>
                    )) : <div>No Venue found</div>}
                </div>
            </div>
        </div>
    );
};












// const PortfolioTab = () => {
//     return (
//         <div className="flex flex-col items-center">
//             <h2 className="text-2xl font-semibold mb-4 font-roboto">Bookings</h2>
//             <div className="grid grid-cols-4 gap-4">
//                 <img
//                     src="https://picsum.photos/200"
//                     alt="Bookings Image 1"
//                     className="w-full h-auto rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                 />
//                 <img
//                     src="https://picsum.photos/200"
//                     alt="Bookings Image 2"
//                     className="w-full h-auto rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                 />
//                 <img
//                     src="https://picsum.photos/200"
//                     alt="Bookings Image 3"
//                     className="w-full h-auto rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                 />
//                 <img
//                     src="https://picsum.photos/200"
//                     alt="Bookings Image 4"
//                     className="w-full h-auto rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                 />
//             </div>
//         </div>
//     );
// };

// const PackageTab = ({ packages }: { packages: { name: string; days: string; price: string; minAdvance: string; }[] }) => {
//     return (
//         <div className="flex flex-col items-center">
//             <h2 className="text-2xl font-semibold mb-4 font-roboto">Packages</h2>
//             <div className="grid grid-cols-2 gap-8">
//                 {packages.map((pkg, index) => (
//                     <div
//                         key={index}
//                         className="border rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg"
//                     >
//                         <h3 className="font-semibold text-lg font-roboto">{pkg.name}</h3>
//                         <p className="font-roboto">Price: {pkg.price}</p>
//                         <p className="font-roboto">Duration: {pkg.days}</p>
//                         <p className="font-roboto">Minimum Advance: {pkg.minAdvance}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// const RatingsTab = () => {
//     const ratings = [
//         { stars: 5, review: "Excellent service!" },
//         { stars: 4, review: "Very good experience." },
//         { stars: 3, review: "Average service." },
//         { stars: 2, review: "Needs improvement." },
//         { stars: 1, review: "Poor service." },
//     ];

//     const renderStars = (rating: number) => {
//         const starArray = [];
//         for (let i = 0; i < 5; i++) {
//             if (i < rating) {
//                 starArray.push(<FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />);
//             } else {
//                 starArray.push(<FontAwesomeIcon key={i} icon={regularStar} className="text-gray-400" />);
//             }
//         }
//         return starArray;
//     };

//     return (
//         <div>
//             <h2 className="text-2xl font-semibold mb-4 font-roboto text-center">Ratings</h2>
//             <div className='flex flex-row justify-center items-center'>
//                 {ratings.map((rating, index) => (
//                     <div key={index} className="mb-4 p-4 mx-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
//                         <div className="flex items-center mb-2">
//                             <div className="mr-2">{renderStars(rating.stars)}</div>
//                             <span className="text-gray-600 font-roboto">{rating.stars} stars</span>
//                         </div>
//                         <p className="text-gray-800 font-roboto">{rating.review}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

export default UserTabView;

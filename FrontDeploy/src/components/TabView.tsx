import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faHome,
  faPhoneAlt,
  faImages,
  faBoxOpen,
  faStar as regularStar,
} from "@fortawesome/free-solid-svg-icons";
import { Vendor } from "../types/types";

interface ItabView {
  vendorData?: Vendor;
}

const TabView: FC<ItabView> = ({ vendorData }) => {
  const [activeTab, setActiveTab] = useState("Overveiw");
  console.log("vendorData TabView");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Dummy ratings data
  const ratings = [
    { stars: 5, review: "Excellent service!" },
    { stars: 4, review: "Very good experience." },
    { stars: 3, review: "Average service." },
    { stars: 2, review: "Needs improvement." },
    { stars: 1, review: "Poor service." },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex flex-wrap justify-center overflow-x-auto">
        <button
          className={`${
            activeTab === "Overview"
              ? "bg-gray-200 border-b-2 border-blue-500"
              : "bg-white"
          } py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto`}
          onClick={() => handleTabClick("Overview")}
        >
          <FontAwesomeIcon icon={"s"} className="mr-2" />
          Overview
        </button>
        <button
          className={`${
            activeTab === "Contcat"
              ? "bg-gray-200 border-b-2 border-blue-500"
              : "bg-white"
          } py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto`}
          onClick={() => handleTabClick("Contact")}
        >
          <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
          Contact
        </button>
        <button
          className={`${
            activeTab === "Portfolio"
              ? "bg-gray-200 border-b-2 border-blue-500"
              : "bg-white"
          } py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto`}
          onClick={() => handleTabClick("Portfolio")}
        >
          <FontAwesomeIcon icon={faImages} className="mr-2" />
          Portfolio
        </button>
        <button
          className={`${
            activeTab === "Package"
              ? "bg-gray-200 border-b-2 border-blue-500"
              : "bg-white"
          } py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto`}
          onClick={() => handleTabClick("Packege")}
        >
          <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
          Package
        </button>
        <button
          className={`${
            activeTab === "Ratings"
              ? "bg-gray-200 border-b-2 border-blue-500"
              : "bg-white"
          } py-4 px-6 text-gray-700 font-semibold focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center font-roboto`}
          onClick={() => handleTabClick("Ratings")}
        >
          <FontAwesomeIcon icon={solidStar} className="mr-2" />
          Ratings
        </button>
      </nav>
      <div className="mt-4">
        {activeTab === "Overview" && (
          <OverviewTab
            price={vendorData?.packages?.price}
            phone={vendorData?.phone}
            address={vendorData?.address}
            willingToTravel={vendorData?.willingToTravel}
          />
        )}

        {activeTab === "Contact" && (
          <ContactTab phone={vendorData?.phone} address={vendorData?.address} />
        )}

        {activeTab === "Portfolio" && (
          <PortfolioTab portfolio={vendorData?.portfolio} />
        )}

        {activeTab === "Package" && (
          <PackageTab packages={vendorData?.packages} />
        )}

        {activeTab === "Ratings" && <RatingsTab ratings={ratings} />}
      </div>
    </div>
  );
};

const OverviewTab = ({
  price,
  phone,
  address,
  willingToTravel,
}: {
  price: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  willingToTravel: boolean | undefined;
}) => {
  return (
    <div className="flex flex-col items-center my-4">
      <h2 className="text-2xl font-semibold mb-4 font-roboto">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold font-roboto">Package Price:</h3>
          <p className="font-roboto">{price}</p>
        </div>
        <div>
          <h3 className="font-semibold font-roboto">Phone Number:</h3>
          <p className="font-roboto">{phone}</p>
        </div>
        <div>
          <h3 className="font-semibold font-roboto">Address:</h3>
          <p className="font-roboto">{address}</p>
        </div>
        <div>
          <h3 className="font-semibold font-roboto">Willing to Travel:</h3>
          {willingToTravel ? (
            <img src="/icons8-tick.svg" alt="Tick" className="w-6 h-6" />
          ) : (
            <img src="/icons8-cross.svg" alt="Cross" className="w-6 h-6" />
          )}
        </div>
      </div>
    </div>
  );
};

const ContactTab = ({
  phone,
  address,
}: {
  phone: string | undefined;
  address: string | undefined;
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 font-roboto">Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold font-roboto">Phone Number:</h3>
          <p className="font-roboto">{phone}</p>
        </div>
        <div>
          <h3 className="font-semibold font-roboto">Address:</h3>
          <p className="font-roboto">{address}</p>
        </div>
      </div>
    </div>
  );
};

const PortfolioTab = ({ portfolio }: { portfolio: string[] | undefined }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 font-roboto">Portfolio</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {portfolio?.map((image, index) => (
          <img key={index} src={image} alt={`Portfolio Image ${index}`} />
        ))}
      </div>
    </div>
  );
};

const PackageTab = ({
  packages,
}: {
  packages?:
    | { name?: string; price?: string; days?: string; minAdvance?: string }
    | undefined;
}) => {
  if (!packages) {
    return <div>No packages available</div>;
  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 font-roboto">Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-lg font-roboto">
            Name: {packages.name}
          </h3>
          <p className="font-semibold text-lg font-roboto">
            Price: {packages.price}
          </p>
          <p className="font-semibold text-lg font-roboto">
            Duration: {packages.days}
          </p>
          <p className="font-semibold text-lg font-roboto">
            Minimum Advance: {packages.minAdvance}
          </p>
        </div>
      </div>
    </div>
  );
};

const RatingsTab = ({
  ratings,
}: {
  ratings?: { stars: number; review: string }[] | undefined;
}) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const starArray = [];
    for (let i = 0; i < 3; i++) {
      if (i < rating) {
        starArray.push(
          <FontAwesomeIcon
            key={i}
            icon={solidStar}
            className="text-yellow-400"
          />
        );
      } else {
        starArray.push(
          <FontAwesomeIcon
            key={i}
            icon={regularStar}
            className="text-gray-400"
          />
        );
      }
    }
    return starArray;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 font-roboto text-center">
        Ratings
      </h2>
      <div className="flex flex-wrap justify-center items-center">
        {ratings?.map((rating, index) => (
          <div
            key={index}
            className="mb-4 p-4 mx-4 hover:shadow-lg"
          >
            <div className="flex items-center mb-2">
              <div className="mr-2">{renderStars(rating.stars)}</div>
              <span className="text-gray-600 font-roboto">
                {rating.stars} stars
              </span>
            </div>
            <p className="text-gray-800 font-roboto">{rating.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabView;

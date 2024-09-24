import NavBar from "../../baar/navbar";
import VenueProfileInfo from "../venue/components/VendorProfileInfo";
import VenueProfileCard from "../venue/components/VendorProfileCard";
import ServiceDetailsFormVenue from "../venue/components/ServiceDetailsFormVenue";
import { useGetVenueByIdQuery } from "../../../../../redux/api/venue";

import { useParams } from "react-router-dom";

const VenueProfile = () => {
  console.log("hello");
  var { id } = useParams();
  console.log("idddd", id);

  if (!id) {
    // Handle the case where id is undefined
    return <div>Loading...</div>; // Or any other handling
  }
  const { data: venue } = useGetVenueByIdQuery(id);

  console.log("venuedata", venue);

  const venueData = venue?.data?.venue;
  console.log("vendue data", venueData);

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-white bg-blue-900 p-4">
        <div className="text-4xl font-semibold">PROFILE PAGE</div>
      </div>

      <div className="flex justify-start">
        <div className="w-1/2 lg:w-96">
          <VenueProfileCard
            name={venueData?.yourName}
            phone={venueData?.phone}
            email={venueData?.email}
            city={venueData?.city}
          />
        </div>
        <div className="w-full">
          <div className="max-w-full mx-auto px-4">
            <VenueProfileInfo
              businessName={venueData?.businessName}
              typeOfBusiness={venueData?.address}
            />
          </div>
          <div className="w-full lg:w-full p-4">
            <ServiceDetailsFormVenue
              phone={venueData?.phone}
              images={venueData?.images}
              featuresOfVenue={venueData?.featuresOfVenue}
              guestCapacity={venueData?.guestCapacity}
              howToReach={venueData?.howToReach}
              summary={venueData?.summary}
              venuePolicies={venueData?.venuePolicies}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueProfile;

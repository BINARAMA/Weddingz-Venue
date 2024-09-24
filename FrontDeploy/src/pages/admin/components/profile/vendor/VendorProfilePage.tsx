
import VendorProfileCard from "../vendor/components/VendorProfileCard";
import ServiceDetailsForm from "../vendor/components/ServiceDetailsForm";
import NavBar from "../../baar/navbar";
import VendorProfileInfo from "../vendor/components/VendorProfileInfo";
import { useGetVendorByIdQuery } from "../../../../../redux/api/vendor";
import { useParams } from "react-router-dom";

const VendorProfilePage = () => {
  const { id } = useParams();
  console.log("idddd", id);

  // Call useGetVendorByIdQuery unconditionally
  const { data: vendor } = useGetVendorByIdQuery(id || "");

  if (!id || !vendor) {
    // Handle the case where id is undefined or vendor data is not yet available
    return <div>Loading...</div>; // Or any other handling
  }

  const vendorData = vendor?.data?.vendor;
  console.log("vendor data", vendor);

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-white bg-[#110069] p-4">
        <div className="text-4xl font-semibold">PROFILE PAGE</div>
      </div>

      <div className="flex justify-start">
        <div className="w-1/2 lg:w-96">
          <VendorProfileCard
            name={vendorData?.name}
            phone={vendorData?.phone}
            email={vendorData?.email}
            city={vendorData?.city}
          />
        </div>
        <div className="w-full">
          <div className="max-w-full mx-auto px-4">
            <VendorProfileInfo
              businessName={vendorData?.businessName}
              typeOfBusiness={vendorData?.type_Of_Business}
            />
          </div>
          <div className="w-full lg:w-full p-4">
            {/* Pass vendorData as serviceDetails */}
            <ServiceDetailsForm
              price={vendorData?.packages?.price}
              portfolio={vendorData?.portfolio}
              experience={vendorData?.experience}
              event_completed={vendorData?.event_completed}
              willingToTravel={vendorData?.willingToTravel}
              summary={vendorData?.summary}
              packages={vendorData?.packages}
              id={id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorProfilePage;

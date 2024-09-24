import React, { useState, useEffect } from "react";
import Caro from "./Carousel3";
import { useUpdateVenueMutation } from "../redux/api/venue";
import Loader from "../components/skeleton/Loader"

interface Props {
  phone?: string;
  address?:string;
  images?: string[] | undefined;
  featuresOfVenue?: string;
  guestCapacity?: string | undefined;
  howToReach?: string | undefined;
  summary?: string;
  venuePolicies?: string | undefined; // Ensure this is optional
  id?: string | undefined;
  foodPackages?: string | undefined;
  venueType?: string[] | undefined;
  facilities?: string[] | undefined;
  [key: string]: any; 
}

const ServiceDetailsFormVenue: React.FC<Props> = ({
  phone = "",
  address = "",
  images = [],
  featuresOfVenue = "",
  guestCapacity = "",
  howToReach = "",
  summary = "",
  venuePolicies = "",
  id = "",
  foodPackages = "",
  venueType = [],
  facilities = [],
}) => {
  const [updateVenue] = useUpdateVenueMutation();

  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [imagedata, setImageData] = useState<File[]>([]);
  const [progress, setProgress] = useState(0); // For progress bar
  const [formData, setFormData] = useState<Props>({
    phone,
    address,
    images,
    featuresOfVenue,
    guestCapacity,
    howToReach,
    summary,
    venuePolicies,
    id,
    foodPackages,
    venueType,
    facilities,
  });

  // Update formData when props change (e.g., on edit)
  useEffect(() => {
    setFormData({
      phone,
      address,
      images,
      featuresOfVenue,
      guestCapacity,
      howToReach,
      summary,
      venuePolicies,
      id,
      foodPackages,
      venueType,
      facilities,
    });
  }, [phone, images, featuresOfVenue, guestCapacity, howToReach, summary, venuePolicies, id, foodPackages, venueType, facilities, address]);

   // Simulate rapid progress


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
    }));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setImageData(Array.from(e.target.files));
  //     simulateProgress(); // Start progress simulation on image upload
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageData(files);
      uploadFiles(files); // Call the file upload function here
    }
  };

  const uploadFiles = (files: File[]) => {
    const formDataToSend = new FormData();
    files.forEach((file) => formDataToSend.append('images', file));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:9000/api/v1/venue/', true); // Update with your endpoint URL

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const uploadProgress = (event.loaded / event.total) * 100;
        console.log('Upload progress:', uploadProgress); // Add this line
        setProgress(Math.round(uploadProgress));
        // console.log("progress iss", progress);
        if(uploadProgress == 100){
        alert("File uploaded");
        }
      }
    };

    // Handle successful upload
    xhr.onload = () => {
      if (xhr.status === 500) {
        
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    };

    // Handle errors
    xhr.onerror = () => {
      console.error('File upload error');
    };

    // Send the form data with the files
    xhr.send(formDataToSend);
  };

  const handleVenueTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedVenueType = checked
        ? [...(prevState.venueType || []), value]
        : (prevState.venueType || []).filter((type) => type !== value);
      return {
        ...prevState, 
        venueType: updatedVenueType,
      };
     
    });
  };

  const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedFacilities = new Set(prevState.facilities || []);
      if (checked) {
        updatedFacilities.add(value);
      } else {
        updatedFacilities.delete(value);
      }
      return {
        ...prevState,
        facilities: Array.from(updatedFacilities),
      };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(false); // Set loading to true when submitting

    const formDataToSend = new FormData();

    // Append each field from formData that are not files
    Object.keys(formData).forEach((key) => {
      if (key !== 'images') {
        formDataToSend.append(key, String(formData[key]));
      }
    });

    // Append images if they exist
    imagedata.forEach((image) => {
      formDataToSend.append('images', image);
    });

    try {
      const result = await updateVenue({ venueId: id || "", formData: formDataToSend }).unwrap();
      console.log('Venue updated:', result);
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error('Failed to update venue:', error);
      // Handle error (e.g., show error message)
    }
    setIsLoading(false);
    setEditing(false);
  };

  const handleEditClick = () => {
    // Populate the formData state with the current values
    setProgress(0);

    setFormData({
      phone,
      images,
      featuresOfVenue,
      guestCapacity,
      howToReach,
      summary,
      venuePolicies,
      id,
      foodPackages,
      venueType,
      facilities,
    });

    // Enter editing mode
    setEditing(true);
  };

  const venueTypeOptions = [
    "Conference Halls",
    "Banquet Hall",
    "Wedding Lawns",
    "Beachside Venues",
    "Garden Venues",
    "Rooftop Venues",
    "Resorts",
    "Community Centers",
  ];

  const facilitiesOptions = [
    "Food provided by venue",
    "Alcohol allowed",
    "Outside food allowed",
    "Music allowed late",
    "Valet parking",
    "Sea view",
    "Catering services",
    "Live music",
    "City view",
    "Open bar",
    "AV equipment",
    "Free WiFi",
    "Swimming pool",
    "Spa services",
    "Ample parking",
    "Air conditioning",
    "Private beach",
    "Water sports",
    "In-house decor",
    "DJ services",
  ];

  return (
    <div className="bg-gray-200 rounded-lg p-8 mx-auto max-w-full mb-12">
      {isLoading && <Loader />} {/* Add Loader component */}
      <div className="flex items-center justify-center">
        <div className="flex-grow">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-10 border-b pb-8">
                <label htmlFor="phone" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Contact :
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>
              <div className="mb-10 border-b pb-8">
                <label htmlFor="images" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Images:
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                  className="w-3/4 rounded-md "
                />
                {progress > 0 && (
                  <div className="w-3/4 bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              
              <div className="mb-10 border-b pb-8">
                <label htmlFor="featuresOfVenue" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Features Of Venue:
                </label>
                <input
                  type="text"
                  id="featuresOfVenue"
                  name="featuresOfVenue"
                  value={formData.featuresOfVenue}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>

              <div className="mb-10 border-b pb-8">
                <label htmlFor="foodPackages" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Food Packages:
                </label>
                <input
                  type="text"
                  id="foodPackages"
                  name="foodPackages"
                  value={formData.foodPackages}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>

              <div className="mb-10 border-b pb-8">
                <label htmlFor="venueType" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Venue Type:
                </label>
                <div className="w-3/4 text-lg text-[#110069]">
                  {venueTypeOptions.map((option) => (
                    <div key={option} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`venueType-${option}`}
                        name="venueType"
                        value={option}
                        checked={formData.venueType?.includes(option) || false}
                        onChange={handleVenueTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor={`venueType-${option}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10 border-b pb-8">
  <label htmlFor="facilities" className="block mb-4 font-bold text-2xl text-[#110069]">
    Facilities:
  </label>
  <div className="w-3/4 text-lg text-[#110069]">
    {facilitiesOptions.map((option) => (
      <div key={option} className="flex items-center mb-2">
        <input
          type="checkbox"
          id={`facilities-${option}`}
          name="facilities"
          value={option}
          checked={formData.facilities?.includes(option) || true}
          onChange={handleFacilitiesChange}
          className="mr-2"
        />
        <label htmlFor={`facilities-${option}`}>option</label>
      </div>
    ))}
  </div>
</div>
              <div className="mb-10 border-b pb-8">
                <label htmlFor="guestCapacity" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Guest Capacity:
                </label>
                <input
                  type="text"
                  id="guestCapacity"
                  name="guestCapacity"
                  value={formData.guestCapacity}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>

              <div className="mb-10 border-b pb-8">
                <label htmlFor="address" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>

              <div className="mb-10 border-b pb-8">
                <label htmlFor="howToReach" className="block mb-4 font-bold text-2xl text-[#110069]">
                  How To Reach:
                </label>
                <input
                  type="text"
                  id="howToReach"
                  name="howToReach"
                  value={formData.howToReach}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>

              <div className="mb-10 border-b pb-8">
                <label htmlFor="summary" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Summary:
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>

              <div className="mb-10 border-b pb-8">
                <label htmlFor="venuePolicies" className="block mb-4 font-bold text-2xl text-[#110069]">
                  Venue Policies:
                </label>
                <textarea
                  id="venuePolicies"
                  name="venuePolicies"
                  value={formData.venuePolicies}
                  onChange={handleInputChange}
                  className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-[#110069] text-white font-bold rounded-lg text-lg hover:bg-[#a6a6a6] mt-4"
              >
                Update
              </button>
            </form>
          ) : (
            <div>
              <h2 className="font-bold text-2xl text-[#110069] mb-4">Service Details</h2>
              <div>
              <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Address:</h3>
                  <p className="text-lg text-[#110069]">{address}</p>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Contact:</h3>
                  <p className="text-lg text-[#110069]">{phone}</p>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Images:</h3>
                  <Caro images={images} />
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Features of Venue:</h3>
                  <p className="text-lg text-[#110069]">{featuresOfVenue}</p>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Food Packages:</h3>
                  <p className="text-lg text-[#110069]">{foodPackages}</p>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Venue Type:</h3>
                  <ul className="list-disc list-inside">
                    {venueType?.map((type) => (
                      <li key={type} className="text-lg text-[#110069]">
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Facilities:</h3>
                  <ul className="list-disc list-inside">
                    {facilities?.map((facility) => (
                      <li key={facility} className="text-lg text-[#110069]">
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Guest Capacity:</h3>
                  <p className="text-lg text-[#110069]">{guestCapacity}</p>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">How to Reach:</h3>
                  <p className="text-lg text-[#110069]">{howToReach}</p>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Summary:</h3>
                  <p className="text-lg text-[#110069]">{summary}</p>
                </div>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Venue Policies:</h3>
                  <p className="text-lg text-[#110069]">{venuePolicies}</p>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="px-8 py-3 bg-[#110069] hover:bg-[#a6a6a6] mt-4"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsFormVenue;
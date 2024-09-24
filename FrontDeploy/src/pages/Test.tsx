// import React, { useState } from "react";

// import Caro from "./Carousel3";

// import { useUpdateVenueMutation } from "../redux/api/venue";

// // interface Package {
// //     name: string;
// //     days: string;
// //     phone: string;
// //     minAdvance: string;
// // }

// interface Props {
//   phone?: string;
//   images?: string[] | undefined;
//   featuresOfVenue?: string;
//   guestCapacity?: string | undefined;
//   howToReach?: string | undefined;
//   summary?: string;
//   venuePolicies: string | undefined;
//   id?: string | undefined;
//   foodPackages?:string | undefined;
//   venueType?: string[] | undefined;
//   facilities?: string[] | undefined;
// }

// const ServiceDetailsFormVenue: React.FC<Props> = ({
//   phone,
//   images,
//   featuresOfVenue,
//   guestCapacity,
//   howToReach,
//   summary,
//   venuePolicies,
//   id,
//   foodPackages,
//   venueType,
//   facilities
// }) => {
//   const [updateVenue] = useUpdateVenueMutation();

//   console.log("venuePolicies", venuePolicies);

//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState<Props>({
//     phone: "", // Initial value for 'phone' property
//     images: undefined,
//     featuresOfVenue: "",
//     guestCapacity: "",
//     howToReach: "",
//     summary: "",
//     venuePolicies: "",
//     foodPackages:"",
//     venueType: [],
//     facilities:[]
//     // Initialize as empty array
//   });
//   // Function to handle input changes
//   // Function to handle input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     // If the input name starts with "venuePolicies.", update the venuePolicies state
//     // if (name.startsWith("venuePolicies.")) {
//     //     const packageName = name.split(".")[1]; // Extract the package property name
//     //     setFormData((prevState: Props) => ({
//     //         ...prevState,
//     //         venuePolicies: {
//     //             ...prevState.venuePolicies,
//     //             name: prevState.venuePolicies?.name || '',
//     //             days: prevState.venuePolicies?.days || '',
//     //             phone: prevState.venuePolicies?.phone || '',
//     //             minAdvance: prevState.venuePolicies?.minAdvance || '',
//     //             [packageName]: value
//     //         }
//     //     }));

//     // } else {
//     //     // If it's not a package property, update the top-level state properties
//     //     if (type === 'checkbox') {
//     //         const isChecked = (e.target as HTMLInputElement).checked;
//     //         setFormData(prevState => ({
//     //             ...prevState,
//     //             [name]: isChecked
//     //         }));
//     //     } else {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     //         }
//     //     }
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Here you can submit the updated data (formData) to your backend or perform any other action
//     console.log("Updated Data:", formData);
//     if (!id) return;
//     const res = await updateVenue({ id, venue: formData });
//     // Exit editing mode
//     console.log("here is res", res);
//     setEditing(false);
//   };

//   const handleVenueTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setFormData((prevState) => {
//       const updatedVenueType = checked
//         ? [...(prevState.venueType || []), value]
//         : (prevState.venueType || []).filter((type) => type !== value);
//       return {
//         ...prevState,
//         venueType: updatedVenueType,
//       };
     
//     });
//   };

//   //facilities
//   const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setFormData((prevState) => {
//       const updatedFacilities = checked
//         ? [...(prevState.facilities || []), value]
//         : (prevState.facilities || []).filter((type) => type !== value);
//       return {
//         ...prevState,
//         facilities: updatedFacilities,
//       };
//     });
//   };

//   // Function to handle edit button click
//   const handleEditClick = () => {
//     // Populate the formData state with the current values
//     setFormData({
//       phone: phone || "",
//       images: images || [],
//       featuresOfVenue: featuresOfVenue || "",
//       guestCapacity: guestCapacity || "",
//       howToReach: howToReach || "",
//       summary: summary || "",
//       foodPackages: foodPackages || "",
//       venuePolicies: venuePolicies || "",
//       venueType: venueType || [], // Ensure this is initialized as an array
//     });

//     // Enter editing mode
//     setEditing(true);
//   };

//   const venueTypeOptions = [
//     "Conference Halls",
//     "Banquet Hall",
//     "Wedding Lawns",
//     "Beachside Venues",
//     "Garden Venues",
//     "Rooftop Venues",
//     "Resorts",
//     "Community Centers",
//   ];
// const facilitiesOptions  = [
//        "Food provided by venue",
//         "Alcohol allowed",
//         "Outside food allowed",
//         "Music allowed late",
//         "Valet parking",
//         "Sea view",
//         "Catering services",
//         "Live music",
//         "City view",
//         "Open bar",
//         "AV equipment",
//         "Free WiFi",
//         "Swimming pool",
//         "Spa services",
//         "Ample parking",
//         "Air conditioning",
//         "Private beach",
//         "Water sports",
//         "In-house decor",
//         "DJ services",
// ]

//   console.log("Pack", venuePolicies);
//   console.log("optikns" , venueType)

//   return (
//     <div className="bg-gray-200 rounded-lg p-8 mx-auto max-w-full mb-12">
//       <div className="flex items-center justify-center">
//         <div className="flex-grow">
//           {editing ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="phone"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Contact :
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                 />
//               </div>
//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="images"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   images:
//                 </label>
//                 <input
//                   type="file"
//                   id="images"
//                   name="images"
//                   onChange={handleInputChange}
//                   multiple
//                   className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                 />
//               </div>
//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="yearsOffeaturesOfVenue"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Features Of Venue:
//                 </label>
//                 <input
//                   type="text"
//                   id="featuresOfVenue"
//                   name="featuresOfVenue"
//                   value={formData.featuresOfVenue}
//                   onChange={handleInputChange}
//                   className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                 />
//               </div>

//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="foodPackages"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   FoodPackages:
//                 </label>
//                 <input
//                   type="text"
//                   id="foodPackages"
//                   name="foodPackages"
//                   value={formData.foodPackages}
//                   onChange={handleInputChange}
//                   className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                 />
//               </div>

//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="venueType"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Venue Type:
//                 </label>
//                 <div className="w-3/4 text-lg text-[#110069]">
//                   {venueTypeOptions.map((option) => (
//                     <div key={option} className="flex items-center mb-2">
//                       <input
//                         type="checkbox"
//                         id={venueType-${option}}
//                         name="venueType"
//                         value={option}
//                         checked={formData.venueType?.includes(option) || false}
//                         onChange={handleVenueTypeChange}
//                         className="mr-2"
//                       />
//                       <label htmlFor={venueType-${option}}>{option}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="facilities"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Facilities:
//                 </label>
//                 <div className="w-3/4 text-lg text-[#110069]">
//                   {facilitiesOptions.map((option) => (
//                     <div key={option} className="flex items-center mb-2">
//                       <input
//                         type="checkbox"
//                         id={facilities-${option}}
//                         name="facilities"
//                         value={option}
//                         checked={formData.facilities?.includes(option) || false}
//                         onChange={handleFacilitiesChange}
//                         className="mr-2"
//                       />
//                       <label htmlFor={facilities-${option}}>{option}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>


//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="yearsOffeaturesOfVenue"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Features Of Venue:
//                 </label>
//                 <input
//                   type="text"
//                   id="featuresOfVenue"
//                   name="featuresOfVenue"
//                   value={formData.featuresOfVenue}
//                   onChange={handleInputChange}
//                   className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                 />
//               </div>


//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="eventsCompleted"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Guest Capacity:
//                 </label>
//                 <input
//                   type="text"
//                   id="guestCapacity"
//                   name="guestCapacity"
//                   value={formData.guestCapacity}
//                   onChange={handleInputChange}
//                   className="w-3/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                 />
//               </div>
//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="howToReach"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   How To Reach:
//                 </label>
//                 <input
//                   type="text"
//                   id="howToReach"
//                   name="howToReach"
//                   value={formData.howToReach}
//                   onChange={handleInputChange}
//                   className="mr-2 bg-white text-[#110069]"
//                 />
//               </div>
//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="summary"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Summary:
//                 </label>
//                 <textarea
//                   id="summary"
//                   name="summary"
//                   value={formData.summary}
//                   onChange={handleInputChange}
//                   className="w-3/4 h-32 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                 />
//               </div>

//               <div className="mb-10 border-b pb-8">
//                 <label
//                   htmlFor="venuePolicies"
//                   className="block mb-4 font-bold text-2xl text-[#110069]"
//                 >
//                   Venue Policies:
//                 </label>

//                 <div className="flex gap-4 mb-4">
//                   <input
//                     type="text"
//                     id="venuePolicies"
//                     name="venuePolicies"
//                     value={formData?.venuePolicies}
//                     onChange={handleInputChange}
//                     placeholder="Package Name"
//                     className="w-1/4 rounded-md border-gray-300 px-3 py-2 text-lg bg-white text-[#110069]"
//                   />
//                 </div>

//                 {/* <button
//                                     type="button"
//                                     //  onClick={() => }
//                                     className="bg-white text-[#110069] px-4 py-2 rounded-md"
//                                 >
//                                     Add Package
//                                 </button> */}
//               </div>
//               <button
//                 type="submit"
//                 className="bg-white text-[#110069] px-8 py-4 rounded-md text-xl"
//               >
//                 Update
//               </button>
//             </form>
//           ) : (
//             <>
//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">Contact:</p>
//                 <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
//                   {phone}
//                 </p>
//               </div>
//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">
//                   Features Of Venue:
//                 </p>
//                 <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
//                   {featuresOfVenue}
//                 </p>
//               </div>

//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">
//                   Food Package:
//                 </p>
//                 <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
//                   {foodPackages}
//                 </p>
//               </div>

//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">
//                   Venue Type:
//                 </p>
//                 <div className="flex gap-2">
//                   {venueType &&
//                     venueType.map((type, index) => (
//                       <p
//                         key={index}
//                         className="text-lg bg-white text-[#110069] p-2 rounded-md text-center"
//                       >
//                         {type}
//                       </p>
//                     ))}
//                 </div>
//               </div>

//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">
//                 Facilities:
//                 </p>
//                 <div className="flex gap-2">
//                   {facilities &&
//                     facilities.map((type, index) => (
//                       <p
//                         key={index}
//                         className="text-lg bg-white text-[#110069] p-2 rounded-md text-center"
//                       >
//                         {type}
//                       </p>
//                     ))}
//                 </div>
//               </div>

//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">
//                   Guest Capacity:
//                 </p>
//                 <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
//                   {guestCapacity}
//                 </p>
//               </div>
//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">
//                   How To Reach:
//                 </p>
//                 <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center w-3/6 mx-auto">
//                   {howToReach ? "Yes" : "No"}
//                 </p>
//               </div>
//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">Summary:</p>
//                 <p className="text-lg bg-white text-[#110069] p-2 rounded-md text-center h-auto w-3/6 mx-auto">
//                   {summary}
//                 </p>
//               </div>
//               <div className="mb-8 border-b pb-4">
//                 <p className="text-[#110069] text-xl font-bold">
//                   Venue Policies:
//                 </p>

//                 <div className="flex gap-4 mb-4">
//                   <p className="text-lg bg-white text-[#110069] p-2 rounded-md">
//                     {venuePolicies}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-wrap justify-center">
//                 <p className="text-[#110069] text-xl font-bold">images:</p>
//                 {images &&
//                   images.map((imageUrl, index) => (
//                     <img
//                       key={index}
//                       src={imageUrl}
//                       alt={images ${index + 1}}
//                       className="w-48 h-48 object-cover m-2 rounded-md"
//                     />
//                   ))}
//               </div>
//               <div>
//                 <Caro images={images} />
//               </div>
//               <button
//                 onClick={handleEditClick}
//                 className="bg-white text-[#110069] px-8 py-4 rounded-md mt-2 text-xl"
//               >
//                 Edit
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetailsFormVenue;
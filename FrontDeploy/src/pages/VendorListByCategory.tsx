// import React from 'react';
// import { FaSearch } from 'react-icons/fa';
// import AllVendors from '../components/card/AllVendors';
// import ArticleCard from '../components/card/ArticleCard';
// import NavBar from '../components/navbar';
// import Footer from '../components/Footer';

// import { useState, useEffect } from "react";
// import type { Vendor } from "../types/types";
// import VendorCard from '../components/card/Vendorcard';
// import { useGetVendorByTypeQuery } from '../redux/api/vendor';
// import { useParams } from 'react-router-dom';


// interface VendorsListProps {
//   NumberOfCards?: number;
//   Title?: string;
//   Description?: string;
//   Search?: string;
//   Img?: string;
//   ImgTitle2?: string;
//   NumberOfArticaleCards?: number;
// }



// const VendorsListByCategory: React.FC<VendorsListProps> = ({  NumberOfArticaleCards = 10,  Img = "/public/mumbai.jpg", ImgTitle2 = "mumbai" }) => {
//   // Create an array of length equal to numberOfCards
//   //const cardsArray = Array.from({ length: NumberOfCards });
//   const ArticleCardsArray = Array.from({ length: NumberOfArticaleCards });
//   const catagory = 'Photographer'
//   const category = useParams<{category: string | undefined}>();
//   console.log("ye hai category hamnari",category.category);
//   // const { data, error, isLoading } = useAllVendorQuery("");
//   const { data : vendor, error, isLoading } = useGetVendorByTypeQuery(category.category || "");
//   const vendorData=vendor?.data?.vendors;
//   console.log("hereeeeeeeeeeeeeeeeeeeeeee",vendorData )
//   const [allvendors, setAllVendors] = useState<Vendor[]>([]);


//   useEffect(() => {
//     if (vendorData) {
//       setAllVendors(vendorData);
//     }
//   }, [vendorData])

//   if (error) {
//     return <h1>Error while loading data</h1>;
//   }

//   if (isLoading) {
//     return <h1>Loading</h1>;
//   }


//   return (
//     <>
//     <NavBar/>
//     <div className="flex bg-blue-100">
//       {/* First section (4/5 of the screen) */}
//       <div className="justify-start p-4 w-3/4">
//         <div className='bg-slate-100'>
//           <p className='text-xl font-bold mx-2'>{catagory}</p>
//           <p className='text-l font-semibold mx-2'>Showing {allvendors.length} {catagory}</p>
//         </div>


//         <hr className='h-1 bg-white my-2'></hr>

//         <div className=" bg-slate-100 flex flex-wrap py-5 gap-5 justify-center">
//           {/* Render VendorCard components */}
//           {allvendors.length > 0 ? allvendors.map((vendorData, index) => (

//             console.log("vendors :", vendor),
//             console.log(vendorData?.packages?.price),
//             <VendorCard
//               _id = {vendorData._id}
//               key={index}
//               businessName={vendorData?.name}
//               city={vendorData?.city}
//               packagePrice={vendorData?.packages?.price}
//               summary={vendorData?.summary}
//               image={vendorData?.portfolio ?  vendorData?.portfolio[4] : ""}
//             />
//           )) : <h1>No vendors available</h1>}
//         </div>
//       </div>

//       {/* Second section (1/5 of the screen) */}
//       <div className="w-1/4 bg-pink-100">
//         <div className="justify-end p-4">

//           <p className='text-xl font-bold'>Search {catagory} by Name</p>
//           <hr className='h-1 bg-gray-200 my-2'></hr>
//           {/* Search bar */}
//           <div className="flex">
//             <input
//               type="text"
//               placeholder="Enter artist name..."
//               className="w-full px-3 py-2 border rounded-l-md outline-none"
//             />
//             <button className="bg-blue-400 text-white px-4 py-2 rounded-r-md">
//               <FaSearch />
//             </button>
//           </div>
//           <hr className='h-1 bg-gray-200 my-2'></hr>
//           <div className='shadow-xl'>
//             <AllVendors />
//           </div>

//           <img src={Img} alt={ImgTitle2} className="w-full h-[250px] p-3 shadow-xl" />
//           <p className='text-xl font-semibold pt-3 pb-2 shadow'>Related Article</p>

//           <div className="  flex flex-wrap justify-center shadow">
//             {/* Render VendorCard components */}
//             {ArticleCardsArray.map((_, index) => (
//               <div key={index} className="mx-2 mb-4 shadow-xl">
//                 <ArticleCard />
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Content for the second section */}
//         {/* You can add content for the second section here */}
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default VendorsListByCategory;
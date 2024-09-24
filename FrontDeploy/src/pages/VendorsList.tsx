import React from "react";
import { FaSearch } from "react-icons/fa";
// import AllVendors from "../components/card/AllVendors";
import ArticleCard from "../components/card/ArticleCard";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useAllVendorQuery } from "../redux/api/vendor";
import type { Vendor } from "../types/types";
import VendorCard from "../components/card/Vendorcard";
import { useParams } from "react-router-dom";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import SkeletonCard from "../components/skeleton/Vendor";
import { useGetAllBlogsQuery } from "../redux/api/blog";
import AllVendors from "../components/card/AllVendors";

interface VendorsListProps {
  NumberOfCards?: number;
  Description?: string;
  Search?: string;
  Img?: string;
  ImgTitle2?: string;
  NumberOfArticleCards?: number;
}

const VendorsList: React.FC<VendorsListProps> = ({
  // NumberOfArticleCards = 10,
  Search = "Search Artists By Name",
  Img = "/wv_cover.jpg",
  ImgTitle2 = "weddingImage",
}) => {
  // const ArticleCardsArray = Array.from({ length: NumberOfArticleCards });
  const { data, error, isLoading } = useAllVendorQuery("");
  const [allVendors, setAllVendors] = useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const { type } = useParams<{ type: string }>();
  const Title = type;

  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 10;
  const { data: blog } = useGetAllBlogsQuery('');
  const blogs = blog?.data.blog || [];
  useEffect(() => {
    if (data) {
      setAllVendors(data.data.vendors);
    }
  }, [data]);

  useEffect(() => {
    const approvedVendors = allVendors.filter(vendor => vendor.isVerified === "Approved");
    let filtered = approvedVendors;
    
    if (searchQuery.trim() !== "") {
      filtered = approvedVendors.filter((vendor) =>
        vendor.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (Title !== "AllVendors") {
      filtered = filtered.filter((vendor) => vendor.type_Of_Business === Title);
    }
    
    setFilteredVendors(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, allVendors, Title]);
  
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  // console.log("heloo", filteredVendors.length, totalPages, currentPage, vendorsPerPage, currentVendors)

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row bg-blue-100">
        <div className="lg:w-3/4 p-4 w-full">
          <div className="bg-slate-100 rounded-md">
            <p className="text-xl font-bold mx-3 pt-1">
              {Title === "AllVendors"
                ? "All Vendors"
                : Title === "Photographer"
                  ? "Photographers"
                  : Title === "MakeupArtist"
                    ? "Makeup Artists"
                    : Title === "MehendiArtist"
                      ? "Mehendi Artists"
                      : Title === "Decorator"
                        ? "Decorators"
                        : Title === "Caterer"
                          ? "Caterers"
                          : Title === "Band baja"
                            ? "Band Baja"
                            : Title === "dhol"
                              ? "Dhol"
                              : Title === "Tatto Artist"
                                ? "Tatto Artists"
                                : Title === "Messkot"
                                  ? "Messkot"
                                  : Title === "Magicians"
                                    ? "Magicians"
                                    : Title === "Fog Event"
                                      ? "Fog Events"
                                      : Title === "Game Coordinator"
                                        ? "Game Coordinators"
                                        : Title === "Anchor"
                                          ? "Anchor"
                                          : Title === "Live singer"
                                            ? "Live Singers"
                                            : Title === "Welcome Girls"
                                              ? "Welcome Girls"
                                              : Title === "Waiter service boy"
                                                ? "Waiter service boys"
                                                : Title === "Vallet parking vendor"
                                                  ? "Vallet parking vendors"
                                                  : Title === "Dj"
                                                    ? "Dj"
                                                    : Title === "Birthday boy car Entry"
                                                      ? "Birthday boy car Entries"
                                                      : Title === "Jagran setup"
                                                        ? "Jagran setups"
                                                        : Title === "Mata ki Chowki setup"
                                                          ? "Mata ki Chowki setups"
                                                          : Title === "Bar tender boy"
                                                            ? "Bar tender boys"
                                                            : Title === "Rooms booking"
                                                              ? "Rooms bookings"
                                                              : Title}
            </p>
            <p className="text-md font-semibold text-gray-600">

              {/* {Title === "AllVendors" ? "Vendors" : Title} */}
            </p>
          </div>

          <hr className="h-1 bg-white my-2"></hr>

          <div className="bg-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 justify-center rounded-md">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
            ) : currentVendors.length > 0 ? (
              currentVendors.map((vendor, index) => {
                if (Title === "AllVendors") {
                  return (
                    <VendorCard
                      _id={vendor._id}
                      key={index}
                      businessName={vendor.name ?? "No name provided"}
                      city={vendor.city}
                      packagePrice={vendor.packages?.price}
                      summary={vendor.summary}
                      image={vendor.portfolio ? vendor.portfolio[4] : ""}
                    />
                  );
                } else if (vendor.type_Of_Business === Title) {
                  return (
                    <VendorCard
                      _id={vendor._id}
                      key={index}
                      businessName={vendor.name ?? "No name provided"}
                      city={vendor.city}
                      packagePrice={vendor.packages?.price}
                      summary={vendor.summary}
                      image={vendor.portfolio ? vendor.portfolio[4] : ""}
                    />
                  );
                }
              })
            ) : (
              <h1>No vendors available</h1>
            )}
          </div>



          <div className="flex justify-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center px-2 py-1 mx-1 bg-[#A31F24] text-white rounded sm:px-4 sm:py-2 sm:mx-2"
            >
              <LuArrowLeft />
            </button>
            <span className="px-2 py-1 mx-1 bg-gray-200 text-black rounded sm:px-4 sm:py-2 sm:mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-2 py-1 mx-1 bg-[#A31F24] text-white rounded sm:px-4 sm:py-2 sm:mx-2"
            >
              <LuArrowRight />
            </button>
          </div>
        </div>

        {/* Second section (responsive) */}
        <div className="lg:w-1/4 w-full bg-[#fffdd0] p-4">
          <div className="justify-end">
            <p className="text-xl font-bold">{Search}</p>
            <hr className="h-1 bg-gray-200 my-2"></hr>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter artist name..."
                className="w-full px-3 py-2 border rounded-l-md outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-blue-400 text-white px-4 py-2 rounded-r-md">
                <FaSearch />
              </button>
            </div>
            <hr className="h-1 bg-gray-200 my-2"></hr>
            <div className="shadow-xl bg-white">
              <AllVendors />
            </div>

            <img src={Img} alt={ImgTitle2} className="w-full h-[250px] p-3 shadow-xl object-cover" />
            <p className="text-xl font-semibold pt-3 pb-2 shadow">Related Article</p>

            <div className="flex flex-wrap justify-center shadow">
              {blogs?.map((items: any, index: any) => (
                index < 10 ? (
                  <div key={index} className="mx-2 mb-4 shadow-xl">
                    <ArticleCard
                      id={items?._id}
                      image={items?.images[0]}
                      title={items?.title}
                      description={items?.content}
                      date={items?.createdAt}
                    />
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorsList;

{/* <ArticleCard
id={items?._id}
  image={items?.images[0]}
  title={items?.title}
  description={items?.content}
  date={items?.createdAt}
/> */}
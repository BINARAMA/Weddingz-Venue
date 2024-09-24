import  { useState, useEffect, useCallback } from 'react';
import VenueCard from '../components/VenueCard';
import NavBar from '../components/navbar';
import { Venue } from '../types/types';
import { useAllVenueQuery } from '../redux/api/venue';
import Universal from '../components/skeleton/Universal';
import FilterBar from '../components/FilterBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';

function VenueList() {

  const { pathname, search } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop: Route changed to', pathname, search);
    window.scrollTo(0, 0);
  },);


  const [filters, setFilters] = useState({});
  const queryString = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v !== '') as [string, string][]
  ).toString();
  const { data, error, isLoading } = useAllVenueQuery(queryString);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
// console.log('helod', data)
  const updateVenues = useCallback(() => {
    if (data && Array.isArray(data.data)) {
      setAllVenues(data.data);
    }
  }, [data]);

  const city = useSelector((state : RootState) => state?.auth?.city)
  console.log("data", city,)

  useEffect(() => {
    updateVenues();
  }, []);

  const allowedVenues = allVenues.filter(
    (venue) => venue.isVerified === "Approved"
  );

  const handleFilterChange = (newFilters: any) => {
    // Remove undefined values from filters
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v == null)
    );
    setFilters(cleanFilters);
  };

  if (!error) {
    return <h1>Error while loading data</h1>;
  }

  if (isLoading) {
    return <Universal />;
  }

  
  return (
    <div className="flex flex-col min-h-screen  bg-[#fffdd0]">
      <NavBar />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>
          <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 gap-4">
            {allowedVenues.length > 0 ? (
              allowedVenues.map((venue, index) => (
               
                <VenueCard
                  key={index}
                  venue={{
                    name: venue?.businessName,
                    location: venue.city,
                    maxGuests: venue.guestCapacity,
                    contact: venue.phone,
                    description: venue.summary,
                    vegPrice: venue.foodPackages,
                    nonVegPrice: 30,
                    images: venue.images,
                    id: venue._id,
                  }}
                />)
              )
            ) : (
              <div>No Venue found</div>
            )}
          </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
      </div>
    </div>
  );
}

export default VenueList;
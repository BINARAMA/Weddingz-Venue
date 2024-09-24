
import Carousel from '../components/Carousel';
import VenuePriceCard from '../components/VenuePriceCard';
import SlimVenueCard from '../components/SlimVenueCard';
import VenueAboutCard from '../components/VenueAboutCard';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import VenueImageCarousel from '../components/VenueImageCarousel';
import RelatedArticles from '../components/RelatedArticles';
import VenueSummary from '../components/VenueSummary';
import FAQSection from '../components/FaqSection';

import { useGetVenueByIdQuery } from '../redux/api/venue';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const VenueServicePage = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop: Route changed to', pathname, search);
    window.scrollTo(0, 0);
  },);

  const { id } = useParams();
  const { data: venue } = useGetVenueByIdQuery(id ? id : "");
  const venueData = venue?.data.venue;

  



  // const handleContactFormSubmit = (phoneNumber:string) => {
  //   console.log('Phone number submitted:', phoneNumber);
  // };

  // const venuePolicies = {
  //   timings: "11:00 PM",
  //   morningSlot: "8:00 AM - 11:00 PM",
  //   changingRoom: {
  //     count: 2,
  //     isAc: true,
  //   },
  //   advance: {
  //     amount: 118000,
  //     adjustmentPolicy: "6 months",
  //   },
  //   taxes: {
  //     fnb: "18.00%",
  //   },
  //   parking: {
  //     valet: false,
  //     space: 100,
  //   },
  //   cancellation: "Non cancellable",
  //   lodging: "No rooms available",
  //   alcohol: {
  //     allowed: true,
  //     outsideAllowed: true,
  //     corkageCost: true,
  //   },
  //   otherPolicies: [
  //     "No Music allowed late",
  //     "Halls are air conditioned",
  //     "No ample parking",
  //     "Baarat allowed",
  //     "No fire crackers allowed",
  //     "Hawan allowed",
  //     "No overnight wedding allowed"
  //   ],
  //   food: [
  //     "Food provided by the venue",
  //     "No outside food/caterer allowed at the venue",
  //     "Non-Veg allowed at the venue"
  //   ],
  //   decoration: [
  //     "No Outside decorators allowed",
  //     "Decor provided by the venue"
  //   ]
  // };

  // const handleContactClick = () => {
  //   alert('Contact button clicked!');
  // };

  // const checkAvailability = (date:any) => {
  //   return date.getDay() % 2 === 0; // Example: available on even days
  // };

  // const handleScheduleVisit = (date:any, time:any) => {
  //   alert(`Scheduled visit on ${date.toDateString()} at ${time}`);
  // };

  return (
    <div className="bg-gray-100">
     
      <NavBar />
      <div className="mb-8">
        <Carousel images={venueData?.images} />
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-3/4 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <SlimVenueCard name={"name"} address={"address"} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <VenueAboutCard about={venueData?.about} contactNumber={venueData?.phone} />
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="w-full lg:w-1/2">
              {/* <VenueBooking checkAvailability={checkAvailability} /> */}
              {/* <VenueSummary summary={venueData?.summary} /> */}
            </div>
            {/* <div className="w-full lg:w-1/2">
              <RatingsAndReviews
                overallRating={4.5}
                reviews={[
                  { rating: 5, comment: "Great venue!" },
                  { rating: 4, comment: "Nice ambiance." },
                  { rating: 4, comment: "Good service." },
                  { rating: 3, comment: "Could be better." },
                ]}
              />
            </div> */}
          </div>
        </div>
        <div className="w-full lg:w-1/4 h-fit flex justify-center items-center bg-white p-4 rounded-lg shadow-lg lg:sticky lg:top-0">
          <VenuePriceCard
            name="Grand Venue"
            vegPrice={venue?.data.venue.foodPackages}
           
            contact="+91 1234567890"
            // onContactClick={handleContactClick}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-end lg:space-x-4">
        {/* <div className="w-full lg:w-2/3 m-4">
          <VenueLocation latitude={12.9716} longitude={77.5946} venueName="My Venue" />
        </div> */}
        {/* <div className="w-full lg:w-1/3 mt-4 lg:mt-20">
          <ScheduleVisit onScheduleVisit={handleScheduleVisit} />
        </div> */}
      </div>
      <div className="mt-8 bg-white p-4 rounded-lg shadow-lg">
        <VenueImageCarousel images={venueData?.images} />
      </div>
      {/* <div className="mt-8 bg-white p-4 rounded-lg shadow-lg">
        <VenuePolicies policies={venuePolicies} />
      </div> */}
      <div className="flex flex-col justify-center mt-8">
        {/* <h2 className="text-2xl font-thin mb-4 tracking-widest flex justify-center">RELATED ARTICLES</h2> */}

      </div>
      {/* <div>
        <ContactForm onSubmit={handleContactFormSubmit} />
      </div> */}
      <div>

      </div>
      <Footer />
    </div>
  );
}

export default VenueServicePage;

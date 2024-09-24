import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import VenueList from "./pages/VenueList";
// import Vendor from "./pages/vendor";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import Business from "./auth/business";
import VenueServicePage from "./pages/VenueServicePage";
import VendorCategory from "./pages/VendorCategory";
import AboutUs from "./pages/AboutUs";
import VenueProfilePage from "./pages/VenueProfilePage";
import UserProfilePage from "./pages/UserProfilePage";
// import VendorsListByCategory from "./pages/VendorListByCategory";
// import VenueProfile from "./pages/admin/components/profile/venue/VenueProfilePage";
import VendorProfile from "./pages/admin/components/profile/vendor/VendorProfilePage";
import UserProfile from "./pages/admin/components/profile/user/UserProfile";

import React, { Suspense } from "react";

import AdminDashboard from "./pages/admin/adminDashboard";
import Home from "./pages/home";

import UserRegister from "./pages/userRegister";
import VendorsList from "./pages/VendorsList";
import VendorProfilePage from "./pages/VendorProfilePage";
import VendorServicePage from "./pages/VendorServicePage";

import BlogList from "./pages/BlogList";
import NewBlog from "./pages/admin/components/profile/blog/NewBlog";
import Loader from "./components/Loader";
import BlogPost from "./pages/admin/components/profile/blog/BlogPost";
// import UserNotification from "./pages/notification/notification";
import BlogView from "./pages/BlogView";
import RealWeddingsList from "./pages/realWeddingsList";
import RealWeddingsView from "./pages/realWeddingsView";
import RealWeddingsPost from "./pages/admin/components/profile/realWedding/realWeddingsPost";
import NewRealWedding from "./pages/admin/components/profile/realWedding/newRealWeddings";

import {AdminProtectedRoutes , VendorProtectedRoutes , VenueProtectedRoutes , UserProtectedRoutes} from "./utils/ProtectedRoutes";
import VenueProfile from "./pages/admin/components/profile/venue/VenueProfilePage";
import EnquiryNotif from "./pages/notification/enquirynotif";
import ScrollToTop from "./components/ScrollToTop";
// import UpdateVenueComponent from "./pages/Test";

import PopUp from "./components/PopUp"

const App: React.FC = () => {
  return (
    <ChakraProvider>
     
     
      <Router>
        <Suspense fallback={<Loader />}>
        <PopUp/>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* <Route path="/popup" element={<PopUp />} /> */}


            {/* <Route path="/popup" element={<PopUp />} /> */}

            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/userregister" element={<UserRegister />} />
            <Route path="aboutus1" element={<AboutUs />} />
            <Route path="/vendor/:type" element={<VendorsList />} />
            <Route path="/vendorCategory" element={<VendorCategory />} />
            <Route path="/business" element={<Business />} />
            <Route path="/venuelist" element={<VenueList />} />
            <Route path="/vendor/:type/:_id" element={<VendorServicePage />} />
            <Route path="/venuelist/:id" element={<VenueServicePage />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog/new" element={<NewBlog />} />
            <Route path="/realWeddings/new" element={<NewRealWedding />} />
            <Route path="/realWeddings/:id" element={<RealWeddingsPost />} />
            <Route path="/notification" element={<EnquiryNotif />} />
            <Route path="/realWedding/:id" element={<RealWeddingsView />} />
            <Route path="/realWedding" element={<RealWeddingsList />} />
            <Route path="/blogs/:id" element={<BlogView />} />

            <Route element={<AdminProtectedRoutes />}>
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/adminDashboard/:page" element={<AdminDashboard />} />
              <Route path="/UserProfile/:id" element={<UserProfile />} />
              <Route path="/VendorProfile/:id" element={<VendorProfile />} />
              <Route path="/VendorProfile/:id" element={<VendorProfile />} />
              <Route path="/VenueProfile/:id" element={<VenueProfile />} />
            </Route>

            <Route element={<VendorProtectedRoutes />}>
              <Route path="/vendorProfilePage" element={<VendorProfilePage />} />
            </Route>

            <Route element={<VenueProtectedRoutes />}>
              <Route path="/venueProfilePage" element={<VenueProfilePage />} />
            </Route>

            <Route element={<UserProtectedRoutes />}>
              <Route path="/userProfilePage" element={<UserProfilePage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ChakraProvider>
  );
};

export default App;

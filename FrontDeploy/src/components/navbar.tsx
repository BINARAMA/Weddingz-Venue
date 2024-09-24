import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Import your logo image
import Logo from '/weddingz_venue_logo.png'; // Adjust the path as per your project structure

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state?.auth?.user?.role);
  let url = "/";
  
  if (role === "vendor") url = '/vendorProfilePage';
  if (role === "venue") url = '/venueProfilePage';
  if (role === "user") url = '/userProfilePage';
  if (role === "admin") url = '/adminDashboard';
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-[#000000] py-2 pl-2 pr-4  relative z-10 m-0">
      <div className="container mx-0 flex md:justify-between justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img src={Logo} alt="Logo" className="w-32 h-12 items-stretch my-0 " />
          {/* Adjust the class above (w-10 h-10 rounded-full) according to your logo size and shape */}
          
        </Link>

        {/* Navigation Links */}
        <div className="options">
          <ul className="hidden md:flex justify-center items-center space-x-8 flex-grow static top-0">
            <li className="relative">
              <Link to="/" className="text-[#D6BF5E] hover:text-gray-200">Home</Link>
            </li>
            <li className="relative">
              <Link to="/venuelist" className="text-[#D6BF5E] hover:text-gray-200">Venues</Link>
            </li>
            <li className="relative">
              <Link to="/vendor/AllVendors" className="text-[#D6BF5E] hover:text-gray-200">Vendors</Link>
            </li>
            <li>
              <Link to="/blogs" className="text-[#D6BF5E] hover:text-gray-200">Blogs</Link>
            </li>
            
            <li>
              <Link to="/realWedding" className="text-[#D6BF5E] hover:text-gray-200">Real Weddings</Link>
            </li>

            <li>
              <Link to="/aboutus1" className="text-[#D6BF5E] hover:text-gray-200">Why Us</Link>
            </li>
          </ul>
        </div>

        {/* Right-side Icons */}
        <div className="icons flex space-x-4">
          <ul className="space-x-4 hidden md:block">
            {isLoggedIn && (
              <li className="relative">
                 <Link to="/notification" className="text-[#D6BF5E] hover:text-gray-200">
                  <FaBell />
                </Link>
              </li> 
            )}
          </ul>

          <ul className="flex items-center space-x-4">
            {!isLoggedIn && (
              <li className="relative hidden md:block">
                <Link to="/login" className="text-[#D6BF5E] hover:text-gray-200">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="relative hidden md:block">
                <Link to={url} className="text-[#D6BF5E] hover:text-gray-200">
                  <FaUser />
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-[#D6BF5E]">
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#000000]  text-[#D6BF5E] flex flex-col items-center justify-center space-y-4 z-10 transition-transform duration-300">


          <div className='absolute top-8 '>
           <img src={Logo} alt="Logo" className="w-32  h-12 items-stretch " />
          </div>



          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-[#D6BF5E]">
            <FaTimes size={24} />
          </button>
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/" className=" text-2xl text-[#D6BF5E] hover:text-gray-200" onClick={toggleMobileMenu}>Home</Link>
            </li>
            <li>
              <Link to="/venuelist" className=" text-2xl text-[#D6BF5E] hover:text-gray-200" onClick={toggleMobileMenu}>Venues</Link>
            </li>
            <li>
              <Link to="/vendor/AllVendors" className=" text-2xl text-[#D6BF5E] hover:text-gray-200" onClick={toggleMobileMenu}>Vendors</Link>
            </li>
            <li>
              <Link to="/blogs" className="text-2xl text-[#D6BF5E] hover:text-gray-200">Blogs</Link>
            </li>
            
            <li>
              <Link to="/realWedding" className= " text-2xl text-[#D6BF5E] hover:text-gray-200">Real Weddings</Link>
            </li>

            <li>
              <Link to="/aboutus1" className=" text-2xl text-[#D6BF5E] hover:text-gray-200">Why Us</Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/login" className=" text-2xl text-[#D6BF5E] hover:text-gray-200" onClick={toggleMobileMenu}>Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/vendorProfilePage" className="text-2xl" onClick={toggleMobileMenu}><FaUser /></Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

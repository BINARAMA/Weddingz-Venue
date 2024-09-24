import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-8 lg:px-20 flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
          <div className="flex justify-center lg:justify-start items-center space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:text-red-500 transition duration-300 ease-in-out" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-3xl hover:text-red-500 transition duration-300 ease-in-out" />
            </a>
            <a href="https://www.instagram.com/weddingzvenue.in_?igsh=cG90dXR2Nml2NHMy&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:text-red-500 transition duration-300 ease-in-out" />
            </a>
          </div>
        </div>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">Shakti Khand 2, Indirapuram</p>
          <p className="mb-2">Ghaziabad, 201014</p>
          <p className="mb-2">Phone: <a href="tel:+918076207112" className="hover:underline text-[#D6BF5E]">+91 8076207112</a></p>
          <p>Email: <a href="mailto:Weddingzvenue.in@gmail.com" className="hover:underline text-[#D6BF5E]">Weddingzvenue.in@gmail.com</a></p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p>&copy; {new Date().getFullYear()} Weddingz Venue. All rights reserved.</p>
        <p className="mt-2">
          Designed by{' '}
          <a 
            href="https://binarama.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#D6BF5E] hover:underline"
          >
            BINARAMA
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

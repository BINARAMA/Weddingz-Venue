import { Phone } from 'lucide-react'; // Import phone icon from react-icons

const InformationBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white py-8 px-6 md:px-10 mt-8 shadow-lg rounded-lg">
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center text-3xl font-bold animate-pulse">
          <Phone className="w-8 h-8 mr-3" strokeWidth={2.5} />
          <span className="text-center sm:text-left">CALL US: <span className="text-yellow-300 block sm:inline mt-1 sm:mt-0 sm:ml-2">+91 8076207112</span></span>
        </div>
        <div className="md:text-left sm:text-right text-lg italic opacity-80">24-hour helpline</div>
        <div className="text-2xl font-bold lg:text-left sm:text-center">OR</div>
        <div className="lg:text-left text-xl font-semibold sm:text-center animate-pulse">
          HAVE US CALL YOU FOR UP TO <span className="text-yellow-300 text-2xl">30%</span> DISCOUNT
        </div>
        <div className="space-y-3">
          <p className="lg:text-left text-xl font-bold sm:text-center">India's Largest Wedding Company</p>
          <p className="lg:text-lg lg:text-left sm:text-center">Find, Compare And Book Wedding Venues And Services</p>
          <p className="lg:text-left text-xl font-bold sm:text-center">Best Prices Guaranteed</p>
          <p className="lg:text-left text-lg sm:text-center">Find Inspiration, Ideas And Insights For Your Wedding</p>
        </div>
        <div className='md:absolute md:bottom-[42vh] lg:ml-[96vh] lg:bottom-[42vh]'>
          <img className='h-fit w-fit' src='/Group3.png' alt="Decorative element" />
        </div>
      </div>
    </div>
  );
};


export default InformationBanner;


// import { FaPhoneAlt } from 'react-icons/fa'; // Import phone icon from react-icons

// const InformationBanner = () => {
//   return (
//     <div className="w-full bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white py-8 px-10 mt-8 shadow-lg md:flex justify-between"> {/* Left to right gradient from #A31F24 to #B54B4F */}
//       <div className=' absolute  '>
//       <div className="items-center  text-3xl font-semibold mb-6">
//         <FaPhoneAlt className="w-8 h-8 mr-2" />
//         CALL US: <span className="text-white ml-2">+912249449790</span> {/* Updated phone number text color to white */}
//       </div>
//       <div className="text-base mb-4 italic">24-hour helpline</div>
//       <div className="text-xl mb-4 font-bold">OR</div>
//       <div className="text-lg mb-4">HAVE US CALL YOU FOR UP TO <span className="font-bold text-white">30%</span> DISCOUNT</div> {/* Updated "30%" text color to black */}
//       <div className="text-lg mb-4 font-bold">India's Largest Wedding Company.</div>
//       <div className="text-lg mb-4">Find, Compare And Book Wedding Venues And Services.</div>
//       <div className="text-lg mb-4 font-bold">Best Prices Guaranteed.</div>
//       <div className="text-lg">Find Inspiration, Ideas And Insights For Your Wedding.</div>
//     </div>
//     <div className='absolute'>
//       <img  className='h-fit w-fit ' src='/public/group3.png'   />
//     </div>
//     </div>
//   );
// };

// export default InformationBanner;

// import React from 'react';
// import { Phone } from 'lucide-react';

// const InformationBanner = () => {
//   return (
//     <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white py-12 px-6 md:px-10 mt-8 shadow-lg rounded-lg overflow-hidden relative">
//       <div className="max-w-4xl mx-auto">
//         <div className="md:flex items-center justify-between">
//           <div className="md:w-2/3 space-y-6">
//             <div className="flex items-center text-3xl font-bold animate-pulse">
//               <Phone className="w-8 h-8 mr-3" />
//               <span>CALL US: <span className="text-yellow-300">+91 8076207112</span></span>
//             </div>
//             <div className="text-lg italic opacity-80">24-hour helpline</div>
//             <div className="text-2xl font-bold my-4">OR</div>
//             <div className="text-xl">
//               HAVE US CALL YOU FOR UP TO <span className="font-bold text-yellow-300 text-2xl">30%</span> DISCOUNT
//             </div>
//             <div className="space-y-2 text-lg">
//               <p className="font-semibold">India's Largest Wedding Company</p>
//               <p>Find, Compare And Book Wedding Venues And Services</p>
//               <p className="font-semibold">Best Prices Guaranteed</p>
//               <p>Find Inspiration, Ideas And Insights For Your Wedding</p>
//             </div>
//           </div>
//           <div className="md:w-1/3 mt-8 md:mt-0">
//           <div className='absolute'>
//       <img  className='h-fit w-fit ' src='/public/group3.png'   />
//      </div>
//           </div>
//         </div>
//       </div>
//       <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-red-400 rounded-full opacity-20 blur-3xl"></div>
//       <div className="absolute -top-16 -left-16 w-64 h-64 bg-red-800 rounded-full opacity-20 blur-3xl"></div>
//     </div>
//   );
// };

// export default InformationBanner;
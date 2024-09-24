import { Link } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { AiOutlineBgColors } from "react-icons/ai";
import { GiHouse, GiMeal, GiPawPrint } from "react-icons/gi";
import { FaDrum } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { GiMagicHat } from "react-icons/gi";
import { GiFog } from "react-icons/gi";
// import { GiWaiter } from "react-icons/gi";
import { GiGlassCelebration } from "react-icons/gi";
// import { GiBeerBottle } from "react-icons/gi";
import { FiChevronRight } from "react-icons/fi";

// New icons
import { FaLeaf } from "react-icons/fa"; // for GiHenna
import { FaMusic } from "react-icons/fa"; // for AiFillMusic
// import { GiTattooNeedle } from "react-icons/gi"; // for GiInkSplatter
import { FaGamepad } from "react-icons/fa"; // for GiBoxTrap
import { FaMicrophoneAlt } from "react-icons/fa"; // for GiMicrophone
import { FaMicrophone } from "react-icons/fa"; // for GiSinger
// import { FaUserTie } from "react-icons/fa"; // for GiGirl
import { FaParking } from "react-icons/fa"; // for GiParkingGarage
// import { FaDoorOpen } from "react-icons/fa"; // for GiTurnstile
import { FaCarSide } from "react-icons/fa"; // for GiCarSideview
import { MdOutlineFoodBank } from "react-icons/md";
import { GiHeartWings } from "react-icons/gi";
import { GrUserFemale } from "react-icons/gr";
import { GiMusicSpell } from "react-icons/gi";
import { RiHotelBedFill } from "react-icons/ri";
import React, { useState } from "react";
import { IconType } from "react-icons/lib";

const type: { [key: number]: string } = {
  0: "AllVendors",
  1: "Photographer",
  2: "MakeupArtist",
  3: "MehendiArtist",
  4: "Decorator",
  5: "Caterer",
  6: "BandBaja",
  7: "Dhol",
  8: "TattooArtist",
  9: "Messkot",
  10: "Magicians",
  11: "FogEvent",
  12: "GameCoordinator",
  13: "Anchor",
  14: "LiveSinger",
  15: "WelcomeGirls",
  16: "WaiterService",
  17: "ValetParking",
  18: "DJ",
  19: "BirthdayEntry",
  20: "JagranSetup",
  21: "MataChowkiSetup",
  22: "Bartender",
  23: "RoomsBooking"
};



const iconMap: { [key: number]: IconType } = {
  1: MdPhotoCamera,
  2: FaPalette,
  3: FaLeaf,
  4: AiOutlineBgColors,
  5: GiMeal,
  6: FaMusic,
  7: FaDrum,
  8: GiHeartWings,
  9: AiOutlineUser,
  10: GiMagicHat,
  11: GiFog,
  12: FaGamepad,
  13: FaMicrophoneAlt,
  14: FaMicrophone,
  15: GrUserFemale,
  16: MdOutlineFoodBank,
  17: FaParking,
  18: GiMusicSpell,
  19: FaCarSide,
  20: GiPawPrint,
  21: GiHouse,
  22: GiGlassCelebration,
  23: RiHotelBedFill
};
const AllVendors: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const initialCategoriesCount = 5;
  const categoriesToShow = showAll ? Object.keys(type).length - 1 : initialCategoriesCount;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ml-auto">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Browse Vendors</div>
        <div className="mb-4">
          {Object.keys(type).slice(1, categoriesToShow + 1).map((key) => {
            const numKey = parseInt(key);
            const IconComponent = iconMap[numKey];
            return (
              <Link key={key} to={`/vendor/${type[numKey]}`}>
                <div className="flex items-center mb-2">
                  {IconComponent && <IconComponent size={20} />}
                  <p className="ml-2">{type[numKey]}</p>
                  <FiChevronRight className="ml-auto" size={15} />
                </div>
              </Link>
            );
          })}
          
          {!showAll && (
            <button
              className="w-full text-center text-blue-500 hover:text-blue-700 mt-2"
              onClick={() => setShowAll(true)}
            >
              Read More
            </button>
          )}
        </div>
        
        {showAll && (
          <>
            <hr className="my-4" />
            <div className="text-center">
              <Link to={`/vendor/${type[0]}`} className="text-blue-500 hover:text-blue-700">
                All Vendors
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllVendors;

// export default AllVendors;

//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg ml-auto">
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">Browse Vendors</div>
//         <div className="mb-4">
//           <Link to={`/vendor/${type[1]}`}>
//             <div className="flex items-center mb-2">
//               <MdPhotoCamera size="20" />
//               <p className="ml-2">Photographers</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[2]}`}>
//             <div className="flex items-center mb-2">
//               <FaPalette size="20" />
//               <p className="ml-2">Makeup Artists</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[3]}`}>
//             <div className="flex items-center mb-2">
//               <FaLeaf size="20" />
//               <p className="ml-2">Mehendi Artists</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[4]}`}>
//             <div className="flex items-center mb-2">
//               <AiOutlineBgColors size="20" />
//               <p className="ml-2">Decorators</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[5]}`}>
//             <div className="flex items-center mb-2">
//               <GiMeal size="20" />
//               <p className="ml-2">Caterers</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[6]}`}>
//             <div className="flex items-center mb-2">
//               <FaMusic size="20" />
//               <p className="ml-2">{`${type[6]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[7]}`}>
//             <div className="flex items-center mb-2">
//               <FaDrum size="20" />
//               <p className="ml-2">{`${type[7]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[8]}`}>
//             <div className="flex items-center mb-2">
//             <GiHeartWings size="20" />
//               <p className="ml-2">{`${type[8]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[9]}`}>
//             <div className="flex items-center mb-2">
//               <AiOutlineUser size="20" />
//               <p className="ml-2">{`${type[9]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[10]}`}>
//             <div className="flex items-center mb-2">
//               <GiMagicHat size="20" />
//               <p className="ml-2">{`${type[10]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[11]}`}>
//             <div className="flex items-center mb-2">
//               <GiFog size="20" />
//               <p className="ml-2">{`${type[11]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[12]}`}>
//             <div className="flex items-center mb-2">
//               <FaGamepad size="20" />
//               <p className="ml-2">{`${type[12]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[13]}`}>
//             <div className="flex items-center mb-2">
//               <FaMicrophoneAlt size="20" />
//               <p className="ml-2">{`${type[13]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[14]}`}>
//             <div className="flex items-center mb-2">
//               <FaMicrophone size="20" />
//               <p className="ml-2">{`${type[14]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[15]}`}>
//             <div className="flex items-center mb-2">
//             <GrUserFemale size="20" />
//               <p className="ml-2">{`${type[15]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[16]}`}>
//             <div className="flex items-center mb-2">
//             <MdOutlineFoodBank size="20" />
//               <p className="ml-2">{`${type[16]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[17]}`}>
//             <div className="flex items-center mb-2">
//               <FaParking size="20" />
//               <p className="ml-2">{`${type[17]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[18]}`}>
//             <div className="flex items-center mb-2">
//             <GiMusicSpell size="20" />
//               <p className="ml-2">{`${type[18]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[19]}`}>
//             <div className="flex items-center mb-2">
//               <FaCarSide size="20" />
//               <p className="ml-2">{`${type[19]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[20]}`}>
//             <div className="flex items-center mb-2">
//               <GiPawPrint size="20" />
//               <p className="ml-2">{`${type[20]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[21]}`}>
//             <div className="flex items-center mb-2">
//               <GiHouse size="20" />
//               <p className="ml-2">{`${type[21]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[22]}`}>
//             <div className="flex items-center mb-2">
//               <GiGlassCelebration size="20" />
//               <p className="ml-2">{`${type[22]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//           <Link to={`/vendor/${type[23]}`}>
//             <div className="flex items-center mb-2">
//             <RiHotelBedFill size="20" />
//               <p className="ml-2">{`${type[23]}`}</p>
//               <FiChevronRight className="ml-auto" size="15" />
//             </div>
//           </Link>
//         </div>
//         <hr className="my-4" />
//         <div className="text-center">
//           <Link to={`/vendor/${type[0]}`} className="">
//             All Vendors
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllVendors;

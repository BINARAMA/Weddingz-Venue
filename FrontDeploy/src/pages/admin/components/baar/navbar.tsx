import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-[#110069] py-4 relative z-10">
      <div className="container mx-auto">
        <ul className="flex justify-start items-center">
          <li className="relative mx-4">
            <Link
              to="/adminDashboard"
              className="text-white cursor-pointer hover:text-gray-200"
            >
              Home
            </Link>
          </li>

          <li className="relative mx-4">
            <Link
              to={`/adminDashboard/${"Admin Management"}`}
              className="text-white cursor-pointer hover:text-gray-200"
            >
              Admin Management
            </Link>
          </li>

          <li className="relative mx-4">
            <Link
              to={`/adminDashboard/${"Vendor Management"}`}
              className="text-white cursor-pointer hover:text-gray-200"
            >
              Vendor Management
            </Link>
          </li>

          <li className="relative mx-4">
            <Link
              to={`/adminDashboard/${"Venue Management"}`}
              className="text-white cursor-pointer hover:text-gray-200"
            >
              Venue Management
            </Link>
          </li>

          <li className="relative mx-4">
            <Link
              to={`/adminDashboard/${"User Management"}`}
              className="text-white cursor-pointer hover:text-gray-200"
            >
              User Management
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../styles/style";
import { Link, useNavigate } from "react-router-dom";

import { useLoginVendorMutation } from "../redux/api/vendor";
import { useLoginVenueMutation } from "../redux/api/venue";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import { login } from "../redux/reducer/auth.ts";
import { User } from "../types/types.ts";
import { useLoginUserMutation } from "../redux/api/user.ts";
import { useLoginAdminMutation } from "../redux/api/admin.ts";
import Loader from "../components/skeleton/Loader.tsx" 

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email!"),
  password: Yup.string(),
  role: Yup.string().required("Please select a role"),
});

const Login: FC = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const [loginVendor] = useLoginVendorMutation();
  const [loginVenue] = useLoginVenueMutation();
  const [loginUser] = useLoginUserMutation();
  const [loginAdmin] = useLoginAdminMutation();

  const handleLogin = (_id: string, role: string) => {
    const user: User = { _id: _id, role };
    dispatch(login(user));
    console.log(user);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", role: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setSuccessMessage("");
      try {
        let response;

        if (values.role === "vendor") {
          response = await loginVendor(values).unwrap();
          const id: string = response?.data?.loggedInVendor?._id || "";
          handleLogin(id, values.role);
          navigate("/vendorProfilePage");
        }

        if (values.role === "venue") {
          response = await loginVenue(values).unwrap();
          const id: string = response?.data?.loggedInVenue?._id || "";
          handleLogin(id, values.role);
          navigate("/venueProfilePage");
        }

        if (values.role === "user") {
          response = await loginUser(values).unwrap();
          const id = response?.data?.loggedInUser?._id || "";
          handleLogin(id, values.role);
          navigate("/userProfilePage");
        }

        if (values.role === "admin") {
          response = await loginAdmin(values).unwrap();
          const id = response?.data?.loggedInAdmin?._id || "";
          handleLogin(id, values.role);
          navigate("/adminDashboard");
        }

        setSuccessMessage("Login successful!");
        console.log("Login successful:", response);
        
      } catch (err) {
        // Handle login error
        console.error("Login error:", err);
        toast.error(`Invalid Credentials`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Login with Weddingz-Venue
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">
              Enter your Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="loginmail@gmail.com"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                errors.email && touched.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
          </div>

          {/* Password field */}
          <div className="mb-4 relative">
            <label className="block mb-1 font-medium" htmlFor="password">
              Enter your password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password!@%"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                errors.password && touched.password ? "border-red-500" : ""
              }`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
            )}
          </div>

          {/* Role dropdown */}
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="role">
              Select your role
            </label>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                errors.role && touched.role ? "border-red-500" : ""
              }`}
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
              <option value="venue">Venue</option>
            </select>
            {errors.role && touched.role && (
              <span className="text-red-500 pt-2 block">{errors.role}</span>
            )}
          </div>

          {/* Forget Password */}
          <div className="flex justify-end mb-4">
            <span className="text-blue-500 underline cursor-pointer">
              <Link to="/forget">Forget Password?</Link>
            </span>
          </div>

          {/* Loader */}
          {isLoading && <Loader />}

          {/* Success Message */}
          {successMessage && (
            <div className="text-black text-center mb-4">
              {successMessage}
            </div>
          )}

          {/* Login button */}
          <div className="mb-4">
            <input
              type="submit"
              value="Login"
              className={`${styles.button} `}
              disabled={isLoading}
            />
          </div>

          {/* Sign up and business links */}
          <div className="flex flex-col sm:flex-row sm:justify-between text-center">
            <h5 className="text-[14px] mb-2 sm:mb-0">
              Not have any account?{" "}
              <span className="text-[#2190ff] cursor-pointer">
                <Link to="/Signup">Sign Up</Link>
              </span>
            </h5>
            <h5 className="text-[14px]">
              Are you a business?{" "}
              <span className="text-[#2190ff] cursor-pointer">
                <Link to="/business">Click here</Link>
              </span>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "../redux/api/vendor";
import { toast } from 'react-toastify';
import { useSignupVenueMutation } from "../redux/api/venue";
import { styles } from "../styles/style";
import { useNavigate } from "react-router-dom";


import 'react-toastify/dist/ReactToastify.css';
import Loader from "../components/skeleton/Loader";

const businessCategories = [
  "Photographer",
  "MakeupArtist",
  "MehendiArtist",
  "Decorator",
  "Caterer",
  "BandBaja",
  "Dhol",
  "TattooArtist",
  "Messkot",
  "Magicians",
  "FogEvent",
  "GameCoordinator",
  "Anchor",
  "LiveSinger",
  "WelcomeGirls",
  "WaiterService",
  "ValetParking",
  "DJ",
  "BirthdayEntry",
  "JagranSetup",
  "MataChowkiSetup",
  "Bartender",
  "RoomsBooking",
];

export const VenueRegistrationForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [register] = useSignupVenueMutation();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      businessName: "",
      city: "",
      yourName: "",
      phone: "",
      email: "",
      password: "",
      comments: "",
    },
    validationSchema: Yup.object({
      businessName: Yup.string().required("Business name is required"),
      city: Yup.string().required("City name is required"),
      yourName: Yup.string().required("Your name is required"),
      phone: Yup.string().required("Contact number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      comments: Yup.string(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true); // Set loading to true when submitting
      console.log("Vendor registration form submitted:", values);
      values.city = capitalizeFirstLetter(values.city);
      const res = await register(values);
      console.log('datat', res)
      if(res?.data?.success==true){
        alert("You Have Successfully Registered");
        navigate('/login')
      }
      setIsLoading(false);
      setSubmitted(true);
    },
  });

  function capitalizeFirstLetter(city:any) {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded shadow-md">
       {isLoading && <Loader />} {/* Add Loader component */}
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="businessName" className="block mb-1 font-medium">
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.businessName}
          />
          {formik.touched.businessName && formik.errors.businessName && (
            <div className="text-red-500 mt-1 text-sm">
              {formik.errors.businessName}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="cityName" className="block mb-1 font-medium">
            City Name
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500 mt-1 text-sm">
              {formik.errors.city}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="yourName" className="block mb-1 font-medium">
            Your Name
          </label>
          <input
            id="yourName"
            name="yourName"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yourName}
          />
          {formik.touched.yourName && formik.errors.yourName && (
            <div className="text-red-500 mt-1 text-sm">
              {formik.errors.yourName}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block mb-1 font-medium">
            Contact
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 mt-1 text-sm">
              {formik.errors.phone}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 mt-1 text-sm">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 mt-1 text-sm">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="comments" className="block mb-1 font-medium">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comments}
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} w-full py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600`}
          disabled={isLoading} // Disable button when loading
        >
          Submit
        </button>
        {submitted && (
          <div className="col-span-2 text-green-500 mt-2">
            Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export const VendorRegistrationForm: React.FC = () => {
  const Vendor = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string()
      .email("Invalid email!")
      .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
    phone: Yup.string().required("Please enter your phone number!"),
    city: Yup.string().required("Please enter your city!"),
    type_Of_Business: Yup.string().required("Please enter your business type!"),
    businessName: Yup.string().required("Please enter your business name!"),
  });
  const navigate = useNavigate();

  const [register, { data, error, isSuccess }] = useSignupMutation();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      console.log(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
       // toast.success("Success message", { duration: 4000 });
        console.log(errorData);
      }
    }
  }, [isSuccess, error, data?.message]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      type_Of_Business: "",
      businessName: "",
    },
    validationSchema: Vendor,
    onSubmit: async (values) => {
      setIsLoading(true);
      values.city = capitalizeFirstLetter(values.city);
      try {
        const res = await register(values);
        if (res?.data?.success === true) {
          toast.success("Registration successful! Please log in.");
          navigate("/login");
        } else {
          toast.error(`Invalid Credentials`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  function capitalizeFirstLetter(city:any) {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  }

  
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded shadow-md">
      {isLoading && <Loader />} {/* Add Loader component */}
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="businessName" className="block mb-1 font-medium">
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={values.businessName}
          />
          {touched.businessName && errors.businessName && (
            <div className="text-red-500 mt-1 text-sm">
              {errors.businessName}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-1 font-medium">
            City Name
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={values.city}
          />
          {touched.city && errors.city && (
            <div className="text-red-500 mt-1 text-sm">
              {errors.city}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={values.name}
          />
          {touched.name && errors.name && (
            <div className="text-red-500 mt-1 text-sm">{errors.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1 font-medium">
            Contact
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={values.phone}
          />
          {touched.phone && errors.phone && (
            <div className="text-red-500 mt-1 text-sm">{errors.phone}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={values.email}
          />
          {touched.email && errors.email && (
            <div className="text-red-500 mt-1 text-sm">{errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={values.password}
          />
          {touched.password && errors.password && (
            <div className="text-red-500 mt-1 text-sm">{errors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="type_Of_Business" className="block mb-1 font-medium">
            Type Of Business
          </label>
          <select
            id="type_Of_Business"
            name="type_Of_Business"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={values.type_Of_Business}
          >
            <option value="" label="Select type of business" />
            {businessCategories.map((category, index) => (
              <option key={index} value={category} label={category} />
            ))}
          </select>
          {touched.type_Of_Business && errors.type_Of_Business && (
            <div className="text-red-500 mt-1 text-sm">
              {errors.type_Of_Business}
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`${styles.button} w-full py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// import React, { useState } from 'react';
// import { useFormik } from "formik";
// import * as Yup from "yup";

// import { styles } from '../styles/style';



// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email!")
//     .required("Please enter your email!")
// });

// const ForgetPasswordPage: React.FC = () => {
//   const [message] = useState<string>('');

  
 

//   const formik = useFormik({
//     initialValues: { email: "" },
//     validationSchema: schema,
//     onSubmit: async ({ email }) => {
//       const data = { email };
//     }
//   });

 
//   return (
//     <div className="w-full max-w-full h-auto overflow-y-auto justify-center items-center mt-[10%]">
//       <div className="flex justify-end">
       
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         <h2 className={`${styles.title} text-center`}>Forgot Password</h2>
//         <form onSubmit={formik.handleSubmit} style={{ maxWidth: '50%', margin: '0 auto', height: 'auto' }}>
//           <div style={{ marginBottom: '1rem' }}>
//             <label htmlFor="email" className={`${styles.label} text-center`}>Email:</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formik.values.email}
//               placeholder="Enter your email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               style={{ width: '100%', padding: '0.5rem', textAlign: 'center' }}
//             />
//           </div>
//           <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit</button>
//         </form>
//         {formik.touched.email && formik.errors.email && (
//           <div style={{ color: 'red' }}>{formik.errors.email}</div>
//         )}
//         {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ForgetPasswordPage;

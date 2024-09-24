// src/pages/NewRealWedding.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../baar/navbar';
// import Footer from '../../../../../components/Footer';
import { useAddRealWeddingPostMutation } from '../../../../../redux/api/realWeddings';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewRealWedding: React.FC = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [addRealWedding, { isLoading, isSuccess, isError, error }] = useAddRealWeddingPostMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      images: [] as File[],
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      images: Yup.array().min(1, 'At least one image is required').max(3, 'Maximum of 3 images can be uploaded'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      try {
        const realWeddingFormData = new FormData();
        values.images.forEach((image) => {
          realWeddingFormData.append('images', image);
        });
        realWeddingFormData.append('title', values.title);
        realWeddingFormData.append('content', values.content);

        const response = await addRealWedding(realWeddingFormData).unwrap();
        console.log('Real Wedding post uploaded successfully:', response);
        navigate('/realweddings');
      } catch (err) {
        console.error('Error adding Real Wedding post:', err);
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const updatedFiles = [...formik.values.images];
      const updatedPreviews = [...imagePreviews];

      Array.from(files).forEach((file) => {
        updatedFiles.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            updatedPreviews.push(reader.result as string);
          }
          setImagePreviews(updatedPreviews);
          formik.setFieldValue('images', updatedFiles);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const renderImageErrors = () => {
    if (typeof formik.errors.images === 'string') {
      return <div className="text-red-500 mt-1">{formik.errors.images}</div>;
    } else if (Array.isArray(formik.errors.images) && typeof formik.errors.images[0] === 'string') {
      return <div className="text-red-500 mt-1">{formik.errors.images.join(', ')}</div>;
    }
    return null;
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-8 font-roboto">
        <h1 className="text-4xl font-bold mb-8 text-center">Write a New Real Wedding</h1>
        {isLoading && <div>Uploading Real Wedding post...</div>}
        {isSuccess && <div>Real Wedding post uploaded successfully!</div>}
        {isError && <div>Error uploading Real Wedding post: {error?.toString()}</div>}
        <form onSubmit={formik.handleSubmit} className="max-w-3xl mx-auto">
          <div className="mb-6">
            <label htmlFor="title" className="block text-2xl font-medium mb-2">
              Real Wedding Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 mt-1">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="images" className="block text-2xl font-medium mb-2">
              Upload Images
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              onChange={handleImageUpload}
              onBlur={formik.handleBlur}
            />
            {formik.touched.images && renderImageErrors()}
          </div>
          {imagePreviews.length > 0 && (
            <div className="mb-6">
              <Carousel>
                {imagePreviews.map((preview, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg shadow-sm"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="content" className="block text-2xl font-medium mb-2">
              Real Wedding Content
            </label>
            <textarea
              id="content"
              name="content"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none h-64 resize-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="text-red-500 mt-1">{formik.errors.content}</div>
            ) : null}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default NewRealWedding;

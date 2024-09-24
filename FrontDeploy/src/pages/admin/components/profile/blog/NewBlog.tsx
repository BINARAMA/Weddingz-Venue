import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from '../../baar/navbar';
import { useAddBlogMutation } from '../../../../../redux/api/blog';

const NewBlog: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [addBlog, { isLoading, isSuccess, isError,  }] = useAddBlogMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      image: null,
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      try {
        const blogFormData = new FormData();
        if (values.image) { 
          blogFormData.append('image', values.image);
        }
        blogFormData.append('title', values.title);
        blogFormData.append('content', values.content);
    
        const response = await addBlog(blogFormData).unwrap();
        // Handle the successful response here
        console.log('Blog uploaded successfully:', response);
      } catch (err) {
        // Handle the error here
        console.error('Error adding blog:', err);
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        formik.setFieldValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-8 font-roboto">
        <h1 className="text-4xl font-bold mb-8 text-center">Write a New Blog</h1>
        {isLoading && <div>Uploading blog...</div>}
        {isSuccess && <div>Blog uploaded successfully!</div>}
        {isError && <div>Error uploading blog:</div>}
        <form onSubmit={formik.handleSubmit} className="max-w-3xl mx-auto">
          <div className="mb-6">
            <label htmlFor="title" className="block text-2xl font-medium mb-2">
              Blog Title
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
            <label htmlFor="image" className="block text-2xl font-medium mb-2">
              Upload Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              onChange={handleImageUpload}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 mt-1">{formik.errors.image}</div>
            ) : null}
          </div>
          {imagePreview && (
            <div className="mb-6">
              <img src={imagePreview as string} alt="Blog Preview" className="w-full h-auto object-cover rounded-lg shadow-sm" />
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="content" className="block text-2xl font-medium mb-2">
              Blog Content
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
    </>
  );
};

export default NewBlog;

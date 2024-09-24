import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '../../../../../redux/api/blog';
import NavBar from '../../baar/navbar'


interface BlogPostInterface {
  id: string;
  title: string;
  images: string[];
  content: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blogData, error, isLoading, refetch } = useGetBlogByIdQuery(id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [updateBlog] = useUpdateBlogMutation();
  const [formData, setFormData] = useState<BlogPostInterface>({
    id: '',
    title: '',
    images: [],
    content: ''
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    if (blogData?.data) {
      setFormData({
        id: blogData.data.blog._id || "",
        title: blogData.data.blog.title || '',
        images: blogData.data.blog.images || [],
        content: blogData.data.blog.content || ''
      });
    }
  }, [blogData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !blogData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Blog post not found</div>
      </div>
    );
  }

  const blog = blogData?.data.blog;

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      id: blog._id || "",
      title: blog.title || '',
      images: blog.images || [],
      content: blog.content || '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('content', formData.content);
  
    selectedImages.forEach(image => {
      formDataToSubmit.append('image', image);
    });
  
    try {
      await updateBlog({ id: formData.id, blogFormData: formDataToSubmit });
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-8 font-roboto">
        {!isEditing ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              {blog?.title}
            </h1>
            {blog?.images && blog?.images[0] && (
              <div className="flex justify-center mb-8">
                <img
                  src={blog?.images[0]}
                  alt={blog?.title}
                  className="w-full md:w-2/3 lg:w-1/2 h-80 object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            <div className="prose max-w-none mx-auto text-gray-700 leading-loose">
              {blog?.content}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </form>
        )}
      </div>
      
    </>
  );
};

export default BlogPost;

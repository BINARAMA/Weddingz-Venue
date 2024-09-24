// src/pages/BlogList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllBlogsQuery } from '../redux/api/blog';
import SkeletonBlogCard from '../components/skeleton/Blog';
import { Blog } from '../types/types';

const RelatedArticles: React.FC = () => {
  const { data: blogData, error, isLoading } = useGetAllBlogsQuery('');
  const blogs: any = blogData?.data.blog || [];

  const errorMessageBlogs = error
    ? 'status' in error
      ? `Error: ${error} - ${JSON.stringify(error)}` 
      : error.message
    : null;

  if (error) {      
    return <h1>Error while loading data</h1>;
  }

  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-4xl text-gray-900 font-bold text-center mb-10">Latest Blog Posts</h2>
      {isLoading ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlogCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{errorMessageBlogs}</div>
      ) : blogs.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.slice(0, 4).map((blog: Blog) => {
            const imageUrl = Array.isArray(blog.images) ? blog.images : blog.images || '/default-image.jpg';
            const contentPreview = blog.content ? blog.content.substring(0, 100) : 'No content available';
            return (
              <div key={blog._id} className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                <img src={imageUrl[0]} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{contentPreview}...</p>
                  <Link to={`/blogs/${blog._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blogs available</p>
      )}
    </div>
  );
};

export default RelatedArticles;

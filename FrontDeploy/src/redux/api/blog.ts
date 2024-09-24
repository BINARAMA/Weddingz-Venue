import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogResponse , AllBlogResponse } from "../../types/api-types";

const server = import.meta.env.VITE_API_Server;

export const blogAPI = createApi({
  reducerPath: "blogAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/blog/`,
  }),
  endpoints: (builder) => ({
    getBlogById: builder.query<BlogResponse, string>({
      query: (blogId) => ({
        url: `${blogId}`,
        method: "GET",
      }),
    }),

    getAllBlogs: builder.query<AllBlogResponse, string>({
      query: () => "all/blog"
    }),
    
    addBlog: builder.mutation<BlogResponse, FormData>({
      query: (blogFormData) => ({
        url: '/add',
        method: 'POST',
        body: blogFormData,
      }),

      
    }),

    updateBlog: builder.mutation<BlogResponse, { id: string, blogFormData: FormData }>({
      query: ({ id, blogFormData }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: blogFormData,
      }),
    }),

    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    })
  }),
});

export const { useGetBlogByIdQuery, useGetAllBlogsQuery, useAddBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogAPI;

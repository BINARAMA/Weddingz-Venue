import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllVendorsResponse,
  MessageResponse,
  VendorResponse,
  LoggdInVendorResponse
} from "../../types/api-types.ts";
import { Vendor } from "../../types/types.ts";

const server = import.meta.env.VITE_API_Server;

export const vendorAPI = createApi({
  reducerPath: "vendorAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/vendor/`,
  }),
  tagTypes: ["vendors","vendor"],
  endpoints: (builder) => ({
    allVendor: builder.query<AllVendorsResponse, string>({
      query: () => "all",
      providesTags: ["vendors"],
    }),

    // Define endpoint for fetching a single vendor
    getVendorById: builder.query<VendorResponse, string>({
      query: (id: string | undefined) => `${id}`,
      providesTags: ["vendor"],

    }),

    signup: builder.mutation<VendorResponse, Vendor>({
      query: (vendor) => ({
        url: "register",
        method: "POST",
        body: vendor,
      }),
      invalidatesTags: ["vendors"],
    }),

    loginVendor: builder.mutation<LoggdInVendorResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["vendors"],
    }),
    updateVendor: builder.mutation<MessageResponse, { vendorId: string, formData: any}>({
      query: ({ vendorId, formData }) => ({
        url: `${vendorId}`, // Assuming your update route is like 'http://localhost:8000/api/v1/vendor/:id'
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["vendors"],
    }),

  

    
    getVendorByType: builder.query<VendorResponse, string>({
      query: (typeOfBusiness: string) => ({
        url: `/category/${typeOfBusiness}`, // Adjust endpoint URL as needed
      }),
      providesTags: ["vendor"],
    }),

    deleteVendorById: builder.mutation<VendorResponse, string>({
      query: (id: string | undefined) => ({
        url:`${id}`,
        method: 'DELETE'
      })
    }),

  }),
});

// Export the hook from the vendorAPI object
export const {useAllVendorQuery , useSignupMutation ,  useLoginVendorMutation,  useGetVendorByIdQuery, useUpdateVendorMutation, useGetVendorByTypeQuery, useDeleteVendorByIdMutation} = vendorAPI;
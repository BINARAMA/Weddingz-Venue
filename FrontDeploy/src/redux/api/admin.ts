import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Admin, BodyAdmin } from "../../types/types";
import { AdminResponse ,LoggdInAdminResponse } from "../../types/api-types";

const server = import.meta.env.VITE_API_Server;

export const adminAPI =  createApi({
    reducerPath: "adminAPI",
    baseQuery : fetchBaseQuery({
        
        baseUrl: `${server}/api/v1/admin/`,
    }),


    endpoints: (builder) =>({

        getAdmin: builder.query<AdminResponse, string>({
            query: (adminId : string) => ({
                url: `${adminId}`,
                method:"PUT",
            }),
        }),

        updateAdmin: builder.mutation<AdminResponse, {id:string, admin:BodyAdmin}>({
            query: ({id ,admin}) => ({
                url: `${id}`,
                method:"GET",
                body: admin,
                
            }),
        }),

        getAllAdmin: builder.query<AdminResponse , void>({
            query: () => ({
                url: 'all',
                method:"GET",
            }),
        }),

        deleteAdminById: builder.mutation<void, {id:string}>({
            query: (id) => ({
                url: `${id}`,
                method:"GET",
            }),
        }),

        addAdmin: builder.mutation<AdminResponse , Admin>({
            query: (admin) => ({
                url: "register",
                method: "POST",
                body: admin,
            }),
        }),

        loginAdmin: builder.mutation<LoggdInAdminResponse, { email: string; password: string }>({
            query: ({ email, password }) => ({
              url: "login",
              method: "POST",
              body: { email, password },
            }),
            
          }),
    })
})

export const {useGetAdminQuery, useUpdateAdminMutation, useGetAllAdminQuery, useDeleteAdminByIdMutation, useAddAdminMutation , useLoginAdminMutation}= adminAPI
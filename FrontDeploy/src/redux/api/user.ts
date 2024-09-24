import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { UserResponse , LoggdInUserResponse , AllUserResponse , CitiesResponse} from "../../types/api-types";

const server = import.meta.env.VITE_API_Server;
export const userAPI =  createApi({
    reducerPath: "userAPI",
    baseQuery : fetchBaseQuery({
        baseUrl: `${server}/api/v1/user/`,
    }),
    tagTypes: ["user"],

    endpoints: (builder) =>({

        signup: builder.mutation<UserResponse, User>({
            query: (User) => ({
              url: "register",
              method: "POST",
              body: User,
            }),
            invalidatesTags: ["user"],
          }),
      
          loginUser: builder.mutation<LoggdInUserResponse, { email: string; password: string }>({
            query: ({ email, password }) => ({
              url: "login",
              method: "POST",
              body: { email, password },
            }),
            invalidatesTags: ["user"],
          }),

        getUser: builder.query<UserResponse, string>({
            query: (userId : string) => ({
                url: `${userId}`,
                method:"GET",
            }),
        }),

        updateUser: builder.mutation<User, {id:string, user:User}>({
            query: ({id ,user}) => ({
                url: `${id}`,
                method:"PUT",
                body: user,
            }),
        }),

        getAllUser: builder.query<AllUserResponse, void>({
            query: () => ({
                url: "ALL",
                method:"GET",
            }),
        }),

        deleteUser: builder.mutation<void, string>({
            query: (userId : string) => ({
                url: `${userId}`,
                method:"DELETE",
            }),
        }),

        getAllCities: builder.query<CitiesResponse, void>({
            query: () => ({
                url: "all/city",
                method:"GET",
            }),
        }),
    })
})

export const { useGetAllUserQuery, useDeleteUserMutation ,useGetUserQuery,useUpdateUserMutation , useLoginUserMutation , useSignupMutation , useGetAllCitiesQuery}= userAPI



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { User } from "../../types/types";
// import { UserResponse } from "../../types/api-types";

// export const userAPI =  createApi({
//     reducerPath: "userAPI",
//     baseQuery : fetchBaseQuery({
//         baseUrl: 'http://localhost:8000/api/v1/user/',
//     }),


//     endpoints: (builder) =>({

//         getUser: builder.query<UserResponse, string>({
//             query: (userId) => ({
//                 url: `${userId}`,
//                 method:"GET",
//             }),
//         }),
//     })
// })
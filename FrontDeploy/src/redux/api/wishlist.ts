import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { wishlistResponse } from "../../types/api-types";

const server = import.meta.env.VITE_API_Server;

export const wishlistAPI = createApi({
    reducerPath: "wishlistAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/wishlist/`,
    }),
    endpoints: (builder) => ({

        addWishlist: builder.mutation<wishlistResponse, { userId: string, itemId: string, itemType: string }>({
            query: ({ userId, itemId, itemType }) => ({
                url: "/add",
                method: "POST",
                body: { userId, itemId, itemType },
            }),
        }),

        deleteWishlist: builder.mutation<wishlistResponse, { userId: string, itemId: string, itemType: string }>({
            query: ({ userId, itemId, itemType }) => ({
                url: "/remove",
                method: "DELETE",
                body: { userId, itemId, itemType },
            }),
        }),

        getWishlist: builder.query<wishlistResponse, string>({
            query: (userId) => ({
                url: `${userId}`,
                method: "GET",
            }),
        }),


    })

})

export const { useAddWishlistMutation, useDeleteWishlistMutation, useGetWishlistQuery} = wishlistAPI
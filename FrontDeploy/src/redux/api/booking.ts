import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookingResponse, NotificationtResponse } from "../../types/api-types";
import {  Bookings } from "../../types/types";

const server = import.meta.env.VITE_API_Server;
export const bookingAPI = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/v1/bookings/`,
  }),

  endpoints: (builder) => ({
    addBookingEnquiry: builder.mutation<
      BookingResponse,Bookings>({
      query: (booking) => ({
        url: "bookings",
        method: "GET",
        body: booking,
      }),
    }),

    getBookingByUserAndVenue: builder.query<
      BookingResponse,
      { vId: string; uId: string }
    >({
      query: ({ vId, uId }) => ({
        url: `/bookings/${vId}`,
        method: "POST",
        params: {uId}
      }),
    }),


    getBookingbyId: builder.query< Bookings[],
    { vId: string }
  >({
    query: ({ vId }) => ({
      url: `${vId}`,
      method: "GET",
      // params: {uId}
    }),
  }),

//     getNotificationById: builder.query<NotificationtResponse, { vId: string }>({
//       query: ({ vId }) => ({
//         url: `${vId}`,
//         method: "GET",
//       }),
//     }),

    updateIsVerified: builder.mutation<
      void,
      {  vId: string, uId: string, bookingId: string }
    >({
      query: ({ vId, uId, bookingId }) => ({
        url: `${vId}`,
        method: "PATCH",
        body: { uId, bookingId },
      }),
    }),

    getNotificationIdStatus: builder.query<NotificationtResponse, {nId: string, vId: string}>({
      query: ({nId, vId}) => ({
      url: `notif/${nId}`,
      method:'GET',
      params: {vId}
    }),
  }),

//   getAllNotificationByVId: builder.query<NotificationtResponse,{vId:string}>({
//     query: ({vId}) => ({
//       url: `notification/${vId}`,
//       method:'GET',
//   }),
//   }),

})
});

export const { useAddBookingEnquiryMutation, useGetBookingByUserAndVenueQuery, useGetBookingbyIdQuery, useUpdateIsVerifiedMutation } = bookingAPI;
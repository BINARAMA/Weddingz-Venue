import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NotificationtResponse, wishlistResponse } from "../../types/api-types";

const server = import.meta.env.VITE_API_Server;
export const notificationApi = createApi({
  reducerPath: "NotificationApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:8000/api/v1/notification/",
    baseUrl: `${server}/api/v1/notification/`
  }),

  endpoints: (builder) => ({
    addNotification: builder.mutation<
      wishlistResponse,
      { userId: string; city: string; flag: string }
>({
      query: ({ userId, city }) => ({
        url: "add",
        method: "POST",
        body: { userId, city },
      }),
    }),

    getNotificationById: builder.query<NotificationtResponse, { vId: string }>({
      query: ({ vId }) => ({
        url: `${vId}`,
        method: "GET",
      }),
    }),

    updateNotification: builder.mutation<
      void,
      { nId: string, vId: string }
    >({
      query: ({ nId, vId }) => ({
        url: 'update',
        method: "PATCH",
        body: { vId, nId },
      }),
    }),

    getNotificationIdStatus: builder.query<NotificationtResponse, {nId: string, vId: string}>({
      query: ({nId, vId}) => ({
      url: `notif/${nId}`,
      method:'GET',
      params: {vId}
    }),
  }),

  getAllNotificationByVId: builder.query<NotificationtResponse,{vId:string}>({
    query: ({vId}) => ({
      url: `notification/${vId}`,
      method:'GET',
  }),
  }),

})
});

export const {useAddNotificationMutation, useGetNotificationByIdQuery, useUpdateNotificationMutation, useGetNotificationIdStatusQuery, useGetAllNotificationByVIdQuery} = notificationApi
// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { vendorAPI } from "./api/vendor.ts";
import { VenueAPI } from "./api/venue.ts";
import { wishlistAPI } from "./api/wishlist.ts";
import {userAPI } from "./api/user.ts";
import userReducer from "./reducer/auth.ts";
import authReducer from "./reducer/auth.ts";


import { adminAPI } from "./api/admin.ts";
import { blogAPI } from "./api/blog.ts";
import { notificationApi } from "./api/notification.ts";
import { realWeddingsAPI } from "./api/realWeddings.ts";
import { bookingAPI } from "./api/booking.ts";
import { enquiryAPI } from "./api/enquiry.ts";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    user: userReducer,
    auth: authReducer,
    [adminAPI.reducerPath]: adminAPI.reducer,
    [blogAPI.reducerPath]:blogAPI.reducer,
    [realWeddingsAPI.reducerPath]:realWeddingsAPI.reducer,
    [notificationApi.reducerPath]:notificationApi.reducer,
    [bookingAPI.reducerPath]:bookingAPI.reducer,
    [enquiryAPI.reducerPath]:enquiryAPI.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( userAPI.middleware, adminAPI.middleware, blogAPI.middleware, notificationApi.middleware,realWeddingsAPI.middleware,bookingAPI.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;
import {Admin, User, Vendor, Venue, Blog, Notification, RealWeddings, wishlist , BodyAdmin , Bookings , Enquiry} from "./types.ts"


export type AllVendorsResponse = {
    success: boolean;
    statusCode: number;
    message:string;
    auth:string;
    data: {
      vendors: Vendor[];
    };
  };


export type MessageResponse = {
  success: boolean;
  message: string;
  data:{
    vendor: Vendor;
  }
  

};

export type VendorResponse = {

    success: boolean;
    statusCode: number;
    message:string;
    data: {
      vendor: Vendor;
    };
}

export type LoggdInVendorResponse = {

  success: boolean;
  statusCode: number;
  message:string;
  data: {
    loggedInVendor: Vendor;
  };
}


export type LoggdInVenueResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    loggedInVenue: Venue;
  };
}


export type VenueResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    venue: Venue;
  };
}

// export type AllVenuesResponse = {
//   success: boolean;
//   statusCode: number;
//   message:string;
//   data: {
//     venues: Venue[];

//   };
// };

export type AllVenuesResponse = {
  success: boolean;
  message:string;
  statusCode: number;
  data: Venue[];

};

export type AllTopVenueResponse = {
  success: boolean;
  message:string;
  statusCode: number;
  data :Venue[];
  
};

export type wishlistResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  wishlist:wishlist;
}

export type UserResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    user: User;
  };
}



export type LoggdInUserResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    loggedInUser: User;
  };
}


export type AllUserResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    users: User[];
  };
}



export type AdminResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  profile: BodyAdmin
  data: {
    profile: Admin[];
  };
}

export type SingleAdminResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    admin: Admin;
  };
}

export type LoggdInAdminResponse = {
  success: boolean;
  profile:string;
  statusCode: number;
  message:string;
  data: {
    loggedInAdmin: Admin;
  };
}


  export type BlogResponse = {
    success: boolean;
    statusCode: number;
    message:string;
    data: {
      blog: Blog;
    };
}

export type AllBlogResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    blog: Blog[];
  };
}


export type RealWeddingsResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    realWeddings:RealWeddings;
  };
}

export type AllRealWeddingsResponse = {
  success: boolean;
  statusCode: number;
  message:string;
  data: {
    realWeddings:RealWeddings[];
  };
}

export type NotificationtResponse = {
  users:string[];
  status:string[];
  success: boolean;
  statusCode: number;
  message:string;
  data: Notification[]
}

export type BookingResponse= {
  users:string[];
  status:string[];
  success: boolean;
  statusCode: number;
  message:string;
  bookingId:string;
  data: Bookings[]
}


export type CitiesResponse = {
  cities: string[];
};

export type EnquiryResponse= {

  message:string;
  data: Enquiry;
}

export type AllEnquiryResponse= {

  message:string;
  data: Enquiry[];
}

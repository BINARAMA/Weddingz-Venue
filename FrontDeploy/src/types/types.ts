
export type Vendor = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  businessName?: string;
  type_Of_Business?: string;
  packages?: {
    name?: string;
    days?: string;
    price?: string;
    minAdvance?: string;
  };
  portfolio?: string[];
  experience?: string;
  event_completed?: number;
  willingToTravel?: boolean;
  isVerified?: 'Approved' | 'Rejected' | 'Pending';
  usp?: string;
  summary?: string;
  bookingPolicy?: string;
  cancellationPolicy?: string;
  termAndConditions?: string;
  review?: string;
};

//venue type

export interface Venue {
  _id?:string;
  yourName?: string;
  businessName?: string;
  email?: string;
  password?: string;
  rank?: number;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  comment?: string;
  guestCapacity?: string;
  images?: string[];
  description?: string;
  about?: string;
  howToReach?: string;
  venueExpertNotes?: string;
  featuresOfVenue?: string;
  venuePolicies?: string;
  isVerified?: 'Approved' | 'Rejected' | 'Pending';
  summary?: string;
  review?: string; // Assuming review and foodPackages are stored as string IDs
  foodPackages?: string;
  venueType?: string[];
  facilities?: string[];
  isPasswordCorrect?(password: string | Buffer): Promise<boolean>;

}


export interface wishlist{
  userId?: string,
  itemId?: string,
  itemType?:string,
  wishlist?:string,
  items?:any[],
}

export interface User{
  _id?:string;
  role?:string;
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  city?: string;
  avatarUrl?: string
}


export interface Admin{
 profile?:{
 
    name?: string;
    email?: string;
    password?: string;
    contact?: string;
    address?: string;
    city?: string;
 },
 _id?: string;
 
}

export interface BodyAdmin{
 
  name?: string;
  email?: string;
  password?: string;
  contact?: string;
  address?: string;
  city?: string;
}

export interface Blog{
  _id?:string
  title?: string;
  createdAt?: string;
  images?: string[];
  content?: string;
  author?: string;
  category?: string;
}

export interface RealWeddings{
  _id:string
  title?: string;
  images?: string[];
  content?: string;
  author?: string;
  category?: string;
  organizerName?: string;
  createdAt?: any;
}

export interface Notification{
  _id:string;
  name?: string;
  email?: string;
  contact?: string;
  address?: string;
  city?: string;
 }

 export interface Filter{
  city?:string
  foodPackage?:string
  facilities?:string
  venueType?:string
  maxGuests?:string
  minGuests?:string
 }

 export interface Bookings{
  uId?: string;
  vId?: string;
  name?: string;
  contact?: number;
  location?: string;
  guests?: string;
  date?: Date;
  address?: string;
  message?: string;
  typeOfEvent?: string;
  bookingId?: string;   
  isVerified?: 'Approved' | 'Rejected' | 'Pending';
 }


 export interface Enquiry{
  _id?:string
  name?: string;
  contact?: string;
  location?: string;
  guests?: string;
  date?: string;
  address?: string;
  message?: string;
  isRead?:boolean;
  typeOfEvent?: string;
}

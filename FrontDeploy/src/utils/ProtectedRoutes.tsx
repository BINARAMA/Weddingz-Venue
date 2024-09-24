import { Outlet , Navigate } from "react-router-dom";

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';



export const AdminProtectedRoutes = () =>{
    const admin =  useSelector((state: RootState) => state?.auth?.user?.role);
    
    
    return admin === "admin" ? <Outlet/> : <Navigate to = "/login"/>
}

export const VendorProtectedRoutes = () =>{
    const vendor =  useSelector((state: RootState) => state?.auth?.user?.role);

     
    return vendor === "vendor" ? <Outlet/> : <Navigate to = "/login"/>
}

export const VenueProtectedRoutes = () =>{
    const venue =  useSelector((state: RootState) => state?.auth?.user?.role);

     
    return venue === "venue" ? <Outlet/> : <Navigate to = "/login"/>
}

export const UserProtectedRoutes = () =>{
    const user =  useSelector((state: RootState) => state?.auth?.user?.role);

     
    return user === "user" ? <Outlet/> : <Navigate to = "/login"/>
}
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
// import { useUpdateVendorMutation } from '../redux/api/vendor';
// import { useGetVenueByIdQuery } from '../redux/api/venue';
import UserSidebar from '../components/UserSidebar';
import UserTabView from '../components/UserTabView';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetUserQuery } from '../redux/api/user';




const VenueProfilePage = () => {

    const userId = useSelector((state: RootState) => state?.auth?.user?._id);
   // console.log("user" , userId)


  const { data: user} = useGetUserQuery(userId || "");
  //console.log("checking the data",user)
    
    const userData = user?.data?.user;
  //  console.log(userData);



    return (
        <>
            <NavBar />
            <div className='flex '>
            <div className=" flex-col-1 justify-start border-2 border-white">
                    <div className="w-80">
                        <UserSidebar
                            yourName={userData?.fullName}
                            phone={userData?.phone}
                            email={userData?.email}
                            id={userId}
                        />
                    </div>
                </div>

                <div className="flex-col-1 justify-center text-white bg-blue-900 p-4 w-full border-2 border-white ">
                    <UserTabView />
                </div>

            </div>
            <Footer />
        </>
    );
};

export default VenueProfilePage;

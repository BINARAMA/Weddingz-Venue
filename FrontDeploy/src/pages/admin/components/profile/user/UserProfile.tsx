import NavBar from "../../baar/navbar";
import UserSidebar from "./components/UserSidebar";
import UserTabView from "./components/UserTabView";
import { useGetUserQuery } from "../../../../../redux/api/user";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
 // console.log("idddd", id);
 
  const { data: user } = useGetUserQuery(id || "");
 // console.log("checking the data", user);

  if (!id) {
    // Handle the case where id is undefined
    return <div>Loading...</div>; // Or any other handling
  }


  const userData = user?.data?.user;
 // console.log(userData);

  return (
    <>
      <NavBar/>
      <div className="flex  h-full bg-blue-900 ">
        <div className=" flex-col-1 justify-start border-2 border-white">
          <div className="w-80">
            <UserSidebar
              yourName={userData?.fullName}
              phone={userData?.phone}
              email={userData?.email}
            />
          </div>
        </div>

        <div className="flex-col-1 justify-center text-white bg-blue-900 p-4 w-full border-2 border-white ">
          <UserTabView/>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

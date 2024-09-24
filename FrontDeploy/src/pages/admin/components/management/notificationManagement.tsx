
import { useEffect, useState } from "react";
import { useAllEnquiriesQuery , useUpdateEnquiryMutation } from "../../../../redux/api/enquiry";


const NotificationManagement = () => {

  // const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger]=useState(false);


  const {data, refetch} = useAllEnquiriesQuery();

  console.log("otpppp", data);

  const [updateNotification ] = useUpdateEnquiryMutation()
 
  
  useEffect(() => {
    if (reloadTrigger) {
      refetch();
      setReloadTrigger(false);
    }
    

  }, [reloadTrigger, refetch]);

  const handleMarkAsRead = async (notificationId: string) => {
    console.log("hellooooo", notificationId)
    try {
        await updateNotification( {id : notificationId} );
     setReloadTrigger(true);
    } catch (error) {
        console.error("Error marking notification as read:", error);
    }
}

 

  return (
    <>
      {/* <NavBar /> */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((user: any, index: number) => (
          <div key={index} className={`p-4 m-4 border border-gray-200 rounded shadow-md ${user.isRead == true  ? 'bg-gray-100' : ''}`}>

            <div className="mb-4">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-gray-500">{user.address}</p>
            </div>
            <div className="mb-2">
              <p className="text-gray-600">Contact: {user.contact}</p>
              <p className="text-gray-600">Guest: {user.guests}</p>
              <p className="text-gray-600">Location: {user.location}</p>
              <p className="text-gray-600">Message: {user.message}</p>
            </div>
            <button
                        onClick={() => handleMarkAsRead(user._id)}
                        className={`font-bold py-2 px-4 rounded ${user.isRead == true  ? 'bg-green-500 hover:bg-green-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                    >
                        {/* {notificationStatus[index] === 'read' ? 'Marked as Read' : 'Mark as Read' }!! {readUsers.includes(user.notificationId) ? 'Marked as Read' : 'Mark as Read'} */}
                        {user.isRead == true ? 'Marked as Read' : 'Mark as read' }
                    </button>

           
                 
      </div>
        ))}
      </div>
      
    </>
  );
};

export default NotificationManagement;

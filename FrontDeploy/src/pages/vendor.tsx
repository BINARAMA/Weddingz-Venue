import { useState, useEffect } from "react";
import { useAllVendorQuery } from "../redux/api/vendor.ts";
import type { Vendor } from "../types/types.ts";
//import type {AllVendorsResponse} from "../types/api-types.ts"

function Vendor() {


  
  const { data, error, isLoading } = useAllVendorQuery("");
  const [allvendors, setAllVendors] = useState<Vendor[]>([]);

  

  // const responseData: AllVendorsResponse = {
  //   statusCode: 200,
  //   data: {
  //     vendors: []
  //   },
  //   message: "here are all vendors.",
  //   success: true
  // };



  //const vendors: Vendor[] = responseData.data.vendors;


  useEffect(() => {
    if (data) {
      // Set the vendors array from the data object
      setAllVendors(data.data.vendors);
    }
  }, [data]);

 

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching vendors</div>
      ) : (
        <div>
          <h1>Vendors</h1>
          <ul>
            {allvendors.map((vendor) => (
              <li key={vendor._id}>
                <h2>{vendor.name}</h2>
                <p>Email: {vendor.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Vendor;

import React, { useState, useEffect } from "react";
import MetaService from "../../Services/MetaServices/MetaService";
import HeadingName from "../HeadingName/HeadingName";

const CareerData = React.lazy(() => import("./CareerData"));

export default function Career() {
  const metaService = new MetaService();
  const [data, setData] = useState([]);
 
  const [search, setSearch] = useState({
    start: 0,
    perPage: 3,
  });

  useEffect(() => {
    ListApi();
  }, [search]);

  const apiCall = async (limit, offset) => {
    try {
      let response = await metaService.joblist(limit, offset);
      if (response) {
        setData(response.data);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  const ListApi = async () => {
    await apiCall(search.perPage, search.start);
  };


  return (
    <>
    <HeadingName
                name="Career"
                home="Home"
                heading="Career"
            />
             <React.Suspense fallback="">
             <CareerData data={data}/>
            </React.Suspense>
    
    </>
  );
}

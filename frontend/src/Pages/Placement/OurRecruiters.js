import React, { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaService from "../../Services/MetaServices/MetaService";
import HeadingName from "../HeadingName/HeadingName";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";

export default function OurRecruiters() {
  const metaService = new MetaService();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 24,
  });

  useEffect(() => {
    ListApi();
  }, [search]);

  const apiCall = async (limit, offset) => {
    try {
      let response = await metaService.recruitlist(limit, offset);
      if (response) {
        setData(response.data);
        setTotalCount(response.count);
        setTotalPages(response.count / 12);
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
      <HeadingName name="Our Recruiters" home="Home" heading="Our Recruiters" />

      <div className="eduvibe-about-three-mission edu-mission-vision-area edu-section-gap border-bottom-1 bg-color-white">
        <div className="container">
          <div className="row">
            {data?.length > 0 &&
              data.map((v, i) => (
                <div
                  className="col-lg-2 col-md-4 col-sm-12 text-center mb--20"
                  key={i}
                >
                  <LazyLoadImage loading="lazy" src={v.image} alt="IBM"
                    height="100%"
                    width="100%" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <LetUsHelp />
    </>
  );
}

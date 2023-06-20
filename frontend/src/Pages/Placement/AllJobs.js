import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import MetaService from "../../Services/MetaServices/MetaService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";

const JobApply = React.lazy(() =>
  import("./JobApply")
);
export default function AllJobs() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const metaService = new MetaService();
  const [data, setData] = useState([]);
  const [active, setActive] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
  });

  useEffect(() => {
    window.scroll(0, 0);
    ListApi();
  }, [search.perPage]);

  const apiCall = async (limit, offset) => {
    try {
      let response = await metaService.joblist(limit, offset);
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

  const activeHandler = (id) => {
    setActive({ [id]: true });
  };
  const loadMoreData = () => {
    setSearch({ ...search, perPage: search.perPage + 6 });
  };

  return (
    <>
    <HeadingName name="All Jobs" home="Home" heading="All Jobs" />

      <div className="eduvibe-about-three-mission edu-mission-vision-area edu-section-gap border-bottom-1 bg-color-white">
        <div className="container">
          <div className="row align-items-center">
            {data?.length > 0 &&
              data.map((v, i) => (
                <div className="col-lg-4" key={i}>
                  <div className="edu-blog blog-type-1 radius-small mt--20">
                    <div className="inner">
                      <div className="content">
                        <h6 className="title leading-tight1">
                          <Link to={`/job-detail/${v.id}`}>{v.title}</Link>
                        </h6>
                        <ul className="blog-meta justify-content-between">
                          <li>
                            <i className="ri-briefcase-line"></i>
                            {v.experience}
                          </li>
                          <li>
                            ₹ {v.is_salary == 0 ? "Not Disclosed" : v.salary}
                          </li>
                          <li>
                            <i className="ri-map-pin-line"></i>
                            {v?.location}
                          </li>
                          <li>
                            <i className="icon-calendar-2-line"></i>
                            {moment(v.created_at).format("LL")}
                          </li>
                        </ul>
                        <p
                          className="mb--10 ssdn-height-job"
                          dangerouslySetInnerHTML={{ __html: v.skills }}
                        />

                        <div
                          className="card-bottom d-flex align-items-center justify-content-between pt--10"
                          style={{
                            borderTop: "1px solid rgba(45, 40, 78, 0.07)",
                          }}
                        >
                            <Link
                              className="edu-btn btn-bg-alt text-center me-2"
                              to="#"
                              onClick={() => activeHandler(i)}
                            >
                              Apply Now
                            </Link>
                          {active[i] && (
                              <React.Suspense fallback="">
                              <JobApply
                              id={i}
                              active={active}
                              setActive={setActive}
                              jobId={v.id}
                            />
                            </React.Suspense>
                          
                          )}

                            <Link
                              className="btn-transparent"
                              to={`/job-detail/${v.id}`} rel="nofollow"
                            >
                              Read More
                            </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {totalCount !== data.length && (
          <div className="row">
            <div className="col-md-12 text-center mt--10">
                <button className="edu-btn" onClick={loadMoreData}>
                  Load More
                </button>
            </div>
          </div>
        )}
      </div>

      <LetUsHelp />
    </>
  );
}

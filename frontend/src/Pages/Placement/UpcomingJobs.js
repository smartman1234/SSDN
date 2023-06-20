import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import MetaService from "../../Services/MetaServices/MetaService";

const JobApply = React.lazy(() =>
  import("./JobApply")
);

export default function UpcomingJobs() {
  const metaService = new MetaService();
  const [data, setData] = useState([]);
  const [active, setActive] = useState({});
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

  const activeHandler = (id) => {
    setActive({ [id]: true });
  };

  return (
    <div className="edu-section-gap bg-image">
      <div className="container eduvibe-animated-shape">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="pre-title">Jobs for our students</span>
              <h3 className="title">Upcoming Job Openings</h3>
            </div>
          </div>
        </div>
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
                      <strong>Skills:</strong>

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
                          to={`/job-detail/${v.id}`}
                          rel="nofollow"
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
        <div className="row">
          <div className="col-md-12 text-center mt--10">
            <Link className="edu-btn" to="/all-jobs">
              Load More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

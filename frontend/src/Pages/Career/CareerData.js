import React, { useState } from "react";
import { Link } from "react-router-dom";
import JobApply from "../Placement/JobApply";
import ShowMoreText from "react-show-more-text";

export default function CareerData({ data }) {
  const [active, setActive] = useState({});
  const activeHandler = (id) => {
    setActive({ [id]: true });
  };
  const executeOnClick = (isExpanded) => {};
  const dated = (time) => {
    let d = time?.split(" ");
    return d?.[0];
  };
  return (
    <div className="edu-section-gap bg-image">
      <div className="container eduvibe-animated-shape">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="pre-title">Jobs for our students</span>
              <h3 className="title">Job Openings</h3>
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
                      <h6 className="title">
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
                      </ul>
                      <ul className="blog-meta justify-content-between">
                        <li>
                          <i className="ri-map-pin-line"></i>
                          {v?.location}
                        </li>
                        <li>
                          <i className="ri-calendar-2-line"></i>
                          {dated(v.created_at)}
                        </li>
                      </ul>
                      <strong>Skills:</strong>
                      <ShowMoreText
                        lines={4}
                        more="Show more"
                        less="Show less"
                        className="content-css mb-5"
                        anchorclassName="show-more-less-clickable"
                        onClick={executeOnClick}
                        expanded={false}
                        truncatedEndingComponent={"..."}
                      >
                        <p
                          className="ssdn-editor-font1 mb-10"
                          dangerouslySetInnerHTML={{ __html: v.skills }}
                        />
                      </ShowMoreText>

                      <div
                        className="card-bottom d-flex align-items-center justify-content-between pt--10"
                        style={{
                          borderTop: "1px solid rgba(45, 40, 78, 0.07)",
                        }}
                      >
                        <div
                          className="read-more-btn"
                          onClick={() => activeHandler(i)}
                        >
                          <Link
                            className="edu-btn btn-bg-alt text-center me-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal1"
                          >
                            Apply Now
                          </Link>
                        </div>
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
        <div className="row">
          <div className="col-md-12 text-center mt-5">
              <Link className="edu-btn" to="/all-jobs">
                Load More
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { ShareSocial } from "react-share-social";
import MetaService from "../../Services/MetaServices/MetaService";
import HeadingName from "../HeadingName/HeadingName";

const JobApply = React.lazy(() =>
  import("./JobApply")
);

export default function JobDetail() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const metaService = new MetaService();
  const [data, setData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    ListApi();
  }, []);

  const ListApi = async () => {
    try {
      let response = await metaService.jobdetail(params.id);
      if (response) {
        setData(response.data);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
  const style = {
    copyContainer: {
      display: "none",
    },
    root: {
      border: 0,
      padding: 0,
    },
    title: {
      color: "aquamarine",
      fontStyle: "italic",
    },
  };
  return (
    <>
    <HeadingName name={data?.title} home="Home" heading={data?.title} />
    
      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat ">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-md-8">
              <div className="card mt-0">
                <div className="card-body">
                  <strong>Skills:</strong>
                  <p
                    className="mb--10"
                    dangerouslySetInnerHTML={{ __html: data?.skills }}
                  />
                  <strong>Description:</strong>
                  <div
                    className="edu-accordion-body"
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="eduvibe-sidebar course-details-sidebar">
                <div className="inner">
                  <div className="eduvibe-widget">
                    <div className="eduvibe-widget-details mt--35">
                      <div className="widget-content">
                        <ul>
                          <li>
                            <i className="ri-briefcase-line"></i>
                            {data?.experience}
                          </li>
                          <li>
                            <i className="ri-briefcase-line"></i>
                            {data?.is_salary == 0
                              ? "Not Disclosed"
                              : data?.salary}
                          </li>
                          <li>
                            <i className="ri-map-pin-line"></i> {data?.location}
                          </li>
                          <li>
                            <i className="icon-calendar-2-line"></i>{" "}
                            {moment(data?.created_at).format("LL")}
                          </li>
                        </ul>

                        <div
                          className="read-more-btn text-center mt--45"
                          onClick={() => setOpen(true)}
                        >
                          <Link
                            className="edu-btn btn-bg-alt text-center me-2"
                            to="#"
                          >
                            Apply Now
                          </Link>
                        </div>
                        {open && (
                         <React.Suspense fallback="">
                          <JobApply
                            open={open}
                            setOpen={setOpen}
                            jobId={data.id}
                          />
                       </React.Suspense>
                        
                        )}
                        <div className="read-more-btn mt--0 text-center">
                          <div className="eduvibe-post-share">
                            <span>Share: </span>
                            <div>
                              <ShareSocial
                                url={window.location.href}
                                socialTypes={[
                                  "facebook",
                                  "twitter",
                                  "linkedin",
                                ]}
                                style={style}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

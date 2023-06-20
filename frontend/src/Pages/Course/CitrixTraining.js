import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CitrixTrainingParts = React.lazy(() => import("./CitrixTrainingParts"));

const CourseDetailUpComingBatches = React.lazy(() =>
  import("./CourseDetailUpComingBatches")
);

export default function CitrixTraining({
  detailData,
  setCourseEnquiry,
  upcomimgBatches,
}) {
  const [active, setActive] = useState(0);

  const activehandler = (id) => {
    setActive(id);
  };

  return (
    <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap  ">
      <div className="container eduvibe-animated-shape">
        <div className="col-lg-12">
          <div className="section-title text-start">
            <h4 className="title">
              {detailData?.city_name
                ? detailData?.about_title?.replaceAll(
                    "{{in VARCITY}}",
                    detailData?.city_name
                  )
                : detailData?.about_title?.replaceAll("{{in VARCITY}}", "")}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="course-content">
              <p
                className="ssdn-editor-font"
                dangerouslySetInnerHTML={{
                  __html: detailData?.city_name
                    ? detailData?.about?.replaceAll(
                        "{{in VARCITY}}",
                        detailData?.city_name
                      )
                    : detailData?.about?.replaceAll("{{in VARCITY}}", ""),
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12" id="Project">
          <div className="section-title text-start">
            <h3 className="title">
              {detailData?.city_name
                ? detailData?.project_title?.replaceAll(
                    "{{in VARCITY}}",
                    detailData?.city_name
                  )
                : detailData?.project_title?.replaceAll("{{in VARCITY}}", "")}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="course-content mt--10">
              <p
                className="ssdn-editor-font"
                dangerouslySetInnerHTML={{
                  __html: detailData?.city_name
                    ? detailData?.project.replaceAll(
                        "{{in VARCITY}}",
                        detailData?.city_name
                      )
                    : detailData?.project?.replaceAll("{{in VARCITY}}", ""),
                }}
              />
            </div>

            <ul className="edu-course-tab nav nav-tabs justify-content-start">
              <li className="nav-item">
                <button
                  className={active === 0 ? "nav-link active" : "nav-link"}
                  type="button"
                  onClick={() => activehandler(0)}
                >
                  {detailData?.city_name
                    ? detailData?.project_what_will_get_title?.replaceAll(
                        "{{in VARCITY}}",
                        detailData?.city_name
                      )
                    : detailData?.project_what_will_get_title?.replaceAll(
                        "{{in VARCITY}}",
                        ""
                      )}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={active === 1 ? "nav-link active" : "nav-link"}
                  type="button"
                  onClick={() => activehandler(1)}
                >
                  {detailData?.city_name
                    ? detailData?.project_pre_request_title?.replaceAll(
                        "{{in VARCITY}}",
                        detailData?.city_name
                      )
                    : detailData?.project_pre_request_title?.replaceAll(
                        "{{in VARCITY}}",
                        ""
                      )}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={active === 2 ? "nav-link active" : "nav-link"}
                  type="button"
                  onClick={() => activehandler(2)}
                >
                  {detailData?.city_name
                    ? detailData?.project_target_audience_title?.replaceAll(
                        "{{in VARCITY}}",
                        detailData?.city_name
                      )
                    : detailData?.project_target_audience_title?.replaceAll(
                        "{{in VARCITY}}",
                        ""
                      )}
                </button>
              </li>
            </ul>
            <React.Suspense fallback="">
              <CitrixTrainingParts active={active} detailData={detailData} />
            </React.Suspense>
          </div>
          <div className="col-lg-4 text-center">
            <h6 className="mb--0 text-center">Do you have any query?</h6>
            <p className="text-center">We will very glad to help you</p>
            <div className="card-bottom text-center">
              <div className="read-more-btn mb--30">
                <Link
                  className="edu-btn"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#view-details"
                  onClick={() => setCourseEnquiry(true)}
                >
                  Enquire Now
                </Link>
              </div>
              <LazyLoadImage
                className="img-fluid"
                src={detailData?.project_image}
                alt={detailData?.project_image_alt_tag}
              />
            </div>
          </div>
        </div>

        <React.Suspense fallback="">
          <CourseDetailUpComingBatches
            upcomimgBatches={upcomimgBatches}
            detailData={detailData}
          />
        </React.Suspense>
      </div>
    </div>
  );
}

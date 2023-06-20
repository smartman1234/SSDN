import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DownloadForm = React.lazy(() => import("./DownloadForm"));

const ResolveQuery = React.lazy(() => import("./ResolveQuery"));

export default function CourseCurriculum({ detailData, params }) {
  const [active, setActive] = useState({});
  const [form, setForm] = useState(false);

  const data = detailData?.city_name;

  const activeHandler = (id) => {
    setActive((prev) => ({ [id]: !prev[id] }));
  };
  return (
    <div
      className="home-three-about edu-about-area edu-section-gap home-one-cat"
      id="Curriculum"
    >
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-title d-flex align-items-center justify-content-between text-start mb--10 ssdn-flex">
              <h4 className="title">
                {data
                  ? detailData?.curriculum_title.replaceAll(
                      "{{in VARCITY}}",
                      detailData?.city_name
                    )
                  : detailData?.curriculum_title?.replaceAll(
                      "{{in VARCITY}}",
                      ""
                    )}
              </h4>

              <div className="read-more-btn" onClick={() => setForm(true)}>
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ lineHeight: "40px", fontSize: "18px" }}
                >
                  <i className="ri-file-download-line me-2"></i>Download PDF
                </Link>
              </div>
            </div>
            {form && (
              <React.Suspense fallback="Loading...">
                <DownloadForm
                  active={form}
                  setActive={setForm}
                  detailData={detailData?.pdf}
                  id={detailData?.id}
                />
              </React.Suspense>
            )}
            <div className="course-content card">
              <div className="card-body">
                <p
                  className="ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: data
                      ? detailData?.curriculum.replaceAll(
                          "{{in VARCITY}}",
                          detailData?.city_name
                        )
                      : detailData?.curriculum?.replaceAll(
                          "{{in VARCITY}}",
                          ""
                        ),
                  }}
                />

                <div className="edu-accordion-02" id="accordionExample1">
                  {detailData?.curriculum_accordion?.length > 0 &&
                    detailData?.curriculum_accordion?.map((v, i) => (
                      <div
                        className={
                          active[i]
                            ? "edu-accordion-item bg-active"
                            : "edu-accordion-item"
                        }
                        key={i}
                      >
                        <div className="edu-accordion-header" id="headingOne">
                          <button
                            className="edu-accordion-button"
                            type="button"
                            onClick={() => activeHandler(i)}
                          >
                            {data
                              ? v?.title.replaceAll(
                                  "{{in VARCITY}}",
                                  detailData?.city_name
                                )
                              : v?.title?.replaceAll("{{in VARCITY}}", "")}
                          </button>
                        </div>
                        {active[i] && (
                          <div>
                            <div className="edu-accordion-body">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: data
                                    ? v.description.replaceAll(
                                        "{{in VARCITY}}",
                                        detailData?.city_name
                                      )
                                    : v.description?.replaceAll(
                                        "{{in VARCITY}}",
                                        ""
                                      ),
                                }}
                              ></p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
		  <React.Suspense fallback="Loading...">
		  <ResolveQuery params={detailData} />
              </React.Suspense>
         
        </div>
      </div>
    </div>
  );
}

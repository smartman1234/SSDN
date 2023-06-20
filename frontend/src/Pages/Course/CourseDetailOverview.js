import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CourseDetailOverview({detailData}) {
  return (
    <div className="row align-items-center">
            
            <div className="col-lg-8">
              <div className="course-content">
                <h2 className="ssdn-heading">
                  {detailData?.city_name
                    ? detailData?.name?.replaceAll(
                        "{{in VARCITY}}",
                        detailData?.city_name
                      )
                    : detailData?.name?.replaceAll("{{in VARCITY}}", "")}
                </h2>

                <div
                  className="content-css mb-4 ssdn-editor-font"
                    dangerouslySetInnerHTML={{
                      __html: detailData?.city_name
                        ? detailData?.course_overview.replaceAll(
                            "{{in VARCITY}}",
                            detailData?.city_name
                          )
                        : detailData?.course_overview?.replaceAll(
                            "{{in VARCITY}}",
                            ""
                          ),
                    }}
                  >
                </div>
                <div className="card-bottom data">
                  <div className="edu-rating rating-default">
                    {detailData?.average_review == 0 ||
                      (detailData?.average_review === null && (
                        <div className="rating"></div>
                      ))}
                    {detailData?.average_review == 1 && (
                      <div className="rating">
                        <i className="icon-Star"></i>
                      </div>
                    )}
                    {detailData?.average_review == 2 && (
                      <div className="rating">
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                      </div>
                    )}
                    {detailData?.average_review == 3 && (
                      <div className="rating">
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                      </div>
                    )}
                    {detailData?.average_review == 4 && (
                      <div className="rating">
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                      </div>
                    )}
                    {detailData?.average_review == 5 && (
                      <div className="rating">
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                        <i className="icon-Star"></i>
                      </div>
                    )}
                    <span className="rating-count">
                      ({detailData?.review_count} Review)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="eduvibe-sidebar course-details-sidebar p-0">
                <div className="inner">
                  <div className="eduvibe-widget">
                      {detailData?.media_type === "image" && (
                        <div className="thumbnail video-popup-wrapper">
                           <LazyLoadImage
                            className="w-100"
                            src={detailData?.media}
                            alt="Course Images"
                            height=""
                            width=""
                            // style={{height: "220px"}}
                          />
                        </div>
                      )}
                      {detailData?.media_type === "video" && (
                        <>
                          {" "}
                          {detailData?.video_type === "media_file" ? (
                            <div className="thumbnail video-popup-wrapper">
                              <video
                                controls
                                poster={detailData?.thumb_image}
                                style={{ height: "390px" }}
                              >
                                <source
                                  src={detailData?.media}
                                  type="video/mp4"
                                  height="100%"
                                  width="100%"
                                />
                              </video>
                            </div>
                          ) : (
                            <div
                              className="thumbnail video-popup-wrapper"
                              dangerouslySetInnerHTML={{
                                __html: detailData?.media?.replaceAll(
                                  `<iframe loading="lazy" width="560" height="315" `,
                                  `<iframe loading="lazy" width="560" height="315px title="myFrame""`
                                ),
                              }}
                            ></div>
                          )}
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

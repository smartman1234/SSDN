import React from "react";
import Utils from "../../Utils/Utils";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function TestimonialSection({
  Activehandler,
  testimonialList,
  type,
}) {
  return (
    <div className="col-lg-8 col-md-6">
      <div className="course-details-content">
        <ul
          className="edu-course-tab nav nav-tabs justify-content-between mt--0"
        >
          <li className="nav-item">
            <button
              className={type === "retail" ? "nav-link active" : "nav-link"}
              type="button"
              onClick={() => {
                sessionStorage.setItem("testimonialtype", "retail");
                Activehandler(0, "retail");
              }}
            >
              Retails Testimonials
            </button>
          </li>
          <li className="nav-item">
            <button
              className={type === "corporate" ? "nav-link active" : "nav-link"}
              type="button"
              onClick={() => {
                sessionStorage.setItem("testimonialtype", "corporate");
                Activehandler(1, "corporate");
              }}
            >
              Corporate Testimonials
            </button>
          </li>
          <li className="nav-item">
            <button
              className={type === "video" ? "nav-link active" : "nav-link"}
              type="button"
              onClick={() => {
                sessionStorage.setItem("testimonialtype", "video");
                Activehandler(2, "video");
              }}
            >
              Videos Testimonials
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          {testimonialList.length > 0 &&
            type === "retail" &&
            testimonialList.map((v, i) => (
              <>
                <div
                  className={
                    type == "retail"
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }
                  key={i}
                >
                  <div className="testimonial-card-box mt--20">
                    <div className="client-info text-dark-image">
                      <div className="thumbnail">
                         <LazyLoadImage loading="lazy" src={v.image} alt="Client Images"
                                height="100%"
                                width="100%" />
                      </div>
                    </div>

                    <div className="inner-dark">
                      <p
                        className="description"
                        dangerouslySetInnerHTML={{ __html: v.discription }}
                      />

                      <div className="text-center">
                        <div className="content">
                          <h6 className="title">{Utils.titleCase(v.name)}</h6>
                          <p>
                            <span className="subtitle">Course : </span>{" "}
                            {v?.course
                              ? v?.course.replaceAll("{{in VARCITY}}", "")
                              : "Course name is not given"}
                          </p>
                        </div>
                        {v.review == 5 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 4 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 3 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 2 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 1 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 0 && <div className="rating"></div>}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          {testimonialList.length > 0 &&
            type === "corporate" &&
            testimonialList.map((v, i) => (
              <>
                <div
                  className={
                    type === "corporate"
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }
                  aria-labelledby="overview-tab"
                  key={i}
                >
                  <div className="testimonial-card-box mt--20">
                    <div className="client-info text-dark-image">
                      <div className="thumbnail">
                         <LazyLoadImage loading="lazy" src={v.image} alt="Client Images"
                                height="100%"
                                width="100%" />
                      </div>
                    </div>

                    <div className="inner-dark">
                      <p
                        className="description"
                        dangerouslySetInnerHTML={{ __html: v.discription }}
                      />

                      <div className="text-center">
                        <div className="content">
                          <h6 className="title">{Utils.titleCase(v.name)}</h6>
                          <p>
                            <span className="subtitle">Course : </span>{" "}
                            {v?.course
                              ? v?.course.replaceAll("{{in VARCITY}}", "")
                              : "Course name is not given"}
                          </p>
                        </div>
                        {v.review == 5 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 4 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 3 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 2 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 1 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 0 && <div className="rating"></div>}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          <div className="row">
            {testimonialList.length > 0 &&
              type === "video" &&
              testimonialList.map((v, i) => (
                <>
                  <div className="testimonial-card-box mt--20 col-md-6" key={i}>
                    <div className="client-info text-dark-image">
                      <div className="thumbnail">
                         <LazyLoadImage loading="lazy" src={v.image} alt="Client Images"
                                height="100%"
                                width="100%" />
                      </div>
                    </div>

                    <div className="inner-dark">
                      <div className="text-center">
                        <div className="content">
                          <h6 className="title">{Utils.titleCase(v.name)}</h6>
                          <p style={{ height: "50px" }}>
                            <span className="subtitle">Course : </span>{" "}
                            {v?.course
                              ? v?.course.replaceAll("{{in VARCITY}}", "")
                              : "Course name is not given"}
                          </p>
                        </div>

                        {v.review == 5 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 4 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 3 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 2 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 1 && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.review == 0 && <div className="rating"></div>}
                      </div>
                      <div className="eduvibe-widget">
                        <div className="video-area">
                          <div
                            className="thumbnail video-popup-wrapper"
                           
                          >
                            <iframe loading="lazy" title="myFrame"
                              width="400"
                              height="200"
                              srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5;color:white;text-shadow:0 0 0.5em black}</style><a href=${
                                v.discription
                              }/?autoplay=1> <LazyLoadImage loading="lazy" src=https://img.youtube.com/vi/${
                                v.discription.split("/")?.[4]
                              }/hqdefault.jpg alt='AltTagContent'><span>▶</span></a>`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

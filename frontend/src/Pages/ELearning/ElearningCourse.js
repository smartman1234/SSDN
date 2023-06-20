import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ElearningCourse({
  course,
  setIsShown,
  gettingCourseId,
}) {

  return (
    <div className="col-lg-9">
      <h1 className="ssdn-heading">Courses in Digital Marketing</h1>
      <div className="row">
        {course &&
          course.map((v, i) => (
            <div className="col-md-4 mt-5" key={i}>
              <div className="card mt--0">
                <div className="card-body ui-card--series">
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="line-clamp-2 mb-3 ng-binding ng-scope leading-tight1">
                        <Link to={`/e-learning/${v.slug}`}>{v.name}</Link>
                      </h4>
                    </div>
                    <div className="col-md-4 data-abosiusi">
                      <span className="badge badge-pill">
                        {v.price_type === "free" ? "Free" : "Paid"}
                      </span>
                      <div className="card-test__logo">
                        {v.media_type === "video" ? (
                          <>
                             <LazyLoadImage
                              className="js-lazy-load-img loaded"
                              src={v.thumb_image}
                              height="100%"
                              width="100%"
                            />
                          </>
                        ) : (
                          <>
                            {" "}
                             <LazyLoadImage
                              className="js-lazy-load-img loaded"
                              src={v.media}
                              height="100%"
                              width="100%"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="content-blog-top mb-10">
                    <ul className="blog-meta hello-data p-0 d-flex justify-content-between mt--10">
                      <li>
                        <i className="icon-Star"></i> 25.2
                      </li>
                      <li>
                        {v.learners} Learner{v.learners > 1 ? "s" : ""}
                      </li>
                      <li>
                        {" "}
                        {v?.course_duration} {v?.course_duration_time}
                        {v?.course_duration > 1 ? "s" : ""}
                      </li>
                    </ul>
                  </div>
                  <ul className="ssdn-ul-data">
                    <li className="ng-binding ng-scope">
                      {v.description_option_1}
                    </li>
                    <li className="ng-binding ng-scope">
                      {v.description_option_2}
                    </li>
                    <li className="ng-binding ng-scope enroll-win-rewards">
                      {v.description_option_3}
                    </li>
                  </ul>
                </div>
                <div
                  className="card-bottom d-flex justify-content-between p-4"
                  style={{ borderTop: "1px solid #c3c3c3" }}
                >
                    <Link
                      className="btn-transparent"
                      to={`/e-learning/${v.slug}`} rel="nofollow"
                    >
                      Read More
                    </Link>
                  <div className="read-more-btn before">|</div>
                  <div className="read-more-btn before">
                    {v.price_type === "free" ? (
                      <>
                        {window.user?.data?.auth_token ? (
                          <Link
                            className="btn-transparent"
                            to={`/e-learning-study/${v.slug}`}
                          >
                            Start Learning
                          </Link>
                        ) : (
                          <Link
                            className="btn-transparent"
                            to="/login"
                          >
                            Start Learning
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        {v.is_order != 0 ? (
                          <Link
                            to={`/e-learning-study/${v.slug}`}
                            className="btn-transparent"
                          >
                            Start Learning
                          </Link>
                        ) : (
                          <Link
                            className="btn-transparent"
                            to="#"
                            onClick={() => {
                              gettingCourseId(v);
                              setIsShown((prev) => ({ [v.id]: true }));
                            }}
                          >
                            Start Learning
                          </Link>
                        )}
                      </>
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

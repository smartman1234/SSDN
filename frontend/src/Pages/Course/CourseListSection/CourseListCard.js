import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CourseListCard({ courseList }) {
  return (
    <>
      <ul className="all-courses-liststyle">
        {courseList.length > 0 &&
          courseList.map((v, i) => (
            <li className="filter" key={i}>
              <div className="list-style-wrapper" key={i}>
                <div className="course-image-wrapper">
                  <Link to="/course-details"aria-label="course">
                    {v.media_type === "image" && (
                       <LazyLoadImage
                        src={v.media}
                        alt="Full Stack Web Developer – MEAN Stack"
                        height="100%"
                        width="100%"
                      />
                    )}
                    {v.media_type === "video" && (
                       <LazyLoadImage
                        src={v.thumb_image}
                        alt="Full Stack Web Developer – MEAN Stack"
                        height="100%"
                        width="100%"
                      />
                    )}
                  </Link>
                </div>
                <div className="course-detail-wrapper">
                  <div className="row ">
                    <div className="col-md-8">
                      <div className="list-style-detailwrapper">
                        <Link
                          to={`/${v?.category?.slug}/${v.slug.replaceAll(
                            "-{{in-varcity}}",
                            ""
                          )}`}
                          onClick={() => {
                            localStorage.setItem("enrollcourseslug", v.slug);
                            localStorage.setItem(
                              "enrollcoursecategorylug",
                              v.category?.slug
                            );
                          }}
                        >
                          <h3 className="mb-1 list-style-course-name">
                            {v.name.replaceAll("{{in VARCITY}}", "")}
                          </h3>
                        </Link>
                        <div className="d-none d-lg-block">
                          <p
                            className="cat-key-skills ssdn-editor-font"
                            dangerouslySetInnerHTML={{
                              __html: v.course_overview?.replaceAll(
                                "{{in VARCITY}}",
                                ""
                              ),
                            }}
                          />
                        </div>
                      </div>
                      <div className="list-style-detailwrapper">
                        <div className="course-detail-wrap">
                          <span className="collabaration-image">
                            {v.category?.name}
                          </span>
                          {v.average_review == 5 && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review == 4 && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review == 3 && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review == 2 && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review == 1 && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review == 0 ||
                            (v.average_review === null && (
                              <div className="rating"></div>
                            ))}
                          {v.average_review
                            ? Math.round(v.average_review)
                            : 0}{" "}
                          out of 5
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ssdn-line">
                      <div className="list-style-value-wrapper">
                        <span className="stats">
                          <i className="ri-book-open-fill"></i>
                          <span>
                            {v.course_duration} {v.course_duration_time}
                            {v.course_duration > 1 ? "" : ""} of Learning
                          </span>
                        </span>
                        <span className="stats">
                          <i className="ri-calendar-todo-fill"></i>
                          <span> {v.assignments} Assignments</span>
                        </span>
                        <span className="stats mb--15">
                          <i className="ri-vidicon-fill"></i>
                          <span> {v.live_project} Live Project</span>
                        </span>
                        <p className="m-0 text-center d-xl-block cat-list-btn-wrap">
                          <Link
                            to={`/${v?.category?.slug}/${v.slug.replaceAll(
                              "-{{in-varcity}}",
                              ""
                            )}`}
                            className="list-style-view-btn"
                          >
                            View Details
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

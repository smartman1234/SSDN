import React, { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Login from "../Login/Login";
import ReactPaginate from "react-paginate";
import HeadingName from "../HeadingName/HeadingName";
import CourseService from "../../Services/CourseService/CourseService";

const Profile = React.lazy(() => import("./Profile"));

export default function MyCourse() {
  const courseServe = new CourseService();
  const [course, setCourse] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState("");
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
  });
  const apiCall = async (activity) => {
    try {
      let res = await courseServe.mycourse(activity);
      if (res) {
        setCourse(res.data);
        setTotalPages(res.count / 12);
        setTotalCount(res.count);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    MyCourseListApi();
  }, []);

  const MyCourseListApi = async () => {
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search?.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search?.perPage,
      offset: currentPage,
    };
    await apiCall(activity);
  };
  return (
    <>
      {window.user?.data?.auth_token ? (
        <>
        <HeadingName name="Courses" home="Home" heading="Courses" />
          <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
            <div className="container">
              <div className="row">

              <React.Suspense fallback="">
              <Profile />
            </React.Suspense>
              
                <div className="col-lg-9">
                  <div className="edu-course-widget widget-category">
                    <div className="inner">
                      <h5 className="widget-title">My Courses</h5>
                      <div className="row">
                        {course?.length > 0 &&
                          course.map((v, i) => (
                            <div className="col-md-6 mb-4" key={i}>
                              <div className="edu-card card-type-3 radius">
                                <div className="inner">
                                  <div className="thumbnail">
                                    <Link to="#">
                                      {v?.course?.media_type === "image" ? (
                                         <LazyLoadImage
                                          className="w-100"
                                          src={v?.course?.media}
                                          alt={v?.course?.media_alt_tag}
                                          height="100%"
                                          width="100%"
                                        />
                                      ) : (
                                         <LazyLoadImage
                                          className="w-100"
                                          src={v?.course?.thumb_image}
                                          alt={v?.course?.media_alt_tag}
                                          height="100%"
                                          width="100%"
                                        />
                                      )}
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h6 className="title data-pading">
                                      <Link
                                        to={`/${v?.category?.slug}/${v?.course?.slug}`}
                                      >
                                        {v?.course?.name}
                                      </Link>
                                    </h6>
                                    <div className="card-bottom data-pading">
                                      <div className="price-list price-style-02">
                                        <div className="price current-price">
                                          {v?.course?.course_duration}
                                          {v?.course?.course_duration_time}
                                          {v?.course?.course_duration > 1 ? "s" : ""}
                                        </div>
                                      </div>
                                      <div className="edu-rating rating-default">
                                        {v?.course?.average_review === "5" && (
                                          <div className="rating">
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                          </div>
                                        )}
                                        {v?.course?.average_review === "4" && (
                                          <div className="rating">
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                          </div>
                                        )}
                                        {v?.course?.average_review === "3" && (
                                          <div className="rating">
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                          </div>
                                        )}
                                        {v?.course?.average_review === "2" && (
                                          <div className="rating">
                                            <i className="icon-Star"></i>
                                            <i className="icon-Star"></i>
                                          </div>
                                        )}
                                        {v?.course?.average_review === "1" && (
                                          <div className="rating">
                                            <i className="icon-Star"></i>
                                          </div>
                                        )}
                                        {v?.course?.average_review === "0" ||
                                          (v?.course?.average_review === null && (
                                            <div className="rating"></div>
                                          ))}
                                        <span className="rating-count">
                                          ({Math.round(v?.course?.review_count)})
                                        </span>
                                      </div>
                                    </div>
                                    <div className="read-more-btn data-pading d-flex justify-content-between">
                                      <Link
                                        className="edu-btn btn-medium btn-white"
                                        to={`/${v?.category?.slug}/${v?.course?.slug}`}
                                      >
                                        View Details
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="row">
                        <div className="col-lg-12 mt--20">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={1}
                            onPageChange={handlePageClick}
                            containerClassName={
                              "edu-pagination justify-content-center"
                            }
                            activeClassName={"active"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LetUsHelp />
        </>
      ) : (
        <Login />
      )
      }
    </>
  );
}

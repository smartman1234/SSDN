import React, { useState, useEffect } from "react";
import { Link,  } from "react-router-dom";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Login from "../Login/Login";
import HeadingName from "../HeadingName/HeadingName";
import ReactPaginate from "react-paginate";
import ELearningService from "../../Services/ELearningService/ELearningService";

const Profile = React.lazy(() => import("./Profile"));

export default function MyELearning() {
  const serve = new ELearningService();
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
      let res = await serve.myelearning(activity);
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
        <HeadingName name="E-Learning Courses" home="Home" heading="E-Learning Courses" />
          <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
            <div className="container">
              <div className="row">
              <React.Suspense fallback="">
              <Profile />
            </React.Suspense>
              
                <div className="col-lg-9">
                  <div className="edu-course-widget widget-category">
                    <div className="inner">
                      <h5 className="widget-title">My E-Learning Courses</h5>
                        <div className="row">
                          {course &&
                            course.map((v, i) => (
                              <div className="col-md-4 mt-5" key={i}>
                                <div className="card mt--0">
                                  <div className="card-body ui-card--series">
                                    <div className="row">
                                      <div
                                        className="col-md-8"
                                      >
                                        <h4 className="line-clamp-2 mb-3 ng-binding ng-scope leading-tight1">
                                          <Link to={`/e-learning/${v.slug}`}>
                                            {v.name}
                                          </Link>
                                        </h4>
                                      </div>
                                      <div className="col-md-4 data-abosiusi">
                                        <span className="badge badge-pill">
                                          {v.price_type === "free"
                                            ? "Free"
                                            : "Paid"}
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
                                          {v.learners} Learner
                                          {v.learners > 1 ? "s" : ""}
                                        </li>
                                        <li>
                                          {" "}
                                          {v?.course_duration}{" "}
                                          {v?.course_duration_time}
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
                                        to={`/e-learning/${v.slug}`}rel="nofollow"
                                      >
                                        Read More
                                      </Link>
                                    <div className="read-more-btn before">
                                      |
                                    </div>
                                    <div className="read-more-btn before">
                                      <Link
                                        className="btn-transparent"
                                        to={`/e-learning-study/${v.slug}`}
                                      >
                                        Start Learning
                                      </Link>
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
      )}
    </>
  );
}

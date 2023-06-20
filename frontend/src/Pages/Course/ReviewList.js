import React, { useState, useEffect } from "react";
import CourseService from "../../Services/CourseService/CourseService";
import Utils from "../../Utils/Utils";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ReviewList({ detailData }) {
  const course = new CourseService();
  const [reviewList, setReviewlist] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 6,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    reviewListApi();
  }, [search.perPage]);

  const reviewListApi = async () => {
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
      course_slug: detailData,
    };
    try {
      let response = await course.reviewList(activity);
      if (response.status === "success") {
        setTotalPages(response.count / 12);
        setTotalCount(response.count);
        setReviewlist(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const ratingStars = (data) => {
    if (data) {
      for (let i = data; i <= data.length; i++) {
        const icon = <i className="icon-Star"></i>;
        return <i className="icon-Star"></i>;
      }
    }
  };

  var getInitials = function (string) {
    var names = string?.split(" "),
      initials = names?.[0]?.substring(0, 1)?.toUpperCase();

    if (names?.length > 1) {
      initials += names?.[names?.length - 1]?.substring(0, 1)?.toUpperCase();
    }
    return initials;
  };

  const fetchData = () => {
    if (reviewList.length >= totalCount) {
      setHasMore(false);
      return;
    }
    setSearch({ ...search, perPage: search.perPage + 2 });
  };

  return (
    <>
      {" "}
      {reviewList.length > 0 && (
        <div className="card">
          <div className="card-body">
            <InfiniteScroll
              dataLength={reviewList.length}
              next={fetchData}
              hasMore={hasMore}
              height={500}
              loader={
                <div className="col-lg-12 text-center mt-1">
                                                                    <strong className="me-2">Loading...</strong>
                                                                    <div className="spinner-border text-warning"
                                                                    ></div>
                                                                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {reviewList.length > 0 ? (
                <>
                  {reviewList.map((v, i) => (
                    <div className="course-details-card" key={i}>
                      <div className="course-content">
                        <div className="comment-wrapper">
                          <div className="edu-comment d-flex">
                            <div className="thumbnail">
                              <button
                                style={{
                                  height: "60px",
                                  width: "60px",
                                  fontSize: "29px",
                                  border: "none",
                                  color: "bisque",
                                  background: "gray",
                                  borderRadius: "50px",
                                }}
                              >
                                {getInitials(v.name)}
                              </button>
                            </div>
                            <div className="comment-content p-0">
                              <div className="comment-top">
                                <h6 className="title">
                                  {Utils.titleCase(v.name)} 
                                </h6>
                                <div className="rating">
                                  {ratingStars(v.review)}
                                  {v.review == 5 && (
                                    <>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                    </>
                                  )}
                                  {v.review == 4 && (
                                    <>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star off"></i>
                                    </>
                                  )}
                                  {v.review == 3 && (
                                    <>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star off"></i>
                                      <i className="icon-Star off"></i>
                                    </>
                                  )}
                                  {v.review == 2 && (
                                    <>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star off"></i>
                                      <i className="icon-Star off"></i>
                                      <i className="icon-Star off"></i>
                                    </>
                                  )}
                                  {v.review == 1 && (
                                    <>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star off"></i>
                                      <i className="icon-Star off"></i>
                                      <i className="icon-Star off"></i>
                                      <i className="icon-Star off"></i>
                                    </>
                                  )}
                                </div>
                              </div>
                              <span className="subtitle">
                                <i className="icon-calendar-2-line me-2"></i> {moment(v.created_at).format("MMMM Do YYYY")}
                              </span>
                              <p className="mt--10" dangerouslySetInnerHTML={{__html:v.comment}}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="course-details-card">
                  No reviews available !
                </div>
              )}

            </InfiniteScroll>
          </div>
        </div>
      )}
    </>
  );
}

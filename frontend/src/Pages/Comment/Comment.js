import React, { useState, useEffect } from "react";
import AssessmentService from "../../Services/AssessmentService";
import Utils from "../../Utils/Utils";

const CommentRating = React.lazy(() =>
  import("./CommentRating")
);

const LeaveCommentForm = React.lazy(() => import("./LeaveCommentForm"));

export default function Comment({ assessmentdata }) {
  const [reviewList, setReviewList] = useState([]);
  const [id, setId] = useState("");
  const [search, setSearch] = useState({
    start: 0,
    perPage: 100,
  });

  const reviewServe = new AssessmentService();

  useEffect(() => {
    setId(assessmentdata.id);
    ReviewListApi();
  }, [assessmentdata.id]);

  var getInitials = function (string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const ReviewListApi = async () => {
    let activity = {
      assessent_id: assessmentdata.id,
      limit: search.perPage,
      offset: search.start,
    };
    try {
      let response = await reviewServe.reviewList(activity);
      if (response) {
        setReviewList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const ratingStars = (data) => {
    if (data) {
      for (let i = data; i <= data?.length; i++) {
        const icon = <i className="icon-Star"></i>;
        return <i className="icon-Star"></i>;
      }
    }
  };

  return (
    <div className="course-details-card mt--40">
      <div className="course-content">
        <h6 className="mb--20">Comments</h6>
        <React.Suspense fallback="">
        <CommentRating assessmentdata={assessmentdata} />
            </React.Suspense>
       

        <div className="comment-wrapper pt--40">
          <div className="section-title">
            {reviewList?.length > 0 && <h6 className="mb--25">Comments</h6>}
          </div>

          {reviewList?.length > 0 && <div className="card ssdn-height">
            {reviewList.map((v, i) => (
              <div className="course-details-card bg-white" key={i}>
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
                            {v.review === "5" && (
                              <>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                              </>
                            )}
                            {v.review === "4" && (
                              <>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star off"></i>
                              </>
                            )}
                            {v.review === "3" && (
                              <>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star off"></i>
                                <i className="icon-Star off"></i>
                              </>
                            )}
                            {v.review === "2" && (
                              <>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star off"></i>
                                <i className="icon-Star off"></i>
                                <i className="icon-Star off"></i>
                              </>
                            )}
                            {v.review === "1" && (
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
                        <p className="mt--10">
                          {Utils.titleCase(v.comment)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))}
          </div>}
        </div>
        <React.Suspense fallback="">
        <LeaveCommentForm assessmentdata={assessmentdata} />
            </React.Suspense>
       
      </div>
    </div>
  );
}

import React from "react";

export default function CommentRating({ assessmentdata }) {
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="rating-box">
          <div className="rating-number">
            {assessmentdata.course_avg_revirw}
          </div>
          {assessmentdata.course_avg_revirw === 5 && (
            <div className="rating">
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
              <i className="icon-Star"></i> <i className="icon-Star"></i>
            </div>
          )}
          {assessmentdata.course_avg_revirw === 4 && (
            <div className="rating">
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
            </div>
          )}
          {assessmentdata.course_avg_revirw === 3 && (
            <div className="rating">
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
            </div>
          )}
          {assessmentdata.course_avg_revirw === 2 && (
            <div className="rating">
              <i className="icon-Star"></i>
              <i className="icon-Star"></i>
            </div>
          )}
          {assessmentdata.course_avg_revirw === 1 && (
            <div className="rating">
              <i className="icon-Star"></i>
            </div>
          )}
          <span>({assessmentdata.total_review} Review)</span>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="review-wrapper">
          <div className="single-progress-bar">
            <div className="rating-text">
              5 <i className="icon-Star"></i>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${assessmentdata.review_5?.per}%` }}
                aria-valuenow={assessmentdata.review_5?.per}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span className="rating-value">
              {assessmentdata.review_5?.count}
            </span>
          </div>

          <div className="single-progress-bar">
            <div className="rating-text">
              4 <i className="icon-Star"></i>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${assessmentdata.review_4?.per}%` }}
                aria-valuenow={assessmentdata.review_4?.per}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span className="rating-value">
              {assessmentdata.review_4?.count}
            </span>
          </div>

          <div className="single-progress-bar">
            <div className="rating-text">
              3 <i className="icon-Star"></i>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${assessmentdata.review_3?.per}%` }}
                aria-valuenow={assessmentdata.review_3?.per}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span className="rating-value">
              {assessmentdata.review_3?.count}
            </span>
          </div>

          <div className="single-progress-bar">
            <div className="rating-text">
              2 <i className="icon-Star"></i>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${assessmentdata.review_2?.per}%` }}
                aria-valuenow={assessmentdata.review_2?.per}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span className="rating-value">
              {assessmentdata.review_2?.count}
            </span>
          </div>

          <div className="single-progress-bar">
            <div className="rating-text">
              1 <i className="icon-Star"></i>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${assessmentdata.review_1?.per}%` }}
                aria-valuenow={assessmentdata.review_1?.per}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span className="rating-value">
              {assessmentdata.review_1?.count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

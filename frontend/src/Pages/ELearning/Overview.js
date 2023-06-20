import React from "react";
import Utils from "../../Utils/Utils";

const ELearningDetailCard = React.lazy(() => import("./ELearningDetailCard"));

export default function Overview({ data }) {
  return (
    <div
      className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat pb--30"
      style={{
        backgroundImage: "linear-gradient(624deg, #f44336 0%, var(--color-white)fff 55%)",
        borderBottom: "1px solid #eee",
      }}
    >
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-8">
            <div className="course-content">
              <h6>{data?.overview_title}</h6>
              <div className="card-bottom data mb--20">
                <div className="edu-rating rating-default">
                  <div className="rating">
                    <i className="icon-Star"></i>
                    <i className="icon-Star"></i>
                    <i className="icon-Star"></i>
                    <i className="icon-Star"></i>
                    <i className="icon-Star"></i>
                  </div>
                  <span className="rating-count">(25 Review)</span>
                  <div className="author-meta befor-ection-wrapp ml--10">
                    <div className="author-thumb">
                      <span className="author-title">
                      {data.learners} Learner{data.learners>1?"s":""} Enrolled
                      </span>
                    </div>
                  </div>
                  <div className="author-meta befor-ection-wrapp ml--10">
                    <div className="author-thumb">
                      <span className="author-title">
                        {Utils.titleCase(data?.course_level)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{ color: "#000" }}
                dangerouslySetInnerHTML={{ __html: data?.overview }}
              ></p>
            </div>
          </div>

          <React.Suspense fallback="">
          <ELearningDetailCard data={data} />
              </React.Suspense>
        
         
        </div>
      </div>
    </div>
  );
}

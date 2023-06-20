import React from "react";

export default function AssessmentDescription({ assessmentdata }) {
  return (
    <>
      {assessmentdata.description && (
        <div className="course-details-card mt--40">
          <div className="row">
            <div className="col-md-12">
              <h6 className="mb--20">Assessment Description</h6>
              <div>
                <p
                  className="ssdn-height7"
                  dangerouslySetInnerHTML={{
                    __html: assessmentdata.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

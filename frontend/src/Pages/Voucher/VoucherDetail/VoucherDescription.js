import React from "react";

export default function VoucherDescription({ voucherDetail }) {
  return (
    <>
      {voucherDetail?.overview_heading && (
        <div className="course-details-card">
          <div className="course-content">
            <div className="row">
              <div className="col-md-12">
                <h2 className="second-heading">
                  {voucherDetail?.overview_heading}
                </h2>

                <p
                  className="ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: voucherDetail?.overview,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {voucherDetail?.recommended_knowledge_heading && (
        <div className="course-details-card">
          <div className="course-content">
            <div className="row">
              <div className="col-md-12">
                <h2 className="second-heading">
                  {" "}
                  {voucherDetail?.recommended_knowledge_heading}
                </h2>
                <p
                  className="ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: voucherDetail?.recommended_knowledge,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
{voucherDetail?.exam_preparation_heading&&  <div className="course-details-card">
        <div className="course-content">
          <div className="row">
            <div className="col-md-12">
              <h2 className="second-heading">
                {" "}
                {voucherDetail?.exam_preparation_heading}
              </h2>
              <p
                className="ssdn-editor-font"
                dangerouslySetInnerHTML={{
                  __html: voucherDetail?.exam_preparation,
                }}
              />
            </div>
          </div>
        </div>
      </div>}
      {voucherDetail?.exam_overview_heading&& <div className="course-details-card">
        <div className="course-content">
          <div className="row">
            <div className="col-md-12">
              <h2 className="second-heading">
                {voucherDetail?.exam_overview_heading}
              </h2>
              <p
                className="ssdn-editor-font"
                dangerouslySetInnerHTML={{
                  __html: voucherDetail?.exam_overview,
                }}
              />
            </div>
          </div>
        </div>
      </div>}
     
    </>
  );
}

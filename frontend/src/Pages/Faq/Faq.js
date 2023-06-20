import React from "react";

export default function Faq({ voucherDetail }) {
  return (
    <>
     {voucherDetail?.faq&&  <div className="course-details-card">
        <div className="course-content">
          <h2 className="mb--20 second-heading">FAQ's</h2>
          <div className="row">
            <div className="col-md-12">
              <p
                className="faq-data-inner ssdn-editor-font"
                dangerouslySetInnerHTML={{
                  __html: voucherDetail?.faq,
                }}
              />
            </div>
          </div>
        </div>
      </div>}
    
    </>
  );
}

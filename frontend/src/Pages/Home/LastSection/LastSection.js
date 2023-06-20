import React from "react";

export default function LastSection({ data }) {
  return (
    <div className="eedu-testimonial-area testimonial-card-box-bg edu-section-gap position-relative bg-image" style={{
      backgroundImage: `url(/assets/images/bg/nnn3-01.png)`,
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-8">
            <p className="ssdn-editor-font" dangerouslySetInnerHTML={{__html:data?.page_description?.quotes}}/>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}

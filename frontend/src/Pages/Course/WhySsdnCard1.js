import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function WhySsdnCard1({ssdnData}) {
  return (
    <div className="col-lg-4 col-md-6">
    <div className="service-card service-card-2 card-bg-1">
      <div className="inner">
        <div className="icon">
          <a href="#">
             <LazyLoadImage
              src="/assets/images/icons/offer-icon-01.png"
              alt="Service Images"
              height="40px"
              width="40px"
            />
          </a>
          <div className="shape-list">
             <LazyLoadImage
              className="shape shape-1"
              src="/assets/images/icons/service-icon-01.png"
              alt="Shape Images"
              height="9px"
              width="8px"
            />
             <LazyLoadImage
              className="shape shape-2"
              src="/assets/images/icons/service-icon-02.png"
              alt="Shape Images"
              height="9px"
              width="8px"
            />
             <LazyLoadImage
              className="shape shape-3"
              src="/assets/images/icons/service-icon-03.png"
              alt="Shape Images"
              height="9px"
              width="8px"
            />
          </div>
        </div>
        <div className="content">
          <h6 className="title">
            <a href="#">{ssdnData?.card_title_1}</a>
          </h6>
          <div
            className="description ssdn-editor-font"
            dangerouslySetInnerHTML={{
              __html: ssdnData?.card_description_1,
            }}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

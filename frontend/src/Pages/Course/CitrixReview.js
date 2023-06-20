import React from 'react'
import VideoReviewList from './VideoReviewList'
import { LazyLoadImage } from "react-lazy-load-image-component";

const ReviewList = React.lazy(() => import("./ReviewList"));

const CitrixReviewForm = React.lazy(() => import('./CitrixReviewForm'));

export default function CitrixReview({ detailData,id }) {
  return (
    <div className="home-three-about edu-about-area edu-section-gap" id='Reviews'>
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-8 product-description-content">
            <div className="section-title text-start">
              <h3 className="title">Reviews</h3>
            </div>
            <React.Suspense fallback="">
            <ReviewList detailData={detailData} />
            </React.Suspense>
           
            <React.Suspense fallback="">
            <CitrixReviewForm detailData={detailData} id={id}/>
            </React.Suspense>
           
          </div>
      
          <VideoReviewList detailData={detailData} />
        </div>
        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <LazyLoadImage
              src="/assets\images\shapes\shape-03-08.png"
              alt="Shape Thumb"
              height="100%"
              width="100%"
            />
          </div>
          <div className="shape-image shape-image-2">
            <LazyLoadImage  src="/assets\images\shapes\shape-27.png" alt="Shape Thumb"
                      height="100%"
                      width="100%" />
          </div>
        </div>
      </div>
    </div>
  )
}

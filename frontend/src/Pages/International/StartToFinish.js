import React,{useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CourseEnquiryPopUp = React.lazy(() =>
  import("../Course/CourseEnquiryPopUp")
);

export default function StartToFinish({detailData}) {
    const [CourseEnquiry, setCourseEnquiry] = useState(false);
  return (
    <div className="edu-service-area edu-section-gap bg-image home-one-cat">
    <div className="container eduvibe-animated-shape">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title text-center">
            <h3 className="title mb-4">From Start to Finish</h3>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="section-title text-center">
             <LazyLoadImage
              src={detailData.image_url + detailData.start_finish_image}
              height="100%"
              width="100%"
            />
          </div>
          <div className="read-more-btn text-center mt--30">
            <button
              onClick={() => setCourseEnquiry(true)}
              className="edu-btn"
              data-bs-toggle="modal"
              data-bs-target="#view-details"
            >
              Enroll Now
            </button>
          </div>
          {CourseEnquiry && (
            <React.Suspense fallback="Loading...">
              <CourseEnquiryPopUp
                CourseEnquiry={CourseEnquiry}
                setCourseEnquiry={setCourseEnquiry}
              />
            </React.Suspense>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Facility({detailData}) {
  return (
    <div className="edu-service-area edu-section-gap bg-image home-one-cat  ">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h3 className="title mb-4">Our Facilities</h3>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="section-title text-center">
                 <LazyLoadImage
                  src={detailData.image_url + detailData.our_facility_image}
                  alt={detailData.our_facility_image_alt_tag}
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

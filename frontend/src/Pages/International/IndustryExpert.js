import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function IndustryExpert({ detailData }) {
  return (
    <div
      className="home-three-about edu-about-area edu-section-gap home-one-cat"
      id="gettrained"
    >
      <div className="container eduvibe-animated-shape">
        <div className="col-lg-12">
          <div className="section-title text-center">
            <h3 className="title">Get Trained from Industry Experts</h3>
          </div>
        </div>
        <div className="row mt--20">
          <div className="col-lg-8">
            <p
              dangerouslySetInnerHTML={{ __html: detailData.get_trained }}
            />
          </div>

          <div className="col-lg-4 mt--0">
            <LazyLoadImage
              className="img-fluid"
              src={detailData.image_url + detailData.get_trained_image}
              alt={detailData.get_trained_image_alt_tag}
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Flight({detailData,services}) {
  return (
    <div
    className="home-three-about edu-about-area edu-section-gap home-one-cat"
    id="directflight"
  >
    <div className="container eduvibe-animated-shape">
      <div className="col-lg-12">
        <div className="section-title text-center">
          <h3 className="title">Direct Flight</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="course-content mt--10">
            <p
              dangerouslySetInnerHTML={{
                __html: detailData.flight_description_1,
              }}
            />
            <div className="row gy-5 align-items-center mb--30">
              {services.map((v, i) => (
                <div className="col-md-3" key={i}>
                  <div className="edu-counterup">
                    <div className="inner">
                      <div className="icon">
                         <LazyLoadImage
                          src="/assets/images/icons/winner-04.png"
                          alt="Icons Images"
                          height="60px"
                          width="49px"
                        />
                      </div>
                      <div className="content">
                        <span>{v}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="mb--0"
              dangerouslySetInnerHTML={{
                __html: detailData.flight_description_2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

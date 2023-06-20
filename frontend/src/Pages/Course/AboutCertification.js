import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AboutCertification({ detailData }) {
  const data = detailData?.city_name;
  return (
    <>
      {detailData?.certification_title && (
        <div
          className="home-three-about edu-about-area edu-section-gap home-one-cat"
          id="Certification"
        >
          <div className="container eduvibe-animated-shape">
            <div className="col-lg-12">
              <div className="section-title text-start">
                <h3 className="title">
                  {data
                    ? detailData?.certification_title?.replaceAll(
                        "{{in VARCITY}}",
                        data
                      )
                    : detailData?.certification_title?.replaceAll(
                        "{{in VARCITY}}",
                        ""
                      )}
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="course-content mt--10">
                  <p
                    className="ssdn-editor-font"
                    dangerouslySetInnerHTML={{
                      __html: data
                        ? detailData?.certification?.replaceAll(
                            "{{in VARCITY}}",
                            data
                          )
                        : detailData?.certification?.replaceAll(
                            "{{in VARCITY}}",
                            ""
                          ),
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                 <LazyLoadImage
                  className="img-fluid"
                  src={detailData?.certification_image}
                  alt={detailData?.certification_image_alt_tag}
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
            <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
              <div className="shape-image shape-image-1">
                 <LazyLoadImage
                  src="assets\images\shapes\shape-03-08.png"
                  alt="Shape Thumb"
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="shape-image shape-image-2">
                 <LazyLoadImage
                  src="assets\images\shapes\shape-27.png"
                  alt="Shape Thumb"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

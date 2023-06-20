import React, { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function VideoPara() {
  const url = process.env.REACT_APP_API_BASEURL;
  const [AboutData, setAboutData] = useState([]);
  const GetAbout = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(`${url}web/about/about-company`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setAboutData(result.data);
        }
      })
  };

  useEffect(() => {
    GetAbout();
  }, []);
  return (
    <div className="edu-workshop-area eduvibe-home-three-video workshop-style-1 edu-section-gap bg-image bg-color-primary">
      <div className="container eduvibe-animated-shape">
        <div className="row gy-lg-0 gy-5 align-items-center">
          <div className="col-lg-6">
            <div className="workshop-inner">
              <div className="section-title">
                <span className="pre-title text-white">{AboutData.sub_heading}</span>
                <h3 className="title text-white">{AboutData.heading}</h3>
              </div>
              <p
                className="description ssdn-editor-font text-white"
                dangerouslySetInnerHTML={{ __html: AboutData.long_description }}
              />
            </div>
          </div>
          <div className="col-lg-6">
              {AboutData?.media_type === "image" && (
                <div className="thumbnail video-popup-wrapper">
                   <LazyLoadImage
                    className="radius-small w-100"
                    src={AboutData?.image}
                    alt="Course Images"
                    height="100%"
                    width="100%"
                  />
                </div>
              )}
              {AboutData?.media_type === "video" && (
                <>
                  {AboutData?.video_type === "media_file" ? (
                    <div
                      className="thumbnail video-popup-wrapper"
                    >
                      <video
                        controls
                        poster={AboutData?.image}
                        style={{ height: "390px" }}
                      >
                        <source src={AboutData?.video} type="video/mp4" 
                      height="100%"
                      width="100%" />
                      </video>
                    </div>
                  ) : (
                    <div
                    className="thumbnail video-popup-wrapper"
                    dangerouslySetInnerHTML={{ __html: AboutData?.video?.replaceAll(
                      `<iframe loading="lazy" width="560" height="315" `,
                      `<iframe loading="lazy" width="560" height="315px title="myFrame""`
                    ) }}
                  >
                  </div>
                  )}
                </>
              )}
          </div>
        </div>
        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
             <LazyLoadImage
              src="/assets/images/shapes/shape-09-01.png"
              alt="Shape Thumb"
              height="100%"
              width="100%"
            />
          </div>
          <div className="shape-image shape-image-2">
             <LazyLoadImage
              src="/assets/images/shapes/shape-04-05.png"
              alt="Shape Thumb"
              height="100%"
              width="100%"
            />
          </div>
          <div className="shape-image shape-image-3">
             <LazyLoadImage
              src="/assets/images/shapes/shape-13-02.png"
              alt="Shape Thumb"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

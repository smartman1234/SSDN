import React from "react";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Visa({ visa, detailData }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="row">
      {visa?.length > 0 &&
        visa?.length <= 4 &&
        visa.map((v, i) => (
          <div className="col-lg-2 col-md-6" key={i}>
            <div className="service-card service-card-2 card-bg-1">
              <div className="inner">
                <div className="icon">
                  <a href="#">
                     <LazyLoadImage
                      src={detailData.image_url + v.flag}
                      alt="Service Images"
                      height="100%"
                      width="100%"
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
                  <h6 className="title">{v.country.label}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}

      {visa?.length > 5 && (
        <>
          <div className="mt--20 edu-slick-button">
            <Slider {...settings}>
              {visa.map((v, i) => (
                <div className="col-lg-2 col-md-6 service-card service-card-2 card-bg-1" key={i}>
                  <div className="inner">
                    <div className="icon">
                      <a href="#">
                         <LazyLoadImage
                          src={detailData.image_url + v.flag}
                          alt="Service Images"
                          style={{ padding: "28px" }}
                          height="100%"
                          width="100%"
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
                      <h6 className="title">{v.country.label}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
}

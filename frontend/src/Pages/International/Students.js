import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from "react-slick";

export default function Students({ detailData, students }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    autoplay: true,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <>
        {students?.length <= 4 &&
          students.map((v, i) => (
            <div className="col-lg-3 col-md-6" key={i}>
              <div className="service-card service-card-2 card-bg-1">
                <div className="inner">
                  <div className="icon dat-help-data-base">
                    <a href="#">
                       <LazyLoadImage
                        src={detailData.image_url + v?.image}
                        alt={v.image_alt_tag}
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
                    <h6 className="title">
                      <a href="#">{v.name}</a>
                    </h6>
                    <p className="description mb--5">
                      <i className="ri-global-line me-2"></i>
                      {v.country.label}
                    </p>
                    <p className="text-center text-danger" style={{height: "50px"}}>
                      <i className="ri-book-line me-2"></i>
                    
                       {Array.isArray(v.course)?v.course.map((course, i) =>
                            course.label.replaceAll("{{in VARCITY}}", "")
                          ):v.course.replaceAll("{{in VARCITY}}", "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {students?.length > 4 && (
        <div className="col-lg-12 mt--30 edu-slick-button slick-activation-wrapper service-activation-item5 edu-slick-arrow-top">
            <Slider {...settings}>
              {students.map((v, i) => (
                <div className="col-lg-3 col-md-6" key={i}>
                  <div
                    className="service-card service-card-2 card-bg-1"
                  >
                    <div className="inner">
                      <div className="icon dat-help-data-base">
                        <a href="#">
                           <LazyLoadImage
                            src={detailData.image_url + v?.image}
                            alt={v.image_alt_tag}
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
                        <h6 className="title">
                          <a href="#">{v.name}</a>
                        </h6>
                        <p className="description mb--5">
                          <i className="ri-global-line me-2"></i>
                          {v.country.label}
                        </p>
                        <p className="text-center text-danger" style={{height: "50px"}}>
                          <i className="ri-book-line me-2"></i>
                          {Array.isArray(v.course)?v.course.map((course, i) =>
                            course.label.replaceAll("{{in VARCITY}}", "")
                          ):v.course.replaceAll("{{in VARCITY}}", "")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
        </div>
      )}
      
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import TestimonialService from "../../Services/TestimonialService";
import Utils from "../../Utils/Utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function InternationalReviews() {
  const [testimonialList, setTestimonialList] = useState([]);
  const serve = new TestimonialService();
  useEffect(() => {
    testimonialApi();
  }, []);
  const testimonialApi = async () => {
    let obj = {};
    if (window.location.pathname === "/") {
      obj["testimonial_type"] = "home";
    } else if (window.location.pathname === "/e-learning") {
      obj["testimonial_type"] = "e_learning";
    } else if (window.location.pathname === "/international-students") {
      obj["testimonial_type"] = "international";
    }
    try {
      let response = await serve.review(obj);
      if (response) {
        setTestimonialList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(82, 95, 225, 0.15)",
        }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(82, 95, 225, 0.15)",
        }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    infinite: true,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="home-one-cat edu-testimonial-area testimonial-four-wrapper edu-section-gap bg-image counterup-overlay-top">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-8">
            {/* <div className="testimonial-activation"> */}
              <div className="testimonial-card-box variation-2">
                {testimonialList?.length > 0 && (
                  <div
                    className="eduvibe-testimonial-three inner testimonial-card-activation-1 slick-arrow-style-2"
                    style={{ display: "flex" }}
                  >
                    <div className="container ssdn-testimonial-slider">
                      <Slider {...settings}>
                        {testimonialList.map((v, i) => (
                          <div className="single-card" key={i}>
                            <div className="d-flex justify-content-start">
                              {parseInt(v.review).toFixed(0) == 5 && (
                                <div className="rating">
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                </div>
                              )}
                              {parseInt(v?.review).toFixed(0) == 4 && (
                                <div className="rating">
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className="off icon-Star"></i>
                                </div>
                              )}
                              {parseInt(v.review).toFixed(0) == 3 && (
                                <div className="rating">
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className=" icon-Star off"></i>
                                  <i className=" icon-Star off"></i>
                                </div>
                              )}
                              {parseInt(v.review).toFixed(0) == 2 && (
                                <div className="rating">
                                  <i className="on icon-Star"></i>
                                  <i className="on icon-Star"></i>
                                  <i className=" icon-Star off"></i>
                                  <i className=" icon-Star off"></i>
                                  <i className=" icon-Star off"></i>
                                </div>
                              )}
                              {parseInt(v.review).toFixed(0) == 1 && (
                                <div className="rating">
                                  <i className="on icon-Star"></i>
                                  <i className="off icon-Star"></i>
                                  <i className="icon-Star off"></i>
                                  <i className="icon-Star off"></i>
                                  <i className=" icon-Star off"></i>
                                </div>
                              )}
                              {(parseInt(v.review).toFixed(0) == 0 ||
                                v.review == null) && (
                                <div className="rating">
                                  <i className="off icon-Star"></i>
                                  <i className="off icon-Star"></i>
                                  <i className="icon-Star off"></i>
                                  <i className="icon-Star off"></i>
                                  <i className=" icon-Star off"></i>
                                </div>
                              )}
                            </div>

                            {v.type === "video" ? (
                              <iframe
                                loading="lazy"
                                width="400"
                                height="200" title="myFrame"
                                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5;color:white;text-shadow:0 0 0.5em black}</style><a href=${
                                  v.discription
                                }/?autoplay=1> <LazyLoadImage loading="lazy" src=https://img.youtube.com/vi/${
                                  v.discription.split("/")?.[4]
                                }/hqdefault.jpg alt='AltTagContent'><span>▶</span></a>`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <p
                                className="description"
                                dangerouslySetInnerHTML={{
                                  __html: v.discription,
                                }}
                              />
                            )}
                            <div className="client-info">
                              <div className="thumbnail">
                                <img
                                  src={v.image}
                                  alt="Client Images"
                                  height="100%"
                                  width="100%"
                                />
                              </div>
                              <div className="content">
                                <h6 className="title">
                                  {Utils.titleCase(v.name)}
                                </h6>
                                <span className="designation">
                                  {Utils.titleCase(v.designation)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                )}
              </div>
            {/* </div> */}
          </div>
          <div className="col-lg-4 mt-5">
            <div className="testimonial-four-right-content">
              <div className="section-title text-center">
                <span className="pre-title">Testimonials</span>
                <h3 className="title">Students Feedback</h3>
              </div>
              <p className="description mt--5 mb--15 text-center">
                Happy Clients Makes us Happier
              </p>
              <h6 className="subtitle text-center">
                People Love To Learn With Us
              </h6>

              <div className="row text-center">
                <div className="col-lg-6">
                  <h6 className="feature-title">90%</h6>
                  <p className="feature-description text-center">
                    Students Complete Course Successfully
                  </p>
                </div>
                <div className="col-lg-6">
                  <h6 className="feature-title">9/10</h6>
                  <p className="feature-description text-center">
                    Users reported better learning outcomes.
                  </p>
                </div>
                <div className="col-md-12 mt-5">
                  <Link className="edu-btn" to="/testimonials">
                    View all Testimonials
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

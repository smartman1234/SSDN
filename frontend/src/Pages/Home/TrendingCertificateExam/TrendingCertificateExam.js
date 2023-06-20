import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import WeOfferService from "../../../Services/WeOfferService/WeOfferService";

export default function TrendingCertificateExam() {
  const serve = new WeOfferService();
  const [list, setList] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 3,
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

  useEffect(() => {
    ListApi();
  }, []);

  const ListApi = async () => {
    try {
      let response = await serve.trendingcertication();
      if (response) {
        setList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      {list?.length > 0 && (
        <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image">
          <div className="container eduvibe-animated-shape">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h3 className="title">
                    Trending{" "}
                    <span className="down-mark-line">Certification</span> Exam
                  </h3>
                </div>
              </div>
            </div>
            {list?.length > 0 && list?.length <= 3 && (
              <div
                className="mt--20 edu-slick-button d-flex">
                {list.map((v, i) => (
                  <div className="single-slick-card" key={i}>
                    <div className="edu-card card-type-3 radius mb--0">
                      <div className="inner">
                        <div className="content">
                          <h6 className="title">
                            <Link
                              to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                            >
                              {v.name}
                            </Link>
                          </h6>
                          <div className="card-bottom">
                            <div className="edu-rating rating-default">
                              {v.average_review == 5 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              {v.average_review == 4 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              {v.average_review == 3 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              {v.average_review == 2 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              {v.average_review == 1 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              {v.average_review == 0 ||
                                (v.average_review === null && (
                                  <div className="rating"></div>
                                ))}

                              <span className="rating-count">
                                {v.feedback_count}
                              </span>
                            </div>
                              <Link
                                className="btn-transparent"
                                to={`/vouchers/${v?.category?.slug}/${v.slug}`}rel="nofollow"
                              >
                                Read More
                              </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {list?.length > 3 && (
              <div className="mt--20 edu-slick-button">
                  <Slider {...settings}>
                    {list.map((v, i) => (
                      <div className="single-slick-card" key={i}>
                        <div className="edu-card card-type-3 radius mb--0">
                          <div className="inner">
                            <div className="content">
                              <h6 className="title">
                                <Link
                                  to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                                >
                                  {v.name}
                                </Link>
                              </h6>
                              <div className="card-bottom">
                                <div className="edu-rating rating-default">
                                  {v.average_review == 5 && (
                                    <div className="rating">
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                    </div>
                                  )}
                                  {v.average_review == 4 && (
                                    <div className="rating">
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                    </div>
                                  )}
                                  {v.average_review == 3 && (
                                    <div className="rating">
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                    </div>
                                  )}
                                  {v.average_review == 2 && (
                                    <div className="rating">
                                      <i className="icon-Star"></i>
                                      <i className="icon-Star"></i>
                                    </div>
                                  )}
                                  {v.average_review == 1 && (
                                    <div className="rating">
                                      <i className="icon-Star"></i>
                                    </div>
                                  )}
                                  {v.average_review == 0 ||
                                    (v.average_review === null && (
                                      <div className="rating"></div>
                                    ))}

                                  <span className="rating-count">
                                    {v.feedback_count}
                                  </span>
                                </div>
                                  <Link
                                    className="btn-transparent"
                                    to={`/vouchers/${v?.category?.slug}/${v.slug}`}rel="nofollow"
                                  >
                                    Read More
                                  </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

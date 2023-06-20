import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        right: "15px",
        width: "50px",
        height: "50px",
        background: "var(--color-primary)",
        boxShadow: "0px 10px 20px rgb(0 0 0 / 7%)",
        borderRadius: "5px",
        transition: "0.3s",
        color: "var(--color-primary)",
        lineHeight: "50px",
        textAlign: "center",
        border: "0 none",
        fontSize: "18px",
        top: "-49px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "80px",
        position: "absolute",
        right: "15px",
        width: "50px",
        height: "50px",
        boxShadow: "0px 10px 20px rgb(0 0 0 / 7%)",
        borderRadius: "5px",
        transition: "0.3s",
        background: "var(--color-primary)",
        lineHeight: "50px",
        textAlign: "center",
        border: "0 none",
        fontSize: "18px",
        top: "-49px",
        marginLeft: "91%",
      }}
      onClick={onClick}
    />
  );
}
export default function AssociatedCompanies() {
  const url = process.env.REACT_APP_API_BASEURL;
  const [Companies, setCompanies] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  const GetCompanies = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(`${url}web/about/our-company`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setCompanies(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetCompanies();
  }, []);
  return (
    <div className="bg-color-white edu-section-gap">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title">
                Associated <span className="down-mark-line">Companies</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="row mt--20">
          {Companies?.length >= 5 && (
            <div className="col-lg-12 edu-slick-button eduvibe-course-carousel-page-with-dots">
              <Slider {...settings}>
                {Companies.map((value, i) => (
                  <div className="single-slick-card" key={i}>
                    <LazyLoadImage
                      src={value.image}
                      alt={value.image_alt_tag}
                      height="100%"
                      width="100%"
                      className="img-thumbnail"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
          {Companies?.length < 5 && (
            <div className="col-lg-12 edu-slick-button eduvibe-course-carousel-page-with-dots d-flex">
              {Companies.map((value, i) => (
                <div className="single-slick-card" key={i}>
                  <Link to={value.url}>
                    <LazyLoadImage
                      src={value.image}
                      alt={value.image_alt_tag}
                      style={{ width: "100%" }}
                      height="100%"
                      width="100%"
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

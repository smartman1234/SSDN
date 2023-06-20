import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function RewardAndRecognisation() {
    const url = process.env.REACT_APP_API_BASEURL;
    const [Reward, setReward] = useState([]);

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
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    const GetReward = async () => {
        var requestOptions = {
            method: "GET",
        };

        fetch(`${url}web/about/reward-recognition`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    setReward(result.data);
                }
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        GetReward();
    }, []);

    return (
        <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image bg-color-white">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title">Rewards & Recognition</h3>
                        </div>
                    </div>
                </div>
                {Reward.length >= 4 && (
                    <div className="mt--40 mb--30 edu-slick-button eduvibe-course-carousel-page-with-dots">
                        <div className="container">
                            <Slider {...settings}>
                                {Reward.map((value, i) => (
                                    <div className="single-slick-card" key={i}>
                                         <LazyLoadImage
                                            src={value.image}
                                            alt={value.image_alt_tag}
                                            style={{ width: "100%" }}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                )}
                {Reward.length < 4 && (
                    <div className="mt--40 mb--30 edu-slick-button  eduvibe-course-carousel-page-with-dots">
                        <div className="container" style={{ display: "flex" }}>
                            {Reward.map((value, i) => (
                                <div className="single-slick-card" key={i}>
                                    <Link to="#">
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
                    </div>
                )}
            </div>
        </div>
    );
}

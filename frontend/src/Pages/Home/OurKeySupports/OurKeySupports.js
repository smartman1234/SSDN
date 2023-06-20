import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TrustedPartnerServices from "../../../Services/TrustedPartnerServices/TrustedPartnerServices"

export default function OurKeySupports() {
    const trustedpartnerserve = new TrustedPartnerServices()
    const [trustedpartner, setTrustedPartner] = useState([]);
    useEffect(() => {
        TrustedPartnerListApi()
    }, []);

    const TrustedPartnerListApi = async () => {
        try {
            let response = await trustedpartnerserve.trustedPartner();
            if (response) {
                setTrustedPartner(response.data);
            } else {
            }
        } catch (err) {
            throw err;
        }
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        lazyLoad: true,
        slidesToShow: 5,
        autoplay: true,
        slidesToScroll: 5,
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
    return (
        <div className="bg-color-white edu-section-gap">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title">
                                Our Trusted  <span className="down-mark-line">Partners</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {trustedpartner?.length > 3 && (
                    <div className="row mt--20 mb--30 d-flex edu-slick-button">
                        <Slider {...settings}>
                            {trustedpartner?.map((v, i) => (
                                <div className="single-slick-card" key={i}>
                                     <LazyLoadImage
                                        src={v.image}
                                        alt={v.image_alt_tag}
                                        height="100%"
                                        width="100%"
                                        className="img-thumbnail"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}
                {trustedpartner?.length <= 3 && (
                    <div className="row mt--20 mb--30 d-flex">
                        {trustedpartner?.map((v, i) => (
                            <div className="single-slick-card" key={i}>
                                 <LazyLoadImage
                                    src={v.image}
                                    alt={v.image_alt_tag}
                                    height="100%"
                                    width="100%"
                                    className="img-thumbnail"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

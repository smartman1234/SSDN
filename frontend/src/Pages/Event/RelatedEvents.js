import React from "react";
import { Link } from "react-router-dom";
import Utils from "../../Utils/Utils";
import moment from "moment";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function RelatedEvents({
    RelatedEvents,
    gettingSlugFromRelatedEvents,
}) {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        cssEase: "linear",
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
    let current = new Date();
    current = moment(current).format("ll");

    return (
        <>
            {RelatedEvents?.length > 0 && (
                <div className="home-one-cat edu-service-area edu-section-gap bg-image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h3 className="title">Related Events</h3>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    {RelatedEvents?.length > 0 &&
                                        RelatedEvents?.length <= 3 &&
                                        RelatedEvents.map((v, i) => (
                                            <div className="col-md-4" key={i}>
                                                <div className="edu-card card-type-3 radius">
                                                    <div className="inner">
                                                        <div
                                                            className="thumbnail1 ssdn-blog-image"
                                                            onClick={() =>
                                                                gettingSlugFromRelatedEvents(v.slug)
                                                            }
                                                        >
                                                            {v.date < current ? (
                                                                <LazyLoadImage  src={v.image} alt={v.image_alt_tag}
                                                                height="100%"
                                                                width="100%" />
                                                            ) : (
                                                                <Link to={`/event-details/${v.slug}`}>
                                                                    <LazyLoadImage  src={v.image} alt={v.image_alt_tag}
                                height="100%"
                                width="100%" />
                                                                </Link>
                                                            )}
                                                        </div>
                                                        <div className="content">
                                                            <h6
                                                                className="title"
                                                                onClick={() =>
                                                                    gettingSlugFromRelatedEvents(v.slug)
                                                                }
                                                            >
                                                                {v.date < current ? (
                                                                    Utils.titleCase(v.title)
                                                                ) : (
                                                                    <Link to={`/event-details/${v.slug}`}>
                                                                        {Utils.titleCase(v.title)}
                                                                    </Link>
                                                                )}
                                                            </h6>
                                                            <div className="card-bottom pb--10">
                                                                <ul className="blog-meta">
                                                                    <li>
                                                                        <i className="icon-calendar-2-line me-2"></i>
                                                                        {moment(v.date).format("ll")}
                                                                    </li>
                                                                </ul>
                                                                <ul className="blog-meta">
                                                                    <li>
                                                                        <i className="icon-time-line me-2"></i>
                                                                        {moment(v.date + " " + v.start_time).format(
                                                                            "LT"
                                                                        )}
                                                                        -{" "}
                                                                        {moment(v.date + " " + v.end_time).format(
                                                                            "LT"
                                                                        )}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="card-bottom pb--10">
                                                                <div className="read-more-btn leading-tight1">
                                                                    <i className="icon-map-pin-line me-2"></i>{" "}
                                                                    {Utils.titleCase(v.location)}
                                                                </div>
                                                            </div>{" "}
                                                            {v.date < current ? (
                                                                <div className="card-bottom justify-content-center pb--10">
                                                                    <div className="read-more-btn">
                                                                        <Link
                                                                            className="btn-transparent text-danger w-600"
                                                                            to="#"
                                                                        >
                                                                            Registration Closed
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="card-bottom">
                                                                {v.price_type === "free" ? (
                                                                    <div className="price-list price-style-02">
                                                                        <div className="price current-price">
                                                                            Free
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="price-list price-style-02">
                                                                        <div className="price current-price">
                                                                            {v.currency_symbol} {v.payable_price}
                                                                        </div>
                                                                        {v.is_inr_discount == 1 && (
                                                                            <div className="price old-price">
                                                                                {v.currency_symbol}
                                                                                {v.inr_price}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                <div
                                                                    className="read-more-btn"
                                                                    onClick={() =>
                                                                        gettingSlugFromRelatedEvents(v.slug)
                                                                    }
                                                                >
                                                                    <Link
                                                                        className="btn-transparent"
                                                                        to={`/event-details/${v.slug}`} rel="nofollow"
                                                                    >
                                                                        Read More
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            )}
                                                         
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    {RelatedEvents?.length > 3 && (
                                        <div className="mt--40 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel">
                                            <Slider {...settings}>
                                                {RelatedEvents.map((v, i) => (
                                                    <div className="single-slick-card" key={i}>
                                                        <div className="edu-card card-type-3 radius">
                                                            <div className="inner">
                                                                <div
                                                                    className="thumbnail1"
                                                                    onClick={() =>
                                                                        gettingSlugFromRelatedEvents(v.slug)
                                                                    }
                                                                >
                                                                    {v.date < current ? (
                                                                        <LazyLoadImage  src={v.image} alt={v.image_alt_tag}
                                                                        height="100%"
                                                                        width="100%" />
                                                                    ) : (
                                                                        <Link to={`/event-details/${v.slug}`}>
                                                                            <LazyLoadImage
                                                                                src={v.image}
                                                                                alt={v.image_alt_tag}
                                                                                height="100%"
                                                                                width="100%"
                                                                            />
                                                                        </Link>
                                                                    )}
                                                                </div>
                                                                <div className="content">
                                                                    <h6
                                                                        className="title"
                                                                        onClick={() =>
                                                                            gettingSlugFromRelatedEvents(v.slug)
                                                                        }
                                                                    >
                                                                        {v.date < current ? (
                                                                            Utils.titleCase(v.title)
                                                                        ) : (
                                                                            <Link to={`/event-details/${v.slug}`}>
                                                                                {Utils.titleCase(v.title)}
                                                                            </Link>
                                                                        )}
                                                                    </h6>
                                                                    <div className="card-bottom pb--10">
                                                                        <ul className="blog-meta">
                                                                            <li>
                                                                                <i className="icon-calendar-2-line me-2"></i>
                                                                                {moment(v.date).format("ll")}
                                                                            </li>
                                                                        </ul>
                                                                        <ul className="blog-meta">
                                                                            <li>
                                                                                <i className="icon-time-line me-2"></i>
                                                                                {moment(
                                                                                    v.date + " " + v.start_time
                                                                                ).format("LT")}
                                                                                -{" "}
                                                                                {moment(
                                                                                    v.date + " " + v.end_time
                                                                                ).format("LT")}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="card-bottom pb--10">
                                                                        <div className="read-more-btn leading-tight1 me-2">
                                                                            <i className="icon-map-pin-line"></i>{" "}
                                                                            {Utils.titleCase(v.location)}
                                                                        </div>
                                                                    </div>{" "}
                                                                    {v.date < current ? (
                                                                        <div className="card-bottom justify-content-center pb--10">
                                                                            <div className="read-more-btn">
                                                                                <Link
                                                                                    className="btn-transparent text-danger w-600"
                                                                                    to="#"
                                                                                >
                                                                                    Registration Closed
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                    <div className="card-bottom">
                                                                        {v.price_type === "free" ? (
                                                                            <div className="price-list price-style-02">
                                                                                <div className="price current-price">
                                                                                    Free
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="price-list price-style-02">
                                                                                <div className="price current-price">
                                                                                    {v.currency_symbol} {v.payable_price}
                                                                                </div>
                                                                                {v.is_inr_discount == 1 && (
                                                                                    <div className="price old-price">
                                                                                        {v.currency_symbol}
                                                                                        {v.inr_price}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        <div
                                                                            className="read-more-btn"
                                                                            onClick={() =>
                                                                                gettingSlugFromRelatedEvents(v.slug)
                                                                            }
                                                                        >
                                                                            <Link
                                                                                className="btn-transparent"
                                                                                to={`/event-details/${v.slug}`}rel="nofollow"
                                                                            >
                                                                                Read More
                                                                            </Link>
                                                                        </div>
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
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

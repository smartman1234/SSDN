import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaService from "../../Services/MetaServices/MetaService";

export default function Recentplacement({ data }) {
    const metaService = new MetaService();
    const [Students, setStudents] = useState([]);
    const [search, setSearch] = useState({
        start: 0,
        perPage: 5,
    });

    useEffect(() => {

        ListApi();
    }, []);

    const apiCall = async (limit, offset) => {
        try {
            let response = await metaService.studentlist(limit, offset);
            if (response) {
                setStudents(response.data);
            } else {
            }
        } catch (err) {
            throw err;
        }
    };

    const ListApi = async () => {
        await apiCall(search.perPage, search.start);
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
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
        <div className="eduvibe-home-two-blog edu-blog-area edu-section-gap bg-image">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title mb-3">
                                {data.page_description?.our_placement_title}
                            </h3>
                            <span
                                className="pre-title"
                                dangerouslySetInnerHTML={{
                                    __html: data.page_description?.our_placement_description,
                                }}
                            />
                        </div>
                    </div>
                </div>
                {Students?.length > 0 && Students?.length <= 3 && (
                    <div
                        className="mt--40 mb--30 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-carousel-page-with-dots"
                        style={{ display: "flex" }}
                    >
                        {Students.map((v, i) => (
                            <div className="single-slick-card" key={i}>
                                <div
                                    className="sal-animate"
                                    data-sal-delay="500"
                                    data-sal="slide-up"
                                    data-sal-duration="800"
                                >
                                    <div className="edu-instructor-grid edu-instructor-1">
                                        <div className="edu-instructor">
                                            <div className="inner">
                                                <div className="thumbnail">
                                                     <LazyLoadImage loading="lazy" src={v.profile} alt="team images"
                                                        height="100%"
                                                        width="100%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="edu-instructor-info">
                                            <h5 className="title">
                                                {v.name}
                                            </h5>
                                            <span className="desc">{v.designation}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {Students?.length > 3 && (
                    <div className="mt--40 mb--30 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-carousel-page-with-dots">
                        <Slider {...settings}>
                            {Students.map((v, i) => (
                                <div className="single-slick-card" key={i}>
                                    <div
                                        className="sal-animate"
                                        data-sal-delay="500"
                                        data-sal="slide-up"
                                        data-sal-duration="800"
                                    >
                                        <div className="edu-instructor-grid edu-instructor-1">
                                            <div className="edu-instructor">
                                                <div className="inner">
                                                    <div className="thumbnail">
                                                         <LazyLoadImage loading="lazy" src={v.profile} alt="team images"
                                                            height="100%"
                                                            width="100%" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="edu-instructor-info">
                                                <h5 className="title">
                                                    {v.name}
                                                </h5>
                                                <span className="desc">{v.designation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}

                <div className="row">
                    <div className="col-md-12 text-center mt--30">
                        <Link className="edu-btn" to="/recent-placementall">
                            Explore All Placed Students
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

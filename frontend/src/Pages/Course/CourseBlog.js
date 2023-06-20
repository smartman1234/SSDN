import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CourseBlog({ detailData, title }) {
    return (
        <>
            {" "}
            {(title[0] || title[1] || title[2]) && (
                <div className="edu-service-area service-wrapper-1 edu-section-gap bg-image">
                    <div className="wrapper">
                        <div className="container eduvibe-animated-shape">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    <div className="section-title text-center">
                                        <span className="pre-title">Latest From News</span>
                                        <h3 className="title">Get Our Every News & Blog</h3>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="row mt--30 mb--30 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-event-one-carousel-wrapper"
                                style={{ display: "flex" }}
                            >
                                {detailData.map((v, i) => {
                                    return v.title ? (
                                        <div className="col-lg-4 col-md-6" key={i}>
                                            <div className="edu-blog blog-type-2 radius">
                                                <div className="inner">
                                                    <div className="thumbnail">
                                                        <a target="_blank" href={v.link}>
                                                            <LazyLoadImage
                                                                src={v.image}
                                                                alt="Blog Images"
                                                                className="img-thumbnail"
                                                                height="100%"
                                                                width="100%"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <h5 className="title">
                                                            <a
                                                                target="_blank"
                                                                className="leading-tight2"
                                                                href={`${v.link}`}
                                                            >
                                                                {v.title}
                                                            </a>
                                                        </h5>
                                                        <div className="blog-card-bottom">
                                                            <p className="mb-0">
                                                                <i className="icon-calendar-2-line"></i>
                                                                {v.date}
                                                            </p>
                                                            <a
                                                                className="btn-transparent"
                                                                target="_blank"
                                                                href={`${v.link}`} rel="nofollow"
                                                            >
                                                                Read More
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

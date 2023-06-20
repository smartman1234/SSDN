import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";

export default function CourseCategoryBlog({ gettingMainCategoryData, title }) {
    useEffect(() => {
        blogData();
    }, []);

    const blogData = () => { };

    return (
        <>
            {(title?.[0] || title?.[1] || title?.[2]) && (
                <div className="eduvibe-home-two-blog edu-blog-area edu-section-gap bg-image">
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
                                className="row mt--30 mb--30 edu-slick-button slick-activation-wrapper"
                                style={{ display: "flex" }}
                            >
                                {gettingMainCategoryData?.map((v, i) => {
                                    return v.title ? (
                                        <div class="col-lg-4 col-md-6 mb-5" key={i}>
                                            <div class="edu-blog blog-type-2 bg-white radius">
                                                <a href={`${v.link}`}>
                                                    <div class="inner ssdn-blog">
                                                        <LazyLoadImage
                                                            src={v.image}
                                                            alt="Blog Images"
                                                            className="img-thumbnail"
                                                            height="100%"
                                                            width="100%"
                                                        />
                                                        <div class="content">
                                                            <h6 class="title leading-tight2">{v.title}</h6>
                                                            <div class="blog-card-bottom">
                                                                <p class="mb-0"><i class="icon-calendar-2-line me-3"></i>{v.date}</p>
                                                                <p class="mb-0 btn-transparent">Read More</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
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

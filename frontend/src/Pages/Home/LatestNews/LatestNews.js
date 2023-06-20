import React, { useState, useEffect } from "react";
import MetaService from "../../../Services/MetaServices/MetaService";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function LatestNews() {
    const metaService = new MetaService();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getPageBlock("home");
    }, []);

    const getPageBlock = async () => {
        try {
            let response = await metaService.blogs("home");
            if (response.status === "success") {
                setBlogs(response.data);
            }
        } catch (err) {
            throw err;
        }
    };
    return (
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
                    <div className="row mt--20">
                        {blogs.length > 0 &&
                            blogs.map((v, i) => (
                                <div className="col-lg-4 col-md-6 mb-5" key={i}>
                                    <div className="edu-blog blog-type-2 bg-white radius">
                                        <Link to={v.link}>
                                            <div className="inner ssdn-blog">
                                                 <LazyLoadImage
                                                    src={v.image}
                                                    alt="Blog Images"
                                                    height="100%"
                                                    width="100%"
                                                />
                                                <div className="content">
                                                    <h6 className="title">
                                                        {v.title}
                                                    </h6>
                                                    <div className="blog-card-bottom">
                                                        <p className="mb-0">
                                                            <i className="icon-calendar-2-line me-3"></i>{v.created_date}
                                                        </p>
                                                        <p className="mb-0 btn-transparent">Read More</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { Link } from "react-router-dom";

export default function LearningOpportunies({ data }) {
    return (
        <div
            className="home-one-cat edu-about-area about-style-1 edu-section-gap"
        >
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title">
                                {data?.page_description?.our_learning_title}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="row mt--30">
                    <div className="col-lg-4 mb--20">
                        <div className="service-card service-card-4">
                            <div className="inner">
                                <div className="icon">
                                    <i className="icon-student-read"></i>
                                </div>
                                <div className="content">
                                    <h6 className="title">
                                        <Link to="#">
                                            {data?.page_description?.learning_1_title}
                                        </Link>
                                    </h6>
                                    <p
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: data?.page_description?.learning_1_description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb--20">
                        <div className="service-card service-card-4">
                            <div className="inner">
                                <div className="icon">
                                    <i className="icon-student-read"></i>
                                </div>
                                <div className="content">
                                    <h6 className="title">
                                        <Link to="#">{data?.page_description?.learning_2_title}</Link>
                                    </h6>
                                    <p
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: data?.page_description?.learning_2_description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb--20">
                        <div className="service-card service-card-4">
                            <div className="inner">
                                <div className="icon">
                                    <i className="icon-student-read"></i>
                                </div>
                                <div className="content">
                                    <h6 className="title">
                                        <Link to="#">{data?.page_description?.learning_3_title}</Link>
                                    </h6>
                                    <p
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: data?.page_description?.learning_3_description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

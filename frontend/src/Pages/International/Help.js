import React from 'react'
import { Link } from "react-router-dom";

export default function Help({ detailData }) {
    return (
        <div
            className="home-three-about edu-about-area edu-section-gap"
            id="meal"
        >
            <div className="container eduvibe-animated-shape">
                <div className="row eduvibe-about-one-service ">
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="service-card service-card-3 shape-bg-1"
                            style={{ height: "350px" }}
                        >
                            <div className="inner">
                                <div className="icon">
                                    <Link to="#">
                                        <i className="icon-Destination"></i>
                                    </Link>
                                </div>
                                <div className="content">
                                    <h6 className="title">
                                        Meal
                                    </h6>
                                    <p
                                        className="ssdn-editor-font1"
                                        dangerouslySetInnerHTML={{ __html: detailData.meal }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div
                            className="service-card service-card-3 shape-bg-2"
                            style={{ height: "350px" }}
                        >
                            <div className="inner">
                                <div className="icon">
                                    <Link to="#">
                                        <i className="icon-Browser"></i>
                                    </Link>
                                </div>
                                <div className="content">
                                    <h6 className="title">
                                        Currency Change
                                    </h6>
                                    <p
                                        className="ssdn-editor-font1"
                                        dangerouslySetInnerHTML={{
                                            __html: detailData.currency_changes,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div
                            className="service-card service-card-3 shape-bg-3"
                            style={{ height: "350px" }}
                        >
                            <div className="inner">
                                <div className="icon">
                                    <Link to="#">
                                        <i className="icon-Lock"></i>
                                    </Link>
                                </div>
                                <div className="content">
                                    <h6 className="title">
                                        Help Desk
                                    </h6>
                                    <p
                                        className="ssdn-editor-font1"
                                        dangerouslySetInnerHTML={{ __html: detailData.help_desk }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

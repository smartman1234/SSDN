import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Transportation({ detailData }) {
    return (
        <div className="home-three-about edu-about-area edu-section-gap">
            <div className="container eduvibe-animated-shape">
                <div className="row align-items-center">
                    <div className="section-title text-center">
                        <h3 className="title">Transportation</h3>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-image-gallery">
                            <LazyLoadImage
                                className="img-fluid"
                                src="https://templates.iqonic.design/vizion/chatbot/images/about/about-img.gif"
                                alt="image"
                                height="100%"
                                width="100%"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="inner about-feature-list">
                            <p
                                className=" mb-5 mt-3"
                                dangerouslySetInnerHTML={{
                                    __html: detailData.transportation,
                                }}
                            />
                            <div className="our-feature">
                                <div className="icon">
                                    <i className="icon-Hand---Book"></i>
                                </div>
                                <div className="feature-content">
                                    <h6 className="feature-title">Buses</h6>
                                    <p
                                        className="feature-description"
                                        dangerouslySetInnerHTML={{
                                            __html: detailData.transportation_bus,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="our-feature">
                                <div className="icon">
                                    <i className="icon-Campus"></i>
                                </div>
                                <div className="feature-content">
                                    <h6 className="feature-title">Metro</h6>
                                    <p
                                        className="feature-description"
                                        dangerouslySetInnerHTML={{
                                            __html: detailData.transportation_metro,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="our-feature">
                                <div className="icon">
                                    <i className="icon-Campus"></i>
                                </div>
                                <div className="feature-content">
                                    <h6 className="feature-title">Cabs/Taxi</h6>
                                    <p
                                        className="feature-description"
                                        dangerouslySetInnerHTML={{
                                            __html: detailData.transportation_cab,
                                        }}
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

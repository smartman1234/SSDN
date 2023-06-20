import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const EnqueryNow = React.lazy(() => import("../EnqueryNow/EnqueryNow"));

export default function WhyChooseUs({ data }) {
    const [active, setActive] = useState(false);
    return (
        <div>
            <div className="edu-service-area service-wrapper-1 edu-section-gap bg-image video-style-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mb-3">
                            <div className="section-title text-center">
                                <span className="pre-title">
                                    {data?.page_description?.your_intent_title}
                                </span>
                                <h3 className="title mb-5">
                                    {data?.page_description?.why_choose_us_title}
                                </h3>
                                <div className="meter">
                                    <span style={{ width: "50%" }}>
                                        <span className="progress"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="m-auto col-lg-12 col-md-12 col-sm-12">
                            <p className="text-center">{data?.page_description?.we_take_pride_title}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-3">
                            <div className="section-title text-center">
                                <h3 className="title">
                                    {data?.page_description?.post_training_title_1} -
                                    <span className="color_text">
                                        {" "}
                                        {data?.page_description?.post_training_title_2}
                                    </span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 mb-3 about-feature-list">
                            <div className="our-feature">
                                <div className="icon">
                                    <i className="icon-Hand---Book"></i>
                                </div>
                                <div className="feature-content">
                                    <h6 className="feature-title">
                                        {data?.page_description?.traning_card_1_title}
                                    </h6>
                                    <p
                                        className="feature-description"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.page_description?.traning_card_1_description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 about-feature-list">
                            <div className="our-feature">
                                <div className="icon">
                                    <i className="icon-Campus"></i>
                                </div>
                                <div className="feature-content">
                                    <h6 className="feature-title">
                                        {data?.page_description?.traning_card_2_title}
                                    </h6>
                                    <p
                                        className="feature-description"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.page_description?.traning_card_2_description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center mt-4">
                            <button
                                className="edu-btn"
                                data-bs-target="#exampleModal"
                                data-bs-toggle="modal"
                                onClick={() => setActive(true)}
                            >
                                Enquiry now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="side-shape-image d-lg-block d-none">
                     <LazyLoadImage
                        src="/assets/images/videopopup/video-infinite-rotate-min.png"
                        alt="Shape Images"
                        height="100%"
                        width="100%"
                    />
                </div>
            </div>{" "}
            {active ? (
        <React.Suspense fallback="">
          <EnqueryNow active={active} setActive={setActive} />
        </React.Suspense>
      ) : (
        ""
      )}
        </div>
    );
}

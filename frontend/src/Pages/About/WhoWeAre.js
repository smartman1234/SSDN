import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AboutService from "../../Services/AboutusServices/AboutService";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function WhoWeAre() {
    const [activebutton, setActiveButton] = useState(0);
    const [data, setData] = useState({});
    const aboutServe = new AboutService();

    const Activehandler = (id) => {
        setActiveButton(id);
    };

    useEffect(() => {
        whoWeAreApi();
    }, []);

    const whoWeAreApi = async () => {
        try {
            let response = await aboutServe.whoweare();
            if (response) {
                setData(response.data);
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="home-three-about edu-about-area about-style-4 bg-color-white edu-section-gap">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12 course-details-content">
                        <ul
                            className="edu-course-tab nav nav-tabs justify-content-center"
                        >
                            <li className="nav-item mb--10">
                                <button
                                    className={
                                        activebutton === 0 ? "nav-link active" : "nav-link"
                                    }
                                    type="button"
                                    onClick={() => Activehandler(0)}
                                >
                                    Who we are
                                </button>
                            </li>
                            <li className="nav-item mb--10">
                                <button
                                    className={
                                        activebutton === 1 ? "nav-link active" : "nav-link"
                                    }
                                    type="button"
                                    onClick={() => Activehandler(1)}
                                >
                                    Our Mission
                                </button>
                            </li>
                            <li className="nav-item mb--10">
                                <button
                                    className={
                                        activebutton === 2 ? "nav-link active" : "nav-link"
                                    }
                                    onClick={() => Activehandler(2)}
                                >
                                    Our Vision
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content mt--20" id="myTabContent">
                            <div
                                className={
                                    activebutton === 0
                                        ? "tab-pane fade show active"
                                        : "tab-pane fade"
                                }
                            >
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <h5>{data?.who_we_are_title}</h5>
                                        <div className="section-title text-start ssdn-editor-font"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.who_we_are_description,
                                            }}
                                        >
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                         <LazyLoadImage
                                            className="img-fluid"
                                            src={data?.who_we_are_image}
                                            alt={data?.who_alt_tag}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    activebutton === 1
                                        ? "tab-pane fade show active"
                                        : "tab-pane fade"
                                }
                            >
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                         <LazyLoadImage
                                            className="img-fluid"
                                            src={data?.mission_image}
                                            alt={data?.mission_alt_tag}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <h5>{data?.mission_title}</h5>
                                        <div className="section-title text-start ssdn-editor-font"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.mission_description,
                                            }}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    activebutton === 2
                                        ? "tab-pane fade show active"
                                        : "tab-pane fade"
                                }
                            >
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <h5>{data?.vision_title}</h5>
                                        <div className="section-title text-start ssdn-editor-font">
                                            <p
                                                className="mt--30 mb--0"
                                                dangerouslySetInnerHTML={{
                                                    __html: data?.vision_description,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                         <LazyLoadImage
                                            className="img-fluid"
                                            src={data?.vision_image}
                                            alt={data?.vision_alt_tag}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

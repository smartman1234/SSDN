import React from "react";
import Goal from "./Goal";
const Students = React.lazy(() => import("./Students"));
const Visa = React.lazy(() => import("./Visa"));

export default function VisaHelpDesk({ detailData, visa, students }) {
    return (
        <>
            {" "}
            <div
                className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white"
                id="visa"
            >
                <div className="container eduvibe-animated-shape">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title mb--10">Visa Help Desk</h3>
                            <p dangerouslySetInnerHTML={{ __html: detailData.help_desk }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat">
                <div className="container eduvibe-animated-shape">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title mb--10">Visa on Arrival</h3>
                            <p
                                dangerouslySetInnerHTML={{ __html: detailData.visa_on_arrival }}
                            />
                        </div>
                    </div>
                    <React.Suspense fallback="">
                        <Visa visa={visa} detailData={detailData} />
                    </React.Suspense>

                </div>
            </div>
            <div
                className="edu-contact-us-area eduvibe-contact-us edu-section-gap"
                id="internationalstudent"
            >
                <div className="container eduvibe-animated-shape">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title mb--10">A Few of Our Learners</h3>
                            <p dangerouslySetInnerHTML={{
                                    __html: detailData.our_learner_description,
                                }}
                            />
                        </div>
                    </div>
                    <React.Suspense fallback="Loading...">
                        <Students detailData={detailData} students={students} />
                    </React.Suspense>

                    <Goal detailData={detailData} />
                </div>
            </div>
        </>
    );
}

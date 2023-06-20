import React, { useEffect, useState } from "react";
import GetInTouchService from "../../Services/ContactServices/GetInTouchService";


const QueryForm = React.lazy(() =>
    import("./QueryForm")
);

export default function GetInTouch() {
    const [data, setData] = useState({});
    const [working, setWorking] = useState([]);
    const contactServe = new GetInTouchService();
    useEffect(() => {
        getInTouchApi();
    }, []);

    const getInTouchApi = async () => {
        let response = await contactServe.getintouch();
        if (response) {
            setData(response.data);
            let arr;
            arr = JSON.parse(response.data?.working || "[]");
            setWorking(arr);
        } else {
        }
        try {
        } catch (err) {
            throw err;
        }
    };
    return (
        <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <span className="pre-title">Need Help?</span>
                            <h3 className="title">Get In Touch With us</h3>
                        </div>
                    </div>
                </div>
                <div className="row mt--30">
                    <div className="col-lg-6">
                        <div className="contact-info">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="contact-address-card-1">
                                        <div className="icon">
                                            <i className="ri-phone-line"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="title">{data?.contact_title}</h6>
                                            {JSON.parse(data?.contact_numbers || "[]").map(
                                                (v, i) => (
                                                    <p key={i}>
                                                        <a href={`tel:+91-${v}`}>+91-{v}</a>
                                                    </p>
                                                )
                                            )}

                                            <p>
                                                <a
                                                    href={`skype:${data?.skype_id}?userinfo`}
                                                    target="_blank"
                                                >
                                                    {data?.skype_id}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="contact-address-card-1">
                                        <div className="icon">
                                            <i className="ri-mail-open-line"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="title">{data?.email_title}</h6>
                                            {JSON.parse(data?.contact_emails || "[]").map(
                                                (v, i) => (
                                                    <p key={i}>
                                                        <a href={`mailto:${v}`}>{v}</a>
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="contact-address-card-1">
                                        <div className="icon">
                                            <i className="ri-alarm-line"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="title">{data?.working_title}</h6>
                                            <p>{working[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <React.Suspense fallback="">
                            <QueryForm />
                        </React.Suspense>

                    </div>
                </div>

            </div>
        </div>
    );
}

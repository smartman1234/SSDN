import React ,{useState,useEffect}from "react";
import LetushelpService from "../../../Services/LetUsHelpService";

export default function LetUsHelp() {
    const [data, setData] = useState({});
    const contactServe = new LetushelpService();

    useEffect(() => {
        LetUsHelpApi();
    }, []);

    const LetUsHelpApi = async () => {
        try {
            let response = await contactServe.contact();
            if (response.status === "success") {
                setData(response.data);
            }
        } catch (err) {
            throw err;
        }
    };
    return (
        <div className="bg-image newsletter-style-3 edu-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-title">
                            <span className="pre-title text-white">Let Us Help</span>
                            <h3 className="title text-white">
                                Pick the right <span className="down-mark-line">Courses</span> for you
                            </h3>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="newsletter-right-content d-flex justify-content-between text-center">
                            <div className="contact-btn mb-4">
                                <span className="text-white d-block">
                                    For Call
                                </span>
                                <a
                                    className="edu-btn btn-white mt-3"
                                    href={`tel:${data.contact_number}`}
                                >
                                    <i className="icon-phone-line"></i> +91 {data.contact_number}
                                </a>
                            </div>
                            <div className="contact-btn mb-4">
                                <span className="text-white d-block">
                                    For Whatsapp Chat
                                </span>
                                <a target="_blank" href={`https://wa.me/${data.contact_whatsapp_number}`} className="edu-btn btn-white mt-3">
                                    <i className="ri-whatsapp-line"></i> +91 {data.contact_whatsapp_number}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

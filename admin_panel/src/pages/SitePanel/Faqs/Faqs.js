import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import FaqsList from "./FaqsList";

function Faqs() {
    const name = (
        <Link to="/faq-add" className="btn btn-primary">
        <i className="fa-solid fa-plus me-2"></i>Add Faqs
        </Link>
    );
    return (
        <div className="page-body">
            <Breadcrumb heading="Faqs" add={name}/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <FaqsList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faqs;

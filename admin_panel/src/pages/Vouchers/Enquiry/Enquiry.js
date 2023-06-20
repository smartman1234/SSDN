import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import EnquiryList from "./EnquiryList";

function Enquiry() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Enquiry List"/>  
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <EnquiryList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Enquiry;

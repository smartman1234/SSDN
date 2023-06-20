import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import ContactUsStripEditForm from "./ContactUsStripWiseEditForm";

function ContactUsStrip() {
    
    return (
        <div className="page-body">
            <Breadcrumb heading="Contact Us Strip"/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <ContactUsStripEditForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUsStrip;

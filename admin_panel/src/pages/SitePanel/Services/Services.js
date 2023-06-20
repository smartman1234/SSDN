import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import ServicesList from "./ServicesList";

function Services() {
    const name = (
        <Link to="/service-add" className="btn btn-primary">
        <i className="fa-solid fa-plus me-2"></i>Add Service
        </Link>
    );
    return (
        <div className="page-body">
            <Breadcrumb heading="Services" add={name}/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <ServicesList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;

import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import ServicesAddForm from "./ServiceAddForm";

function ServicesAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Add Service" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <ServicesAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesAdd;

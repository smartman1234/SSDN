import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import OurCompanyAdd from "./OurCompanyAdd";

function OurCompany() {
    return (
        <div className="page-body">
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <OurCompanyAdd />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurCompany;

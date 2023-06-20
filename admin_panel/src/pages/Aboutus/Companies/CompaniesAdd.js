import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import CompaniesAddForm from "./CompaniesAddForm";

function CompaniesAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading=" Companies " /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <CompaniesAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompaniesAdd;



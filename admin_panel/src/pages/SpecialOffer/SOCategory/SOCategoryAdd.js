import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import SOCategoryForm from "./SOCategoryForm";

function EventManagementList() {
    return (
        <div className="page-body">
        <Breadcrumb heading="Add Offer" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <SOCategoryForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventManagementList;

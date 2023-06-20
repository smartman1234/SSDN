import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import EventManagementCategoryAddForm from "./EventManagementCategoryAddForm";

function EventManagementCategoryAdd() {
    return (
        <div className="page-body">
        <Breadcrumb heading="Add Event Category" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <EventManagementCategoryAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventManagementCategoryAdd;

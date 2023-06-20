import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import EventManagementListForm from "./EventManagementListForm";

function EventManagementList() {
    return (
        <div className="page-body">
        <Breadcrumb heading="Add Event" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <EventManagementListForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventManagementList;

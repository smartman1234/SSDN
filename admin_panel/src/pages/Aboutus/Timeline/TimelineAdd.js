import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import TimelineAddForm from "./TimelineAddForm";

function TimelineAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Add Timeline " /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <TimelineAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimelineAdd;

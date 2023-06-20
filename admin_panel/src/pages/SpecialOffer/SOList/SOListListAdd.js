import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import SOListListForm from "./SOListListForm";

function EventManagementList() {
    return (
        <div className="page-body">
        <Breadcrumb heading="Add Special Offer" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <SOListListForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventManagementList;

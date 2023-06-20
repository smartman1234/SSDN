import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import ClientAddForm from "./ClientAddForm";

function ClientAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Add Clients " /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <ClientAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientAdd;

import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import FaqAddForm from "./FaqAddForm";

function FaqAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Add Faq" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <FaqAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FaqAdd;

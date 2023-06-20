import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import SOListList from "./SOListList";

function Testimonials() {
    const name = (
        <Link to="/special-offer-list-add" className="btn btn-primary">
        <i className="fa-solid fa-plus me-2"></i>Add Offer

        </Link>
    );
    return (
        <div className="page-body">
            <Breadcrumb heading="Special Offer List" add={name}/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <SOListList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;

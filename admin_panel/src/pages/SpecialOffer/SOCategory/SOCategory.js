import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import EventManagementListList from "./SOCategoryList";

function Testimonials() {
    const name = (
        <Link to="/special-offer-category-add" className="btn btn-primary">
        <i className="fa-solid fa-plus me-2"></i>Add Offer Category

        </Link>
    );
    return (
        <div className="page-body">
            <Breadcrumb heading="Sepecial Offer Category List" add={name}/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <EventManagementListList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;

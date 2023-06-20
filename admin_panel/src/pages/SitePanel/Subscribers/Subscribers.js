import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import SubscribersList from "./SubscribersList";

function Subscribers() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Subscribers"/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <SubscribersList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscribers;

import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";
import GetInTouchList from "./GetInTouchList";

function GetInTouch() {
    
    return (
        <div className="page-body">
            <Breadcrumb heading="Get In Touch"/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <GetInTouchList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetInTouch;

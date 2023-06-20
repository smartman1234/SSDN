import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import MetaTagList from "./MetaTagList";

function MetaTag() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Meta Tag"/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <MetaTagList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MetaTag;

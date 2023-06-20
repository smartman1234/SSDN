import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import GalleryAddForm from "./GalleryAddForm";

function GalleryAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Add Gallery " /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <GalleryAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryAdd;

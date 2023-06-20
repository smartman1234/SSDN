import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import TestimonialsAddForm from "./TestimonialAddForm";

function TestimonialsAdd() {
    return (
        <div className="page-body">
        <Breadcrumb heading="Add Testimonial" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <TestimonialsAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonialsAdd;

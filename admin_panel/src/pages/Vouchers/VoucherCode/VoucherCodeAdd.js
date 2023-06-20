import React from "react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import VoucherCodeAddForm from "./VoucherCodeAddForm";

function VoucherCodeAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Add Role" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <VoucherCodeAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherCodeAdd;

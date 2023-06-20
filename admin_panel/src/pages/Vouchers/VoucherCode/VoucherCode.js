import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import RoleList from "./VoucherCodeList";

function VoucherCode() {
    const name = (
        <Link to="/voucher-code-add" className="btn btn-primary">
          <i className="fa-solid fa-plus me-2"></i>Add Voucher Code
        </Link>
    );
    return (
        <div className="page-body">
            <Breadcrumb heading="Voucher Code" add={name}/>  
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <RoleList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherCode;

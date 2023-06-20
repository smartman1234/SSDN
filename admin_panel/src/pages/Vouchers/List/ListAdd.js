import React from "react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import ListAddForm from "./ListAddForm";
import { Link } from "react-router-dom";

function ListAdd() {
    const name = (
        <Link to="/vouchers-list">
          <button className="btn btn-primary" id="nextBtn" type="button">
            Back
          </button>
        </Link>
      );
    return (
        <div className="page-body">
            <Breadcrumb heading="Voucher" add={name}/> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <ListAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListAdd;

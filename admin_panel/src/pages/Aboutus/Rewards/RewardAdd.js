import React from "react";
import { Context } from "../../../container/Context";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import RewardAddForm from "./RewardAddForm";

function RewardAdd() {

    return (
        <div className="page-body">
            <Breadcrumb heading="Add Rewards " /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <RewardAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardAdd;

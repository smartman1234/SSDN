import React from "react";
import { Link } from "react-router-dom";
const RoleAddForm = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Add Role</h5>
                </div>
                <form className="form theme-form">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Role Name <span className="text-danger">*</span></label>
                                <input className="form-control" id="rolename" name="rolename" type="text" placeholder="Enter role name" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Role Description (Please add text editor here) <span className="text-danger">*</span></label>
                                <textarea className="form-control" id="roled" name="roled" placeholder="Enter role description" ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-end">
                        <button className="btn btn-primary me-2" type="submit">Submit</button>
                        <button className="btn btn-danger" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RoleAddForm;
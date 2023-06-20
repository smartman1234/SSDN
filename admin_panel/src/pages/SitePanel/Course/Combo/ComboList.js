import React from "react";
import { Link } from "react-router-dom";
const ComboList = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Combo Course List</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card o-hidden border-0">
                                <table className="table display dataTable">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Sr. No.</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Course Mapped</th>
                                            <th scope="col">Active</th>
                                            <th scope="col" className="text-center">Last Modified By</th>
                                            <th scope="col" className="text-center">Last Modified Date</th>
                                            <th scope="col" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className="text-center">1</th>
                                            <td>Super Admin</td>
                                            <td>THe role will be</td>
                                            <td>
                                                <div className="checkbox checkbox-primary">
                                                    <input id="checkbox-primary" type="checkbox" />
                                                </div>
                                            </td>
                                            <td className="text-center">Developer</td>
                                            <td className="text-center">12-01-2022 08:12 AM</td>
                                            <td className="text-center">
                                                <Link to="/role-edit" className="btn btn-outline-primary btn-sm me-2" title="Edit Voucher">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <a href="#" className="btn btn-outline-danger btn-sm" title="Delete Voucher"><i className="fa-solid fa-trash-can"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>                                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComboList;
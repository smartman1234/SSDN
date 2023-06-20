import React from "react";
import { Link } from "react-router-dom";
const FaqsList = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Faqs List</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card o-hidden border-0">
                                <table className="table display dataTable">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Sr. No.</th>
                                            <th scope="col">Course</th>
                                            <th scope="col">Question</th>
                                            <th scope="col" className="text-center">Last Modified By</th>
                                            <th scope="col" className="text-center">Last Modified Date</th>
                                            <th scope="col" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className="text-center">1</th>
                                            <td>Training</td>
                                            <td>Developer</td>
                                            <td className="text-center">Owner</td>
                                            <td className="text-center">12-01-2022 08:12 AM</td>
                                            <td className="text-center">
                                                <Link to="/services-edit" className="btn btn-outline-primary btn-sm me-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <Link to="#" className="btn btn-outline-danger btn-sm"><i className="fa-solid fa-trash-can"></i></Link>
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

export default FaqsList;
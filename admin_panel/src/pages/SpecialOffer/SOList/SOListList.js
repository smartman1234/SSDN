import React from "react";
import { Link } from "react-router-dom";
const TestimonialsList = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Special Offer List</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card o-hidden border-0">
                                <table className="table display dataTable">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Sr. No.</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Category</th>
                                            <th scope="col" className="text-center">Date</th>
                                            <th scope="col" className="text-center">Active</th>
                                            <th scope="col" className="text-center">Featured</th>
                                            <th scope="col" className="text-center">Last Modified By</th>
                                            <th scope="col" className="text-center">Last Modified Date</th>
                                            <th scope="col" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className="text-center">1</th>
                                            <td>Reatil</td>
                                            <td>Cloud COmputing</td>
                                            <td className="text-center">12-01-2022</td>
                                            <td className="text-center">
                                                <div className="checkbox checkbox-primary">
                                                    <input id="checkbox-primary-1" type="checkbox" />
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <div className="checkbox checkbox-primary">
                                                    <input id="checkbox-primary-1" type="checkbox" />
                                                </div>
                                            </td>
                                            <td className="text-center">Developer</td>
                                            <td className="text-center">12-01-2022 08:12 AM</td>
                                            <td className="text-center">
                                                <Link to="/testimonials-edit" className="btn btn-outline-primary btn-sm me-2">
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

export default TestimonialsList;
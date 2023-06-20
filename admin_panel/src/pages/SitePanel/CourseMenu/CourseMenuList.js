import React from "react";
import { Link } from "react-router-dom";
const CourseMenuList = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Course Menu List</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card o-hidden border-0">
                                <table className="table display dataTable">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Sr. No.</th>
                                            <th scope="col">Label</th>
                                            <th scope="col">Mapped to</th>
                                            <th scope="col">Active</th>
                                            <th scope="col" className="text-center">Last Modified By</th>
                                            <th scope="col" className="text-center">Last Modified Date</th>
                                            <th scope="col" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Training</td>
                                            <td>Developer</td>
                                            <td>
                                                <div className="checkbox checkbox-primary">
                                                    <input id="checkbox-primary-1" type="checkbox" />
                                                </div>
                                            </td>
                                            <td>Owner</td>
                                            <td>12-01-2022 08:12 AM</td>
                                            <td>
                                                
                                                <Link to="#" className="btn btn-outline-primary btn-sm me-2" data-bs-toggle="modal" data-original-title="test" data-bs-target="#exampleModal">
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

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Course Menu</h5>
                            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label className="form-label">Menu Label <span className="text-danger">*</span></label>
                                    <input className="form-control" id="course" name="course" type="text" placeholder="Enter menu label" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="form-label">Menu Type <span className="text-danger">*</span></label>
                                    <select className="form-select">
                                        <option selected={false} disabled>Select menu type</option>
                                        <option>Brand</option>
                                        <option>Topic</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="form-label">Menu URL <span className="text-danger">*</span></label>                                
                                    <input className="form-control" id="question" name="question" type="text" placeholder="Enter menu url" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" type="button" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-secondary" type="button">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CourseMenuList;
import React from "react";
import { Link } from "react-router-dom";
const VoucherCodeList = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Voucher Code</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card o-hidden border-0">
                                <table className="table display dataTable">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Sr. No.</th>
                                            <th scope="col" className="text-center">Action</th>
                                            <th scope="col">Group Name</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Total Code</th>
                                            <th scope="col">Available Code</th>
                                            <th scope="col">Sold Code</th>
                                            <th scope="col">Revenue</th>
                                            <th scope="col">Expire</th>
                                            <th scope="col">Add Voucher Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>
                                                <Link to="/role-edit" className="btn btn-outline-primary btn-sm me-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <a href="#" className="btn btn-outline-danger btn-sm"><i className="fa-solid fa-trash-can"></i></a>
                                            </td>
                                            <td>LInux RHCE</td>
                                            <td>13000</td>
                                            <td>2</td>
                                            <td>
                                                <Link to="#" className="btn btn-outline-primary btn-sm">
                                                    0
                                                </Link>
                                            </td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>
                                                <Link to="#" className="btn btn-outline-danger btn-sm">
                                                    Epire after 60 or more days 
                                                </Link>
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

export default VoucherCodeList;
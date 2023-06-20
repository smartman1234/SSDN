import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Utils from "../../utils/Utils";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import ReactPaginate from "react-paginate";
import ManageUserService from "../../Services/ManageUserService/ManageUserService";
import ChangePassword from "./Changepassword";
import AssignTask from "./AssignTask";
import moment from "moment";

function UserTransaction({ id }) {
  const params = useParams();
  const serve = new ManageUserService();
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    CategoryListApi();
  }, [search]);

  function searchCategoryList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    CategoryListApi();
  }

  const apiCall = async (activity) => {
    try {
      let response = await serve.usertransactionlist(activity);
      if (response) {
        setCategoryList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const CategoryListApi = async () => {
    let activity = {
      user_id: params.id,
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search.perPage;
    setOffset(currentPage);
    let activity = {
      user_id: params.id,
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const toggleHandler = async (data) => {
    const obj = {
      user_id: data.id,
      status: data.status === "active" ? "inactive" : "active",
    };
    try {
      const res = await serve.status(obj);
      if (res.status === "success") {
        CategoryListApi();
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };
  const name = (
    <Link to="/manage-user" className="btn btn-outline-primary btn-sm me-2">
      back
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb heading=" User History" add={name} />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>User History</h5>
              </div>
              <div className="card-body">
                <div className="">
                  <div
                    id="basic-1_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <div id="basic-1_filter" className="dataTables_filter">
                      <label>
                        Search:
                        <input
                          type="search"
                          className=""
                          placeholder="Search..."
                          aria-controls="basic-1"
                          data-bs-original-title=""
                          onChange={(e) => searchCategoryList(e)}
                          title=""
                        />
                      </label>
                    </div>
                    <table
                      className="display dataTable no-footer"
                      id="basic-1"
                      role="grid"
                      aria-describedby="basic-1_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            style={{ width: "50.725px" }}
                            className="text-center"
                          >
                            S.no.
                          </th>
                          <th style={{ width: "30%" }}>Purchase History</th>
                          <th style={{ width: "172.725px" }}>Date</th>
                          <th style={{ width: "172.725px" }}>Transactions</th>
                          <th style={{ width: "250.938px" }}>payment Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryList?.length > 0 ? (
                          categoryList?.map((v, i) => {
                            return (
                              <tr
                                role="row"
                                className="odd align-middle"
                                key={i}
                              >
                                <td className="text-center">
                                  {i + offset + 1}
                                </td>
                                <td>
                                  {v?.billing_details?.course_name?v?.billing_details?.course_name:"-----"}
                                  <br />
                                  {v.order_id}
                                  <br />
                                  {v.invoice_id}
                                </td>{" "}
                                <td>
                                  {moment(v.transaction_date).format(
                                    "DD-MM-YYYY"
                                  )}
                                </td>{" "}
                                <td className="text-center">
                                  Amount:{v?.currency_symbol} {v.amount?v.amount:"-"}
                                  <br />
                                  {v?.coupon_discount?"Coupon Discount: ":""}{v?.coupon_discount&&v?.currency_symbol} {v?.coupon_discount}<br/>
                                  GST:{v?.currency_symbol} {v.gst}
                                  <br />
                                  Transaction Charge:{" "}
                                  {v?.currency_symbol}{v.transaction_charge_amount}
                                  <br />
                                  Total Amount:{v?.currency_symbol} {v.payable_price}
                                  <br />
                                </td>
                                <td
                                  style={
                                    v.status === "success"
                                      ? { color: "green" }
                                      : { color: "red" }
                                  }
                                >
                                  {Utils.titleCase(v?.status)}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <p>No data available!</p>
                        )}
                      </tbody>
                    </table>

                    <div
                      className="dataTables_info"
                      id="basic-1_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing {offset + 1} to {offset + categoryList?.length} of{" "}
                      {totalCount} entries
                    </div>
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="basic-1_paginate"
                    >
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default UserTransaction;

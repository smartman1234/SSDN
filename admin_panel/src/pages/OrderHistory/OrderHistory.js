import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Utils from "../../utils/Utils";
import OrderHistoryService from "../../Services/OrderHistoryService/OrderHistoryService";

const OrderHistory = () => {
  const serve = new OrderHistoryService();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [value, setValue] = useState({
    start: "",
    end: "",
  });
  useEffect(() => {
    ListApi();
  }, []);
  const apiCall = async (activity) => {
    try {
      let response = await serve.list(activity);
      if (response) {
        setList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };
  const typeChangeHanlder = async (value) => {
    setType(value);
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      type: value,
      status: status,
    };
    if (value === "custom") {
      return;
    } else {
      await apiCall(activity);
    }
  };
  const statusChangeHanlder = async (value) => {
    setStatus(value);

    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      type: type,
      status: value,
      end_date: endDate,
      start_date: startDate,
    };
    await apiCall(activity);
  };

  const ListApi = async () => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      type: "all",
      status: "all",
    };
    await apiCall(activity);
  };
  const onSubmit = async (values) => {
    setStartDate(values.start);
    setEndDate(values.end);
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      type: type,
      start_date: values.start,
      end_date: values.end,
      status: status,
    };
    await apiCall(activity);
  };
  const ValidateSchema = Yup.object().shape({
    start: Yup.string().required("Required"),
    end: Yup.string().required("Required"),
  });
  const handlePageClick = async (data) => {
    let currentPage = data.selected * search.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
      type: type,
      status: status,
    };
    if (type === "custom") {
      activity["start_date"] = startDate;
      activity["end_date"] = endDate;
    }
    await apiCall(activity);
  };

  const searchHandler = (e) => {
    search.searchTxt = e.target.value;
    search.start = 0;
    ListApi();
  };
  return (
    <div className="page-body">
      <Breadcrumb heading="Order History" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>Order History </h5>
                <select
                  className="btn btn-secondary"
                  onChange={(e) => {
                    statusChangeHanlder(e.target.value);
                  }}
                >
                  <option value="">Filter</option>
                  <option value="all" select="false">
                    All
                  </option>{" "}
                  <option value="exam_voucher">Exam Voucher</option>{" "}
                  <option value="courses">Courses</option>{" "}
                  <option value="assessment">Assessment</option>{" "}
                  <option value="pending">Pending</option>{" "}
                  <option value="success">Success</option>
                </select>
              </div>
              <div className="card-body">
                {type === "custom" && (
                  <div className="">
                    <Formik
                      initialValues={value}
                      onSubmit={onSubmit}
                      enableReinitialize={true}
                      validationSchema={ValidateSchema}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label className="form-label">From Date</label>
                              <input
                                className="form-control"
                                name="start"
                                type="date"
                                onChange={props.handleChange}
                                value={props.values.start}
                              />
                              {props.touched.start && props.errors.start ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.start}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-4">
                              <label className="form-label">To Date</label>
                              <input
                                className="form-control"
                                name="end"
                                type="date"
                                onChange={props.handleChange}
                                value={props.values.end}
                              />
                              {props.touched.end && props.errors.end ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.end}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-4 open-button">
                              <button type="submit" className="btn btn-primary">
                                Apply
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary me-3"
                  onClick={() => {
                    typeChangeHanlder("today");
                  }}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="btn btn-info  me-3"
                  onClick={() => {
                    typeChangeHanlder("yesterday");
                  }}
                >
                  Yesterday
                </button>
                <button
                  type="button"
                  className="btn btn-warning  me-3"
                  onClick={() => {
                    typeChangeHanlder("month");
                  }}
                >
                  Month
                </button>
                <button
                  type="button"
                  className="btn btn-success  me-3"
                  onClick={() => {
                    typeChangeHanlder("custom");
                  }}
                >
                  Custom
                </button>

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
                        onChange={(e) => searchHandler(e)}
                        title=""
                      />
                    </label>
                  </div>
                  <table
                    className="display dataTable no-footer table-responsive"
                    id="basic-1"
                    role="grid"
                    aria-describedby="basic-1_info"
                  >
                    <thead>
                      <tr role="row">
                        <th className="text-center">Id</th>

                        <th style={{ width: "250.938px" }}>User Details</th>
                        <th style={{ width: "172.725px" }}>Course</th>
                        <th style={{ width: "250.938px" }}>
                          Order Id,Reference Id
                        </th>
                        <th
                          style={{ width: "130.2px" }}
                          className="text-center"
                        >
                          Transactions
                        </th>
                        <th
                          style={{ width: "100.5625px" }}
                          className="text-center"
                        >
                          Date
                        </th>
                        <th
                          style={{ width: "130.812px" }}
                          className="text-center"
                        >
                          IP Address
                        </th>
                        <th
                          style={{ width: "130.812px" }}
                          className="text-center"
                        >
                          Card Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list?.length > 0 ? (
                        list?.map((v, i) => {
                          return (
                            <tr role="row" className="odd" key={i}>
                              <td className="text-center">{i + offset + 1}</td>
                              <td>
                                {Utils.titleCase(
                                  v.user?.name || v?.billing_details?.name
                                )}{" "}
                                <br />
                                {v.user?.email || v?.billing_details?.email}
                               <br /> {v?.user?.mobile}{" "}
                              </td>
                              <td className="text-center">
                                {v?.voucher &&
                                  v?.voucher.map((v,index) => {
                                    return (
                                      <>
                                       { (index ? ', ': '') + v.name}
                                        {<br />}
                                      </>
                                    );
                                  })}
                                {v?.course &&
                                  v?.course.map((v,index) => {
                                    return (
                                      <>
                                        { (index ? ', ': '') + v.name}
                                        {<br />}
                                      </>
                                    );
                                  })}
                                {v?.assessment &&
                                  v?.assessment.map((v,index) => {
                                    return (
                                      <>
                                        { (index ? ', ': '') + v.name}
                                        {<br />}
                                      </>
                                    );
                                  })}
                                {v?.billing_details?.course_name}
                              </td>

                              <td>
                                {v.order_id},<br /> {v.invoice_id}
                              </td>
                              <td className="text-nowrap">
                                Amount : {v?.currency_symbol}
                                {v?.amount
                                  ? v?.amount
                                  : "-"}
                                <br />
                                Transaction Charges : {v?.currency_symbol}{" "}
                                {v.transaction_charge_amount
                                  ? v.transaction_charge_amount
                                  : "-"}
                                <br />
                                Coupon Discount : {v?.currency_symbol}
                                {v.coupon_discount ? v.coupon_discount : "0"}
                                <br /> Coupon : {v?.coupon?.code}
                                <br /> Gst : {v?.currency_symbol}
                                {v.gst ? v.gst : "0"}
                                <br />
                                Total Amount : {v?.currency_symbol}
                                {v?.payable_price ? v?.payable_price : "0"}
                              </td>

                              <td className="text-center">
                                {v?.transaction_date
                                  ? moment(v?.transaction_date).format(
                                      "DD-MM-YYYY"
                                    )
                                  : moment(v?.created_at).format("DD-MM-YYYY")}
                                <br />
                                <p
                                  style={
                                    v.status === "success"
                                      ? { color: "green" }
                                      : { color: "red" }
                                  }
                                >
                                  {" "}
                                  {v.status === "success"
                                    ? v.status
                                    : "Pending"}
                                </p>
                              </td>
                              <td className="text-center">{v.ip_address}</td>
                              <td className="text-center">
                                {v.card_holder_name && "Card Holder Name:"}
                                {v.card_holder_name}

                                <br />
                                {v.card_number && "Card number:   XXXXXXXXXXXX"}
                                {v.card_number}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <p className="text-center">No data availale</p>
                      )}
                    </tbody>
                  </table>

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
      <ToastContainer autoClose={1000} />
    </div>
  );
};
export default OrderHistory;

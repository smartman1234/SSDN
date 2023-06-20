import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import EnquiryService from "../../../Services/EnquiryService/EnquiryService";
import ReactPaginate from "react-paginate";
import CsvLink from "react-csv-export";

const EnquiryList = () => {
  const [enquiry, setenquiry] = useState([]);
  const enquiryServe = new EnquiryService();
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
    startDate: "",
    endDate: "",
  });
  const [value, setValue] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    enquiryListApi();
  }, []);

  const onSubmit = async (values) => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      start_date: values.start,
      end_date: values.end,
    };
    await apiCall(activity);
  };

  const ValidateSchema = Yup.object().shape({
    start: Yup.string().required("Required"),
    end: Yup.string().required("Required"),
  });

  const apiCall = async (activity) => {
    try {
      let response = await enquiryServe.enquiryList(activity);
      if (response) {
        const arr = response.data.map((v) => {
          return {...v,voucher:v.voucher?.name};
        });
        setenquiry(arr)
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      } 
    } catch (err) {
      throw err;
    }
  };

  const enquiryListApi = async () => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const modifiedDate = (d) => {
    let date = d.split(" ");
    return date[0];
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Enquiry List Filter</h5>
        </div>
        <div className="card-body">
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
      </div>
      <div className="card">
        <div className="card-header">
          <h5>Enquiry List</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              <div className="card o-hidden border-0">
                <div
                  id="basic-1_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <CsvLink data={enquiry} fileName="Voucher Enquiry List">
                    <button>Export CSV</button>
                  </CsvLink>
                  <table className="table table-responsive mb-5">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          Sr. No.
                        </th>
                        <th scope="col">Type</th>
                        <th scope="col">Name</th>
                        <th scope="col" className="text-center">
                          Phone No.
                        </th>
                        <th scope="col" className="text-center">
                          Email ID
                        </th>
                        <th scope="col">Voucher</th>
                        <th scope="col" className="text-center">
                          IP Address
                        </th>
                        <th scope="col">Message</th>
                        <th scope="col" className="text-center">
                          Last Modified Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiry.map((v, i) => (
                        <tr>
                          <th scope="row" className="text-center">
                            {i + 1}
                          </th>
                          <td>{v.type}</td>
                          <td>{v.name}</td>
                          <td className="text-center">{v.mobile}</td>
                          <td className="text-center">{v.email}</td>
                          <td>
                            {v.course_voucher_assessment
                              ? v.course_voucher_assessment
                              : v.voucher}
                          </td>
                          <td className="text-center">{v.ip_address}</td>
                          <td>{v.message}</td>
                          <td className="text-center">
                            {modifiedDate(v.updated_at)}
                          </td>
                        </tr>
                      ))}
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
                      containerClassName={"pagination justify-content-end"}
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
    </>
  );
};

export default EnquiryList;

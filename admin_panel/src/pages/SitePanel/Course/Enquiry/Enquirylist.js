import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import ReactPaginate from "react-paginate";
import BatchService from "../../../../Services/BatchServices/BatchServices";
import Utils from "../../../../utils/Utils";
import moment from "moment";
import CsvLink from "react-csv-export";

export default function Enquirylist() {
  const enquiry = new BatchService();
  const [enqueryList, setEnqueryList] = useState([]);

  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    EnqueryListApi();
  }, [search]);

  function searchCategoryList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    EnqueryListApi();
  }

  const apiCall = async (activity) => {
    try {
      let response = await enquiry.enquiry(activity);
      if (response) {
        // setEnqueryList(response.data);
        const arr = response.data.map((v) => {
          return {...v,course:v?.course?.name};
        });
        setEnqueryList(arr)
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const EnqueryListApi = async () => {
    let activity = {
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
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  return (
    <div className="page-body">
      <Breadcrumb heading="Course Enquiry " />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Course Enquiry List</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card o-hidden border-0">
                      <div
                        id="basic-1_wrapper"
                        className="dataTables_wrapper no-footer"
                      >
                        <CsvLink
                          data={enqueryList}
                          fileName="Course Enquiry List"
                        >
                          <button>Export CSV</button>
                        </CsvLink>
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
                        <table className="table display dataTable table-responsive text-nowrap">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center">
                                Sr. No.
                              </th>
                              <th scope="col">Name</th>
                              <th scope="col" className="text-center">
                                Mobile
                              </th>
                              <th scope="col" className="text-center">
                                Email
                              </th>{" "}
                              <th scope="col">Enquiry Type</th>
                              <th scope="col">Course Name</th>{" "}
                              <th scope="col">Attendies</th>
                              <th scope="col">
                                University
                                <br />/ Company Name
                              </th>
                              <th scope="col">Ip Address</th>
                              <th scope="col">Message</th>
                              <th scope="col" className="text-center">
                                Submitted Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {enqueryList.map((v, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row" className="text-center">
                                    {i + offset + 1}
                                  </th>
                                  <td className="text-center">
                                    {Utils.titleCase(v.name)}
                                  </td>{" "}
                                  <td className="text-center">{v.mobile}</td>
                                  <td className="text-center">
                                    {v.email}
                                  </td>{" "}
                                  <td className="text-center">
                                    {Utils.titleCase(v.enquiry_type)}
                                  </td>
                                  <td className="text-center">
                                    {Utils.titleCase(v.course)}
                                  </td>
                                  <td className="text-center">
                                    {v.attendees ? v.attendees : "-"}
                                  </td>
                                  <td className="text-center">
                                    {v.company_name ? v.company_name : "-"}
                                  </td>
                                  <td className="text-center">
                                    {v.ip_address}
                                  </td>
                                  <td className="text-center">
                                    {Utils.titleCase(v.message)}
                                  </td>
                                  <td className="text-center">
                                    {moment(v.updated_at).format("L")}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <div
                          className="dataTables_info"
                          id="basic-1_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {offset + 1} to {offset + enqueryList.length}{" "}
                          of {totalCount} entries
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
                            containerClassName={
                              "pagination justify-content-center"
                            }
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
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

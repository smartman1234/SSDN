import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import BatchService from "../../../../Services/BatchServices/BatchServices";
import Utils from "../../../../utils/Utils";

export default function EnrollmentList() {
  const params = useParams();
  const batchServe = new BatchService();
  const [batchList, setBatchList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    batchListApi();
  }, []);

  const apiCall = async (activity) => {
    try {
      let response = await batchServe.enrolllist(activity, params.id);
      
      if (response) {
        
        setBatchList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  function searchAssessmentList(e) {
    setSearch({ ...search, searchTxt: e.target.value });
    search.searchTxt = e.target.value;
    search.start = 0;
    batchListApi();
  }

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

  const batchListApi = async () => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await batchServe.delete(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...batchList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          batchListApi();
          setBatchList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const name = (
    <Link to="/create-batch" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add Batche
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb heading="Enrollments"  />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Enrollment List</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card o-hidden border-0">
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
                              onChange={(e) => searchAssessmentList(e)}
                              title=""
                            />
                          </label>
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center">Sr. No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Email</th>
                              <th scope="col">Course </th> 
                              <th scope="col">Message</th>
                              <th scope="col">Payment Method</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Order Id</th>
                             
                            </tr>
                          </thead>
                          <tbody>
                            {batchList?.length > 0 &&
                              batchList?.map((v, i) => (
                                <tr key={i}>
                                  <th scope="row" className="text-center">{i + 1}</th> <td>{v.name}</td>
                                  <td>{v.mobile}</td>
                                  <td>{v.email}</td>
                                  <td>{v.course?.name}</td> <td>{v.message}</td>
                                  <td className="text-center">
                                    {v.payment_method === "pay_now"
                                      ? "Pay now"
                                      : "Pay later"}
                                  </td>
                                  <td>
                                    {v.payment_method === "pay_now"
                                      ? v.payable_price
                                      : "-"}
                                  </td>
                                  <td>
                                    {v.payment_method === "pay_now"
                                      ? v.order_id
                                      : "-"}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div
                          className="dataTables_info"
                          id="basic-1_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {offset + 1} to {offset + batchList?.length} of {totalCount} entries
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
            <ToastContainer autoClose={1000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

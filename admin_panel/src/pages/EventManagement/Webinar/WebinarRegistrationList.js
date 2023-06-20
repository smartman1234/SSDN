import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import moment from "moment";
import WebinarService from "../../../Services/EventService/WebinarService";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import Utils from "../../../utils/Utils";

export default function WebinarRegistrationList() {
    const params=useParams()
  const serve = new WebinarService();
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

  const name = (
    <Link to="/create-webinar" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add
    </Link>
  );

  useEffect(() => {
    ListApi();
  }, [search]);

  const apiCall = async (activity) => {
    try {
      let response = await serve.registrationlist(activity);
      if (response) {
        setList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  function searchData(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    ListApi();
  }

  const handlePageClick = async (data) => {

    let currentPage = data.selected * search.perPage;
    setOffset(currentPage);
    let activity = {
        webinar_id:params.id,
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const ListApi = async () => {
    let activity = {
        webinar_id:params.id,
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await serve.delete(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...list];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          ListApi();
          setList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Webinar Registration" add={name} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Webinar Registration List</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card o-hidden border-0">
                        <div
                          id="basic-1_wrapper"
                          className="dataTables_wrapper no-footer"
                        >
                          <div
                            id="basic-1_filter"
                            className="dataTables_filter"
                          >
                            <label>
                              Search:
                              <input
                                type="search"
                                className=""
                                placeholder="Search..."
                                aria-controls="basic-1"
                                data-bs-original-title=""
                                onChange={(e) => searchData(e)}
                                title=""
                              />
                            </label>
                          </div>
                          <table className="table display dataTable text-nowrap">
                            <thead>
                              <tr>
                                <th scope="col" className="text-center">
                                  Sr. No.
                                </th>
                                <th scope="col" className="text-center">
                                  Title
                                </th>
                                <th scope="col" className="text-center">
                                  Name
                                </th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Email</th>
                                <th scope="col" className="text-center">
                                  Ip Address
                                </th>
                             
                              </tr>
                            </thead>
                            <tbody>
                              {list &&
                                list.map((v, i) => (
                                  <tr>
                                    <th scope="row" className="text-center">
                                      {i + offset + 1}
                                    </th>
                                    <td className="text-center">
                                        {Utils.titleCase(v?.webinar?.title)}
                                     
                                    </td>
                                    <td className="text-center">
                                        {Utils.titleCase(v.name)}
                                    </td>
                                    <td>{v.contact_number}</td>
                                    <td>{v.email}</td>

                                    <td className="text-center">
                                     {v.ip_address}
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
                            Showing {offset + 1} to {offset + list?.length} of{" "}
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
    </>
  );
}

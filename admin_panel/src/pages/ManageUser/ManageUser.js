import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Utils from "../../utils/Utils";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import ReactPaginate from "react-paginate";
import ManageUserService from "../../Services/ManageUserService/ManageUserService";
import ChangePassword from "./Changepassword";
import AssignTask from "./AssignTask";
import UserTransaction from "./UserTransaction";

function ManageUser() {
  const [active, setActive] = useState({});
  const [map, setMap] = useState({});
  const navigate = useNavigate();
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
      let response = await serve.list(activity);
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

  return (
    <div className="page-body">
      <Breadcrumb heading="Manage User" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Manage User</h5>
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
                          <th className="text-center" style={{ width: "254.725px" }}>Action</th>
                          <th style={{ width: "172.725px" }}>Name</th>
                          <th style={{ width: "172.725px" }}>Email</th>
                          <th style={{ width: "250.938px" }}>Mobile</th>
                          <th style={{ width: "130.2px" }}>Change Password</th>
                          <th
                            style={{ width: "100.5625px" }}
                            className="text-center"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryList?.map((v, i) => {
                        
                          return (
                            <tr role="row" className="odd align-middle" key={i}>
                              <td className="text-center">{i + offset + 1}</td>
                              <td className="text-center">
                                {" "}
                                <Link
                                  to="#"
                                  className="btn btn-outline-primary btn-sm me-2"
                                  title="Edit Course Category"
                                  onClick={() => {
                                    setMap({ [v.id]: true });
                                  }}
                                >
                                  Map Exam
                                </Link>
                                <Link
                                  to={`/user-transaction/${v.id}`}
                                  className="btn btn-outline-primary btn-sm mt-2"
                                  title="Edit Course Category"
                                >
                                  View Transaction History
                                </Link>
                              </td>{" "}
                             
                              <td className="text-center">
                                {Utils.titleCase(v.name)}{" "}
                                {/* {Utils.titleCase(v.last_name)} */}
                              </td>
                              <td>{Utils.titleCase(v.email)}</td>
                              <td>{v.mobile}</td>
                              <td
                                onClick={() => {
                                  setActive({ [v.id]: true });
                                }}
                              >
                                <Link
                                  to="#"
                                  className="btn btn-outline-primary btn-sm me-2"
                                  title="Edit Course Category"
                                >
                                  Change
                                </Link>
                              </td>
                              {active[v.id] && (
                                <ChangePassword
                                  id={v.id}
                                  active={active}
                                  setActive={setActive}
                                />
                              )}
                              <td className="text-center">
                                {" "}
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.status === "active"}
                                    onChange={(e) => toggleHandler(v)}
                                  />
                                </div>
                              </td>{" "} {map[v.id] && (
                                <AssignTask
                                  id={v.id}
                                  map={map}
                                  setMap={setMap}
                                />
                              )}
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

export default ManageUser;

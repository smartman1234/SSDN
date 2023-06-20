import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import moment from "moment";
import { Context } from "../../../container/Context";
import EventService from "../../../Services/EventService/EventService";
const EventManagementCategorylist = () => {
  const serve = new EventService();
  const [list, setList] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
    listApi();
  }, [search]);

  useEffect(() => {
    const pages = loginData?.data?.role_permission;

    if (pages) {
      const items = [];
      for (const item of pages) {
        if (!item.parent_id) {
          items.push({
            ...item,
            child: pages.filter((v) => v.parent_id === item.id),
          });
        }
        if (item.slug === window.location.pathname.replace("/", "")) {
          setRolePermission(item.role_permission);
        }
      }
      setPagesData(items);
    }
  }, [loginData]);

  const apiCall = async (activity) => {
    try {
      let response = await serve.List(activity);
      if (response) {
        setList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  function searchAssessmentList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    listApi();
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

  const listApi = async () => {
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
        let response = await serve.delete(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...list];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          listApi();
          setList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const name = (
    <Link to="/event-management-category-add" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Event Category" add={rolePermission.is_add == 1 && name} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Event Category List</h5>
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
                                onChange={(e) => searchAssessmentList(e)}
                                title=""
                              />
                            </label>
                          </div>
                          <table className="table display dataTable">
                            <thead>
                              <tr>
                                <th scope="col" className="text-center">
                                  Sr. No.
                                </th>
                                <th scope="col" className="text-center">
                                  Action
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Heading</th>
                                <th scope="col" className="text-center">
                                  Last Modified By
                                </th>
                                <th scope="col" className="text-center">
                                  Last Modified Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {list?.length > 0 &&
                                list?.map((v, i) => (
                                  <tr key={i}>
                                    <th scope="row" className="text-center">
                                      {i + offset + 1}
                                    </th>
                                    <td className="text-center">
                                    {rolePermission.is_edit == 1 && 
                                      <Link
                                        to={`/event-management-category-edit/${v.id}`}
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="Edit Course Category"
                                      >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </Link>}
                                      {rolePermission.is_delete == 1 && 
                                      <Link
                                        onClick={() => deleteHandle(v.id)}
                                        to="#"
                                        className="btn btn-outline-danger btn-sm"
                                        title="Delete Course Category"
                                      >
                                        <i className="fa-solid fa-trash-can"></i>
                                      </Link>}
                                    </td>
                                    <td>{v.name}</td>
                                    <td>{v.heading}</td>
                                    <td className="text-center">
                                      {v.admin ? v.admin.name : "-"}
                                    </td>
                                    <td className="text-center">
                                      {moment(v.updated_at).format("L")}
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
};

export default EventManagementCategorylist;

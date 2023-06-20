import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentService from "../../../Services/AssessmentService";
import Utils from "../../../utils/Utils";
import { Context } from "../../../container/Context";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import ReactPaginate from "react-paginate";

function AssessmentCategory() {
  const navigate = useNavigate();
  const AssessmentServe = new AssessmentService();
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
    CategoryListApi();
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

  function searchCategoryList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    CategoryListApi();
  }

  const apiCall = async (activity) => {
    try {
      let response = await AssessmentServe.categoryList(activity);
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

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await AssessmentServe.deleteCategory(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...categoryList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          CategoryListApi();
          setCategoryList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };
  const toggleHandler = async (data) => {
    const obj = {
      id: data.id,
      is_front: data.is_front === 0 ? 1 : 0,
    };
    try {
      const res = await AssessmentServe.activefront(obj);
      if (res.status === "success") {
        let items = [];
        categoryList.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });

        setCategoryList(items);
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const name = (
    <Link to="/exam-categories-add" className="btn btn-primary" id="nextBtn">
      <i className="fa-solid fa-plus me-2"></i>Add Category
    </Link>
  );

  return (
    <div className="page-body">
      <Breadcrumb
        heading="Assessment Categories"
        add={rolePermission.is_add == 1 && name}
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Assessment Category List</h5>
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
                            className="text-center">
                            S.no.
                          </th>
                          <th
                            style={{ width: "99.9625px" }}
                            className="text-center"
                          >
                            Action
                          </th>
                          <th style={{ width: "172.725px" }}>Name</th>
                          <th style={{ width: "250.938px" }}>Parent</th>
                          <th style={{ width: "130.2px" }}>Heading</th>
                          <th
                            style={{ width: "100.5625px" }}
                            className="text-center"
                          >
                            Image
                          </th>
                          <th
                            style={{ width: "100.5625px" }}
                            className="text-center"
                          >
                            Front Page
                          </th>
                          <th
                            style={{ width: "130.812px" }}
                            className="text-center"
                          >
                            Last Modified By
                          </th>
                          <th
                            style={{ width: "145.9625px" }}
                            className="text-center"
                          >
                            Last Modified Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryList?.map((v, i) => {
                     
                          return (
                            <tr role="row" className="odd align-middle" key={i}>
                              <td className="text-center">{i + offset + 1}</td>
                              <td className="text-center">
                                {rolePermission.is_edit == 1 && (
                                  <Link
                                    to={`/exam-categories-edit/${v.id}`}
                                    className="btn btn-outline-primary btn-sm me-2"
                                    title="Edit Assessment Category"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </Link>
                                )}
                                {rolePermission.is_delete == 1 && (
                                  <Link
                                    to="#"
                                    onClick={() => deleteHandle(v.id)}
                                    className="btn btn-outline-danger btn-sm"
                                    title="Delete Assessment Category"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Link>
                                )}
                              </td>
                              <td>{v.name}</td>
                              <td>
                                {v.parent_id === 0
                                  ? "-"
                                  : v.parent_category?.name}
                              </td>
                              <td>{v.heading}</td>
                              <td className="text-center">
                                <img
                                  src={v.image}
                                  alt="image"
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </td>{" "}
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.is_front == 1}
                                    onChange={(e) => toggleHandler(v)}
                                  />
                                </div>
                              </td>
                              <td className="text-center">
                                {v.updated_by.name}
                              </td>
                              <td className="text-center">
                                {Utils.start_time(v.updated_at)}
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
                        pageCount={Math.ceil(totalPages)}
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

export default AssessmentCategory;

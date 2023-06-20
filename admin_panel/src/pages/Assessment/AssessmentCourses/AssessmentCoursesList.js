import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../../container/Context";
import AssessmentCourseService from "../../../Services/AssessmentCourseService";
import Utils from "../../../utils/Utils";
import ReactPaginate from "react-paginate";

const AssessmentCoursesList = () => {
  const courseServe = new AssessmentCourseService();
  const [assessmentList, setAssessmentList] = useState([]);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [offset, setOffset] = useState(0);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
    AssessmentListApi();
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
      let response = await courseServe.assessmentList(activity);
      if (response) {
        setAssessmentList(response.data);
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
    AssessmentListApi();
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

  const AssessmentListApi = async () => {
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
        let response = await courseServe.deleteCourse(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...assessmentList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          AssessmentListApi();
          setAssessmentList(remainingData);
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
      const res = await courseServe.isfront(obj);
      if (res.status === "success") {
        AssessmentListApi();
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Assessment Courses</h5>
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
                  <table className="table display dataTable no-footer table-responsive text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          Sr. No.
                        </th>
                        <th scope="col" className="text-center">
                          Action
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col" className="text-center">
                          Actual Price
                        </th>
                        <th scope="col" className="text-center">
                          Sale Price
                        </th>
                        <th scope="col" className="text-center">
                          Uploaded Questions
                        </th>
                        <th scope="col" className="text-center">
                          Status
                        </th>
                        <th scope="col" className="text-center">
                          Front Page
                        </th>
                        <th scope="col" className="text-center">
                          Image
                        </th>
                        <th scope="col" className="text-center">
                          Last Modified By
                        </th>
                        <th scope="col" className="text-center">
                          Last Modified Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessmentList?.map((v, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row" className="text-center">
                              {i + offset + 1}
                            </th>

                            <td className="text-center">
                              {rolePermission.is_edit == 1 && (
                                <Link
                                  to={`/assessment-courses-edit/${v.id}`}
                                  className="btn btn-outline-primary btn-sm me-2"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                              )}
                              {rolePermission.is_delete == 1 && (
                                <Link
                                  to="#"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => deleteHandle(v.id)}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </Link>
                              )}
                            </td>
                            <td>{v.name}</td>
                            <td>{v.category?.name ? v.category.name : "-"}</td>
                            <td className="text-center">
                              <i className="fa-solid fa-indian-rupee-sign" />
                              {v.price_type === "paid" ? v.inr_price : "0"}
                            </td>
                            <td className="text-center">
                              <i className="fa-solid fa-indian-rupee-sign" />
                              {v.payable_price ? `${v.payable_price} ` : "0"}
                            </td>
                            <td className="text-center">
                              <Link
                                className="btn btn-primary"
                                data-for="booked"
                                title="upload question"
                                to={`/question-list/${v.id}`}
                              >
                                {v.questions_count}
                              </Link>
                            </td>
                            <td className="text-center">
                              {v.status === "active" ? "Active" : "In Active"}
                            </td>
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
                            <td>
                              <img src={v.image} width="100" height="50" alt="image" />
                            </td>
                            <td className="text-center">{v.admin.name}</td>
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
                    Showing {offset + 1} to {offset + assessmentList?.length} of{" "}
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
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default AssessmentCoursesList;

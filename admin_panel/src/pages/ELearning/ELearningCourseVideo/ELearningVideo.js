import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import moment from "moment";
import ELearningCourseService from "../../../Services/ELearningService/ELearningCourseService";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";

export default function ELearningVideo() {
  const serve = new ELearningCourseService();
  const [courseList, setCourseList] = useState([]);
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
    <Link to="/create-e-learning-course-video" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add
    </Link>
  );

  useEffect(() => {
    courseListApi();
  }, [search]);

  const apiCall = async (activity) => {
    try {
      let response = await serve.list(activity);
      if (response) {
        setCourseList(response.data);
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
    courseListApi();
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

  const courseListApi = async () => {
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
          let dataTemp = [...courseList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          courseListApi();
          setCourseList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const toggleHandler = async (data, type) => {
    const obj = {
      id: data.id,
      status: data.status === "active" ? "inactive" : "active",
    };

    try {
      const res = await serve.status(obj);
      if (res.status === "success") {
        let items = [];
        courseList.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });

        setCourseList(items);
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="E-Learning Course" add={name} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>E-Learning Course List</h5>
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
                          <table className="table display dataTable text-nowrap table-responsive">
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
                                  Duration
                                </th>
                                <th scope="col" className="text-center">
                                  Active
                                </th>
                                <th scope="col" className="text-center">
                                  Trending Course
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {courseList &&
                                courseList.map((v, i) => (
                                  <tr>
                                    <th scope="row" className="text-center">
                                      {i + offset + 1}
                                    </th>
                                    <td className="text-center">
                                      <Link
                                        to={`/edit-e-learning-course-video/${v.id}`}
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="Edit Course Category"
                                      >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </Link>
                                      <Link
                                        onClick={() => deleteHandle(v.id)}
                                        to="#"
                                        className="btn btn-outline-danger btn-sm"
                                        title="Delete Course Category"
                                      >
                                        <i className="fa-solid fa-trash-can"></i>
                                      </Link>
                                    </td>
                                    <td>{v.name}</td>
                                    <td>{v.category?.name}</td>
                                    <td className="text-center">
                                      {v.course_duration}{" "}
                                      {v.course_duration_time}
                                    </td>
                                    <td className="text-center">
                                      <div className="checkbox checkbox-primary">
                                        <input
                                          id={v.id}
                                          type="checkbox"
                                          checked={v.status === "active"}
                                          onChange={(e) =>
                                            toggleHandler(v, "status")
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div className="checkbox checkbox-primary">
                                        <input
                                          id={v.id}
                                          type="checkbox"
                                          checked={v.is_trending == "1"}
                                          onChange={(e) =>
                                            toggleHandler(v, "trending")
                                          }
                                        />
                                      </div>
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
                            Showing {offset + 1} to {offset + courseList?.length} of {totalCount} entries
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

import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import AssessmentFeedbackService from "../../../Services/AssessmentFeedbackService";
import ReactPaginate from "react-paginate";
import ShowMoreText from "react-show-more-text";
import { Context } from "../../../container/Context";
const ReportedQuestions = () => {
  const executeOnClick = (isExpanded) => {
  };

  const feedback = new AssessmentFeedbackService();
  const [questionList, setQuestionList] = useState([]);

  const [offset, setOffset] = useState(0);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
    ReportedQuestionListApi();
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
    ReportedQuestionListApi();
  }

  const apiCall = async (activity) => {
    try {
      let response = await feedback.assessmentfeedback(activity);
      if (response) {
        setQuestionList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const ReportedQuestionListApi = async () => {
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

  const ToggleHandle = async (data) => {
    const obj = {
      id: data.id,
      is_active: data.is_active === 1 ? 0 : 1,
    };
    try {
      const res = await feedback.editFeedback(obj);
      if (res.status === "success") {
        let items = [];

        questionList.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });
        setQuestionList(items);
        toast.success(res.message);
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const deleteHandle = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await feedback.deleteFeedback(id);
        if (response) {
          toast.success(response.message);
          let temp = [...questionList];
          const remainingList = temp.filter((v) => {
            return v._id !== id;
          });
          ReportedQuestionListApi(remainingList);
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
        <Breadcrumb heading="Assessment Feedback List" />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Assessment Feedback</h5>
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
                                onChange={(e) => searchCategoryList(e)}
                                title=""
                              />
                            </label>
                          </div>
                          <table className="table display no-footer dataTable">
                            <thead>
                              <tr>
                                <th scope="col" className="text-center">
                                  Sr. No.
                                </th>
                                <th scope="col" className="text-center">
                                  Action{" "}
                                </th>
                                <th scope="col">Comment By</th>
                                <th scope="col">Assessment</th>
                                <th scope="col">Comment</th>
                                <th scope="col" className="text-center">
                                  Rating
                                </th>
                                <th scope="col" className="text-center">
                                  Approved
                                </th>
                                <th scope="col" className="text-center">
                                  Last modified By
                                </th>
                                <th scope="col" className="text-center">
                                  Last modified Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {questionList.map((v, i) => {
                                return (
                                  <tr key={i}>
                                    <th scope="row" className="text-center">
                                      {i + offset + 1}
                                    </th>

                                    <td className="text-center">
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
                                    <td>{v.assessment?.name || "admin"}</td>
                                    <td>
                                      <ShowMoreText
                                        lines={1}
                                        more="Show more"
                                        less="Show less"
                                        className="content-css mb-2"
                                        anchorclassName="show-more-less-clickable"
                                        onClick={executeOnClick}
                                        expanded={false}
                                        truncatedEndingComponent={"... "}
                                      >
                                        {v.comment}
                                      </ShowMoreText>
                                    </td>
                                    <td className="text-center">{v.review}</td>
                                    <td className="text-center">
                                      <div className="media-body switch-sm">
                                        <label className="switch">
                                          <input
                                            id={v.id}
                                            type="checkbox"
                                            checked={v.is_active}
                                            onChange={(e) => ToggleHandle(v)}
                                          />
                                          <span className="switch-state"></span>
                                        </label>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      {v.admin?.name}
                                    </td>
                                    <td className="text-center">
                                      {v.updated_at}
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
                            Showing {offset + 1} to{" "}
                            {offset + questionList.length} of {totalCount}{" "}
                            entries
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
    </>
  );
};

export default ReportedQuestions;

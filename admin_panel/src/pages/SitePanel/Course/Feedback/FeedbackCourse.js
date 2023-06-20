import React, { useState, useEffect,useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import BatchService from "../../../../Services/BatchServices/BatchServices";
import Utils from "../../../../utils/Utils";
import { Context } from "../../../../container/Context";
import FeedbackService from "../../../../Services/CourseFeedbackService/FeedbackService";

export default function FeedbackCourse() {
  const params = useParams();
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const feedback = new FeedbackService();
  const [List, setList] = useState([]);
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
    ListApi();
    setLoginData(JSON.parse(localStorage.getItem("user")));
  }, []);

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
      let response = await feedback.feedback(activity, params.id);
      
      if (response) {
        
        setList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  function searchList(e) {
    setSearch({ ...search, searchTxt: e.target.value });
    search.searchTxt = e.target.value;
    search.start = 0;
    ListApi();
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

  const ListApi = async () => {
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
        let response = await feedback.deleteFeedback(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...List];

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
  const ToggleHandle = async (data) => {
    const obj = {
        feedback_id: data.id,
        is_active: data.is_active === 1 ? 0 : 1,
    };
    try {
      const res = await feedback.changestatus(obj);
      if (res.status === "success") {
        let items = [];

        List.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });
        setList(items);
        toast.success(res.message);
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };
  const name = (
    <Link to="/create-batch" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb heading="Feedback"  />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Feedback List</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card border-0">
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
                              onChange={(e) => searchList(e)}
                              title=""
                            />
                          </label>
                        </div>
                        <table className="table display dataTable">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center text-nowrap">Sr. No.</th>
                              <th scope="col" className="text-center">Action</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Review</th>
                              <th scope="col">Course </th>
                              <th scope="col">Message</th>
                              <th scope="col" className="text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {List?.length > 0 &&
                              List?.map((v, i) => (
                                <tr key={i}>
                                  <th scope="row" className="text-center">{i + 1}</th> 
                                  <td className="text-center">
                                  {rolePermission.is_delete == 1 && ( <Link
                                      to="#"
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => deleteHandle(v.id)}
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </Link>)}
                                   
                                  </td>
                                  <td>{v.name}</td>
                                  <td>{v.email}</td> 
                                  <td>{v.review}</td>
                                  <td>{v.course?.name}</td> 
                                  <td>{v.comment}</td>
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
                          Showing {offset + 1} to {offset + List?.length} of {totalCount} entries
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

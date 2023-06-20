import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import { Context } from "../../../container/Context";
import ChooseTrainingService from "../../../Services/ChooseTrainingService/ChooseTrainingService";

export default function TrainingList() {
  const training = new ChooseTrainingService();
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [trainingList, setTrainingList] = useState([]);
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
    trainingListApi();
    setLoginData(JSON.parse(localStorage.getItem("user")));
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
      let response = await training.trainingList(activity);
      if (response) {
        setTrainingList(response.data);
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
    trainingListApi();
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

  const trainingListApi = async () => {
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
        let response = await training.deletetraining(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...trainingList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          trainingListApi();
          setTrainingList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const name = (
    <Link to="/create-training" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Choose Training" add={rolePermission.is_add == 1 && name}/>
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Choose Best Training</h5>
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
                                <th scope="col" className="text-center text-nowrap">
                                  Sr. No.
                                </th>
                                <th scope="col" className="text-center text-nowrap">
                                  Action
                                </th>
                                <th scope="col">Course</th>
                                <th scope="col">Mode</th>
                                <th scope="col" className="text-center">
                                  Last Modified Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {trainingList?.length > 0 &&
                                trainingList?.map((v, i) => (
                                  <tr key={i}>
                                    <th scope="row" className="text-center text-nowrap">
                                      {i + offset + 1}
                                    </th>
                                    <td className="text-center text-nowrap">
                                    {rolePermission.is_edit == 1 && (   <Link
                                        to={`/edit-training/${v.id}`}
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="Edit Course Category"
                                      >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </Link>)}
                                      {rolePermission.is_delete == 1 && (  <Link
                                        onClick={() => deleteHandle(v.id)}
                                        to="#"
                                        className="btn btn-outline-danger btn-sm"
                                        title="Delete Course Category"
                                      >
                                        <i className="fa-solid fa-trash-can"></i>
                                      </Link>)}
                                    
                                    </td>
                                    <td>{v.course?.name}</td>
                                    <td>
                                      {v?.mode_1_title} , {v?.mode_2_title} ,
                                      {v?.mode_3_title}
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
                            Showing {offset + 1} to {offset + trainingList?.length} of {totalCount} entries
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

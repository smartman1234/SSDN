import React, { useState, useEffect ,useContext} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import { Context } from "../../../container/Context";
import BlogService from "../../../Services/BlogServices/BlogService";

export default function Blogs() {
  const serve = new BlogService();
  const [list, setList] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [offset, setOffset] = useState(0);
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
    ListApi();
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
  const modifiedDate = (d) => {
    let date = d.split(" ");
    return date[0];
  };

  const apiCall = async (activity) => {
    try {
      let response = await serve.list(activity);
      if (response) {
        setList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      } else {
      }
    } catch (err) {
      throw err;
    }
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
        let response = await serve.delete(dataId);
        if (response.status === "success") {
          toast.success(response.message);
          let dataTemp = [...list];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          setList(remainingData);
          await ListApi();
        } else {
          toast.error(response.message);
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
      const res = await serve.frontChange(obj);
      if (res.status === "success") {
       
        let items = [];
        list.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });

        setList(items);
      } else if(res.status==="fail") {
        toast.error(res.message);
      }
    } catch (err) {
     
      throw err;
    }
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

  const name = (
    <Link to="/create-blog" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add 
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Blogs" add={rolePermission.is_add == 1 && name}/>
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Blogs List</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card o-hidden border-0">
                        <div
                          id="basic-1_wrapper"
                          className="dataTables_wrapper no-footer"
                        >
                          <table className="table display dataTable no-footer">
                            <thead>
                              <tr>
                                <th scope="col" className="text-center">
                                  Sr. No.
                                </th>
                                <th scope="col" className="text-center">
                                  Action
                                </th>
                                <th scope="col">Title</th>
                                <th scope="col">Image</th>
                                <th scope="col" className="text-center">
                                  Front Page
                                </th>
                                <th scope="col" className="text-center">
                                  Last Modified By
                                </th>
                                <th scope="col" className="text-center">
                                  Created Date
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
                                    {rolePermission.is_edit == 1 &&  <Link
                                        to={`/edit-blog/${v.id}`}
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="Edit Voucher"
                                      >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </Link>}
                                      {rolePermission.is_delete == 1 && (  <Link
                                        to="#"
                                        className="btn btn-outline-danger btn-sm"
                                        title="Delete Voucher"
                                        onClick={() => deleteHandle(v.id)}
                                      >
                                        <i className="fa-solid fa-trash-can"></i>
                                      </Link>)}
                                    
                                    </td>
                                    <td>{v.title}</td>
                                    <td>
                                      <img
                                        src={v?.image}
                                        className=""
                                        style={{ maxWidth: "150px" }}
                                        alt="image"
                                      />
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
                                    <td className="text-center">
                                      {v.admin?.name}
                                    </td>
                                    <td className="text-center">
                                      {modifiedDate(v.created_date)}
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
                  </div> <ToastContainer />
                </div>
              </div>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Modal title
                      </h5>
                      <button
                        className="btn-close"
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button className="btn btn-secondary" type="button">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

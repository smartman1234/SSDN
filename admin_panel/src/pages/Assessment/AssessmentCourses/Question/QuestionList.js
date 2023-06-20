import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import QuestionService from "../../../../Services/QuestionService";
import ReactPaginate from "react-paginate";
import ShowMoreText from "react-show-more-text";

function QuestionList(props) {
  const executeOnClick = (isExpanded) => {
  }
  const param = useParams();
  const questionServe = new QuestionService();
  const [questionList, setQuestionList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [noOfQuestion, setNoOfQuestion] = useState(0);
  const [active, setActive] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    QuestionListApi();
  }, [search]);

  const apiCall = async (activity) => {
    try {
      let response = await questionServe.questionList(activity);
      if (response) {
        setQuestionList(response.data);
        setActive(response.status);
        setNoOfQuestion(response.number_of_question);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const QuestionListApi = async () => {
    let activity = {
      assessment_id: param.id,
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
      assessment_id: param.id,
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const name = (
    <Link
      to={`/question_form/${param.id}`}
      className="btn btn-primary"
      id="nextBtn"
    >
      <i className="fa-solid fa-plus me-2"></i>Add Question
    </Link>
  );

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await questionServe.deleteQuestion(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...questionList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          QuestionListApi();
          setQuestionList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  function searchQuestionList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    QuestionListApi();
  }

  return (
    <div className="page-body">
      <Breadcrumb heading="Question List" subheading="Question" add={name} />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Questions</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="card o-hidden border-0"
                    >
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
                              onChange={(e) => searchQuestionList(e)}
                              title=""
                            />
                          </label>
                        </div>
                        <div className="text-danger">
                          {active === "inactive" &&
                            `You must have upload minimum questions ${noOfQuestion} `}
                        </div>
                        <table className="table display dataTable no-footer table-responsive">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center">Sr. No.</th>
                              <th scope="col" className="text-center">Action</th>
                              <th scope="col">Question</th>
                              <th scope="col" className="text-center">Last Modified By</th>
                              <th scope="col" className="text-center">Last Modified Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {questionList.map((v, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{i + offset + 1}</th>
                                  
                                  <td>
                                    <Link
                                      to={`/exam-question-edit/${v.id}`}
                                      className="btn btn-outline-primary btn-sm me-2"
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <Link
                                      to="#"
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => deleteHandle(v.id)}
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </Link>
                                  </td>
                                  <td> 
                                    <ShowMoreText
                                    lines={2}
                                    more="Show more"
                                    less="Show less"
                                    className="content-css mb-2"
                                    anchorclassName="show-more-less-clickable"
                                    onClick={executeOnClick}
                                    expanded={false}
                                    truncatedEndingComponent={"... "}
                                  >
                                    <p className="ssdn-height1"
                                      dangerouslySetInnerHTML={{
                                        __html: v.question,
                                      }}
                                    />
                                  </ShowMoreText>
                                  </td>
                                  <td>{v.admin?.name || "NA"}</td>
                                  <td>{v.updated_at}</td>
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
                          Showing {offset + 1} to {offset + questionList.length} of {totalCount} entries
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
  );
}

export default QuestionList;

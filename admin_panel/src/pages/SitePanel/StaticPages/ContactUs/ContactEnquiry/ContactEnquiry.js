import React,{useState,useEffect} from "react";
import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";
import Utils from "../../../../../utils/Utils";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from 'moment'
import CsvLink from "react-csv-export";
import ContactusService from "../../../../../Services/SitePanelServices/ContactusService";

export default function ContactEnquiry() {
  const contact = new ContactusService();
  const [questionList, setQuestionList] = useState([]);

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
    ReportedQuestionListApi();
  }, [search]);

  function searchReportList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    ReportedQuestionListApi();
  }

  const apiCall = async (activity) => {
    try {
      let response = await contact.enquiryList(activity);
      if (response) {
        setQuestionList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
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

  const ReportedQuestionListApi = async () => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };
  return (
    <div className="page-body">
      <Breadcrumb
        heading="Contact Enquiry"
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Contact Enquiry List</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card o-hidden border-0">
                      <div
                        id="basic-1_wrapper"
                        className="dataTables_wrapper no-footer"
                      >  <CsvLink data={questionList} fileName="Contact Us List">
                      <button>Export CSV</button>
                    </CsvLink>
                        <div id="basic-1_filter" className="dataTables_filter">
                          <label>
                            Search:
                            <input
                              type="search"
                              className=""
                              placeholder="Search..."
                              aria-controls="basic-1"
                              data-bs-original-title=""
                              onChange={(e) => searchReportList(e)}
                              title=""
                            />
                          </label>
                        </div>
                        <table className="table display dataTable">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center">Sr. No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Message</th>
                              <th scope="col" className="text-center">Submitted Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {questionList?.map((v, i) => {
                              return (
                                <tr key={i} className="align-middle">
                                  <th scope="row" className="text-center">{i + offset + 1}</th>
                                  <td>{Utils.titleCase(v?.name)}</td>
                                  <td>{v.email}</td>
                                  <td>{v.mobile}</td>
                                  <td>{v.message}</td>
                                  <td className="text-center">{moment(v.created_at).format("DD-MM-YYYY") }</td>
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
    </div>
  );
}

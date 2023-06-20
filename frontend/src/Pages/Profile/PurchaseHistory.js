import React, { useState, useEffect, useContext } from "react";
import UserService from "../../Services/UserService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import HeadingName from "../HeadingName/HeadingName";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { CartContext } from "../../Container/Context";
import Utils from "../../Utils/Utils";

const PurchaseHistoryDetail = React.lazy(() =>
  import("./PurchaseHistoryDetail")
);

const Profile = React.lazy(() => import("./Profile"));

export default function PurchaseHistory() {
  const [data, setData] = useState();
  const [puchase, setPurchase] = useState([]);
  const userServe = new UserService();
  const [id, setId] = useState("");
  const { user, image, bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
  });
  useEffect(() => {
    PurchaseHistoryListApi();
  }, []);

  const apiCall = async (activity) => {
    try {
      let res = await userServe.purchaseHistory(activity);
      let nameArr = [];
      if (res) {
        setPurchase(res.data);
        setTotalPages(res.count / 10);
        setTotalCount(res.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const PurchaseHistoryListApi = async () => {
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search?.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search?.perPage,
      offset: currentPage,
    };
    await apiCall(activity);
  };
  return (
    <>
    <HeadingName name="Purchase History" home="Home" heading="Purchase History" />
      <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
          <React.Suspense fallback="">
          <Profile />
            </React.Suspense>
          
            <div className="col-lg-9">
            <div className="edu-course-widget widget-category">
                    <div className="inner">
                      <h5 className="widget-title">Purchase History</h5>
                    <table className="table table-responsive-desk ">
                      <thead>
                        <tr>
                          <th className="text-center text-nowrap">Sr. No.</th>
                          <th className="text-center text-nowrap">Action</th>
                          <th>Course Name</th>
                          <th className="text-center">Date</th>
                          <th className="text-center">Invoice Id</th>
                          <th className="text-center text-nowrap">
                            Payment Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {puchase?.length > 0 &&
                          puchase.map((v, i) => (
                            <>
                              <tr key={i} className="align-middle">
                                <td className="text-center">
                                  {i + offset + 1}
                                </td>
                                <td
                                  className="text-center text-nowrap"
                                  onClick={() => {
                                    setActive(true);
                                    setId(v.id);
                                    setData(v);
                                  }}
                                >
                                  <button type="button" className="edu-btn">
                                    View Details
                                  </button>
                                </td>
                                <td style={{ width: "40%" }}>
                                  {v.assessment?.length <= 0 &&
                                  v.voucher?.length <= 0 &&
                                  v.course?.length <= 0 ? (
                                    "-"
                                  ) : (
                                    <>
                                      {v.assessment?.length > 0 &&
                                        v.assessment.map(
                                          (assessment, i) => assessment.name
                                        )}
                                      {v.voucher?.length > 0 &&
                                        v.voucher.map((voucher, i) => (
                                          <>{voucher.name} ,</>
                                        ))}
                                      {v.course?.length > 0 &&
                                        v.course.map((course, i) => (
                                          <>{course.name} </>
                                        ))}
                                    </>
                                  )}
                                </td>
                                <td className="text-center text-nowrap">
                                  {v.transaction_date
                                    ? moment(v.transaction_date).format(
                                        "DD-MM-YYYY"
                                      )
                                    : moment(v.created_at).format("DD-MM-YYYY")}
                                </td>
                                <td className="text-center">
                                  {v.invoice_id ? v.invoice_id : "-"}
                                </td>
                                {v.status === "success" ? (
                                  <td className={"text-center text-success"}>
                                    {Utils.titleCase(v.status)}
                                  </td>
                                ) : (
                                  <td className={"text-center text-danger"}>
                                    {Utils.titleCase(
                                      v.status === "created"
                                        ? "Pending"
                                        : v.status
                                    )}
                                  </td>
                                )}
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-lg-12 mt--20">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={"..."}
                          pageCount={totalPages}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={1}
                          onPageChange={handlePageClick}
                          containerClassName={
                            "edu-pagination justify-content-center"
                          }
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
      {active ? (
        <React.Suspense fallback="Loading...">
          <PurchaseHistoryDetail
            active={active}
            setActive={setActive}
            id={id}
            data={data}
          />
        </React.Suspense>
      ) : null}

      <LetUsHelp />
    </>
  );
}

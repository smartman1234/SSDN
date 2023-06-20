import React, { useState, useEffect, useContext } from "react";
import UserService from "../../Services/UserService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import ReactPaginate from "react-paginate";
import HeadingName from "../HeadingName/HeadingName";
import moment from "moment";
import Utils from "../../Utils/Utils";
import { CartContext } from "../../Container/Context";

const PurchaseHistoryDetail = React.lazy(() =>
  import("./PurchaseHistoryDetail")
);

const Profile = React.lazy(() => import("./Profile"));

export default function MyEnroll() {
  const [puchase, setPurchase] = useState([]);
  const userServe = new UserService();
  const [id, setId] = useState("");
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { user, image, bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
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
      let res = await userServe.enrollList(activity);

      if (res.status === "success") {
        setPurchase(res.data);
        setTotalPages(res.count / 12);
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
    <HeadingName name="My Enroll" home="Home" heading="My Enroll" />
      <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">

          <React.Suspense fallback="">
          <Profile />
            </React.Suspense>
          
            <div className="col-lg-9">
              <div className="edu-course-widget widget-category">
                <div className="inner">
                  <h5 className="widget-title">My Enroll List</h5>
                  <table className="table table-responsive-desk">
                    <thead>
                      <tr>
                        <th className="text-center text-nowrap">Sr. No.</th>
                        <th className="text-center text-nowrap">
                          Course Name{" "}
                          <span style={{ opacity: "0" }}>Course</span>
                        </th>
                        <th className="text-center text-nowrap"> Name</th>
                        <th className="text-center">Company</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">price</th>
                        <th className="text-center">Payment Method</th>
                        <th className="text-center">Payment id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {puchase?.length > 0 &&
                        puchase.map((v, i) => (
                          <>
                            <tr key={i} className="align-middle">
                              <td className="text-center">{i + offset + 1}</td>
                              <td className="text-center">
                                <p>{v?.course?.name}</p>
                              </td>
                              <td className={"text-center"}>
                                {Utils?.titleCase(v?.name)}
                                {v.email}
                              </td>
                              <td className={"text-center"}>
                                {Utils?.titleCase(v?.company)}
                              </td>{" "}
                              <td className={"text-center text-nowrap"}>
                                {moment(v?.updated_at).format("DD-MM-YYYY")}
                              </td>
                              <td className={"text-center"}>
                                {v?.payable_price}
                              </td>
                              <td className={"text-center"}>
                                {v?.payment_method === "pay_later"
                                  ? "Pay Later"
                                  : "Pay Now"}
                              </td>
                              <td className={"text-center"}>{v?.payment_id}</td>
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
        <React.Suspense fallback="">
          <PurchaseHistoryDetail
            active={active}
            setActive={setActive}
            id={id}
          />
        </React.Suspense>
      ) : null}

      <LetUsHelp />
    </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Container/Context";
import AssessmentService from "../../Services/AssessmentService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import HeadingName from "../HeadingName/HeadingName";
import Login from "../Login/Login";
import InstructionPop from "../InstructionModal/InstructionPop";
import moment from "moment";

const MyAssessmentLog = React.lazy(() => import("./MyAssessmentLog"));

const Profile = React.lazy(() => import("./Profile"));

export default function MyAssessment() {
  const [assessment, setAssessment] = useState([]);
  const { cartData, gettingCartItemslist } = useContext(CartContext);
  const [loginData, setLogingData] = useState({});
  const assessmentServe = new AssessmentService();
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [instruction, setInstruction] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
  });
  useEffect(() => {
    MyAssessmentListApi();
    setLogingData(window.user?.data);
  }, []);

  const apiCall = async (activity) => {
    try {
      let res = await assessmentServe.myAssessment(activity);
      if (res) {
        setAssessment(res.data);
        setTotalPages(res.count / 12);
        setTotalCount(res.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const ModalHandler = () => {
    setModalOpen(false);
    alert("You have already attempted this test .");
  };

  const MyAssessmentListApi = async () => {
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
      type: "active",
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search?.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search?.perPage,
      offset: currentPage,
      type: active === 1 ? "expired" : "active",
    };
    await apiCall(activity);
  };

  const activeHandler = (i) => {
    setActive(i);
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
      type: i === 1 ? "expired" : "active",
    };
    setAssessment([]);
    apiCall(activity);
  };

  const openInstructionHandle = (i) => {
    setInstruction((prev) => ({ [i]: !prev[i] }));
  };
  useEffect(() => {
    if (cartData.length) {
      if (cartData[0]?.length) {
        for (const item of cartData[0]) {
          setAddedToCart((prevState) => ({
            ...prevState,
            [item.assessment?.id]: "paid",
          }));
        }
      }
    }
  }, [cartData]);

  const addCourseTocart = async (value) => {
    let id = localStorage.getItem("custumer_id");

    if (id) {
    } else {
      id = localStorage.setItem(
        "custumer_id",
        Math.round(Math.random() * 1000000)
      );
    }

    let activity = {
      guest_user_id: localStorage.getItem("custumer_id"),
      assessments_id: value,
    };
    let obj = {
      limit: search?.perPage,
      offset: search?.start,
      type: "active",
    };
    try {
      let response = await assessmentServe.repurchase(activity);
      if (response.status === "success") {
        if (response.data.price_type === "free") {
          setActive(0);
          apiCall(obj);
        } else {
          toast.success("Successfully added to cart");

          setCourseInCart(+1);
          gettingCartItemslist();
          setAddedToCart((prevState) => ({
            ...prevState,
            [value]: response.data.price_type,
          }));
        }
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {window.user?.data?.auth_token ? (
        <>
          <HeadingName
            name="My Assessment"
            home="Home"
            heading="My Assessment"
          />

          <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
            <div className="container">
              <div className="row">
                <React.Suspense fallback="">
                  <Profile loginData={loginData} />
                </React.Suspense>

                <div className="col-lg-9">
                  <div className="edu-course-widget widget-category">
                    <div className="inner">
                      <h5 className="widget-title">My Assessment</h5>
                      <div className="eduvibe-animated-shape">
                        <div className="row">
                          <div className="col-lg-12 course-details-content">
                            <ul className="edu-course-tab nav nav-tabs justify-content-center">
                              <li className="nav-item mb--10">
                                <button
                                  className={
                                    active === 0
                                      ? `nav-link active`
                                      : `nav-link`
                                  }
                                  onClick={() => activeHandler(0)}
                                >
                                  Active Assessment
                                </button>
                              </li>
                              <li className="nav-item">
                                <button
                                  className={
                                    active === 1
                                      ? `nav-link active`
                                      : `nav-link`
                                  }
                                  onClick={() => activeHandler(1)}
                                >
                                  Expired Assessment
                                </button>
                              </li>
                            </ul>
                            {
                              <div className="tab-content">
                                <div className="tab-pane fade show active">
                                  <div className="course-tab-content1 mt-0">
                                    <div className="row">
                                      {assessment?.length > 0 &&
                                        assessment?.map((v, i) => (
                                          <div
                                            className="col-md-6 mt-0"
                                            key={i}
                                          >
                                            <div className="card">
                                              <div
                                                className="card-body ui-card--series ssdn-my-assessment"
                                                style={{
                                                  backgroundImage:
                                                    "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                                                  borderRadius: "5px",
                                                  height: "200px",
                                                }}
                                              >
                                                {
                                                  <span className="badge badge-pill">
                                                    {active === 0
                                                      ? "Expiring in"
                                                      : "Expired on"}{" "}
                                                    {moment(
                                                      v?.expired_at
                                                    ).format("DD-MM-YYYY")}
                                                  </span>
                                                }
                                                <div className="card-test__logo">
                                                  <LazyLoadImage
                                                    className="js-lazy-load-img loaded"
                                                    src={v.assessment?.image}
                                                    height="100%"
                                                    width="100%"
                                                  />
                                                </div>
                                                <h4 className="line-clamp-2 mb-3 ng-binding ng-scope">
                                                  <Link to="#">
                                                    {v.assessment?.name}
                                                  </Link>
                                                </h4>
                                                <div
                                                  className="card-bottom data "
                                                  style={{
                                                    borderTop:
                                                      "1px solid #f1f4f6",
                                                  }}
                                                >
                                                  <div className="read-more-btn">
                                                    {active === 0 ? (
                                                      <>
                                                        {v.assessment
                                                          ?.can_re_attempt ===
                                                        1 ? (
                                                          <>
                                                            <Link
                                                              onClick={() =>
                                                                openInstructionHandle(
                                                                  i
                                                                )
                                                              }
                                                              className="edu-btn btn-bg-alt text-center"
                                                              to="#"
                                                            >
                                                              Start test
                                                            </Link>

                                                            {instruction[i] && (
                                                              <InstructionPop
                                                                assessmentdata={
                                                                  v?.assessment
                                                                }
                                                                modalId={
                                                                  instruction[i]
                                                                }
                                                                handleClose={
                                                                  openInstructionHandle
                                                                }
                                                              />
                                                            )}
                                                          </>
                                                        ) : (
                                                          <Link
                                                            onClick={
                                                              ModalHandler
                                                            }
                                                            className="edu-btn btn-bg-alt text-center"
                                                            to="#"
                                                          >
                                                            Start test
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <>
                                                        {addedtoCart[
                                                          v.assessment?.id
                                                        ] === "paid" ? (
                                                          <Link
                                                            to="/cart"
                                                            className="edu-btn btn-bg-alt text-center"
                                                          >
                                                            Go to Cart
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            onClick={() =>
                                                              addCourseTocart(
                                                                v.assessment?.id
                                                              )
                                                            }
                                                            className="edu-btn btn-bg-alt text-center"
                                                            to="#"
                                                          >
                                                            Re-Purchase
                                                          </Link>
                                                        )}
                                                      </>
                                                    )}
                                                    <React.Suspense fallback="">
                                                      <MyAssessmentLog
                                                        data={v.assessment?.id}
                                                      />
                                                    </React.Suspense>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                    </div>
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
                            }
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
          <LetUsHelp />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

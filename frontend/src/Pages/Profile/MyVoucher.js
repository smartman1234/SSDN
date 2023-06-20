import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import VoucherService from "../../Services/VoucherService/VoucherService";
import ReactPaginate from "react-paginate";
import Login from "../Login/Login";
import { ToastContainer, toast } from "react-toastify";
import CartService from "../../Services/CartService";

import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";

const Profile = React.lazy(() => import("./Profile"));

export default function MyVoucher() {
  const { cartData, numberInCart, gettingCartItemslist, image } =
    useContext(CartContext);

  const cartServe = new CartService();
  const [addedtoCart, setAddedToCart] = useState({});
  const [courseInCart, setCourseInCart] = useState(null);
  const [myVoucher, setMyVoucher] = useState([]);
  const [loginData, setLogingData] = useState({});
  const voucherServe = new VoucherService();
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
  });

  useEffect(() => {
    MyVoucherListApi();
    setLogingData(window.user?.data);
  }, []);

  const apiCall = async (activity) => {
    try {
      let res = await voucherServe.myVoucher(activity);
      if (res) {
        setMyVoucher(res.data);
        setTotalPages(res.count / 12);
        setTotalCount(res.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const MyVoucherListApi = async () => {
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

  const addCourseTocart = async (e, v_id) => {
    let id = localStorage.getItem("custumer_id");

    if (id) {
    } else {
      id = localStorage.setItem(
        "custumer_id",
        Math.round(Math.random() * 1000000)
      );
    }
    let activity = {
      type: "voucher",
      guest_user_id: localStorage.getItem("custumer_id"),
      vouchers_id: v_id,
    };
    try {
      let response = await cartServe.addTocart(activity);
      if (response.status === "success") {
        toast.success("Successfully added to cart");
        setCourseInCart(response.quantity + 1);
        gettingCartItemslist();
        setAddedToCart((prevState) => ({
          ...prevState,
          [v_id]: !prevState[v_id],
        }));
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (cartData.length) {
      if (cartData[0]?.length) {
        for (const item of cartData[0]) {
          setAddedToCart((prevState) => ({
            ...prevState,
            [item.voucher?.id]: true,
          }));
        }
      }
    }
  }, [cartData]);
  return (
    <>
      {window.user?.data?.auth_token ? (
        <>
          <HeadingName heading="My Voucher" home="Home" name="My Voucher" />
          <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
            <div className="container">
              <div className="row">
              <React.Suspense fallback="">
              <Profile loginData={loginData} />
            </React.Suspense>
             
                <div className="col-lg-9">
                <div className="edu-course-widget widget-category">
                    <div className="inner">
                      <h5 className="widget-title">My Voucher</h5>
                        <div className="eduvibe-animated-shape">
                          <div className="row">
                            <div className="col-lg-12 course-details-content">
                              <div className="row">
                                {myVoucher?.length > 0 &&
                                  myVoucher?.map((v, i) => (
                                    <div className="col-md-4 mt-0" key={i}>
                                      <div className="card">
                                        <div
                                          className="card-body ui-card--series"
                                          style={{
                                            backgroundImage:
                                              "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                                            height: "192px",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <div className="card-test__logo">
                                             <LazyLoadImage
                                              className="js-lazy-load-img loaded"
                                              src={v?.voucher?.logo}
                                              alt={v?.voucher?.logo_alt_tag}
                                              height="100%"
                                              width="100%"
                                            />
                                          </div>
                                          <h4 className="line-clamp-2 leading-tight2 mb-3 ng-binding ng-scope">
                                            <Link
                                              to={`/vouchers/${v?.category?.slug}/${v?.voucher?.slug}`}
                                            >
                                              {v?.voucher?.name}
                                            </Link>
                                          </h4>
                                          <div
                                            className="card-bottom data text-center border-top"
                                          >
                                            <div className="read-more-btn">
                                              <Link
                                                to={`/vouchers/${v?.category?.slug}/${v?.voucher?.slug}`}
                                                className="edu-btn"
                                              >
                                                View Details
                                              </Link>
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

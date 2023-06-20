import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import WeOfferService from "../../../Services/WeOfferService/WeOfferService";
import CartService from "../../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../../Container/Context";

export default function VoucherCategory({ category }) {
  const serve = new WeOfferService();
  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);

  const [active, setActive] = useState(0);
  const [list, setList] = useState([]);
  const cartServe = new CartService();
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState({});

  useEffect(() => {
    if (active == 0) {
      CourseListApi(sessionStorage.getItem("voucherlug"));
    }
  }, []);

  const CourseListApi = async (id) => {
    let obj = {
      limit: 3,
      offset: 0,
      category_slug: id ? id : sessionStorage.getItem("voucherslug"),
      order_type: "latest",
    };
    try {
      let response = await serve.latestVoucher(obj);
      if (response) {
        setList(response.data);
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
  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade show active"
      >
          <div className="course-details-content self-created-tabs">
            <ul
              className="edu-course-tab nav nav-tabs"
            >
              {category?.length > 0 &&
                category.map((v, i) => (
                  <li
                    className="nav-item"
                    key={i}
                    onClick={() => {
                      setActive(i);
                      CourseListApi(v.slug);
                    }}
                  >
                    <button
                      className={active == i ? "nav-link active" : "nav-link"}
                    >
                      {v.name}
                    </button>
                  </li>
                ))}
            </ul>
            <div className="tab-content" id="myTabContent1">
              <div
                className="tab-pane fade show active"
              >
                  <div className="row">
                    {list?.length > 0 ? (
                      list?.map((v, i) => (
                        <div className="col-md-4" key={i}>
                          <div className="card mt-0 mb-4" style={{ height: "415px" }}>
                            <div
                              className="card-body ui-card--series radius"
                              style={{
                                backgroundImage:
                                  "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                              }}
                            >
                              {v?.is_inr_discount === 1 && (
                                <span className="badge badge-pill">
                                  {v?.inr_discount_price} % off
                                </span>
                              )}
                              <div className="card-test__logo">
                                 <LazyLoadImage
                                  className="js-lazy-load-img loaded"
                                  src={v.logo}
                                  alt={v.logo_alt_tag}
                                  height="100%"
                                  width="100%"
                                />
                              </div>
                              <h4
                                className="line-clamp-2 mb-3 ng-binding ng-scope leading-tight2"
                                onClick={() => {
                                  sessionStorage.setItem("vouchername", v.name);
                                  sessionStorage.setItem("voucherslug", v.slug);
                                }}
                              >
                                <Link
                                  to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                                >
                                  {v.name}
                                </Link>
                              </h4>
                              <p
                                className="leading-tight7"
                                style={{ height: "160px" }}
                                dangerouslySetInnerHTML={{
                                  __html: v.overview,
                                }}
                              />
                              <div
                                className="card-bottom data text-center border-top"
                              >
                                {v.is_stock === 0 && (
                                  <div className="price-list price-style-01">
                                    <div className="price current-price">
                                      Price:
                                    </div>
                                    <div className="price current-price">
                                      {v.currency_symbol
                                        ? v.currency_symbol
                                        : "₹"}{" "}
                                      {v.is_inr_discount === 1
                                        ? v.payable_price
                                        : v.inr_price}
                                    </div>
                                    {v.is_inr_discount === 1 && (
                                      <div className="price old-price">
                                        {" "}
                                        {v.currency_symbol
                                          ? v.currency_symbol
                                          : "₹"}{" "}
                                        {v.inr_price}
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div className="read-more-btn">
                                  {v.is_stock === 1 ? (
                                    <Link
                                      to="#"
                                      className="edu-btn btn-bg-alt text-center data-wrapper-class"
                                    >
                                      Out of stock
                                    </Link>
                                  ) : (
                                    <>
                                      {addedtoCart[v.id] ? (
                                        <Link
                                          to="/cart"
                                          className="edu-btn btn-bg-alt text-center"
                                        >
                                          Go to Cart
                                        </Link>
                                      ) : (
                                        <Link
                                          to="#"
                                          className="edu-btn btn-bg-alt text-center"
                                          onClick={(e) =>
                                            addCourseTocart(e, v.id)
                                          }
                                        >
                                          Add to Cart
                                        </Link>
                                      )}
                                    </>
                                  )}
                                  <Link
                                    to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                                    className="edu-btn"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No Voucher available !</p>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

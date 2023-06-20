import React, { useState, useContext, useEffect } from "react";
import Utils from "../../Utils/Utils";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CartContext } from "../../Container/Context";
import { ToastContainer, toast } from "react-toastify";
import CartService from "../../Services/CartService";

export default function ELearningPop({ isShown, setIsShown, data }) {
  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState(false);
  const cartServe = new CartService();

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
      type: "e_course",
      guest_user_id: localStorage.getItem("custumer_id"),
      e_course_id: value,
    };
    try {
      let response = await cartServe.addTocart(activity);
      if (response.status === "success") {
        toast.success("Successfully added to cart");
        setCourseInCart(response.quantity + 1);
        gettingCartItemslist();
        setAddedToCart((prevState) => ({
          ...prevState,
          [value]: !prevState[value],
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
            [item.e_course?.id]: true,
          }));
        }
      }
    }
  }, [cartData]);
  return (
    <div
      className={isShown[data.id] ? "modal fade show" : "modal fade"}
      id="exampleModal"
      style={isShown[data.id] ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {data.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsShown((prev) => ({ [data.id]: false }))}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="inner">
                <div className="eduvibe-widget">
                  <div className="video-area">
                    <div className="thumbnail video-popup-wrapper text-center">
                      {data?.is_inr_discount === 1 && (
                        <span className="badge badge-pill percentage-card">
                          {data?.inr_discount_price} % off
                        </span>
                      )}
                      {data.media_type === "video" ? (
                        <>
                          <LazyLoadImage
                            className="js-lazy-load-img loaded"
                            src={data.thumb_image}
                            height="100%"
                            width="100%"
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <LazyLoadImage
                            className="js-lazy-load-img loaded"
                            src={data.media}
                            height="100%"
                            width="100%"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="eduvibe-widget-details mt--35">
                    <div className="widget-content">
                      <ul>
                        <li>
                          <span>
                            <i className="icon-time-line"></i> Duration
                          </span>
                          <span className="design-data">-</span>
                          <span>{Utils.time(data?.course_duration)}</span>
                        </li>
                        <li>
                          <span>
                            <i className="icon-translate"></i> Language{" "}
                          </span>
                          <span className="design-data">-</span>
                          <span>{data?.language}</span>
                        </li>

                        <li>
                          <span>
                            {" "}
                            <i className="icon-award-line"></i> Certificate{" "}
                          </span>{" "}
                          <span className="design-data">-</span>
                          <span>
                            {data?.is_certificate == 1 ? "Yes" : "No"}
                          </span>
                        </li>

                        <li
                          style={{
                            borderBottom: "1px solid #eeeeee",
                            paddingBottom: "15px",
                          }}
                        >
                          <span>
                            <i className="icon-user-2-line_tie"></i>
                            Instructor
                          </span>
                          <span className="design-data">-</span>
                          <span>{Utils.titleCase(data?.instructor)}</span>
                        </li>
                      </ul>
                      <div
                        className="card-bottom data text-center"
                        style={{
                          borderTop: "1px solid rgb(241, 244, 246)",
                        }}
                      >
                        {data.price_type === "paid" ? (
                          <div className="price-list price-style-01">
                            <div className="price current-price">
                              Price:
                            </div>
                            <div className="price current-price">
                              {data.currency_symbol
                                ? data.currency_symbol
                                : "₹"}{" "}
                              {data.payable_price}
                            </div>
                            {data.is_inr_discount === 1 && (
                              <div className="price old-price">
                                {" "}
                                {data.currency_symbol
                                  ? data.currency_symbol
                                  : "₹"}{" "}
                                {data.inr_price}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="price-list price-style-01">
                            <div className="price current-price">Free</div>
                          </div>
                        )}
                        <div className="read-more-btn mt--15">
                          {data.price_type === "paid" && (
                            <>
                              {addedtoCart[data.id] ? (
                                <Link
                                  to="/cart"
                                  className="edu-btn w-100 text-center"
                                >
                                  Go to Cart
                                </Link>
                              ) : (
                                <>
                                  {data.is_order != 0 ? (
                                    <Link
                                      to={`/e-learning-study/${data.slug}`}
                                      className="edu-btn w-100 text-center"
                                    >
                                      Start Learning
                                    </Link>
                                  ) : (
                                    <Link
                                      to="#"
                                      className="edu-btn w-100 text-center"
                                      onClick={() =>
                                        addCourseTocart(data.id)
                                      }
                                    >
                                      Add to Cart
                                    </Link>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {data.price_type === "free" && (
                            <Link
                              to={`/e-learning-study/${data.slug}`}
                              className="edu-btn w-100 text-center"
                            >
                              Start Learning
                            </Link>
                          )}
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

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CartContext } from "../../../Container/Context";
import CartService from "../../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import { ShareSocial } from "react-share-social";
import "react-toastify/dist/ReactToastify.css";

const EnquiryNowPop = React.lazy(() => import("./EnquiryNowPop"));

export default function VoucherDetailCard({ voucherDetail }) {
  const [, setCourseInCart] = useState(null);
  const { modal, cartData, gettingCartItemslist } = useContext(CartContext);
  const [addedtoCart, setAddedToCart] = useState({});
  const [modalOpen, setModalOpen] = modal;

  const cartServe = new CartService();

  const EnquiryHandle = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = (e) => {
    const offsetHeight =
      document.getElementById("get-voucher-height").offsetHeight;
    const header = document.querySelector(".menu-sticky");
    const scrollTop = window.scrollY;
    if (scrollTop >= 300) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
    if (scrollTop >= offsetHeight - 300) {
      header.classList.remove("sticky");
    } else {
    }
  };

  useEffect(() => {
    if (cartData.length) {
      if (cartData?.[0]?.length) {
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
  const style = {
    copyContainer: {
      display: "none",
    },
    root: {
      border: 0,
      padding: 0,
    },
    title: {
      color: "aquamarine",
      fontStyle: "italic",
    },
  };
  return (
    <div className="col-xl-4 col-lg-5">
      <div className="eduvibe-sidebar course-details-sidebar menu-sticky">
        <div className="inner">
          <div className="eduvibe-widget">
            <div className="video-area">
              <div className="thumbnail video-popup-wrapper">
                {voucherDetail.currency === "SGD" &&
                  voucherDetail?.is_sgd_discount == 1 && (
                    <span className="badge badge-pill percentage-card">
                      {voucherDetail?.sgd_discount_price} % off
                    </span>
                  )}
                {voucherDetail.currency === "INR" &&
                  voucherDetail?.is_inr_discount == 1 && (
                    <span className="badge badge-pill percentage-card">
                      {voucherDetail?.inr_discount_price} % off
                    </span>
                  )}
                {voucherDetail.currency === "USD" &&
                  voucherDetail?.is_usd_discount == 1 && (
                    <span className="badge badge-pill percentage-card">
                      {voucherDetail?.usd_discount_price} % off
                    </span>
                  )}
                {voucherDetail.currency === "EUR" &&
                  voucherDetail?.is_usd_discount == 1 && (
                    <span className="badge badge-pill percentage-card">
                      {voucherDetail?.usd_discount_price} % off
                    </span>
                  )}
                 <LazyLoadImage
                  className="radius-small w-50"
                  src={voucherDetail?.logo}
                  alt={voucherDetail.logo_alt_tag}
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="thumbnail video-popup-wrapper">
                <h2 className="second-heading mt--20 mb--10">
                  {voucherDetail?.name}
                </h2>
              </div>
            </div>
            <div className="eduvibe-widget-details ">
              <div className="widget-content text-center">
                <div className="price-list text-center price-style-03 mt--0">
                  <div className="price current-price">Price :</div>
                  <div className="price current-price">
                    {voucherDetail.currency_symbol}
                    {voucherDetail?.payable_price}
                  </div>

                  {voucherDetail?.currency === "SGD" &&
                    voucherDetail?.is_sgd_discount == 1 && (
                      <div className="price old-price">
                        {voucherDetail?.currency_symbol}{" "}
                        {voucherDetail?.sgd_price}
                      </div>
                    )}
                  {voucherDetail?.currency === "INR" &&
                    voucherDetail?.is_inr_discount == 1 && (
                      <div className="price old-price">
                        {voucherDetail?.currency_symbol}{" "}
                        {voucherDetail?.inr_price}
                      </div>
                    )}
                  {voucherDetail?.currency === "USD" &&
                    voucherDetail?.is_usd_discount == 1 && (
                      <div className="price old-price">
                        {voucherDetail?.currency_symbol}{" "}
                        {voucherDetail?.usd_price}
                      </div>
                    )}
                  {voucherDetail?.currency === "EUR" &&
                    voucherDetail?.is_eur_discount == 1 && (
                      <div className="price old-price">
                        {voucherDetail?.currency_symbol}{" "}
                        {voucherDetail?.eur_price}
                      </div>
                    )}
                </div>
                {voucherDetail?.is_stock === 1 ? (
                  <button
                    to="#"
                    className="edu-btn btn-bg-alt w-100 text-center mt--20"
                  >
                    out of stock
                  </button>
                ) : (
                  <>
                    {
                      <div className="read-more-btn mt--20">
                        {addedtoCart[voucherDetail?.id] ? (
                          <Link
                            to="/cart" rel="nofollow"
                            className="edu-btn btn-bg-alt text-center"
                          >
                            Go to Cart
                          </Link>
                        ) : (
                          <button
                            to="#"
                            className="edu-btn btn-bg-alt text-center"
                            onClick={(e) =>
                              addCourseTocart(e, voucherDetail?.id)
                            }
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    }
                  </>
                )}

                <div className="read-more-btn mt--15" >
                  <button
                    className="edu-btn text-center"
                    // to="#"
                    onClick={EnquiryHandle}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
              <div className="read-more-btn mt--0 text-center">
                <div className="eduvibe-post-share">
                  <span>Share: </span>
                  <div>
                    <ShareSocial
                      url={window.location.href}
                      socialTypes={["facebook", "twitter", "linkedin"]}
                      style={style}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
      <div>
        {modalOpen && (
          <React.Suspense fallback="Loading...">
            <EnquiryNowPop voucherId={voucherDetail?.id} />
          </React.Suspense>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Container/Context";
import CartService from "../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function RelatedVouchers(
  voucherDetail,
  gettingSlugFromRelatedAssessmentVoucher
) {
  const [relatedVouchers, setRelatedVouchers] = useState([]);
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState({});
  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);

  const cartServe = new CartService();
  useEffect(() => {
    setRelatedVouchers(voucherDetail.voucherDetail);
  }, []);

  useEffect(() => {
    if (cartData.length) {
      if (cartData[0]?.length) {
        for (const item of cartData[0]) {
          if (voucherDetail.type === "assessment") {
            setAddedToCart((prevState) => ({
              ...prevState,
              [item.assessment?.id]: true,
            }));
          } else {
            setAddedToCart((prevState) => ({
              ...prevState,
              [item.voucher?.id]: true,
            }));
          }
        }
      }
    }
  }, [cartData]);
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    speed:500,
    autoplay: true,
    slidesToScroll: 3,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const addCourseTocart = async (v_id) => {
    let id = localStorage.getItem("custumer_id");

    if (id) {
    } else {
      id = localStorage.setItem(
        "custumer_id",
        Math.round(Math.random() * 1000000)
      );
    }
    let activity = {
      type: voucherDetail.type,
      guest_user_id: localStorage.getItem("custumer_id"),
    };
    if (voucherDetail.type === "voucher") {
      activity["vouchers_id"] = v_id;
    } else {
      activity["assessments_id"] = v_id;
    }
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
    <>
      {relatedVouchers?.length > 3 && (
        <div className="mt--20 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel">
          <Slider {...settings}>
            {relatedVouchers?.map((v, i) => (
              <div className="single-slick-card" key={i}>
                <div className="card ssdn-slide-data-base mt-0">
                  <div
                    className="card-body ui-card--series"
                    style={{
                      backgroundImage:
                        "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                      borderRadius: "5px",
                    }}
                  >
                    {voucherDetail.type === "assessment" &&
                      v.is_inr_discount == 1 && (
                        <span className="badge badge-pill">
                          {v.inr_discount_price} % off
                        </span>
                      )}
                    
                    {voucherDetail.type === "voucher" && (
                      <>
                     
                        {v.currency === "SGD" && v?.is_sgd_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.sgd_discount_price} % off
                          </span>
                        )}
                        {v.currency === "INR" && v?.is_inr_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.inr_discount_price} % off
                          </span>
                        )}
                        {v.currency === "USD" && v?.is_usd_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.usd_discount_price} % off
                          </span>
                        )}
                        {v.currency === "EUR" && v?.is_usd_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.usd_discount_price} % off
                          </span>
                        )}
                      </>
                    )}

                    <div className="card-test__logo">
                       <LazyLoadImage
                        className="js-lazy-load-img loaded"
                        src={
                          voucherDetail.type === "voucher" ? v.logo : v.image
                        }
                        alt={
                          voucherDetail.type === "voucher"
                            ? v.logo_alt_tag
                            : v.image_alt_tag
                        }
                        height="100%"
                        width="100%"
                      />
                    </div>
                    <h4
                      className="line-clamp-2 mb-3 ng-binding ng-scope leading-tight2"
                      onClick={() => {
                        localStorage.setItem("relatedassvourslug", v.slug);
                        gettingSlugFromRelatedAssessmentVoucher(v.slug);
                      }}
                    >
                      {voucherDetail.type === "voucher" && (
                        <Link to={`/vouchers/${v?.category?.slug}/${v.slug}`} rel="nofollow">
                          {v.name}
                        </Link>
                      )}
                      {voucherDetail.type === "assessment" && (
                        <Link to={`/assessment/${v?.category?.slug}/${v.slug}`} rel="nofollow">
                          {v.name}
                        </Link>
                      )}
                    </h4>
                    {voucherDetail.type === "assessment" && (
                      <ul>
                        <li className="ng-binding ng-scope">
                          Level :
                          {v.level?.charAt(0).toUpperCase() + v.level.slice(1)}
                        </li>
                        <li className="ng-binding ng-scope">
                          Duration : {v.duration} min
                        </li>
                        <li className="ng-binding ng-scope">
                          Total Questions :{v.number_of_question}
                        </li>
                        <li className="more-link ng-binding ng-scope">
                          Total Marks : {v.total_marks}
                        </li>
                      </ul>
                    )}
                    {voucherDetail.type === "voucher" && (
                      <p
                        className="leading-tight7 ssdn-editor-font"
                        style={{ height: "160px" }}
                        dangerouslySetInnerHTML={{
                          __html: v.overview,
                        }}
                      />
                    )}

                    {voucherDetail.type === "assessment" && (
                      <div
                        className="card-bottom data text-center border-top"
                      >
                        {v.is_order === 0 && v.price_type === "paid" ? (
                          <div className="price-list price-style-01">
                            <div className="price current-price">Price:</div>
                            <div className="price current-price">
                              {v.currency_symbol ? v.currency_symbol : "₹"}{" "}
                              {v.price_type === "paid" && v.payable_price}
                            </div>
                            {v.is_inr_discount === 1 && (
                              <div className="price old-price">
                                {v.currency_symbol ? v.currency_symbol : "₹"}{" "}
                                {v.inr_price}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="price-list price-style-01">
                            <div className="price current-price">Free</div>
                          </div>
                        )}
                        <div className="read-more-btn">
                          {v.is_stock === 1 ? (
                            <button
                              // to="#"
                              className="edu-btn btn-bg-alt text-center" 
                            >
                              Out of stock
                            </button>
                          ) : (
                            <>
                              {addedtoCart[v.id] ? (
                                <Link
                                  to="/cart"
                                  className="edu-btn btn-bg-alt text-center" rel="nofollow"
                                >
                                  Go to Cart
                                </Link>
                              ) : (
                                <button
                                  // to="#"
                                  className="edu-btn btn-bg-alt text-center"
                                  onClick={(e) => addCourseTocart(v.id)} 
                                >
                                  Add to Cart
                                </button>
                              )}
                            </>
                          )}
                          {voucherDetail.type === "voucher" && (
                            <Link
                              to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                              className="edu-btn"
                              onClick={() => {
                                localStorage.setItem(
                                  "relatedassvourslug",
                                  v.slug
                                );
                                gettingSlugFromRelatedAssessmentVoucher(v.slug);
                              }} rel="nofollow"
                            >
                              View Details
                            </Link>
                          )}
                          {voucherDetail.type === "assessment" && (
                            <Link
                              to={`/assessment/${v?.category?.slug}/${v.slug}`}
                              className="edu-btn"
                              onClick={() => {
                                localStorage.setItem(
                                  "relatedassvourslug",
                                  v.slug
                                );
                                gettingSlugFromRelatedAssessmentVoucher(v.slug);
                              }} rel="nofollow"
                            >
                              View Details
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                    {voucherDetail.type === "voucher" && (
                      <div
                        className="card-bottom data text-center border-top"
                      >
                        {v.is_stock == 0 && (
                          <div className="price-list price-style-01">
                            <div className="price current-price">Price:</div>
                            <div className="price current-price">
                              {v.currency_symbol}
                              {v.currency === "SGD"
                                ? v.is_sgd_discount == 1
                                  ? v.payable_price
                                  : v.sgd_price
                                : v.currency === "INR"
                                ? v.is_inr_discount == 1
                                  ? v.payable_price
                                  : v.inr_price
                                : v.currency === "USD"
                                ? v.is_usd_discount == 1
                                  ? v.payable_price
                                  : v.usd_price
                                : v.currency === "EUR"
                                ? v.is_eur_discount == 1
                                  ? v.payable_price
                                  : v.eur_price
                                : ""}
                            </div>
                            {v.currency === "SGD" && v.is_sgd_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.sgd_price}
                          </div>
                        )}
                        {v.currency === "INR" && v.is_inr_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.inr_price}
                          </div>
                        )}
                        {v.currency === "USD" && v.is_usd_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.usd_price}
                          </div>
                        )}
                        {v.currency === "EUR" && v.is_eur_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.eur_price}
                          </div>
                        )}
                          </div>
                        )}
                        <div className="read-more-btn">
                          {v.is_stock === 1 ? (
                            <button
                              // to="#"
                              className="edu-btn btn-bg-alt text-center"
                            >
                              Out of stock
                            </button>
                          ) : (
                            <>
                              {addedtoCart[v.id] ? (
                                <Link
                                  to="/cart"
                                  className="edu-btn btn-bg-alt text-center" rel="nofollow"
                                >
                                  Go to Cart
                                </Link>
                              ) : (
                                <button
                                  // to="#"
                                  className="edu-btn btn-bg-alt text-center"
                                  onClick={(e) => addCourseTocart(v.id)}
                                >
                                  Add to Cart
                                </button>
                              )}
                            </>
                          )}
                          <Link
                            to={`/vouchers/${v?.parent_category?.slug}/${v.slug}`} rel="nofollow"
                            className="edu-btn"
                            onClick={() => {
                              localStorage.setItem(
                                "relatedassvourslug",
                                v.slug
                              );
                              gettingSlugFromRelatedAssessmentVoucher(v.slug);
                            }}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              <ToastContainer autoClose={1000} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {relatedVouchers?.length > 0 && relatedVouchers.length <= 3 ? (
        <div
          className="mt--20 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel"
          style={{
            display: "flex",
            marginLeft: "16px",
            justifyContent: "center",
          }}
        >
          {relatedVouchers.map((v, i) => (
            <div
              className="col-md-3 col-sm-12"
              key={i}
              style={{ marginRight: "30px" }}
            >
              <div className="card" style={{ height: "470px" }}>
                <div
                  className="card-body ui-card--series"
                  style={{
                    backgroundImage:
                      "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                    borderRadius: "5px",
                  }}
                >
                  {voucherDetail.type === "assessment" &&
                      v.is_inr_discount == 1 && (
                        <span className="badge badge-pill">
                          {v.inr_discount_price} % off
                        </span>
                      )}
                    
                    {voucherDetail.type === "voucher" && (
                      <>
                      
                        {v.currency === "SGD" && v?.is_sgd_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.sgd_discount_price} % off
                          </span>
                        )}
                        {v.currency === "INR" && v?.is_inr_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.inr_discount_price} % off
                          </span>
                        )}
                        {v.currency === "USD" && v?.is_usd_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.usd_discount_price} % off
                          </span>
                        )}
                        {v.currency === "EUR" && v?.is_usd_discount == 1 && (
                          <span className="badge badge-pill">
                            {v?.usd_discount_price} % off
                          </span>
                        )}
                      </>
                    )}
                  <div className="card-test__logo">
                     <LazyLoadImage
                      className="js-lazy-load-img loaded"
                      src={v?.logo || v?.image}
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <h4
                    className="line-clamp-2 mb-3 ng-binding ng-scope leading-tight2"
                    onClick={() => {
                      localStorage.setItem("relatedassvourslug", v.slug);
                      gettingSlugFromRelatedAssessmentVoucher(v.slug);
                    }}
                  >
                    {voucherDetail.type === "voucher" && (
                      <Link to={`/vouchers/${v?.category?.slug}/${v.slug}`} rel="nofollow">
                        {v.name}
                      </Link>
                    )}
                    {voucherDetail.type === "assessment" && (
                      <Link to={`/assessment/${v?.category?.slug}/${v.slug}`} rel="nofollow">
                        {v.name}
                      </Link>
                    )}
                  </h4>
                  {voucherDetail.type === "assessment" && (
                    <ul>
                      <li className="ng-binding ng-scope">
                        Level :
                        {v.level?.charAt(0).toUpperCase() + v.level.slice(1)}
                      </li>
                      <li className="ng-binding ng-scope">
                        Duration : {v.duration} min
                      </li>
                      <li className="ng-binding ng-scope">
                        Total Questions :{v.number_of_question}
                      </li>
                      <li className="more-link ng-binding ng-scope">
                        Total Marks : {v.total_marks}
                      </li>
                    </ul>
                  )}
                  {voucherDetail.type === "voucher" && (
                    <p
                      className="leading-tight7 ssdn-editor-font"
                      style={{ height: "160px" }}
                      dangerouslySetInnerHTML={{
                        __html: v.overview,
                      }}
                    />
                  )}

                  {voucherDetail.type === "assessment" && (
                    <div
                      className="card-bottom data text-center border-top"
                    >
                      {v.price_type === "paid" ? (
                        <div className="price-list price-style-01">
                          <div className="price current-price">Price:</div>
                          <div className="price current-price">
                            {v.currency_symbol ? v.currency_symbol : "₹"}{" "}
                            {v.payable_price}
                          </div>
                          {v.is_inr_discount === 1 && (
                            <div className="price old-price">
                              {v.currency_symbol ? v.currency_symbol : "₹"}{" "}
                              {v.inr_price}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="price-list price-style-01">
                          <div className="price current-price">Free</div>
                        </div>
                      )}

                      <div className="read-more-btn">
                        {v.price_type === "paid" && (
                          <>
                            {addedtoCart[v.id] ? (
                              <Link
                                to="/cart"
                                className="edu-btn btn-bg-alt text-center" rel="nofollow"
                              >
                                Go to Cart
                              </Link>
                            ) : (
                              <>
                                {v.is_order != 0 ? (
                                  <Link
                                    to="/my-assessment"
                                    className="edu-btn btn-bg-alt text-center" rel="nofollow"
                                  >
                                    Go to My Assessment
                                  </Link>
                                ) : (
                                  <button
                                    // to="#"
                                    className="edu-btn btn-bg-alt text-center"
                                    onClick={() => addCourseTocart(v.id)}
                                  >
                                    Add to Cart
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        )}

                        <Link
                          to={`/assessment/${v?.category?.slug}/${v.slug}`} rel="nofollow"
                          className="edu-btn"
                          onClick={() => {
                            localStorage.setItem("relatedassvourslug", v.slug);
                            gettingSlugFromRelatedAssessmentVoucher(v.slug);
                          }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  )}
                  {voucherDetail.type === "voucher" && (
                    <div
                      className="card-bottom data text-center border-top"
                    >
                      {v.is_stock === 0 && (
                        <div className="price-list price-style-01">
                          <div className="price current-price">Price:</div>
                          <div className="price current-price">
                          {v.currency_symbol}{v.payable_price}
                         
                          </div>
                          {v.currency === "SGD" && v.is_sgd_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.sgd_price}
                          </div>
                        )}
                        {v.currency === "INR" && v.is_inr_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.inr_price}
                          </div>
                        )}
                        {v.currency === "USD" && v.is_usd_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.usd_price}
                          </div>
                        )}
                        {v.currency === "EUR" && v.is_eur_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.eur_price}
                          </div>
                        )}
                        </div>
                      )}
                      <div className="read-more-btn">
                        {v.is_stock === 1 ? (
                          <button
                            // to="#"
                            className="edu-btn btn-bg-alt text-center"
                          >
                            Out of stock
                          </button>
                        ) : (
                          <>
                            {addedtoCart[v.id] ? (
                              <Link
                                to="/cart"
                                className="edu-btn btn-bg-alt text-center" rel="nofollow"
                              >
                                Go to Cart
                              </Link>
                            ) : (
                              <button
                                // to="#"
                                className="edu-btn btn-bg-alt text-center"
                                onClick={(e) => addCourseTocart(v.id)}
                              >
                                Add to Cart
                              </button>
                            )}
                          </>
                        )}
                        <Link
                          to={`/vouchers/${v?.category?.slug}/${v.slug}`} rel="nofollow"
                          className="edu-btn"
                          onClick={() => {
                            localStorage.setItem("relatedassvourslug", v.slug);
                            gettingSlugFromRelatedAssessmentVoucher(v.slug);
                          }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            <ToastContainer autoClose={1000} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

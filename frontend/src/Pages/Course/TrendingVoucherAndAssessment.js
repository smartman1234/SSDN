import React from "react";
import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CartService from "../../Services/CartService";
import { CartContext } from "../../Container/Context";
import CategoryCourseService from "../../Services/CourseService/CategoryCourseService";

export default function TrendingVoucherAndAssessment() {
  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);
  const cartServe = new CartService();
  const [trendingCourse, setTrendingCourse] = useState([]);
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState({});
  const trending = new CategoryCourseService();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
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

  const TrendingVoucherAndAssessment = async () => {
    try {
      let response = await trending.trendingassessmentandvoucher();
      if (response) {
        setTrendingCourse(response.data);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    TrendingVoucherAndAssessment();
  }, []);
  
  useEffect(() => {
    if (cartData.length) {
      if (cartData[0]?.length) {
        for (const item of cartData[0]) {
          if (localStorage.getItem("type") === "assessment") {
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

  const addCourseTocart = async (id_, type) => {
    let id = localStorage.getItem("custumer_id");
    localStorage.setItem("type", type);

    if (id) {
    } else {
      id = localStorage.setItem(
        "custumer_id",
        Math.round(Math.random() * 1000000)
      );
    }
    let activity = {
      type: type,
      guest_user_id: localStorage.getItem("custumer_id"),
    };
    if (type === "voucher") {
      activity["vouchers_id"] = id_;
    } else {
      activity["assessments_id"] = id_;
    }
    try {
      let response = await cartServe.addTocart(activity);
      if (response.status === "success") {
        toast.success("Successfully added to cart");
        setCourseInCart(response.quantity + 1);
        gettingCartItemslist();
        setAddedToCart((prevState) => ({
          ...prevState,
          [id_]: !prevState[id_],
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
      {" "}
      {trendingCourse?.length > 0 && (
        <div className="edu-service-area service-wrapper-1 edu-section-gap bg-image">
          <div className="container eduvibe-animated-shape">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h3 className="title">
                    <span className="down-mark-line">Trending </span> VOUCHERS
                    AND ASSESSMENT
                  </h3>
                </div>
              </div>
            </div>
            {trendingCourse?.length > 3 && (
              <div className="mt--20 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel row">
                  <Slider {...settings}>
                    {trendingCourse.map((v, i) => (
                      <div className="single-slick-card col-md-4" key={i}>
                        <div
                          className="card mt--0 mb--20"
                          style={{ height: "420px" }}
                        >
                          <div
                            className="card-body ui-card--series"
                            style={{
                              backgroundImage:
                                "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                              borderRadius: "5px",
                            }}
                          >
                            {v.type === "voucher" &&
                              v.voucher?.is_inr_discount === 1 && (
                                <span className="badge badge-pill">
                                  {v.voucher?.inr_discount_price} off
                                </span>
                              )}
                            {v.type === "assessment" &&
                              v.assessment?.price_type === "paid" && (
                                <span className="badge badge-pill">
                                  {v.assessment?.inr_discount_price} off
                                </span>
                              )}
                            <div className="card-test__logo">
                              {v.type === "voucher" && (
                                 <LazyLoadImage
                                  className="js-lazy-load-img loaded"
                                  src={v.voucher.logo}
                                  height="100%"
                                  width="100%"
                                />
                              )}
                              {v.type === "assessment" && (
                                 <LazyLoadImage
                                  className="js-lazy-load-img loaded"
                                  src={v.assessment?.image}
                                  alt={v.assessment?.image_alt_tag}
                                  height="100%"
                                  width="100%"
                                />
                              )}
                            </div>
                            <h4 className="line-clamp-2 mb-3 ng-binding ng-scope">
                              {v.type === "assessment" && (
                                <Link
                                  to={`/assessment/${v.assessment?.category?.slug}/${v?.assessment?.slug}`}
                                >
                                  {v?.assessment?.name}
                                </Link>
                              )}
                              {v.type === "voucher" && (
                                <Link
                                  to={`/vouchers/${v?.voucher?.category?.slug}/${v.voucher?.slug}`}
                                >
                                  {v.voucher?.name}
                                </Link>
                              )}
                            </h4>
                            {v.type === "voucher" && (
                              <p
                                className="leading-tight5 ssdn-editor-font"
                                style={{ height: "120px" }}
                                dangerouslySetInnerHTML={{
                                  __html: v.voucher.overview,
                                }}
                              />
                            )}
                            {v.type === "assessment" && (
                              <ul>
                                <li className="ng-binding ng-scope">
                                  Level :
                                  {v.assessment?.level
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    v.assessment?.level.slice(1)}
                                </li>
                                <li className="ng-binding ng-scope">
                                  Duration : {v.assessment?.duration} min
                                </li>
                                <li className="ng-binding ng-scope">
                                  Total Questions :
                                  {v.assessment?.number_of_question}
                                </li>
                                <li className="more-link ng-binding ng-scope">
                                  Total Marks : {v.assessment?.total_marks}
                                </li>
                              </ul>
                            )}

                            {v.type === "assessment" && (
                              <div
                                className="card-bottom data text-center border-top"
                              >
                                {v.assessment?.price_type === "paid" ? (
                                  <div className="price-list price-style-01">
                                    <div className="price current-price">
                                      Price:
                                    </div>
                                    <div className="price current-price">
                                      {v.assessment.currency_symbol
                                        ? v.assessment.currency_symbol
                                        : "₹"}
                                      {v?.assessment?.payable_price}
                                    </div>
                                    {v?.assessment?.is_inr_discount === 1 && (
                                      <div className="price old-price">
                                        {v.assessment.currency_symbol
                                          ? v.assessment.currency_symbol
                                          : "₹"}
                                        {v?.assessment?.inr_price}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="price-list price-style-01">
                                    <div className="price current-price">
                                      Free
                                    </div>
                                  </div>
                                )}

                                <div className="read-more-btn">
                                  {v.assessment?.price_type === "paid" && (
                                    <>
                                      {addedtoCart[v.assessment?.id] ? (
                                        <Link
                                          to="/cart"
                                          className="edu-btn btn-bg-alt text-center"
                                        >
                                          Go to Cart
                                        </Link>
                                      ) : (
                                        <>
                                          {v.assessment?.is_order != 0 ? (
                                            <Link
                                              to="/my-assessment"
                                              className="edu-btn btn-bg-alt text-center"
                                            >
                                              Go to My Assessment
                                            </Link>
                                          ) : (
                                            <Link
                                              to="#"
                                              className="edu-btn btn-bg-alt text-center"
                                              onClick={() =>
                                                addCourseTocart(
                                                  v.assessment?.id,
                                                  v.type
                                                )
                                              }
                                            >
                                              Add to Cart
                                            </Link>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}

                                  <Link
                                    to={`/assessment/${v?.assessment?.category?.slug}/${v.assessment?.slug}`}
                                    className="edu-btn"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            )}
                            {v.type === "voucher" && (
                              <div
                                className="card-bottom data text-center border-top"
                              >
                                {v.voucher?.is_stock === 0 && (
                                  <div className="price-list price-style-01">
                                    <div className="price current-price">
                                      Price:
                                    </div>
                                    <div className="price current-price">
                                      {v.voucher.currency_symbol
                                        ? v.voucher.currency_symbol
                                        : "₹"}
                                      {v.voucher?.is_inr_discount === 1
                                        ? v.voucher?.payable_price
                                        : v.voucher?.inr_price}
                                    </div>
                                    {v.voucher?.is_inr_discount === 1 && (
                                      <div className="price old-price">
                                        {v.voucher?.currency_symbol
                                          ? v.voucher.currency_symbol
                                          : "₹"}
                                        {v.voucher?.inr_price}
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div className="read-more-btn">
                                  {v.voucher?.is_stock === 1 ? (
                                    <Link
                                      to="#"
                                      className="edu-btn btn-bg-alt text-center"
                                    >
                                      Out of stock
                                    </Link>
                                  ) : (
                                    <>
                                      {addedtoCart[v.voucher?.id] ? (
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
                                            addCourseTocart(
                                              v.voucher?.id,
                                              v.type
                                            )
                                          }
                                        >
                                          Add to Cart
                                        </Link>
                                      )}
                                    </>
                                  )}
                                  <Link
                                    to={`/vouchers/${v?.voucher?.category?.slug}/${v.voucher.slug}`}
                                    className="edu-btn"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
              </div>
            )}
            {trendingCourse?.length <= 3 && (
              <div
                className="mt--40 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel row"
                style={{ display: "flex" }}
              >
                {trendingCourse.map((v, i) => (
                  <div className="single-slick-card col-md-4" key={i}>
                    <div
                      className="card mt--0 mb--20"
                      style={{ height: "340px" }}
                    >
                      <div
                        className="card-body ui-card--series"
                        style={{
                          backgroundImage:
                            "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                          borderRadius: "5px",
                        }}
                      >
                        {v.type === "voucher" &&
                          v.voucher?.is_inr_discount === 1 && (
                            <span className="badge badge-pill">
                              {v.voucher?.inr_discount_price} off
                            </span>
                          )}
                        {v.type === "assessment" &&
                          v.assessment?.price_type === "paid" && (
                            <span className="badge badge-pill">
                              {v.assessment?.inr_discount_price} off
                            </span>
                          )}
                        <div className="card-test__logo">
                          {v.type === "voucher" && (
                             <LazyLoadImage
                              className="js-lazy-load-img loaded"
                              src={v.voucher.logo}
                              height="100%"
                              width="100%"
                            />
                          )}
                          {v.type === "assessment" && (
                             <LazyLoadImage
                              className="js-lazy-load-img loaded"
                              src={v.assessment.image}
                              alt={v.assessment.image_alt_tag}
                              height="100%"
                              width="100%"
                            />
                          )}
                        </div>
                        <h4 className="line-clamp-2 mb-3 ng-binding ng-scope">
                          {v.type === "assessment" && (
                            <Link
                              to={`/assessment-details/${v?.assessment?.slug}`}
                            >
                              {v?.assessment?.name}
                            </Link>
                          )}
                          {v.type === "voucher" && (
                            <Link
                              to={`/vouchers/${v?.category?.slug}/${v.voucher?.slug}`}
                            >
                              {v.voucher?.name}
                            </Link>
                          )}
                        </h4>
                        {v.type === "voucher" && (
                          <p
                            className="leading-tight5 ssdn-editor-font"
                            style={{ height: "120px" }}
                            dangerouslySetInnerHTML={{
                              __html: v.voucher.overview,
                            }}
                          />
                        )}
                        {v.type === "assessment" && (
                          <ul>
                            <li className="ng-binding ng-scope">
                              Level :
                              {v.assessment?.level?.charAt(0).toUpperCase() +
                                v.assessment?.level.slice(1)}
                            </li>
                            <li className="ng-binding ng-scope">
                              Duration : {v.assessment?.duration} min
                            </li>
                            <li className="ng-binding ng-scope">
                              Total Questions :{" "}
                              {v.assessment?.number_of_question}
                            </li>
                            <li className="more-link ng-binding ng-scope">
                              Total Marks : {v.assessment?.total_marks}
                            </li>
                          </ul>
                        )}

                        {v.type === "assessment" && (
                          <div
                            className="card-bottom data text-center border-top"
                          >
                            {v.assessment?.price_type === "paid" ? (
                              <div className="price-list price-style-01">
                                <div className="price current-price">
                                  Price:
                                </div>
                                <div className="price current-price">
                                  {v.assessment?.currency_symbol
                                    ? v.assessment?.currency_symbol
                                    : "₹"}
                                  {v?.assessment?.payable_price}
                                </div>
                                {v?.assessment?.is_inr_discount === 1 && (
                                  <div className="price old-price">
                                    {v.assessment?.currency_symbol
                                      ? v.assessment?.currency_symbol
                                      : "₹"}
                                    {v?.assessment?.inr_price}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="price-list price-style-01">
                                <div className="price current-price">Free</div>
                              </div>
                            )}

                            <div className="read-more-btn">
                              {v.assessment?.price_type === "paid" && (
                                <>
                                  {addedtoCart[v.assessment?.id] ? (
                                    <Link
                                      to="/cart"
                                      className="edu-btn btn-bg-alt text-center"
                                    >
                                      Go to Cart
                                    </Link>
                                  ) : (
                                    <>
                                      {v.assessment?.is_order != 0 ? (
                                        <Link
                                          to="/my-assessment"
                                          className="edu-btn btn-bg-alt text-center"
                                        >
                                          Go to My Assessment
                                        </Link>
                                      ) : (
                                        <Link
                                          to="#"
                                          className="edu-btn btn-bg-alt text-center"
                                          onClick={() =>
                                            addCourseTocart(
                                              v.assessment?.id,
                                              v.type
                                            )
                                          }
                                        >
                                          Add to Cart
                                        </Link>
                                      )}
                                    </>
                                  )}
                                </>
                              )}

                              <Link
                                to={`/assessment-details/${v.assessment?.slug}`}
                                className="edu-btn"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        )}
                        {v.type === "voucher" && (
                          <div
                            className="card-bottom data text-center border-top"
                          >
                            {v.voucher?.is_stock === 0 && (
                              <div className="price-list price-style-01">
                                <div className="price current-price">
                                  Price:
                                </div>
                                <div className="price current-price">
                                  {v.voucher?.currency_symbol
                                    ? v.voucher?.currency_symbol
                                    : "₹"}
                                  {v.voucher?.is_inr_discount === 1
                                    ? v.voucher?.payable_price
                                    : v.voucher?.inr_price}
                                </div>
                                {v.voucher?.is_inr_discount === 1 && (
                                  <div className="price old-price">
                                    {v.voucher?.currency_symbol
                                      ? v.voucher?.currency_symbol
                                      : "₹"}{" "}
                                    {v.voucher?.inr_price}
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="read-more-btn">
                              {v.voucher?.is_stock === 1 ? (
                                <Link
                                  to="#"
                                  className="edu-btn btn-bg-alt text-center"
                                >
                                  Out of stock
                                </Link>
                              ) : (
                                <>
                                  {addedtoCart[v.voucher?.id] ? (
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
                                        addCourseTocart(v.voucher?.id, v.type)
                                      }
                                    >
                                      Add to Cart
                                    </Link>
                                  )}
                                </>
                              )}
                              <Link
                                to={`/vouchers/${v?.voucher?.category?.slug}/${v.voucher.slug}`}
                                className="edu-btn"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ToastContainer autoClose={1000} />
        </div>
      )}
    </>
  );
}

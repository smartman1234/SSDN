import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WeOfferService from "../../../Services/WeOfferService/WeOfferService";
import CartService from "../../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../../Container/Context";

export default function CourseCategory({ courseCategory }) {
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
      CourseListApi(sessionStorage.getItem("courseslug"));
    }
  }, []);

  const CourseListApi = async (id) => {
    let obj = {
      limit: 3,
      offset: 0,
      category_slug: id ? id : sessionStorage.getItem("courseslug"),
      order_type: "latest",
    };
    try {
      let response = await serve.latestCourse(obj);
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
            [item.course?.id]: true,
          }));
        }
      }
    }
  }, [cartData]);

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
      type: "course",
      courses_id: v_id.toString(),

      guest_user_id: localStorage.getItem("custumer_id"),
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
    <>
      {" "}
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active">
          <div className="course-details-content self-created-tabs">
            <ul className="edu-course-tab nav nav-tabs">
              {courseCategory?.length > 0 &&
                courseCategory.map((v, i) => (
                  <li
                    className="nav-item mt-0"
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
              <div className="tab-pane fade show active">
                <div className="row">
                  {list?.length > 0 ? (
                    list?.map((v, i) => (
                      <div className="col-md-4 " key={i}>
                        <div className="edu-card card-type-3 radius">
                          <div className="inner">
                            <div className="thumbnail">
                              <Link to="/course-details" aria-label="course">
                                {v.media_type === "image" && (
                                  <LazyLoadImage
                                    src={v.media}
                                    alt="Full Stack Web Developer – MEAN Stack"
                                    height="100%"
                                    width="100%"
                                  />
                                )}
                                {v.media_type === "video" && (
                                  <img
                                    src={v.thumb_image}
                                    alt="Full Stack Web Developer – MEAN Stack"
                                    height="100%"
                                    width="100%"
                                  />
                                )}
                              </Link>
                              <div className="top-position status-group left-bottom">
                                <img
                                  src={v?.category?.icon}
                                  alt="image"
                                  height="100%"
                                  width="100%"
                                />
                              </div>
                            </div>
                            <div className="content">
                              <h6 className="title leading-tight1">
                                <Link
                                  to={`/${
                                    v?.category?.slug
                                  }/${v.slug.replaceAll(
                                    "-{{in-varcity}}",
                                    ""
                                  )}`}
                                  aria-label="Twitter"
                                >
                                  {v.name.replaceAll("{{in VARCITY}}", "")}
                                </Link>
                              </h6>
                              <p className="delivery-format">Delivery Format</p>
                              <div className="delivery-format-icons d-flex justify-content-between pt--10 pb--10">
                                <LazyLoadImage
                                  src={
                                    v?.training_mode?.mode_1_icon
                                      ? v?.training_mode?.image_url +
                                        v?.training_mode?.mode_1_icon
                                      : "/assets/images/mode-1540729954980.png"
                                  }
                                  alt=""
                                  height="100%"
                                  width="100%"
                                />
                                <LazyLoadImage
                                  src={
                                    v?.training_mode?.mode_2_icon
                                      ? v?.training_mode?.image_url +
                                        v?.training_mode?.mode_2_icon
                                      : "/assets/images/mode-1540729954980.png"
                                  }
                                  alt=""
                                  height="100%"
                                  width="100%"
                                />
                                <LazyLoadImage
                                  src={
                                    v?.training_mode?.mode_3_icon
                                      ? v?.training_mode?.image_url +
                                        v?.training_mode?.mode_3_icon
                                      : "/assets/images/mode-1540729954980.png"
                                  }
                                  alt=""
                                  height="100%"
                                  width="100%"
                                />
                              </div>
                              <div className="card-bottom">
                                {v.course_duration} {v.course_duration_time}
                                {v.course_duration > 1 ? "" : ""}
                                {v.average_review == 5 && (
                                  <div className="rating">
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                  </div>
                                )}
                                {v.average_review == 4 && (
                                  <div className="rating">
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                  </div>
                                )}
                                {v.average_review == 3 && (
                                  <div className="rating">
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                  </div>
                                )}
                                {v.average_review == 2 && (
                                  <div className="rating">
                                    <i className="icon-Star"></i>
                                    <i className="icon-Star"></i>
                                  </div>
                                )}
                                {v.average_review == 1 && (
                                  <div className="rating">
                                    <i className="icon-Star"></i>
                                  </div>
                                )}
                                {v.average_review == 0 ||
                                  (v.average_review === null && (
                                    <div className="rating"></div>
                                  ))}
                                {Math.round(v.review_count)}
                              </div>
                            </div>
                          </div>
                          <div className="card-hover-action">
                            <h6 className="title leading-tight1">
                              <Link
                                to={`/${v?.category?.slug}/${v.slug.replaceAll(
                                  "-{{in-varcity}}",
                                  ""
                                )}`}
                                aria-label="Twitter"
                              >
                                {v.name.replaceAll("{{in VARCITY}}", "")}
                              </Link>
                            </h6>

                            <p
                              className="description ssdn-hight-level mt-3 mb-5"
                              dangerouslySetInnerHTML={{
                                __html: v.course_overview?.replaceAll(
                                  "{{in VARCITY}}",
                                  ""
                                ),
                              }}
                            ></p>
                            <div className="custom-button-design">
                              {v.price_type === "paid" && (
                                <>
                                  {" "}
                                  {addedtoCart[v.id] ? (
                                    <Link
                                      to="/cart"
                                      className="edu-btn btn-bg-alt text-center mb-3"
                                    >
                                      Go to Cart
                                    </Link>
                                  ) : (
                                    <>
                                      {v.is_order != 0 ? (
                                        <Link
                                          to="/my-course"
                                          className="edu-btn btn-bg-alt text-center mb-3"
                                        >
                                          Go to My Course
                                        </Link>
                                      ) : (
                                        <Link
                                          to="#"
                                          className="edu-btn btn-bg-alt text-center mb-3"
                                          onClick={() => addCourseTocart(v.id)}
                                        >
                                          Add to Cart
                                        </Link>
                                      )}
                                    </>
                                  )}
                                </>
                              )}

                              <Link
                                className="edu-btn btn-medium btn-white"
                                to={`/${v?.category?.slug}/${v.slug}`}
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No Course Available !</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}

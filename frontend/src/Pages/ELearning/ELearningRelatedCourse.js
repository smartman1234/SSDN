import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CartService from "../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../Container/Context";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ELearningRelatedCourse({ relatedCourse }) {
  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);
  const cartServe = new CartService();
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState({});
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
    <div className="home-one-cat edu-service-area edu-section-gap bg-image ">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title">Related Courses</h3>
            </div>
          </div>
        </div>
        {relatedCourse?.length > 3 && (
          <div
            className="mt--20 row edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel"
            style={{ display: "flex" }}
          >
            <Slider {...settings}>
              {relatedCourse?.map((v, i) => (
                <div className="single-slick-card col-md-4" key={i}>
                  <div className="edu-card card-type-3 radius-small">
                    <div className="inner">
                      {v.media_type === "video" && (
                        <div className="thumbnail">
                          <Link to="#">
                            <LazyLoadImage
                              src={v.thumb_image}
                              alt="image"
                              height="100%"
                              width="100%"
                            />
                          </Link>
                        </div>
                      )}
                      {v.media_type === "image" && (
                        <div className="thumbnail">
                          <Link to="#">
                            <LazyLoadImage
                              className="w-100"
                              src={v.media}
                              alt="Course Meta"
                              height="100%"
                              width="100%"
                            />
                          </Link>
                        </div>
                      )}
                      <div className="content">
                        <h6 className="title">
                          <Link to="#">
                            {v.name.substring(0, 42)}
                            {v.name.length > 42 && "..."}
                          </Link>
                        </h6>
                        <p className="delivery-format">Delivery Format</p>
                        <div className="delivery-format-icons d-flex justify-content-between pt--10 pb--10">
                          <ul>
                            <li>
                              <LazyLoadImage
                                src={
                                  v.training_mode?.image_url +
                                  v.training_mode?.mode_1_icon
                                    ? v.training_mode?.image_url +
                                      v.training_mode?.mode_1_icon
                                    : "/assets/images/mode-1540731387983.png"
                                }
                                alt="Instructor-led"
                                height="31"
                                width="31"
                              />
                            </li>
                            <li>
                              <LazyLoadImage
                                src={
                                  v.training_mode?.image_url +
                                  v.training_mode?.mode_2_icon
                                    ? v.training_mode?.image_url +
                                      v.training_mode?.mode_2_icon
                                    : "/assets/images/mode-1540731387983.png"
                                }
                                alt="E-learning"
                                height="31"
                                width="31"
                              />
                            </li>
                            <li>
                              <LazyLoadImage
                                src={
                                  v.training_mode?.image_url +
                                  v.training_mode?.mode_3_icon
                                    ? v.training_mode?.image_url +
                                      v.training_mode?.mode_3_icon
                                    : "/assets/images/mode-1540731387983.png"
                                }
                                alt="Boot Camp"
                                height="31"
                                width="31"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="card-bottom">
                          <div className="price-list price-style-02">
                            <div className="price current-price">
                              {v.course_duration} {v.course_duration_time}
                              {v.course_duration > 1 ? "s" : ""}
                            </div>
                          </div>
                          <div className="edu-rating rating-default">
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
                            <span className="rating-count">
                              ({Math.round(v.review_count)})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-hover-action">
                      <div className="hover-content">
                        <h6 className="title leading-tight1">
                          <Link to="#">
                            {v.name.substring(0, 42)}
                            {v.name.length > 42 && "..."}
                          </Link>
                        </h6>

                        <p
                          className="description leading-tight5 ssdn-editor-font mt-3 mb-5"
                          dangerouslySetInnerHTML={{
                            __html: v.course_overview,
                          }}
                        />

                        <div className="custom-button-design">
                          <div className="read-more-btn">
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
                            <Link
                              className="edu-btn btn-medium btn-white"
                              to={`/${v?.category?.slug}/${v.slug}`}
                            >
                              View Details
                            </Link>
                          </div>
                          <div className="read-more-btn"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
        {relatedCourse?.length <= 3 && (
          <div
            className="mt--20 row edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel"
            style={{ display: "flex" }}
          >
            {relatedCourse?.map((v, i) => (
              <div className="single-slick-card col-md-4" key={i}>
                <div className="edu-card card-type-3 radius-small">
                  <div className="inner">
                    {v.media_type === "video" && (
                      <div className="thumbnail">
                        <Link to="#">
                          <LazyLoadImage
                            src={v.thumb_image}
                            alt="image"
                            height="100%"
                            width="100%"
                          />
                        </Link>
                      </div>
                    )}
                    {v.media_type === "image" && (
                      <div className="thumbnail">
                        <Link to="#">
                          <LazyLoadImage
                            className="w-100"
                            src={v.media}
                            alt="Course Meta"
                            height="100%"
                            width="100%"
                          />
                        </Link>
                      </div>
                    )}
                    <div className="content">
                      <h6 className="title">
                        <Link to="#">
                          {v.name.substring(0, 42)}
                          {v.name.length > 42 && "..."}
                        </Link>
                      </h6>
                      <p className="delivery-format">Delivery Format</p>
                      <div className="delivery-format-icons d-flex justify-content-between pt--10 pb--10">
                        <ul>
                          <li>
                            <LazyLoadImage
                              src={
                                v.training_mode?.image_url +
                                v.training_mode?.mode_1_icon
                                  ? v.training_mode?.image_url +
                                    v.training_mode?.mode_1_icon
                                  : "/assets/images/mode-1540731387983.png"
                              }
                              alt="Instructor-led"
                              height="31"
                              width="31"
                            />
                          </li>
                          <li>
                            <LazyLoadImage
                              src={
                                v.training_mode?.image_url +
                                v.training_mode?.mode_2_icon
                                  ? v.training_mode?.image_url +
                                    v.training_mode?.mode_2_icon
                                  : "/assets/images/mode-1540731387983.png"
                              }
                              alt="E-learning"
                              height="31"
                              width="31"
                            />
                          </li>
                          <li>
                            <LazyLoadImage
                              src={
                                v.training_mode?.image_url +
                                v.training_mode?.mode_3_icon
                                  ? v.training_mode?.image_url +
                                    v.training_mode?.mode_3_icon
                                  : "/assets/images/mode-1540731387983.png"
                              }
                              alt="Boot Camp"
                              height="31"
                              width="31"
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="card-bottom">
                        <div className="price-list price-style-02">
                          <div className="price current-price">
                            {v.course_duration} {v.course_duration_time}
                            {v.course_duration > 1 ? "s" : ""}
                          </div>
                        </div>
                        <div className="edu-rating rating-default">
                          {v.average_review === "5" && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review === "4" && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review === "3" && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review === "2" && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review === "1" && (
                            <div className="rating">
                              <i className="icon-Star"></i>
                            </div>
                          )}
                          {v.average_review === "0" ||
                            (v.average_review === null && (
                              <div className="rating"></div>
                            ))}
                          <span className="rating-count">
                            ({Math.round(v.review_count)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-hover-action">
                    <div className="hover-content">
                      <h6 className="title leading-tight1">
                        <Link to="#">
                          {v.name.substring(0, 42)}
                          {v.name.length > 42 && "..."}
                        </Link>
                      </h6>

                      <p
                        className="description leading-tight5 ssdn-editor-font mt-3 mb-5"
                        dangerouslySetInnerHTML={{ __html: v.course_overview }}
                      />

                      <div className="custom-button-design">
                        <div className="read-more-btn hellp">
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
                          <Link
                            className="edu-btn btn-medium btn-white"
                            to={`/${v?.category?.slug}/${v.slug}`}
                          >
                            View Details
                          </Link>
                        </div>
                        <div className="read-more-btn"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Container/Context";
import { ToastContainer, toast } from "react-toastify";
import InstructionModal from "../InstructionModal/InstructionModal";
import CartService from "../../Services/CartService";

const AssessmentEnquiryNow = React.lazy(() => import("./AssessmentEnquiryNow"));

export default function AssessmentDetailCard({ assessmentdata, highlight }) {
  const [addedtoCart, setAddedToCart] = useState({});
  const [updated, setUpdated] = useState([]);
  const [courseInCart, setCourseInCart] = useState(null);

  const { cartData, gettingCartItemslist, pop, instructionPop } =
    useContext(CartContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = pop;
  const [instruction, setInstruction] = instructionPop;
  useEffect(() => {
    setUpdated(highlight.toString().split(","));
  }, []);

  const cartServe = new CartService();
  useEffect(() => {
    if (cartData.length) {
      if (cartData?.[0]?.length) {
        for (const item of cartData[0]) {
          setAddedToCart((prevState) => ({
            ...prevState,
            [item.assessment?.id]: true,
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
      type: "assessment",
      guest_user_id: localStorage.getItem("custumer_id"),
      assessments_id: value,
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

  const ModalHandler = () => {
    setModalOpen(false);
    setInstruction(false);
    alert("You have already attempted this test .");
  };

  const dated = (time) => {
   
    let d=time.split(" ")
    return d?.[0]
  };

  return (
    <div className="course-details-card">
      <div className="course-content">
        <div className="row">
          <div className="col-md-8">
            <h6>{assessmentdata?.name}</h6>
            {highlight.map((v) => (
             
                <p
                  className="ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: v && v?.split(","),
                  }}
                />
             
            ))}
          </div>
          <div className="col-md-4 mt--30" style={{ position: "relative" }}>
            {assessmentdata?.price_type === "paid" &&
            assessmentdata?.is_order == 0 ? (
              <div className="price-list text-center price-style-03">
                <div className="price current-price">Price:</div>
                <div className="price current-price">
                  {assessmentdata?.currency_symbol
                    ? assessmentdata?.currency_symbol
                    : "₹"}{" "}
                  {assessmentdata?.payable_price}
                </div>
                {assessmentdata?.is_inr_discount === 1 && (
                  <div className="price old-price">
                    {assessmentdata?.currency_symbol
                      ? assessmentdata?.currency_symbol
                      : "₹"}{" "}
                    {assessmentdata?.inr_price}
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            {assessmentdata?.price_type === "free" && (
              <div className="price-list text-center price-style-03">
                <div className="price current-price">Free</div>
              </div>
            )}
            <div className="read-more-btn mt--20">
              {assessmentdata?.price_type === "paid" &&
              assessmentdata?.is_order != 0 ? (
                <>
                  <p className="mb-4 text-start">
                    <b>
                      {" "}
                      <i className="fa-solid fa-circle-info"></i> You purchased
                      this assessment on {dated(assessmentdata?.order_date)}
                    </b>
                  </p>
                  {window.user?.data?.auth_token ? (
                    <>
                      {assessmentdata?.can_re_attempt === 1 ? (
                        <Link
                          onClick={() => setInstruction(true)}
                          className="edu-btn w-100 text-center"
                          to="#"
                        >
                          Start test
                        </Link>
                      ) : (
                        <Link
                          onClick={ModalHandler}
                          className="edu-btn w-100 text-center"
                          to="#"
                        >
                          Start test
                        </Link>
                      )}

                      {instruction && (
                        <InstructionModal assessmentdata={assessmentdata} />
                      )}
                    </>
                  ) : (
                    <Link className="edu-btn w-100 text-center" to="/login">
                      Start test
                    </Link>
                  )}
                </>
              ) : (
                ""
              )}
              {open && (
                <React.Suspense fallback="">
                  <AssessmentEnquiryNow assessmentId={assessmentdata?.id} />
                </React.Suspense>
              )}
            </div>
            {assessmentdata?.price_type === "paid" &&
              assessmentdata?.is_order === 0 && (
                <>
                  <div className="read-more-btn mt--15">
                    <button
                      className="edu-btn btn-bg-alt text-center w-100"
                      onClick={() => setOpen(true)}
                    >
                      Enquiry Now
                    </button>
                  </div>
                  {addedtoCart[assessmentdata?.id] ? (
                    <div className="read-more-btn mt--15">
                      <Link to="/cart" className="edu-btn w-100 text-center">
                        Go to Cart
                      </Link>
                    </div>
                  ) : (
                    <div className="read-more-btn mt--15">
                      <>
                        {assessmentdata?.is_order != 0 ? (
                          <>
                            {window.user?.data?.auth_token ? (
                              <>
                                {assessmentdata?.can_re_attempt === 1 &&
                                  assessmentdata?.price_type === "paid" && (
                                    <Link
                                      onClick={() => setInstruction(true)}
                                      className="edu-btn w-100 text-center"
                                      to="#"
                                    >
                                      Start test
                                    </Link>
                                  )}
                                {assessmentdata?.can_re_attempt === 0 &&
                                  assessmentdata?.price_type === "paid" && (
                                    <Link
                                    to="#"
                                      onClick={() =>
                                        addCourseTocart(assessmentdata?.id)
                                      }
                                      className="edu-btn w-100 text-center"
                                    >
                                      Add to cart
                                    </Link>
                                  )}

                                {instruction && (
                                  <InstructionModal
                                    assessmentdata={assessmentdata}
                                  />
                                )}
                              </>
                            ) : (
                              <Link
                                className="edu-btn w-100 text-center"
                                to="/login"
                              >
                                Start test
                              </Link>
                            )}
                          </>
                        ) : (
                          <Link
                            to="#"
                            className="edu-btn w-100 text-center"
                            onClick={() => addCourseTocart(assessmentdata?.id)}
                          >
                            Add to Cart
                          </Link>
                        )}
                      </>
                    </div>
                  )}
                </>
              )}
            {assessmentdata?.price_type === "free" && (
              <div className="read-more-btn mt--15">
                {window.user?.data?.auth_token ? (
                  <>
                    {assessmentdata?.can_re_attempt === 1 ? (
                      <Link
                        onClick={() => setInstruction(true)}
                        className="edu-btn w-100 text-center"
                        to="#"
                      >
                        Start test
                      </Link>
                    ) : (
                      <Link
                        onClick={ModalHandler}
                        className="edu-btn w-100 text-center"
                        to="#"
                      >
                        Start test
                      </Link>
                    )}

                    {instruction && (
                      <InstructionModal assessmentdata={assessmentdata} />
                    )}
                  </>
                ) : (
                  <Link className="edu-btn w-100 text-center" to="/login">
                    Start test
                  </Link>
                )}
              </div>
            )}
            {assessmentdata?.price_type === "paid" &&
            assessmentdata?.is_order == 0 &&
            assessmentdata?.is_inr_discount === 1 ? (
              <div className="top-position status-group left-top">
                <span className="data1">
                  {assessmentdata?.inr_discount_price} %
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

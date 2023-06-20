import React, { useState, useEffect, useContext } from "react";
import CartService from "../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../Container/Context";

const RelatedCourseGreaterThan3 = React.lazy(() =>
  import("./RelatedCourseGreaterThan3")
);

const RelatedCourseLessThan3 = React.lazy(() =>
  import("./RelatedCourseGreaterThan3")
);

export default function RelatedCourse({ detailData }) {
  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);
  const cartServe = new CartService();
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState({});

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
      {detailData?.related_courses?.length > 0 && (
        <div className="home-one-cat edu-service-area edu-section-gap bg-image ">
          <div className="container eduvibe-animated-shape">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h3 className="title">Related Courses</h3>
                </div>
              </div>
            </div>
            <React.Suspense fallback="">
              <RelatedCourseGreaterThan3
                addCourseTocart={addCourseTocart}
                addedtoCart={addedtoCart}
                detailData={detailData}
              />
            </React.Suspense>

            <React.Suspense fallback="">
              <RelatedCourseLessThan3
                addCourseTocart={addCourseTocart}
                addedtoCart={addedtoCart}
                detailData={detailData}
              />
            </React.Suspense>
          </div>
          <ToastContainer autoClose={1000} />
        </div>
      )}
    </>
  );
}

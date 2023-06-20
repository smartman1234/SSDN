import React, { useState, useContext, useEffect } from "react";

import CartService from "../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../Container/Context";

const TrendingCourseGreaterThan3 = React.lazy(() =>
  import("./TrendingCourseGreaterThan3")
);

const TrendingCourseLessThan3 = React.lazy(() =>
  import("./TrendingCourseLessThan3")
);

export default function TrendingCourse({ trendingCourse }) {
  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);
  const cartServe = new CartService();
  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState({});
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
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
    <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title">
                <span className="down-mark-line">Trending </span> Course
              </h3>
            </div>
          </div>
        </div>

        <React.Suspense fallback="">
          <TrendingCourseGreaterThan3
            trendingCourse={trendingCourse}
            addCourseTocart={addCourseTocart}
            addedtoCart={addedtoCart}
            settings={settings}
          />
        </React.Suspense>

        <React.Suspense fallback="">
          <TrendingCourseLessThan3
            trendingCourse={trendingCourse}
            addCourseTocart={addCourseTocart}
            addedtoCart={addedtoCart}
          />
        </React.Suspense>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

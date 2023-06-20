import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../Container/Context";

import CartService from "../../Services/CartService";

export default function BuyTogetherCardTotal({
  buytogether,
  currency,
  checked,
  setAddedToCart,
  addedtoCart,
  addOnPrice,
  totalPrice,
}) {
  const [courseInCart, setCourseInCart] = useState(null);
  const { gettingCartItemslist } = useContext(CartContext);
  const cartServe = new CartService();
  const addedtoCartFunction = async (active) => {
    try {
      let response = await cartServe.addTocart(active);
      if (response.status === "success") {
        if (active.type === "course") {
          toast.success("Successfully added to cart");
        }

        setCourseInCart(response.quantity + 1);
        gettingCartItemslist();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      throw err;
    }
  };
  const addCourseTocart = async (course1, course2, id_) => {
    let secondId = course2;
    let id = localStorage.getItem("custumer_id");
    if (id) {
      console.log("id exists");
    } else {
      id = localStorage.setItem(
        "custumer_id",
        Math.round(Math.random() * 1000000)
      );
    }
    let obj = {
      type: "course",
      courses_id: course1.toString(),
      guest_user_id: localStorage.getItem("custumer_id"),
    };
    if (course2.length == 3) {
      obj["is_buy_together"] = 1;
      obj["buy_together_id"] = id_;
    }
    addedtoCartFunction(obj);
    setAddedToCart((prevState) => ({
      ...prevState,
      [course1]: !prevState[course1],
    }));
    let activity = { guest_user_id: localStorage.getItem("custumer_id") };
    let active = { guest_user_id: localStorage.getItem("custumer_id") };
    if (course2.length == 3) {
      activity["is_buy_together"] = 1;
      activity["buy_together_id"] = id_;
      active["is_buy_together"] = 1;
      active["buy_together_id"] = id_;
    }
    if (course2?.[1]?.type === "assessment") {
      activity["type"] = "assessment";
      activity["assessments_id"] = course2?.[1]?.id;
      addedtoCartFunction(activity);
      setAddedToCart((prevState) => ({
        ...prevState,
        [course1]: !prevState[course1],
      }));
    } else if (course2?.[1]?.type === "voucher") {
      activity["type"] = "voucher";
      activity["vouchers_id"] = course2?.[1]?.id;
      addedtoCartFunction(activity);
      setAddedToCart((prevState) => ({
        ...prevState,
        [course1]: !prevState[course1],
      }));
    } else if (course2[1].type === "course") {
      activity["type"] = "course";
      activity["courses_id"] = course2?.[1]?.id;
      addedtoCartFunction(activity);
      setAddedToCart((prevState) => ({
        ...prevState,
        [course1]: !prevState[course1],
      }));
    } else {
      return;
    }
    if (course2[2].type === "assessment") {
      active["type"] = "assessment";
      active["assessments_id"] = course2?.[2]?.id;
      addedtoCartFunction(active);
      setAddedToCart((prevState) => ({
        ...prevState,
        [course1]: !prevState[course1],
      }));
    } else if (course2[2].type === "voucher") {
      active["type"] = "voucher";
      active["vouchers_id"] = course2?.[2]?.id;
      addedtoCartFunction(active);
      setAddedToCart((prevState) => ({
        ...prevState,
        [course1]: !prevState[course1],
      }));
    } else if (course2[2].type === "course") {
      active["type"] = "course";
      active["courses_id"] = course2?.[2]?.id;
      addedtoCartFunction(active);
      setAddedToCart((prevState) => ({
        ...prevState,
        [course1]: !prevState[course1],
      }));
    } else {
      return;
    }
  };
  return (
    <div className="col-md-3 position-relative">
      <div className="edu-card card-type-3 radius-small">
        <div className="inner"  style={{ height: "280px" }}>
          <div className="content">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="date-data w-600">1 Item</td>
                  <td className="text-end">
                    <span className="product-quantity">
                      {currency ? currency : "₹"}
                      {buytogether?.main_course?.payable_price
                        ? buytogether?.main_course?.payable_price
                        : 0}
                    </span>
                  </td>
                </tr>
                <tr className="order-subtotal">
                  <td className="date-data w-600">
                    {" "}
                    {checked.length ? checked.length - 1 : 0} Item Addon
                  </td>
                  <td className="text-end">
                    {currency ? currency : "₹"}
                    {addOnPrice.toFixed(2)}
                  </td>
                </tr>
                <tr className="order-total">
                  <td className="date-data w-600">Total</td>

                  <td className="text-end">
                    {currency ? currency : "₹"}
                    {totalPrice
                      ? totalPrice.toFixed(2)
                      : buytogether?.main_course?.payable_price.toFixed(2)
                      ? buytogether?.main_course?.payable_price.toFixed(2)
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
            {addedtoCart[buytogether?.main_course?.id] ? (
              <div className="cart-summary-button-group">
                <Link className="edu-btn w-100 text-center" to="/cart">
                  Go to cart
                </Link>
              </div>
            ) : (
              <div
                className="cart-summary-button-group"
                onClick={() =>
                  addCourseTocart(
                    buytogether?.main_course?.id,
                    checked,
                    buytogether.id
                  )
                }
              >
                <Link className="edu-btn w-100 text-center" to="#">
                  Add {checked.length ? checked.length : 1} items to cart
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="plus-data1">=</span>
    </div>
  );
}

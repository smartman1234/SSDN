import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../Container/Context";
import CartService from "../../Services/CartService";

const AssessmentCart = React.lazy(() => import("./AssessmentCart"));

const CourseCart = React.lazy(() => import("./CourseCart"));

const ECourseCart = React.lazy(() => import("./ECourseCart"));

const VoucherCart = React.lazy(() => import("./VoucherCart"));

export default function CartCard() {
  const { numberInCart, gettingCartItemslist, cartData, success, percentages } =
    useContext(CartContext);

  const [percentage, setPercentage] = percentages;
  const [successCoupon, setSuccessCoupon] = success;
  const [cartList, setCartList] = cartData;
  const [count, setCount] = useState({});
  const [itemInCart, setItemInCart] = numberInCart;

  useEffect(() => {
    for (const i in percentage) {
      if (i === "data") {
        const value = percentage[i];
        for (const i of value) {
        }
      }
    }
  }, []);

  useEffect(() => {
    const itemCount = {};
    for (const item of cartList) {
      itemCount[item.id] = parseInt(item.quantity);
    }
    setCount({ ...itemCount });
  }, [cartList]);

  const cartServe = new CartService();

  const decreaseVoucherHandle = async (id) => {
    if (count[id] > 1) {
      let obj = {
        cart_id: id,
        quantity: count[id] ? count[id] - 1 : 1,
        guest_user_id: localStorage.getItem("custumer_id"),
      };
      try {
        let response = await cartServe.updateQuantity(obj);
        if (response) {
          setSuccessCoupon("");
          gettingCartItemslist();
          setCount((prevState) => ({
            ...prevState,
            [id]: prevState[id] > 0 ? prevState[id] - 1 : 1,
          }));
        }
      } catch (err) {
        throw err;
      }
    } else {
      alert("Voucher can not be less than 1");
    }
  };

  const increaseVoucherHandle = async (id) => {
    let obj = {
      cart_id: id,
      quantity: count[id] + 1,
      guest_user_id: localStorage.getItem("custumer_id"),
    };
    try {
      let response = await cartServe.updateQuantity(obj);
      if (response) {
        gettingCartItemslist();
        setSuccessCoupon("");
        setCount((prevState) => ({
          ...prevState,
          [id]: prevState[id] ? prevState[id] + 1 : 1,
        }));
      }
    } catch (err) {
      throw err;
    }
  };

  const cartItemRemovehandle = async (v) => {
    let activity = {
      guest_user_id: localStorage.getItem("custumer_id"),
      cart_id: v.id,
    };
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await cartServe.deleteAssessmentCart(activity);

        if (response.message === "Successfully delete cart") {
          setCartList(cartList);
          toast.success(response.message);
          gettingCartItemslist();
          setItemInCart(itemInCart - 1);
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <div className="card mt--0">
        <div className="card-body cart-summary">
          <h4 className="title">Shopping Cart</h4>
          <ul className="all-courses-liststyle">
            {cartList?.map((v, i) => (
              <>
                <React.Suspense fallback="">
                <AssessmentCart
                  v={v}
                  successCoupon={successCoupon}
                  cartItemRemovehandle={cartItemRemovehandle}
                />
              </React.Suspense>

              <React.Suspense fallback="">
              <VoucherCart
                  v={v}
                  successCoupon={successCoupon}
                  cartItemRemovehandle={cartItemRemovehandle}
                  decreaseVoucherHandle={decreaseVoucherHandle}
                  increaseVoucherHandle={increaseVoucherHandle}
                  count={count}
                />
              </React.Suspense>
              
               
                 <React.Suspense fallback="">
                 <CourseCart
                  v={v}
                  successCoupon={successCoupon}
                  cartItemRemovehandle={cartItemRemovehandle}
                />
              </React.Suspense>

              <React.Suspense fallback="">
              <ECourseCart
                  v={v}
                  successCoupon={successCoupon}
                  cartItemRemovehandle={cartItemRemovehandle}
                />
              </React.Suspense>
              
               
              </>
            ))}
          </ul>
        </div>{" "}
      </div>
    </>
  );
}

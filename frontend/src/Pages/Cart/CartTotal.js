import React, { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import axios from "axios";
import { CartContext } from "../../Container/Context";
import CartService from "../../Services/CartService";

const TokenForm = React.lazy(() => import("./TokenForm"));

const StripeForm = React.lazy(() => import("./StripeForm"));

const RazorPayForm = React.lazy(() => import("./RazorPayForm"));

const CartTable = React.lazy(() => import("./CartTable"));

export default function CartTotal({ cartList, setLoader }) {
  const {
    orderPayment,
    gettingCartItemslist,
    numberInCart,
    percentages,
    coupon_code,
    couponAmount,
    success,
  } = useContext(CartContext);
  const cartServe = new CartService();
  const [successCoupon, setSuccessCoupon] = success;
  const [itemInCart, setItemInCart] = numberInCart;
  const [coupon, setCoupon] = coupon_code;

  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [discountCouponAmt, setDiscountAmt] = couponAmount;
  const [percentage, setPercentage] = percentages;
  const [paymentData, setOrderPaymentData] = orderPayment;
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [ip, setIP] = useState("");
  const [value, setValue] = useState({
    terms: "",
  });
  const [inputvalue, setInputValue] = useState({ coupon: "" });
  const [removedCoupon, setRemovedCoupon] = useState(false);

  useEffect(() => {
    gettingsymbol(percentage);
  }, []);

  const gettingsymbol = (percentage) => {
    const data = percentage.data;

    for (const i in data) {
      const currency =
        data[i].assessment ||
        data[i].voucher ||
        data[i].course ||
        data[i].e_course;
      localStorage.setItem("symbol", currency?.currency_symbol);
    }
  };
  useEffect(() => {
    const voucherTotalAmount = cartList?.[0]?.reduce(
      (previousValue, currentValue) => {
        let payblePrice = 0;
        switch (currentValue.type) {
          case "assessment":
            payblePrice = currentValue?.assessment?.payable_price;
            break;

          default:
            payblePrice = currentValue?.voucher?.payable_price;
            break;
        }
        return previousValue + parseInt(currentValue.quantity) * payblePrice;
      },
      0
    );
    setSubTotalAmount(voucherTotalAmount);
  }, [cartList]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };

  useEffect(() => {
    getData();

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const removeCouponhandle = () => {
    sessionStorage.removeItem("coupon");
    gettingCartItemslist();
    setCoupon("");
    setRemovedCoupon(false);
    setSuccessCoupon("");
  };

  const ValidateSchema = Yup.object().shape({
    terms: Yup.string().required("Please select terms & conditions"),
  });

  return (
    <div className="card cart-summary mt--0">
      <React.Suspense fallback="">
        <CartTable
          percentage={percentage}
          removedCoupon={removedCoupon}
          successCoupon={successCoupon}
          discountCouponAmt={discountCouponAmt}
        />
      </React.Suspense>

      {removedCoupon === "false" || coupon ? (
        <div className="card-body coupon-code-btn w-100 pt--0 pb--0 ">
          <p className="applied-copon">{coupon} (Applied!)</p>

          <button
            className="edu-btn remove"
            to="#"
            style={{ top: "0px" }}
            onClick={removeCouponhandle}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ) : (
        ""
      )}
      {!coupon && (
           <React.Suspense fallback="">
          <TokenForm
          inputvalue={inputvalue}
          gettingCartItemslist={gettingCartItemslist}
          setInputValue={setInputValue}
          setRemovedCoupon={setRemovedCoupon}
        />
         </React.Suspense>
      
      )}

      {localStorage.getItem("currency") === "INR" ? (
        <React.Suspense fallback="">
          <RazorPayForm
            value={value}
            percentage={percentage}
            setLoader={setLoader}
            ValidateSchema={ValidateSchema}
            coupon={coupon}
            discountCouponAmt={discountCouponAmt}
            ip={ip}
            setOrderPaymentData={setOrderPaymentData}
            gettingCartItemslist={gettingCartItemslist}
            setItemInCart={setItemInCart}
          />
        </React.Suspense>
      ) : (

        <React.Suspense fallback="">
        <StripeForm
          value={value}
          percentage={percentage}
          setLoader={setLoader}
          ValidateSchema={ValidateSchema}
          coupon={coupon}
          discountCouponAmt={discountCouponAmt}
          ip={ip}
          setOrderPaymentData={setOrderPaymentData}
          gettingCartItemslist={gettingCartItemslist}
          setItemInCart={setItemInCart}
          setPaymentLoading={setPaymentLoading}
          isPaymentLoading={isPaymentLoading}
        />
      </React.Suspense>
      
      )}
    </div>
  );
}

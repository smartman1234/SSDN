import { useState, useEffect } from "react";
import { createContext } from "react";
import CartService from "../Services/CartService";
import MetaService from "../Services/MetaServices/MetaService";

export const CartContext = createContext();
const { Provider } = CartContext;
const metaService = new MetaService();

export const CartProvider = (props) => {
  const [banner, setBannerImage] = useState();
  const [SearchModal, setSearchModal] = useState(false);
  const cartServe = new CartService();
  const [cartList, setCartList] = useState([]);
  const [itemInCart, setItemInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [testResponse, settestResponse] = useState([]);
  const [userName, setUserName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [successCoupon, setSuccessCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [assessmentCouponDiscount, setAssessmentCouponDiscount] =
    useState(null);
  const [voucherCouponDiscount, setVoucherCouponDiscount] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountCouponAmt, setDiscountAmt] = useState(null);
  const [reportQuestion, setReportQuestion] = useState([]);
  const [data, setData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState(false);
  const [AssessmentCategoryListData, setAssessmentCategoryListData] = useState(
    []
  );

  useEffect(() => {
    const name = localStorage.getItem("username");
    const image = localStorage.getItem("userimage");
    setUserName(name);
    setUserImage(image);
    getbannerImage();
  }, []);

  useEffect(() => {
    gettingCartItemslist();

    return () => {
      sessionStorage.removeItem("coupon");
    };
  }, [itemInCart]);

  const setAssessmentCategoryListApiData = (assessmentData) => {
    localStorage.setItem("assessment", JSON.stringify(assessmentData));
  };

  const setOrderPaymentData = (data) => {
    localStorage.setItem("payment", JSON.stringify(data));
  };

  window.onunload = function () {
    sessionStorage.removeItem("coupon");
  };

  const gettingCartItemslist = async () => {
    let activity = {};
    if (localStorage.getItem("custumer_id")) {
      activity["guest_user_id"] = localStorage.getItem("custumer_id");
    }
    if (sessionStorage.getItem("coupon")) {
      activity["coupon_code"] = sessionStorage.getItem("coupon");
    }
    if (localStorage.getItem("custumer_id") || window.user?.data?.auth_token) {
      try {
        let response = await cartServe.gettingCartList(activity);
        setPercentage(response);
        setCartList(response.data);
        setCoupon(response.coupon_code);
        sessionStorage.setItem("message", response.coupon_message);
        setCouponMessage(response.coupon_message);
        setSuccessCoupon(response.coupon_status);
        setDiscountAmt(response.coupon_discount);
        const calTotalAmount =
          response?.data &&
          response?.data.reduce((accumulator, v) => {
            return accumulator + v.quantity * v.assessment?.payable_price;
          }, 0);
        setTotalAmount(calTotalAmount);
        const totalQuantity =
          response.data &&
          response.data.reduce((accumulator, v) => {
            return accumulator + parseInt(v.quantity);
          }, 0);
        setItemInCart(totalQuantity);
      } catch (err) {
        throw err;
      }
    }
  };

  const getbannerImage = async () => {
    try {
      let response = await metaService.service("banner-image");
      if (response.status === "success") {
        setBannerImage(response.data?.page_description);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <Provider
      value={{
        cartData: [cartList, setCartList],
        numberInCart: [itemInCart, setItemInCart],
        gettingCartItemslist: gettingCartItemslist,
        totalPrice: [totalAmount, setTotalAmount],
        coupon_code: [coupon, setCoupon],
        success: [successCoupon, setSuccessCoupon],
        couponAmount: [discountCouponAmt, setDiscountAmt],
        percentages: [percentage, setPercentage],
        testResult: [testResponse, settestResponse],
        modal: [modalOpen, setModalOpen],
        pop: [open, setOpen],
        message: [couponMessage, setCouponMessage],
        reported: [reportQuestion, setReportQuestion],
        dataValue: [data, setData],
        login: [loginData, setLoginData],
        assessmentDiscount: [
          assessmentCouponDiscount,
          setAssessmentCouponDiscount,
        ],
        user: [userName, setUserName],
        search: [SearchModal, setSearchModal],
        image: [userImage, setUserImage],
        voucherDiscount: [voucherCouponDiscount, setVoucherCouponDiscount],
        instructionPop: [instruction, setInstruction],
        orderPayment: [paymentData, setOrderPaymentData],
        AssessmentCategory: [
          AssessmentCategoryListData,
          setAssessmentCategoryListApiData,
        ],
        bannery: [banner, setBannerImage],
      }}
    >
      {props.children}
    </Provider>
  );
};

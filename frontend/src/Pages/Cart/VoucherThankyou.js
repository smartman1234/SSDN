import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Container/Context";
import CartService from "../../Services/CartService";
import moment from "moment";
import Utils from "../../Utils/Utils";

const StripePaymentThankYou = React.lazy(() =>
  import("./StripePaymentThankYou")
);

export default function VoucherThankyou() {
    const { numberInCart, gettingCartItemslist } = useContext(CartContext);
    const [payment, setPayment] = useState({});
    const cartServe = new CartService();

    const [itemInCart, setItemInCart] = numberInCart;
    const data = window.location.search.split("&");

    useEffect(() => {
        window.scroll(0, 0);
        setPayment(JSON.parse(localStorage.getItem("payment")));
        paymentApi();
    }, []);

    const paymentApi = async () => {
        let obj = {
            payment_intent: data?.[0]?.replace("?payment_intent=", ""),
            payment_intent_client_secret: data?.[1]?.replace(
                "payment_intent_client_secret=",
                ""
            ),
            redirect_status: data?.[2]?.replace("redirect_status=", ""),
        };
        if (localStorage.getItem("type") === "both") {
            try {
                let response = await cartServe.stripePayment(obj);
                if (response) {
                    setPayment(response.data);
                    localStorage.setItem("payment", JSON.stringify(response.data));

                    gettingCartItemslist();
                    setItemInCart(0);
                }
            } catch (err) {
                throw err;
            }
        }
    };

    return (
        <>
            <div className="edu-privacy-policy-area edu-privacy-policy edu-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="title text-center">Thanks for Payment</h4>
                                    <p className="text-center">
                                        Your order has been submitted successfully.
                                    </p>
                                    <p className="text-primary mb--30 text-center">
                                        {payment?.is_voucher === 1 &&
                                            "Voucher will be share on mail with in 2 hours"}
                                    </p>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <table className="table table-bordered mb--30">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <strong>Name :</strong>{" "}
                                                            {Utils.titleCase(payment?.name)}
                                                        </td>
                                                        <td className="text-end">
                                                            <strong>Date : </strong>
                                                            {moment(payment?.date).format("DD-MM-YYYY")}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Email :</strong> {payment?.email}
                                                        </td>
                                                        <td className="text-end">
                                                            <strong>Order ID :</strong> {payment?.order_id}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Contact :</strong>{" "}
                                                            {payment?.contact_no ||
                                                                payment?.contact_number ||
                                                                payment?.mobile}
                                                        </td>
                                                        <td className="text-end">
                                                            <strong>Invoice ID :</strong>{" "}
                                                            {payment?.invoice_id}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-7">
                                            {payment?.orders?.map((v, i) => (
                                                 <React.Suspense fallback="">
                                               <StripePaymentThankYou v={v} />
                                               </React.Suspense>
                                               
                                            ))}
                                        </div>

                                        <div className="col-md-5">
                                            <div className="cart-summary">
                                                <div className="cart-summary-wrap">
                                                    <ul className="cart-summary-inner">
                                                        <li>
                                                            <span className="subtitle">Sub Total</span>
                                                            <span className="total">
                                                                {localStorage.getItem("symbol")
                                                                    ? localStorage.getItem("symbol")
                                                                    : "₹"}{" "}
                                                                {payment?.total_pay}
                                                            </span>
                                                        </li>
                                                        {localStorage.getItem("currency") === "INR" ? (
                                                            <li>
                                                                <span className="subtitle">GST (18%)</span>
                                                                <span className="total">
                                                                    {localStorage.getItem("symbol")
                                                                        ? localStorage.getItem("symbol")
                                                                        : "₹"}{" "}
                                                                    {payment?.gst}
                                                                </span>
                                                            </li>
                                                        ) : null}

                                                        <li>
                                                            <span className="subtitle">
                                                                Other Charge ( {payment?.transaction_charge} %)
                                                            </span>
                                                            <span className="total">
                                                                {localStorage.getItem("symbol")
                                                                    ? localStorage.getItem("symbol")
                                                                    : "₹"}{" "}
                                                                {payment?.transaction_charge_amount}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span className="subtitle">
                                                                <strong>Grand Total</strong>
                                                            </span>
                                                            <span className="total">
                                                                <strong>
                                                                    {" "}
                                                                    {localStorage.getItem("symbol")
                                                                        ? localStorage.getItem("symbol")
                                                                        : "₹"}{" "}
                                                                    {payment?.payable_price}
                                                                </strong>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="cart-summary-button-group text-end mt--20">
                                                    <Link
                                                        className="edu-btn text-center"
                                                        to="/my-profile"
                                                    >
                                                        My Profile
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

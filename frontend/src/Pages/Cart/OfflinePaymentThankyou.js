import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Utils from "../../Utils/Utils";
import PaymentServices from "../../Services/PaymentService/PaymentService";

export default function ThankYou() {
  const [payment, setPayment] = useState({});
  const ofline = new PaymentServices();
  const [loading, setLoading] = useState(false);

  const data = window.location.search.split("&");

  useEffect(() => {
    window.scroll(0, 0);

    setPayment(JSON.parse(localStorage.getItem("payment")));
    if (!JSON.parse(localStorage.getItem("payment"))) {
      OflinePaymentApi();
    }
    return () => {
      localStorage.removeItem("payment");
    };
  }, []);

  const OflinePaymentApi = async () => {
    let obj = {
      payment_intent: data?.[0]?.replace("?payment_intent=", ""),
      payment_intent_client_secret: data?.[1]?.replace(
        "payment_intent_client_secret=",
        ""
      ),
      redirect_status: data?.[2]?.replace("redirect_status=", ""),
    };
    setLoading(true);
    try {
      let response = await ofline.stripecallback(obj);
      if (response) {
        setLoading(false);
        setPayment(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div
        className="edu-privacy-policy-area edu-privacy-policy edu-section-gap bg-color-white"
        style={loading ? { padding: "142px 0px" } : {}}
      >
        <div className="container">
          {" "}
          <div className="row">
            {loading ? (
              <div id="loader"></div>
            ) : (
              <div>
                <div className="col-md-12 text-center">
                  <div className="content">
                    <h4 className="title text-center">Thanks for Payment</h4>
                    <p className="text-center mb-4">
                      Your order has been submitted successfully.
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-9 m-auto ">
                    <table className="table mb--30">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Name :</strong>{" "}
                            {Utils.titleCase(payment?.billing_details?.name)}
                          </td>
                          <td className="text-end">
                            <strong>Date : </strong>
                            {moment(payment?.date).format("DD-MM-YYYY")}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Email :</strong>{" "}
                            {payment?.billing_details?.email}
                          </td>
                          <td className="text-end">
                            <strong>Order ID :</strong> {payment?.order_id}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Contact :</strong>{" "}
                            {payment?.billing_details?.contact_number}
                          </td>
                          <td className="text-end">
                            <strong>Invoice ID :</strong> {payment?.invoice_id}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-9 m-auto">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="card mt-0">
                          <div className="card-body">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Product</th>
                                  <th scope="col">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    {payment?.billing_details?.course_name.replaceAll("{{in VARCITY}}","")}
                                  </td>
                                  <td>
                                    {" "}
                                    {payment?.currency_symbol}
                                    {payment?.mrp}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 mt-0">
                        <div className="cart-summary">
                          <div className="cart-summary-wrap">
                            <ul className="cart-summary-inner">
                              <li>
                                <span className="subtitle">Sub Total</span>
                                <span className="total">
                                  {payment?.currency_symbol} {payment?.mrp}
                                </span>
                              </li>
                              {payment?.currency === "INR" && (
                                <li>
                                  <span className="subtitle">Gst(18%)</span>
                                  <span className="total">
                                    {payment?.currency_symbol} {payment?.gst}
                                  </span>
                                </li>
                              )}

                              <li>
                                <span className="subtitle">
                                  Other Charge ( {payment?.transaction_charge}{" "}
                                  %)
                                </span>
                                <span className="total">
                                  {payment?.currency_symbol}{" "}
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
                                    {payment?.currency_symbol}{" "}
                                    {payment?.payable_price}
                                  </strong>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="cart-summary-button-group text-end mt--20">
                            <Link className="edu-btn text-center" to="/my-profile">
                              Home
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

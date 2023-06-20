import React, { useEffect, useState } from "react";
import EventService from "../../Services/EventService/EventService";
import CourseService from "../../Services/CourseService/CourseService";
import PaymentSubtotalCard from "./PaymentSubtotalCard";
import PaymentUserDetailCard from "./PaymentUserDetailCard";
import EnrollAndEventUserDetailPaymentCard from "./EnrollAndEventUserDetailPaymentCard";

const EventPaymentCard = React.lazy(() =>
  import("./EventPaymentCard")
);

const EnrollPaymentCard = React.lazy(() =>
  import("./EnrollPaymentCard")
);

const AssessmentPaymentCard = React.lazy(() =>
  import("./AssessmentPaymentCard")
);

const VoucherPaymentCard = React.lazy(() =>
  import("./VoucherPaymentCard")
);

const CoursePaymentcard = React.lazy(() =>
  import("./CoursePaymentcard")
);

const ECoursePaymentCard = React.lazy(() =>
  import("./ECoursePaymentCard")
);

export default function ThankYou() {
  const [payment, setPayment] = useState({});
  const serve = new EventService();
  const courseServe = new CourseService();
  const data = window.location.search.split("&");
  let enroll = {
    type: "enroll",
  };
  let event = {
    type: "event",
  };

  useEffect(() => {
    window.scroll(0, 0);
    setPayment(JSON.parse(localStorage.getItem("payment")));
    paymentApi();
  }, []);

  const paymentApi = async () => {
    if (localStorage.getItem("type") === "enroll") {
      EnrollPaymentApi();
    } else if (localStorage.getItem("type") === "event") {
      EventPaymentApi();
    }
  };
  const EnrollPaymentApi = async () => {
    if (localStorage.getItem("currency") != "INR") {
      let obj = {
        payment_intent: data?.[0]?.replace("?payment_intent=", ""),
        payment_intent_client_secret: data?.[1]?.replace(
          "payment_intent_client_secret=",
          ""
        ),
        redirect_status: data?.[2]?.replace("redirect_status=", ""),
      };
      try {
        let response = await courseServe.enrollstripepayment(obj);
        if (response) {
          enroll["data"] = response.data;

          localStorage.setItem("payment", JSON.stringify(enroll));
        }
      } catch (err) {}
    }
  };

  const EventPaymentApi = async () => {
    if (localStorage.getItem("currency") != "INR") {
      let obj = {
        payment_intent: data?.[0]?.replace("?payment_intent=", ""),
        payment_intent_client_secret: data?.[1]?.replace(
          "payment_intent_client_secret=",
          ""
        ),
        redirect_status: data?.[2]?.replace("redirect_status=", ""),
      };
      try {
        let response = await serve.stripecallback(obj);
        if (response) {
          event["data"] = response.data;

          localStorage.setItem("payment", JSON.stringify(event));
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
                  {payment?.type === "enroll" || payment?.type === "event" ? (
                    <EnrollAndEventUserDetailPaymentCard payment={payment} />
                  ) : (
                    <PaymentUserDetailCard payment={payment} />
                  )}

                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div
                          className={
                            payment.type === "ofline"
                              ? "col-md-7 w-100"
                              : "col-md-7"
                          }
                        >
                          {payment?.orders?.map((v, i) => (
                            <>
                              <React.Suspense fallback="">
                                <AssessmentPaymentCard v={v} />
                              </React.Suspense>
                              <React.Suspense fallback="">
                                <VoucherPaymentCard v={v} />
                              </React.Suspense>

                              <React.Suspense fallback="">
                                <CoursePaymentcard v={v} />
                              </React.Suspense>

                              <React.Suspense fallback="">
                                <ECoursePaymentCard v={v} />
                              </React.Suspense>
                            </>
                          ))}
                           <React.Suspense fallback="">
                           <EnrollPaymentCard payment={payment} />
                              </React.Suspense>

                              <React.Suspense fallback="">
                              <EventPaymentCard payment={payment} />
                              </React.Suspense>
                         
                        </div>

                        {payment?.type === "event" ||
                        payment?.type === "enroll" ? (
                          ""
                        ) : (
                          <PaymentSubtotalCard payment={payment} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

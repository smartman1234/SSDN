import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import AddressForm from "./AddressForm";

export default function CheckoutForm({
 

}) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);

    try {
      const paymentResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },

      });
      setPaymentLoading(false);
      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit} className="mt-2">
      <div className="card-body cart-summary-button-group">
        <div
          style={{
            padding: "0rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <AddressForm />
              <PaymentElement />
              <button
                className="pay-button"
                style={{
                  border: "navajowhite",
                  background: "transparent",
                  marginTop: "5px",
                }}
                disabled={!stripe}
                type="submit"
              >
                {isPaymentLoading ? (
                  "Loading..."
                ) : (
                  <button className="edu-btn  text-center mt-5" type="submit">
                    Pay
                  </button>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

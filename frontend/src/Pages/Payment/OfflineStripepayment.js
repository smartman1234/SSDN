import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import OfflineCheckout from "./OfflineCheckout";

export default function OfflineStripePayment() {
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem("clientsecretkey")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("clientKey"));
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const options = {
    clientSecret: clientSecret,
  };

  const stripe = loadStripe(publicKey);
  return (
    <div className="edu-feature-area eduvibe-home-one-video edu-section-gap bg-color-white">
      {" "}
      <div className="container col-md-5">
        {" "}
        <Elements stripe={stripe} options={options}>
          <OfflineCheckout />
        </Elements>
      </div>
    </div>
  );
}

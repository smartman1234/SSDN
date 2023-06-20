import React, { useState, } from "react";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function Payment() {
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem("clientsecretkey")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("clientKey"));

  const options = {
    clientSecret: clientSecret,
  };

  const stripe =  loadStripe(publicKey);
  return (
    <div className="edu-feature-area eduvibe-home-one-video edu-section-gap bg-color-white">
      {" "}
      <div className="container col-md-5">
        {" "}
        <Elements stripe={stripe} options={options}>
        
          <CheckoutForm
          />
        </Elements>
      </div>
    </div>
  );
}

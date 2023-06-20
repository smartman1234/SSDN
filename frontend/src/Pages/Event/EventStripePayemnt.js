import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
} from "@stripe/react-stripe-js";
import EventCheckout from "./EventCheckout";

export default function EventStripePayment() {
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem("clientsecretkey")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("clientKey"));
useEffect(()=>{window.scroll(0,0)},[])
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
         
        <EventCheckout/>
        </Elements>
      </div>
    </div>
  );
}

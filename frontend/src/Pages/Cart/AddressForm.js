
import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <form>
      <h5>Shipping</h5>
      <AddressElement
        options={{ mode: "shipping",  autocomplete: {
          mode: "google_maps_api",
          apiKey: "{YOUR_GOOGLE_MAPS_API_KEY}",
        }, fields: {
          phone: 'always',
        },}}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
          }
        }}
      />
    </form>
  );
};

export default AddressForm;

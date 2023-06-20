import React from "react";
import MetaTagList from "./MetaTagList";

export default function MetaTagPages() {
  const pages = [
    "Assessment",
    "Voucher",
    "Assessment List Page",
    "Voucher List Page",
    "Home",
    "Event List Page",
    "About",
    "Gallery",
    "About Us",
    "Why SSDN",
    "Services",
    "Payment",
    "Contact Us",
    "Payment",
    "Checkout,",
    "ThankYou",
    "Cart",
    "E-Learning",
  ];
  return (
    <div>
      <MetaTagList pages={pages} />
    </div>
  );
}

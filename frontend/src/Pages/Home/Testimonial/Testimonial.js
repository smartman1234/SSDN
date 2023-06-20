import React from "react";
import { useEffect } from "react";

const InternationalReviews = React.lazy(() =>
  import("../../International/InternationalReviews")
);

export default function Testimonial() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <React.Suspense fallback="">
      <InternationalReviews />
    </React.Suspense>

  );
}

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";
import MetaService from "../../Services/MetaServices/MetaService";
import SEO from "../SEO/SEO";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CartCard = React.lazy(() => import("./CartCard"));
const CartTotal = React.lazy(() => import("./CartTotal"));

export default function Cart() {
  const [loader, setLoader] = useState(false);
  const metaService = new MetaService();
  const [successCoupon, setSuccessCoupon] = useState("");
  const { cartData, percentages } = useContext(CartContext);

  const [cartList, setCartList] = cartData;
  const [percentage, setPercentage] = percentages;
  const [check, setChecked] = useState(false);

  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
  });

  useEffect(() => {
    window.scroll(0, 0);
    getmetaData("cart");
  }, []);

  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("cart");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
      />
      {cartList?.length > 0 ? (
        <>
          <HeadingName home="Home" heading="Checkout" name="Checkout" />
          <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white">
            <div className="container eduvibe-animated-shape">
              <div className="row">
                {loader ? (
                  <div className="loader m-auto"></div>
                ) : (
                  <>
                    <div className="col-lg-8">
                      <React.Suspense fallback="">
                        <CartCard
                          cartList={cartList}
                          setSuccessCoupon={setSuccessCoupon}
                          successCoupon={successCoupon}
                        />
                      </React.Suspense>
                    </div>
                    <div className="col-lg-4">
                      <React.Suspense fallback="">
                        <CartTotal
                          percentage={percentage}
                          successCoupon={successCoupon}
                          setSuccessCoupon={setSuccessCoupon}
                          cartList={cartData}
                          setChecked={setChecked}
                          check={check}
                          setLoader={setLoader}
                        />
                      </React.Suspense>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <HeadingName home="Home" heading="Checkout" name="Checkout" />

          <div className="edu-cart-page-area edu-section-gap bg-color-white">
            <div className="container">
              <div className="card">
                <div className="card-body text-center">
                   <LazyLoadImage
                    src="/assets/images/empty-shopping-cart-v2.jpg"
                    alt="image"
                    height=""
                    width=""
                  />
                  <p className="text-center">
                    Your cart is empty. Keep shopping to find a course!
                  </p>
                  <Link to="/" className="edu-btn ">
                    Keep Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div> <ToastContainer autoClose={1000} />
        </>
      )}
    </>
  );
}

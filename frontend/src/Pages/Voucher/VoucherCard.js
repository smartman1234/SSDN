import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CartContext } from "../../Container/Context";
import CartService from "../../Services/CartService";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";

export default function VoucherCard({
  handlePageClick,
  offset,
  voucherList,
  totalPages,
  totalCount,
}) {

  const [courseInCart, setCourseInCart] = useState(null);
  const [addedtoCart, setAddedToCart] = useState({});

  const { cartData, numberInCart, gettingCartItemslist } =
    useContext(CartContext);

  const cartServe = new CartService();

  useEffect(() => {
    if (cartData.length) {
      if (cartData[0]?.length) {
        for (const item of cartData[0]) {
          setAddedToCart((prevState) => ({
            ...prevState,
            [item.voucher?.id]: true,
          }));
        }
      }
    }
  }, [cartData]);

  const addCourseTocart = async (e, v_id) => {
    let id = localStorage.getItem("custumer_id");

    if (!id) {
      id = localStorage.setItem(
        "custumer_id",
        Math.round(Math.random() * 1000000)
      );
    }
    let activity = {
      type: "voucher",
      guest_user_id: localStorage.getItem("custumer_id"),
      vouchers_id: v_id,
    };
    try {
      let response = await cartServe.addTocart(activity);
      if (response.status === "success") {
        toast.success("Successfully added to cart");
        setCourseInCart(response.quantity + 1);
        gettingCartItemslist();
        setAddedToCart((prevState) => ({
          ...prevState,
          [v_id]: !prevState[v_id],
        }));
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 mt--30">
          <div className="short-by">
            <p>
              Showing {voucherList?.length > 0 ? offset + 1 : 0}-
              {offset + voucherList?.length} Of {totalCount} Results
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        {voucherList &&
          voucherList?.map((v, i) => (
            <div className="col-md-4" key={i}>
              <div className="card" style={{ height: "470px" }}>
                <div
                  className="card-body ui-card--series"
                  style={{
                    backgroundImage:
                      "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                    borderRadius: "5px",
                  }}
                >
                  {v.currency === "SGD" && v?.is_sgd_discount == 1 && (
                    <span className="badge badge-pill">
                      {v?.sgd_discount_price} % off
                    </span>
                  )}
                  {v.currency === "INR" && v?.is_inr_discount == 1 && (
                    <span className="badge badge-pill">
                      {v?.inr_discount_price} % off
                    </span>
                  )}
                  {v.currency === "USD" && v?.is_usd_discount == 1 && (
                    <span className="badge badge-pill">
                      {v?.usd_discount_price} % off
                    </span>
                  )}
                  {v.currency === "EUR" && v?.is_usd_discount == 1 && (
                    <span className="badge badge-pill">
                      {v?.usd_discount_price} % off
                    </span>
                  )}
                  <div className="card-test__logo">
                     <LazyLoadImage
                      className="js-lazy-load-img loaded"
                      src={v.logo}
                      alt={v.logo_alt_tag}
                                height="100%"
                                width="100%"
                    />
                  </div>
                  <h4
                    className="line-clamp-2 mb-3 ng-binding ng-scope leading-tight2"
                    onClick={() => {
                      sessionStorage.setItem("vouchername", v.name);
                      sessionStorage.setItem("voucherslug", v.slug);
                    }}
                  >
                    <Link to={`/vouchers/${v?.category?.slug}/${v.slug}`} rel="nofollow">
                      {v.name}
                    </Link>
                  </h4>
                  <p
                    className="leading-tight7"
                    style={{ height: "160px" }}
                    dangerouslySetInnerHTML={{
                      __html: v.overview,
                    }}
                  />
                  <div
                    className="card-bottom data text-center border-top"
                  >
                    {v.is_stock == 0 && (
                      <div className="price-list price-style-01">
                        <div className="price current-price">Price:</div>
                        <div className="price current-price">
                          {v.currency_symbol}
                          {v.payable_price}
                        </div>
                        {v.currency === "SGD" && v.is_sgd_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.sgd_price}
                          </div>
                        )}
                        {v.currency === "INR" && v.is_inr_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.inr_price}
                          </div>
                        )}
                        {v.currency === "USD" && v.is_usd_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.usd_price}
                          </div>
                        )}
                        {v.currency === "EUR" && v.is_eur_discount == 1 && (
                          <div className="price old-price">
                            {v.currency_symbol} {v.eur_price}
                          </div>
                        )}
                      </div>
                    )}
                      {v.is_stock === 1 ? (
                        <button
                          // to="#"
                          className="edu-btn btn-bg-alt text-center data-wrapper-class"
                        >
                          Out of stock
                        </button>
                      ) : (
                        <>
                          {addedtoCart[v.id] ? (
                            <Link
                              to="/cart"
                              className="edu-btn btn-bg-alt text-center" rel="nofollow"
                            >
                              Go to Cart
                            </Link>
                          ) : (
                            <button
                              // to="#"
                              className="edu-btn btn-bg-alt text-center"
                              onClick={(e) => addCourseTocart(e, v.id)}
                            >
                              Add to Cart
                            </button>
                          )}
                        </>
                      )}
                      <Link
                        to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                        className="edu-btn" rel="nofollow"
                      >
                        View Details
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-lg-12 mt--20">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(totalPages)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"edu-pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    <ToastContainer autoClose={1000} />
    </>
  );
}

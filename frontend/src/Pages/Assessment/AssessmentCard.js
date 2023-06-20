import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AssessmentService from "../../Services/AssessmentService";
import { CartContext } from "../../Container/Context";
import { ToastContainer, toast } from "react-toastify";
import CartService from "../../Services/CartService";
import ReactPaginate from "react-paginate";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AssessmentCard = (childId) => {
    const upperside = () => {
        window.scroll(0, 0);
    };
    const param = useParams();
    const slug = param.id;

    const { cartData,  gettingCartItemslist } =
        useContext(CartContext);

    const [assessmentList, setAssessmentList] = useState([]);

    const [courseInCart, setCourseInCart] = useState(null);
    const [addedtoCart, setAddedToCart] = useState(false);
    const [offset, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const assessmentServe = new AssessmentService();

    const cartServe = new CartService();

    useEffect(() => {
        AssessmentListApi();
    }, [childId.search]);


    useEffect(() => {
        if (cartData.length) {
            if (cartData[0]?.length) {
                for (const item of cartData[0]) {
                    setAddedToCart((prevState) => ({
                        ...prevState,
                        [item.assessment?.id]: true,
                    }));
                }
            }
        }
    }, [cartData]);

    useEffect(() => {
        AssessmentListApi();
    }, [slug, childId.childId]);

    const addCourseTocart = async (value) => {
        let id = localStorage.getItem("custumer_id");

        if (id) {
        } else {
            id = localStorage.setItem(
                "custumer_id",
                Math.round(Math.random() * 1000000)
            );
        }
        let activity = {
            type: "assessment",
            guest_user_id: localStorage.getItem("custumer_id"),
            assessments_id: value,
        };
        try {
            let response = await cartServe.addTocart(activity);
            if (response.status === "success") {
                toast.success("Successfully added to cart");
                setCourseInCart(response.quantity + 1);
                gettingCartItemslist();
                setAddedToCart((prevState) => ({
                    ...prevState,
                    [value]: !prevState[value],
                }));
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            throw err;
        }
    };

    const apiCall = async (activity) => {
        try {
            let response = await assessmentServe.assessmentList(activity);
            if (response.status === "success") {
                setTotalPages(response.count / 12);
                setTotalCount(response.count);
                setAssessmentList(response.data);
            }
        } catch (err) {
            throw err;
        }
    };

    const AssessmentListApi = async () => {
        let activity = {
            limit: childId.search?.perPage,
            offset: childId.search?.start,
            query: childId.search?.searchTxt,
            category_slug: slug,
            child_category_id: childId.childId,
        };
        await apiCall(activity);
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected * childId.search?.perPage;
        setOffset(currentPage);
        let activity = {
            category_slug: slug,
            child_category_id: childId.childId,
            limit: childId.search?.perPage,
            offset: currentPage,
            query: childId.search?.searchTxt,
        };
        await apiCall(activity);
    };

    return (
        <div className="col-lg-9">
            <div className="row">
                <div className="col-lg-12">
                    <div className="short-by">
                        <p>
                            Showing {offset + 1} - {offset + assessmentList.length} Of{" "}
                            {totalCount} Results
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                {assessmentList?.map((v, i) => (
                    <div className="col-md-4" key={i}>
                        <div className="card" style={{ height: "430px" }}>
                            <div
                                className="card-body ui-card--series"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(#ffa41b 0%, rgb(197 34 34 / 2%) 30%, white 100%)",
                                    borderRadius: "5px",
                                }}
                            >
                                {v.price_type === "paid" && v.is_inr_discount === 1 && (
                                    <span className="badge badge-pill">
                                        {v.inr_discount_price} %
                                    </span>
                                )}
                                     <LazyLoadImage
                                        className="js-lazy-load-img loaded"
                                        src={v.image}
                                        alt={v.image_alt_tag}
                                        height="100%"
                                        width="100%"
                                    />
                                <h4
                                    className="line-clamp-2 mb-3 ng-binding ng-scope leading-tight2"
                                    onClick={() => {
                                        sessionStorage.setItem("assessmentname", v.name);
                                        sessionStorage.setItem("assessmentslug", v.slug);
                                    }}
                                >
                                    <Link to={`/assessment/${v?.category?.slug}/${v.slug}`}>
                                        {v.name}
                                    </Link>
                                </h4>
                                <ul>
                                    <li className="ng-binding ng-scope">
                                        Level : {v.level.charAt(0).toUpperCase() + v.level.slice(1)}
                                    </li>
                                    <li className="ng-binding ng-scope">
                                        Duration : {v.duration} min
                                    </li>
                                    <li className="ng-binding ng-scope">
                                        Total Questions : {v.number_of_question}
                                    </li>
                                    <li className="more-link ng-binding ng-scope">
                                        Total Marks : {v.total_marks}
                                    </li>
                                </ul>
                                <div
                                    className="card-bottom data text-center border-top"
                                >
                                    {v.price_type === "paid" ? (
                                        <div className="price-list price-style-01">
                                            <div className="price current-price">Price:</div>
                                            <div className="price current-price">
                                                {v.currency_symbol ? v.currency_symbol : "₹"}{" "}
                                                {v.payable_price}
                                            </div>
                                            {v.is_inr_discount === 1 && (
                                                <div className="price old-price">
                                                    {" "}
                                                    {v.currency_symbol ? v.currency_symbol : "₹"}{" "}
                                                    {v.inr_price}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="price-list price-style-01">
                                            <div className="price current-price">Free</div>
                                        </div>
                                    )}

                                    <div className="read-more-btn">
                                        {v.price_type === "paid" && (
                                            <>
                                                {addedtoCart[v.id] ? (
                                                    <Link
                                                        to="/cart"
                                                        className="edu-btn btn-bg-alt text-center"
                                                    >
                                                        Go to Cart
                                                    </Link>
                                                ) : (
                                                    <>
                                                        {v.is_order != 0 ? (
                                                            <Link
                                                                to="/my-assessment"
                                                                className="edu-btn btn-bg-alt text-center"
                                                                onClick={() =>
                                                                    localStorage.setItem("activeprofilebutton", 3)
                                                                }
                                                            >
                                                                Go to My Assessment
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                to="#"
                                                                className="edu-btn btn-bg-alt text-center"
                                                                onClick={() => addCourseTocart(v.id)}
                                                            >
                                                                Add to Cart
                                                            </Link>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}

                                        <Link
                                            to={`/assessment/${v?.category?.slug}/${v.slug}`}
                                            className="edu-btn"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer autoClose={1000} />
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-lg-12 mt--20">
                    <ReactPaginate
                        onClick={upperside}
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={1}
                        onPageChange={handlePageClick}
                        containerClassName={
                            "edu-pagination justify-content-center"
                        }
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </div>
    );
};
export default AssessmentCard;
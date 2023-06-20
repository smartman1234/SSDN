import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import WeOfferService from "../../../Services/WeOfferService/WeOfferService";

const AssessmentCategory = React.lazy(() =>
    import("./AssessmentCategory")
);

const CourseCategory = React.lazy(() =>
    import("./CourseCategory")
);

const VoucherCategory = React.lazy(() =>
    import("./VoucherCategory")
);

export default function WeOffer() {
    const serve = new WeOfferService();
    const [courseCategory, setCourseCategory] = useState([]);
    const [voucherCategory, setVoucherCategory] = useState([]);
    const [assessmentCategory, setAssessmentCategory] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);

    const Activehandler = (id) => {
        setActiveCategory(id);
        if (id == 0) {
            CourseCategoryApi();
        } else if (id == 1) {
            VoucherCategoryApi();
        } else if (id == 2) {
            AssessmentCategoryApi();
        }
    };
    useEffect(() => {
        if (activeCategory == 0) {
            CourseCategoryApi();
        }
    }, []);
    const CourseCategoryApi = async () => {
        let obj = { category_id: 0, is_front: 1 };
        try {
            let response = await serve.courseCategory(obj);
            if (response) {
                sessionStorage.setItem("courseslug", response.data?.[0]?.slug);
                setCourseCategory(response.data);
            }
        } catch (err) {
            throw err;
        }
    };
    const VoucherCategoryApi = async () => {
        try {
            let response = await serve.voucherCategory(1);
            if (response) {
                setVoucherCategory(response.data);
                sessionStorage.setItem("voucherlug", response.data?.[0]?.slug);
            }
        } catch (err) {
            throw err;
        }
    };
    const AssessmentCategoryApi = async () => {
        try {
            let response = await serve.assessmentCategory(1);
            if (response) {
                setAssessmentCategory(response.data);
                sessionStorage.setItem("assessmentslug", response.data?.[0]?.slug);
            }
        } catch (err) {
            throw err;
        }
    };
    return (
        <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image">
            <div className="container eduvibe-animated-shape">
                <div className="row align-items-center mb--30">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <span className="pre-title">We Are Offer</span>
                            <h3 className="title">
                                New on <span className="down-mark-line">SSDN</span>
                            </h3>
                        </div>
                    </div>
                {/* </div>
                <div className="row"> */}
                    <div className="col-xl-12">
                        <div className="course-details-content">
                            <ul className="edu-course-tab nav nav-tabs">
                                <li className="nav-item mb-4" onClick={() => Activehandler(0)}>
                                    <button
                                        className={
                                            activeCategory == 0 ? "nav-link active" : "nav-link"
                                        }
                                        type="button"
                                    >
                                        Courses Categories
                                    </button>
                                </li>
                                <li className="nav-item mb-4" onClick={() => Activehandler(1)}>
                                    <button
                                        className={
                                            activeCategory == 1 ? "nav-link active " : "nav-link"
                                        }
                                    >
                                        Voucher Categories
                                    </button>
                                </li>
                                <li className="nav-item mb-4" onClick={() => Activehandler(2)}>
                                    <button
                                        className={
                                            activeCategory == 2 ? "nav-link active " : "nav-link"
                                        }
                                    >
                                        Assessment Categories
                                    </button>
                                </li>
                            </ul>

                            {activeCategory == 0 && (
                                <React.Suspense fallback="Loading...">
                                    <CourseCategory courseCategory={courseCategory} />
                                </React.Suspense>

                            )}
                            {activeCategory == 1 && (
                                <React.Suspense fallback="Loading...">
                                    <VoucherCategory category={voucherCategory} />
                                </React.Suspense>

                            )}
                            {activeCategory == 2 && (
                                <React.Suspense fallback="Loading...">
                                    <AssessmentCategory category={assessmentCategory} />
                                </React.Suspense>

                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center mt-4">
                        {activeCategory == 0 && (
                            <Link className="edu-btn" to="/course">
                                Explore All Courses
                            </Link>
                        )}
                        {activeCategory == 1 && (
                            <Link className="edu-btn" to="/vouchers">
                                Explore All Vouchers
                            </Link>
                        )}
                        {activeCategory == 2 && (
                            <Link className="edu-btn" to="/assessment">
                                Explore All Assessments
                            </Link>
                        )}
                    </div>
                </div>
                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                         <LazyLoadImage  src="/assets/images/shapes/shape-04.png" alt="Shape Thumb"
                            height="100%"
                            width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
}

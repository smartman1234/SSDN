import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CartContext } from "../../Container/Context";
import Currency from "../Currency/Currency";

export default function HomeHeader({ isActive, setActive }) {
    const { gettingCartItemslist, } =
        useContext(CartContext);

    useEffect(() => {
        gettingCartItemslist();
    }, []);

    return (
        <>
            <div
                className={isActive ? "popup-mobile-menu " : "popup-mobile-menu active"}
            >
                <div className="inner">
                    <div className="header-top">
                        <LazyLoadImage
                            src="/assets/images/logo/ssdn-new-logo.png"
                            alt="mobile Logo"
                            height="57px"
                            width="172px"
                        />
                        <button
                            className="close-button"
                            onClick={() => setActive(!isActive)}
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <ul className="mainmenu">
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/about-us">About Us</Link>
                        </li>
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/services">Our Services</Link>
                        </li>
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/course">Course</Link>
                        </li>
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/assessment">Assessment</Link>
                        </li>
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/vouchers">Voucher</Link>
                        </li>
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/international-students">International</Link>
                        </li>
                        <li className="" onClick={() => setActive(!isActive)}>
                            <Link to="/contact-us">Contact Us</Link>
                        </li>
                        <li className="pt-5">
                            <Currency />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

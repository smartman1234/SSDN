import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Container/Context";

export default function HeadingName({
    heading,
    name,
    home,
    slug,
    category
}) {

    const { bannery } = useContext(CartContext);
    const [banner, setBannerImage] = bannery;
    return (
        <div
            className="edu-breadcrumb-area breadcrumb-style-1 bg-image"
            style={{
                backgroundImage: `url(${banner?.image_url + banner?.logo}) `,
            }}
        >
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12 breadcrumb-inner text-center">
                        <h1 className="title">{heading}</h1>
                        <ol className="edu-breadcrumb d-flex justify-content-center">
                            <li className="breadcrumb-item">
                                <Link to="/">{home}</Link>
                            </li>
                            <li className="separator">
                                <i className="ri-arrow-drop-right-line"></i>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                <Link to="#">{name}</Link>
                            </li>
                            {category && (
                                <>
                                    <li className="separator">
                                        <i className="ri-arrow-drop-right-line"></i>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        <Link to="#"> {category}</Link>
                                    </li>
                                </>
                            )}
                            {slug && (
                                <>
                                    <li className="separator active">
                                        <i className="ri-arrow-drop-right-line"></i>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        {heading}
                                    </li>
                                </>
                            )}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

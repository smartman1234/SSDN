import React,{ useEffect, useState } from "react";

import { Link } from "react-router-dom";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import SEO from "../SEO/SEO";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaService from "../../Services/MetaServices/MetaService";
import HeadingName from "../HeadingName/HeadingName";

const OfflineAndOnlinePayment = React.lazy(() =>
    import("./OfflineAndOnlinePayment")
);

const PaymentPageEnquiry = React.lazy(() => import("./PaymentPageEnquiry"));

export default function PaymentDetails() {
    const [detail, setDetail] = useState([]);
    const [image, setImage] = useState([]);
    const [active, setActive] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const metaService = new MetaService();
    const [data, setData] = useState({});
    const [meta, setMeta] = useState({
        title: "",
        keywords: "",
        description: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        getmetaData();
        getPageBlock();
    }, []);

    const getmetaData = async () => {
        try {
            let response = await metaService.service("payment");
            if (response.status === "success") {
                setData(response.data);
                setDetail(
                    JSON.parse(response.data?.page_description?.bank_details || "[]")
                );
                setImage(
                    JSON.parse(response.data?.page_description?.payment_image || "[]")
                );
            }
        } catch (err) {
            throw err;
        }
    };
    const getPageBlock = async () => {
        try {
            let response = await metaService.getMetadetail("payment");
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
            <HeadingName name="Payment" home="Home" heading="Payment" />
            {loading ? (
                <div style={loading ? { padding: "10%" } : {}}>
                    {" "}
                    <div id="loader"></div>
                </div>
            ) : (
                <>
                    {" "}
                    <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap">
                        <div className="container eduvibe-animated-shape">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h3 className="title">PAYMENT METHOD</h3>
                                </div>
                            </div>
                            <div className="row mt--20">
                                <div className="col-lg-4 col-md-6">
                                    <div
                                        className="service-card service-card-2 card-bg-1"
                                        style={{ height: "340px" }}
                                    >
                                        <div className="inner">
                                            <div className="icon payment">
                                                <Link to="#">
                                                     <LazyLoadImage
                                                        src="/assets/images/payment/debit-card-img.jpg"
                                                        alt="Service Images"
                                                    />
                                                </Link>
                                                <div className="shape-list">
                                                     <LazyLoadImage
                                                        className="shape shape-1"
                                                        src="/assets/images/icons/service-icon-01.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                     <LazyLoadImage
                                                        className="shape shape-2"
                                                        src="/assets/images/icons/service-icon-02.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                     <LazyLoadImage
                                                        className="shape shape-3"
                                                        src="/assets/images/icons/service-icon-03.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h6 className="title">
                                                    <Link to="#">DEBIT CARD</Link>
                                                </h6>
                                                <p className="description">
                                                    {data?.page_description?.debit}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div
                                        className="service-card service-card-2 card-bg-2"
                                        style={{ height: "340px" }}
                                    >
                                        <div className="inner">
                                            <div className="icon payment">
                                                <Link to="#">
                                                     <LazyLoadImage
                                                        src="/assets/images/payment/credit-card-img.jpg"
                                                        alt="Service Images"
                                                    />
                                                </Link>
                                                <div className="shape-list">
                                                     <LazyLoadImage
                                                        className="shape shape-1"
                                                        src="/assets/images/icons/service-icon-01.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                     <LazyLoadImage
                                                        className="shape shape-2"
                                                        src="/assets/images/icons/service-icon-02.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                     <LazyLoadImage
                                                        className="shape shape-3"
                                                        src="/assets/images/icons/service-icon-03.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h6 className="title">
                                                    <Link to="#">CREDIT CARD</Link>
                                                </h6>
                                                <p className="description">
                                                    {data?.page_description?.credit}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div
                                        className="service-card service-card-2 card-bg-1"
                                        style={{ height: "340px" }}
                                    >
                                        <div className="inner">
                                            <div className="icon payment">
                                                <Link to="#">
                                                     <LazyLoadImage
                                                        src="/assets/images/payment/online-payment-img.jpg"
                                                        alt="Service Images"
                                                    />
                                                </Link>
                                                <div className="shape-list">
                                                     <LazyLoadImage
                                                        className="shape shape-1"
                                                        src="/assets/images/icons/service-icon-01.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                     <LazyLoadImage
                                                        className="shape shape-2"
                                                        src="/assets/images/icons/service-icon-02.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                     <LazyLoadImage
                                                        className="shape shape-3"
                                                        src="/assets/images/icons/service-icon-03.png"
                                                        alt="Shape Images"
                                                        height="9px"
                                                        width="8px"
                                                    />
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h6 className="title">
                                                    <Link to="#">ONLINE</Link>
                                                </h6>
                                                <p className="description">
                                                    {data?.page_description?.online}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                                <div
                                    className="shape-image scene shape-image-1"
                                    style={{
                                        transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                                        transformStyle: "preserve-3d",
                                        backfaceVisibility: "hidden",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <span
                                        data-depth="-2.2"
                                        style={{
                                            transform: "translate3d(-7.5px, 15.4px, 0px)",
                                            transformStyle: "preserve-3d",
                                            backfaceVisibility: "hidden",
                                            position: "relative",
                                            display: "block",
                                            left: "0px",
                                            top: "0px",
                                        }}
                                    >
                                         <LazyLoadImage
                                            src="/assets\images\shapes\shape-04-01.png"
                                            alt="Shape Thumb"
                                            height="116px"
                                            width="87px"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="edu-blog-area edu-section-gap bg-image"
                        style={{
                            backgroundImage: "url(/assets/images/banner/cover-6.jpg)",
                        }}
                    >
                        <div className="container eduvibe-animated-shape">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center">
                                        <h3 className="title mb-3 text-white">INVOICE DETAILS</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt--20">
                                <div className="col-md-6">
                                    <div className="card mt-0">
                                        <div className="card-body">
                                            <h5 className="mb-3 text-center">Important Note :</h5>
                                            <p
                                                className="mb-3 ssdn-editor-font"
                                                style={{
                                                    height: "352px",
                                                    overflow: "auto",
                                                    paddingRight: "10px",
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: data?.page_description?.note,
                                                }}
                                            ></p>
                                            <div
                                                className="text-center mt-5"
                                                onClick={() => setActive(true)}
                                            >
                                                <button className="edu-btn" type="button">
                                                    Any Enquiry
                                                </button>
                                            </div>

                                            {active && (
                                                <React.Suspense fallback="">
                                                    <PaymentPageEnquiry
                                                        active={active}
                                                        setActive={setActive}
                                                    />
                                                </React.Suspense>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <React.Suspense fallback="">
                                    <OfflineAndOnlinePayment
                                        setloading={setloading}
                                        loading={loading}
                                    />
                                </React.Suspense>
                            </div>
                        </div>
                    </div>
                    <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap">
                        <div className="container eduvibe-animated-shape">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h3 className="title">BANK DETAILS</h3>
                                </div>
                            </div>
                            <div className="row mt--20">
                                {detail?.length > 0 &&
                                    detail.map((v, i) => (
                                        <div className="col-lg-4 col-md-6" key={i}>
                                            <div className="card mt--0">
                                                <div className="info-widget">
                                                    <div className="info-title text-center">
                                                        <h3>{v.bank_name}</h3>
                                                    </div>
                                                    <div className="info-inner">
                                                        <ul className="info-list clearfix">
                                                            <li>
                                                                <p>A/C Holder</p>
                                                                <h4>{v.holder_name}</h4>
                                                            </li>
                                                            <li>
                                                                <p>Account Number:</p>
                                                                <h4>{v.account_number}</h4>
                                                            </li>
                                                            <li>
                                                                <p>IFSC Code:</p>
                                                                <h4>{v.ifsc_code}</h4>
                                                            </li>
                                                            <li>
                                                                <p>Branch:</p>
                                                                <h4>{v.branch_address}</h4>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="edu-contact-us-area home-one-cat eduvibe-contact-us edu-section-gap">
                        <div className="container eduvibe-animated-shape">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h3 className="title">WALLETS</h3>
                                </div>
                            </div>
                            <div className="row mt--20">
                                <div className="col-lg-4 mt--0">
                                    <div
                                        className="card mt--0"
                                        style={{ background: "var(--color-dark)" }}
                                    >
                                        <div className="card-body">
                                            <div className="w-100 text-center">
                                                 <LazyLoadImage
                                                    src="/assets/images/payment/paytem-wallet.jpg"
                                                    alt="image"
                                                />
                                            </div>

                                            <h6 className="line-clamp-2 mb-3 mt-5 text-center text-white">
                                                Pay with wallet
                                            </h6>
                                            <div className="d-flex align-items-center">
                                                <ul>
                                                    <li className="ng-binding ng-scope text-white">
                                                        Pay your bill using wallet
                                                    </li>
                                                    <li className="ng-binding ng-scope text-white">
                                                        Incase refund, money will be credited to your wallet
                                                        instantaneously
                                                    </li>
                                                    <li className="ng-binding ng-scope text-white">
                                                        Use paytem wallet on another website
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {image &&
                                    image.map((v, i) => (
                                        <div className="col-md-2" key={i}>
                                             <LazyLoadImage
                                                className="rounded img-fluid"
                                                src={data?.page_description?.image_url + v.image}
                                                alt="..."
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </>
            )
            }
            <LetUsHelp />
        </>
    );
}

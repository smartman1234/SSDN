import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO/SEO";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from "react-slick";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";
import MetaService from "../../Services/MetaServices/MetaService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";

export default function Service() {
    const metaService = new MetaService();
    const { search, bannery } = useContext(CartContext);
    const [banner, setBannerImage] = bannery;
    const [data, setData] = useState({});
    const [meta, setMeta] = useState({
        title: "",
        keywords: "",
        description: "",
        breadcrumb: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        getmetaData("service");
        getPageBlock("service");
    }, []);

    const getmetaData = async () => {
        try {
            let response = await metaService.service("service");
            if (response.status === "success") {
                setData(response.data);
            }
        } catch (err) {
            throw err;
        }
    };
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    const getPageBlock = async () => {
        try {
            let response = await metaService.getMetadetail("service");
            if (response.status === "success") {
                setMeta({
                    title: response.data.meta_title,
                    Keywords: response.data.meta_keywords,
                    description: response.data.meta_description,
                    breadcrumb: response.data.breadcrumb,
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
                breacrumb={meta?.breadcrumb}
            />
            <HeadingName
                name="Service"
                home="Home"
                heading="Service"
            />
            <div className="eduvibe-home-four-about about-style-2 edu-section-gap bg-color-white">
                <div className="container eduvibe-animated-shape">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-image-gallery">
                                <div className="eduvibe-about-1-img-wrapper">
                                     <LazyLoadImage
                                        className="image-1"
                                        src={`
                    ${data?.page_description?.image_url +
                                            data?.page_description?.success_image
                                            }`}
                                        alt="About Images"
                                        height="100%"
                                        width="100%"
                                    />
                                    <span className="eduvibe-about-blur">
                                         <LazyLoadImage
                                            src="/assets/images/about/about-07/about-blur.png"
                                            alt="About Blur"
                                            height="100%"
                                            width="100%"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="inner">
                                <div className="section-title">
                                    <span className="pre-title">
                                        {data?.page_description?.skill_title}
                                    </span>
                                    <h3 className="title">
                                        {data?.page_description?.success_title}
                                    </h3>
                                </div>

                                <p
                                    className="ssdn-editor-font1 mt--20"
                                    dangerouslySetInnerHTML={{
                                        __html: data?.page_description?.success_description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                        <div className="shape shape-1">
                            <span className="shape-dot"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-one-cat edu-about-area edu-section-gap">
                <div className="container eduvibe-animated-shape">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <h3 className="title">
                                    {data?.page_description?.business_solution_title}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel">
                        <Slider {...settings}>
                            <div className="single-slick-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="elementor-widget-container">
                                            <div className="single__box_wrap wrap__single__box__layout__4">
                                                 <LazyLoadImage loading="lazy" src={` ${data?.page_description?.image_url +
                                                    data?.page_description?.solution_1_image
                                                    }`}
                                                    className="attachment-full size-full lazyloaded"
                                                    alt="image"
                                                    height="100%"
                                                    width="100%"
                                                />
                                                <div className="single__box single__box__layout__4 text-center">
                                                    <div className="box__icon elementor-animation-">
                                                         <LazyLoadImage loading="lazy" src="/assets/images/Icon-5.svg"
                                                            alt=""
                                                            className="lazyloaded"
                                                            style={{ display: "inherit" }}
                                                            height="50px"
                                                            width="46px"
                                                        />
                                                    </div>
                                                    <h3 className="box__title">
                                                        {data?.page_description?.solution_1_title}
                                                    </h3>
                                                    <div className="box__description ssdn-editor-font1"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                data?.page_description
                                                                    ?.solution_1_description,
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-slick-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="elementor-widget-container">
                                            <div className="single__box_wrap wrap__single__box__layout__4">
                                                 <LazyLoadImage
                                                    height="100%"
                                                    width="100%"
                                                    src={`${data?.page_description?.image_url +
                                                        data?.page_description?.solution_2_image
                                                        }`}
                                                    className="attachment-full size-full lazyloaded"
                                                    alt="image"
                                                />
                                                <div className="single__box single__box__layout__4 text-center">
                                                    <div className="box__icon elementor-animation-">
                                                         <LazyLoadImage
                                                            src="/assets/images/Icon-5.svg"
                                                            alt=""
                                                            className="lazyloaded"
                                                            style={{ display: "inherit" }}
                                                            height="50px"
                                                            width="46px"
                                                        />
                                                    </div>
                                                    <h3 className="box__title">
                                                        {data?.page_description?.solution_2_title}
                                                    </h3>
                                                    <div className="box__description ssdn-editor-font1"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                data?.page_description
                                                                    ?.solution_2_description,
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-slick-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="elementor-widget-container">
                                            <div className="single__box_wrap wrap__single__box__layout__4">
                                                 <LazyLoadImage
                                                    src={`${data?.page_description?.image_url +
                                                        data?.page_description?.solution_3_image
                                                        }`}
                                                    className="attachment-full size-full lazyloaded"
                                                    alt="image"
                                                    height="100%"
                                                    width="100%"
                                                />
                                                <div className="single__box single__box__layout__4 text-center">
                                                    <div className="box__icon elementor-animation-">
                                                         <LazyLoadImage
                                                            src="/assets/images/Icon-5.svg"
                                                            alt=""
                                                            className="lazyloaded"
                                                            style={{ display: "inherit" }}
                                                            height="50px"
                                                            width="46px"
                                                        />
                                                    </div>
                                                    <h3 className="box__title">
                                                        {data?.page_description?.solution_3_title}
                                                    </h3>
                                                    <div className="box__description ssdn-editor-font1"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                data?.page_description
                                                                    ?.solution_3_description,
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            <div className="about-style-4 edu-section-gap">
                <div className="container eduvibe-animated-shape">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <h3 className="title">
                                    {data?.page_description?.work_process_title}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--20">
                        <div className="col-md-4">
                            <div className="elementor-widget-wrap mb-4">
                                <div className="elementor-element">
                                    <h3 className="box__title">
                                        {data?.page_description?.process_1_title}
                                    </h3>
                                    <div className="box__description ssdn-editor-font1"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.page_description?.process_1_description,
                                        }}
                                    >
                                    </div>
                                </div>
                                <div className="elementor-widget-image">
                                     <LazyLoadImage
                                        width="129"
                                        height="129"
                                        src="/assets/images/01.png"
                                        className="attachment-large size-large lazyloaded"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="elementor-widget-wrap mb-4">
                                <div className="elementor-element">
                                    <h3 className="box__title text-primary">
                                        {data?.page_description?.process_2_title}
                                    </h3>
                                    <div className="box__description ssdn-editor-font1"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.page_description?.process_2_description,
                                        }}
                                    >
                                    </div>
                                </div>
                                <div className="elementor-widget-image">
                                     <LazyLoadImage
                                        width="129"
                                        height="129"
                                        src="/assets/images/02.png"
                                        className="attachment-large size-large lazyloaded"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="elementor-widget-wrap mb-4">
                                <div className="elementor-element">
                                    <h3 className="box__title">
                                        {data?.page_description?.process_3_title}
                                    </h3>
                                    <div className="box__description ssdn-editor-font1"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.page_description?.process_3_description,
                                        }}
                                    >
                                    </div>
                                </div>
                                <div className="elementor-widget-image">
                                     <LazyLoadImage
                                        width="129"
                                        height="129"
                                        src="/assets/images/03.png"
                                        className="attachment-large size-large lazyloaded"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edu-section-gap home-one-cat">
                <div className="container eduvibe-animated-shape">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <h3 className="title">
                                    {data?.page_description?.consulting_service}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--20 eduvibe-about-one-service">
                        <div className="col-lg-4 col-md-6">
                            <div className="service-card service-card-3 shape-bg-1">
                                <div className="inner">
                                    <div className="icon">
                                        <Link to="#">
                                            <i className="icon-Destination"></i>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <h6 className="title text-center">
                                            {data?.page_description?.service_1_title}
                                        </h6>
                                        <p
                                            className="ssdn-editor-font1"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.page_description?.service_1_description,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="service-card service-card-3 shape-bg-2">
                                <div className="inner">
                                    <div className="icon">
                                        <Link to="#">
                                            <i className="icon-Browser"></i>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <h6 className="title text-center">
                                            {data?.page_description?.service_2_title}
                                        </h6>
                                        <p
                                            className="ssdn-editor-font1"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.page_description?.service_2_description,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="service-card service-card-3 shape-bg-3">
                                <div className="inner">
                                    <div className="icon">
                                        <Link to="#">
                                            <i className="icon-Lock"></i>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <h6 className="title text-center">
                                            {data?.page_description?.service_3_title}
                                        </h6>
                                        <p
                                            className="ssdn-editor-font1"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.page_description?.service_3_description,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LetUsHelp />
        </>
    );
}

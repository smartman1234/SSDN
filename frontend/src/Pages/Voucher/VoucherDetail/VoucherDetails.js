import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../../../Container/Context";
import VoucherService from "../../../Services/VoucherService/VoucherService";
import { useState } from "react";
import Faq from "../../Faq/Faq";
import SEO from "../../SEO/SEO";
import LetUsHelp from "../../Home/LetUsHelp/LetUsHelp";

const RelatedVouchers = React.lazy(() =>
  import("../../Assessment/RelatedVouchers")
);

const VoucherDescription = React.lazy(() => import("./VoucherDescription"));

const VoucherDetailCard = React.lazy(() => import("./VoucherDetailCard"));

export default function VoucherDetails() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const [voucherDetail, setVoucherDetail] = useState({});
  const param = useParams();
  const voucherServe = new VoucherService();

  useEffect(() => {
    window.scroll(0, 0);
    VoucherDetailApi();
  }, []);

  const VoucherDetailApi = async () => {
    try {
      let response = await voucherServe.voucherDetail(param.id);
      if (response) {
        sessionStorage.setItem(
          "voucherheading",
          response.data?.category?.heading
        );
        sessionStorage.setItem("vouchername", response.data?.category?.slug);
        setVoucherDetail(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <SEO
        meta_title={voucherDetail?.meta_title}
        meta_description={voucherDetail?.meta_description}
        meta_keyword={voucherDetail?.meta_keyword}
        breacrumb={voucherDetail?.breadcrumb}
      />

      <div
        className="edu-breadcrumb-area breadcrumb-style-1 bg-image"
        style={{
          backgroundImage: `url(${banner?.image_url + banner?.logo}) `,
        }}
      >
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <div className="page-title">
                  <h1 className="title">{voucherDetail?.title}</h1>
                </div>
                <nav className="edu-breadcrumb-nav">
                  <ol className="edu-breadcrumb d-flex justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="separator">
                      <i className="ri-arrow-drop-right-line"></i>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link to={`/vouchers`}>vouchers</Link>
                    </li>

                    <>
                      <li className="separator">
                        <i className="ri-arrow-drop-right-line"></i>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                        onClick={() => {
                          sessionStorage.setItem(
                            "categoryvoucherslug",
                            voucherDetail?.category?.slug
                          );
                          sessionStorage.setItem(
                            "categoryvoucherid",
                            voucherDetail?.id
                          );
                        }}
                      >
                        <Link to={`/vouchers/${voucherDetail?.category?.slug}`}>
                          {" "}
                          {voucherDetail?.category?.name}
                        </Link>
                      </li>
                    </>

                    <>
                      <li className="separator active">
                        <i className="ri-arrow-drop-right-line"></i>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {voucherDetail?.title}
                      </li>
                    </>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="edu-course-details-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <React.Suspense fallback="Loading...">
              <VoucherDetailCard voucherDetail={voucherDetail} />
            </React.Suspense>

            <div
              className="course-details-content col-xl-8 col-lg-7"
              id="get-voucher-height"
            >
              <React.Suspense fallback="Loading...">
                <VoucherDescription voucherDetail={voucherDetail} />
              </React.Suspense>

              <Faq voucherDetail={voucherDetail} />
            </div>
          </div>
        </div>
      </div>
      {voucherDetail?.related_assessments?.length > 0 && (
        <div className="edu-course-details-area edu-section-gap home-one-cat">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="edu-course-wrapper">
                  <div className="section-title text-center mb--20">
                    <span className="pre-title">Related Assessment</span>
                    <h3 className="title">Assessment You May Like</h3>
                  </div>
                  <React.Suspense fallback="Loading...">
                    <RelatedVouchers
                      voucherDetail={voucherDetail?.related_assessments}
                      type="assessment"
                    />
                  </React.Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <LetUsHelp />
    </>
  );
}

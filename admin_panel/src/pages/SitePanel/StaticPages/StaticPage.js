import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import BannerImage from "./BannerImage";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";
import ServiceForm from "./ServiceForm";
import axios from "axios";
import NotFound from "./NotFound";
import PrivacyPage from "./PrivacyPage";
import FooterForm from "./FooterForm";
import PageBlock from "./PageBlock";
import Home from "./Home";
import Placement from "./Placement";
import WebsiteMenu from "./WebsiteMenu";
import Franchise from "./Franchise";
import Internationals from "./Internationals";
import SpecialOffer from "./SpecialOffer";
import Payment from "./Payment";
import TermCondition from "./TermCondition";
import Breadcrumb from "../../BreadCrumb/Breadcrumb"

export default function StaticPage() {
  const [pageName, setPageName] = useState("");
  const [slug, setSlug] = useState("");
  const [value, setValue] = useState();

  const pages = [
    { label: "Course", value: "course" },
    { label: "Upcoming batches", value: "upcoming-batches" },
    { label: "Footer", value: "footer" },
    { label: "Services", value: "service" },
    { label: "Not Found", value: "404" },
    { label: "Privacy Policy", value: "privacy-policy" },
    { label: "Home", value: "home" },
    { label: "Placement", value: "placement" },
    { label: "Website Menu", value: "website-menu" },
    { label: "International", value: "international" },
    { label: "Franchise", value: "franchise" },
    { label: "Special Offer", value: "offer" },
    { label: "Payment", value: "payment" },
    { label: "terms & Condition", value: "term-conditions" },
    { label: "Banner Image", value: "banner-image" },
  ];

  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Static Blocks" />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Static Blocks</h5>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label className="form-label">
                        Page / Blocks <span className="text-danger">*</span>
                      </label>
                      <Select
                        onChange={(value) => {
                          setValue(value);
                          setPageName(value.label);
                          setSlug(value.value);
                        }}
                        options={pages}
                        value={value}
                        name="page_name"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label className="form-label">
                        Slug <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="slug"
                        type="text"
                        placeholder="Enter slug"
                        disabled
                        value={slug}
                      />
                    </div>
                    {(slug === "course" || slug === "upcoming-batches") && (
                      <PageBlock pageName={pageName} slug={slug} />
                    )}
                    {slug === "service" && (
                      <ServiceForm pageName={pageName} slug={slug} />
                    )}
                    {slug == 404 && (
                      <NotFound pageName={pageName} slug={slug} />
                    )}
                    {slug === "privacy-policy" && (
                      <PrivacyPage pageName={pageName} slug={slug} />
                    )}
                    {slug === "footer" && (
                      <FooterForm pageName={pageName} slug={slug} />
                    )}
                    {slug === "home" && (
                      <Home pageName={pageName} slug={slug} />
                    )}
                    {slug === "placement" && (
                      <Placement pageName={pageName} slug={slug} />
                    )}
                    {slug === "website-menu" && (
                      <WebsiteMenu pageName={pageName} slug={slug} />
                    )}
                    {slug === "franchise" && (
                      <Franchise pageName={pageName} slug={slug} />
                    )}
                    {slug === "international" && (
                      <Internationals pageName={pageName} slug={slug} />
                    )}
                    {slug === "offer" && (
                      <SpecialOffer pageName={pageName} slug={slug} />
                    )}
                    {slug === "payment" && (
                      <Payment pageName={pageName} slug={slug} />
                    )}
                    {slug === "term-conditions" && (
                      <TermCondition pageName={pageName} slug={slug} />
                    )}
                    {slug === "banner-image" && (
                      <BannerImage pageName={pageName} slug={slug} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}

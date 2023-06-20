import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO/SEO";
import MetaService from "../../Services/MetaServices/MetaService";

export default function ELearningCategory({
  Categories,
  active,
  setActive,
  setCategoryHeading,
  setCategoryName,
}) {
  const metaService = new MetaService();
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb:""
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setMeta({
      title: sessionStorage.getItem("elearningmetatitle"),
      keywords: sessionStorage.getItem("elearningmetakeyboard"),
      description: sessionStorage.getItem("elearningmetadescription"),
      breadcrumb:sessionStorage.getItem("elearningmetabreadcrumb"),
    });
    getmetaData("e-learning");
  }, []);

  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("e-learning");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breadcrumb:response.data?.breacrumb
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      {" "}
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
        breacrumb={meta?.breadcrumb}
      />{" "}
      <div className="col-lg-3">
        <aside className="edu-course-sidebar bg-color-white">
          <div className="edu-course-widget1 widget-category">
            <div className="inner">
              <h5 className="widget-title">Categories</h5>
              <div className="content course-category-scroll">
                {Categories.map((v, i) => (
                  <div className="edu-form-check" key={i}>
                    <Link
                      to="#"
                      className={
                        active == i
                          ? "category-filtter active"
                          : "category-filtter"
                      }
                      onClick={() => {
                        sessionStorage.setItem("elearningslug", v.slug);
                        sessionStorage.setItem("elearningid", i);
                        sessionStorage.setItem("categoryname", v.name);
                        sessionStorage.setItem("categoryheading", v.heading);
                        sessionStorage.setItem(
                          "elearningmetatitle",
                          v.meta_title
                        );
                        sessionStorage.setItem(
                          "elearningmetakeyboard",
                          v.meta_keyword
                        );
                        sessionStorage.setItem(
                          "elearningmetadescription",
                          v.meta_description
                        ); sessionStorage.setItem(
                          "elearningmetabreadcrumb",
                          v.breadcrumb
                        );
                        setCategoryHeading(v.heading);
                        setCategoryName(v.name);
                        setActive(i);
                        setMeta({
                          title: v.meta_title,
                          Keywords: v.meta_keyword,
                          description: v.meta_description,
                          breadcrumb:v.breadcrumb
                        });
                      }}
                    >
                      {v.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import MetaService from "../../Services/MetaServices/MetaService";
import SEO from "../SEO/SEO";
import HeadingName from "../HeadingName/HeadingName";
import { CartContext } from "../../Container/Context";
import AssessmentSearch from "./AssessmentSearch";
import CategoryAndAssessmentCard from "./CategoryAndAssessmentCard";

export default function Assessment() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const location = useLocation();
  const metaService = new MetaService();
  const [childId, setChildid] = useState("");
  const [assessemnetCategoryList, setAssessmentCategoryList] = useState({});
  const [discription, setDiscription] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  const gettingChildCategoryId = (id) => {
    setChildid(id);
  };

  const categoryName = (name, slug, discription) => {
    setDiscription(discription);
    sessionStorage.setItem("assessmentheading", name);
    sessionStorage.setItem("assessmentslug", slug);
    setName(name);
    setSlug(slug);
  };

  function searchAssessmentList(e) {
    setSearch({ ...search, searchTxt: e.target.value, start: 0 });
  }

  const executeOnClick = (isExpanded) => {};

  useEffect(() => {
    window.scroll(0, 0);
    getmetaData("assessment");
  }, []);

  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("assessment");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breacrumb: response.data.breadcrumb,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  const getCategoryListApiData = (list) => {
    setAssessmentCategoryList(list);
  };
  return (
    <>
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
        breacrumb={meta?.breadcrumb}
      />

      {location.pathname === `/assessment` ? (
        <HeadingName name="Assessments" home="Home" heading="Assessments" />
      ) : (
        <HeadingName name={sessionStorage.getItem("assessmentslug")} home="Home" heading={sessionStorage.getItem("assessmentslug")} />
      )}

      <div className="edu-course-area eduvibe-home-one-course edu-section-gap bg-color-white">
        <div className="container eduvibe-animated-shape">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
                <div className="edu-search-box">
                  <ShowMoreText
                    lines={2}
                    more="Show more"
                    less="Show less"
                    className="content-css mb-4"
                    anchorclassName="show-more-less-clickable"
                    onClick={executeOnClick}
                    expanded={false}
                    width={550}
                    truncatedEndingComponent={"... "}
                  >
                    <p
                      className="ssdn-editor-font"
                      dangerouslySetInnerHTML={{
                        __html: assessemnetCategoryList.description,
                      }}
                    />
                  </ShowMoreText>
              </div>
            </div>
          </div>

          <AssessmentSearch
            search={search}
            searchAssessmentList={searchAssessmentList}
          />

          <CategoryAndAssessmentCard
            gettingChildCategoryId={gettingChildCategoryId}
            categoryName={categoryName}
            getCategoryListApiData={getCategoryListApiData}
            search={search}
            setSearch={setSearch}
            childId={childId}
            name={name}
          />
        </div>
      </div>
    </>
  );
}

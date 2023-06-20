import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeadingName from "../HeadingName/HeadingName";
import ShowMoreText from "react-show-more-text";
import SEO from "../SEO/SEO";
import { CartContext } from "../../Container/Context";

const AssessmentCard = React.lazy(() => import("./AssessmentCard"));

const AssessmentCategory = React.lazy(() => import("./AssessmentCategory"));

export default function CategoryAssessment() {
  const location = useLocation();
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
  }, []);

  const getCategoryListApiData = (list) => {
    setAssessmentCategoryList(list);
  };
  return (
    <>
      <SEO
        meta_title={localStorage.getItem("categorymetatitle")}
        meta_description={localStorage.getItem("categorymetadescription")}
        meta_keyword={localStorage.getItem("categorymetakeyword")}
        breacrumb={localStorage.getItem("categorymetabreadcrumb")}
      />
      =
      {location.pathname === `/assessment` ? (
        <HeadingName name="Assessment" home="Home" heading="Assessment" />
      ) : (
        <HeadingName name={sessionStorage.getItem("assessmentslug")} home="Home" heading={sessionStorage.getItem("assessmentslug")} />
      )}
      <div className="edu-course-area eduvibe-home-one-course edu-section-gap bg-color-white">
        <div className="container eduvibe-animated-shape">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="edu-search-box-wrapper text-start">
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
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="edu-search-box">
                <form action="#">
                  <input
                    type="text"
                    placeholder="Search Assessment ..."
                    value={search.searchTxt}
                    onChange={(e) => searchAssessmentList(e)}
                  />
                  <button className="search-button">
                    <i className="ri-search-line"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="row mt--40">
            <div className="col-lg-3">
              <aside className="edu-course-sidebar">
              <React.Suspense fallback="">
              <AssessmentCategory
                  gettingChildCategoryId={gettingChildCategoryId}
                  categoryName={categoryName}
                  getCategoryListApiData={getCategoryListApiData}
                  search={search}
                  setSearch={setSearch}
                />
            </React.Suspense>
              
              </aside>
            </div>
            <React.Suspense fallback="">
              <AssessmentCard childId={childId} name={name} search={search} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

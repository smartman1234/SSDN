import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import SEO from "../SEO/SEO";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeadingName from "../HeadingName/HeadingName";

const CourseCategoryBlog = React.lazy(() => import("./CourseCategoryBlog"));

const TrendingVoucherAndAssessment = React.lazy(() =>
  import("./TrendingVoucherAndAssessment")
);

const WhySsdn = React.lazy(() => import("./WhySsdn"));

const CourseListSection = React.lazy(() =>
  import("./CourseListSection/CourseListSection")
);

export default function Course() {
  const params = useParams();
  const [searchdata, setSearchdata] = useState({ searchTxt: "" });
  const [mainCategoryData, setMainCategoryData] = useState({});
  const [title, seTitle] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gettingMainCategoryData = (data) => {
    setMainCategoryData(data);
    const blogs = data?.blogs;
    const arr = [];
    for (const key in blogs) {
      arr.push(blogs[key]?.title);
      seTitle(arr);
    }
  };

  const searchData = (e) => {
    setSearchdata({ ...searchdata, searchTxt: e.target.value });
  };
  return (
    <>
      <SEO
        meta_title={mainCategoryData?.meta_title}
        meta_description={mainCategoryData?.meta_description}
        meta_keyword={mainCategoryData?.meta_keyword}
        breacrumb={mainCategoryData?.breadcrumb}
      />

      <HeadingName
        name={mainCategoryData?.heading}
        home="Home"
        heading={mainCategoryData?.name}
      />

      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat ">
        <div className="container eduvibe-animated-shape">
          <div className="col-lg-12">
            <div className="section-title text-start">
              <span className="pre-title mb-1">
                {mainCategoryData?.heading}
              </span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="course-content">
                <h2 className="ssdn-heading">{mainCategoryData?.headline}</h2>

                <p
                  className=" content-css mb-4 ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: mainCategoryData?.description,
                  }}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div class="eduvibe-sidebar course-details-sidebar p-0">
                <div class="inner">
                  <div class="eduvibe-widget">
                    <div class="thumbnail video-popup-wrapper">
                      <LazyLoadImage
                        class="w-100"
                        src={mainCategoryData?.image}
                        alt={mainCategoryData?.image_alt_tag}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white">
        <div className="container eduvibe-animated-shape">
          <div className="col-lg-12">
            <div className="section-title text-center row">
              <div className="col-sm-9 col-12">
                <h3 className="title">
                  List of {mainCategoryData?.name} Courses
                </h3>{" "}
              </div>
              <div className="col-sm-3 col-12 form-group mb-3">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  aria-controls="basic-1"
                  onChange={(e) => searchData(e)}
                />
              </div>
            </div>
          </div>
          <React.Suspense fallback="">
            <CourseListSection
              params={params?.id}
              gettingMainCategoryData={gettingMainCategoryData}
              // gettingdata={gettingdata}
              searchdata={searchdata}
            />
          </React.Suspense>
        </div>
      </div>
      <React.Suspense fallback="">
        <CourseCategoryBlog
          gettingMainCategoryData={mainCategoryData?.blogs}
          title={title}
        />
      </React.Suspense>

      <LetUsHelp />
      <React.Suspense fallback="">
        <WhySsdn />
      </React.Suspense>

      <React.Suspense fallback="">
        <TrendingVoucherAndAssessment />
      </React.Suspense>
    </>
  );
}

import React, { useEffect, useState, useContext } from "react";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import CategoryCourseService from "../../Services/CourseService/CategoryCourseService";
import SEO from "../SEO/SEO";
import MetaService from "../../Services/MetaServices/MetaService";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";

const TrendingCourse = React.lazy(() => import("./TrendingCourse"));

const OurKeySupports = React.lazy(() =>
  import("../Home/OurKeySupports/OurKeySupports")
);

const TrendingVoucherAndAssessment = React.lazy(() =>
  import("./TrendingVoucherAndAssessment")
);

const InfrastructureCategoryCourse = React.lazy(() =>
  import("./InfrastructureCategoryCourse")
);

const SoftWareCategoryCourse = React.lazy(() =>
  import("./SoftWareCategoryCourse")
);

export default function Course() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const metaService = new MetaService();
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  const [data, setData] = useState({});
  const [softwareList, setSoftwareList] = useState([]);
  const [infrastructure, setInfrastructure] = useState([]);
  const [trendingCourse, setTrendingCourse] = useState([]);
  const serve = new CategoryCourseService();

  useEffect(() => {
    window.scroll(0, 0);
    SoftWareCategoryCourseListApi();
    trendingCourseListApi();
    infrastructureCategoryListApi();
    coursePageApi();
  }, []);

  const SoftWareCategoryCourseListApi = async () => {
    try {
      let response = await serve.softwarecategory();
      if (response) {
        setSoftwareList(response.data);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  const infrastructureCategoryListApi = async () => {
    try {
      let response = await serve.infrastructurecategory();
      if (response) {
        setInfrastructure(response.data);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  const trendingCourseListApi = async () => {
    try {
      let response = await serve.trndingcourse();
      if (response) {
        setTrendingCourse(response.data);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  const coursePageApi = async () => {
    try {
      let response = await serve.staticPage("course");
      if (response) {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getmetaData("course");
  }, []);
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("course");
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
      <HeadingName name="Course Categories" home="Home" heading="Course Categories" />

      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white">
        <div className="container eduvibe-animated-shape">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title mb--10">{data?.block_title}</h3>
              <p>{data?.block_description}</p>
            </div>
          </div>
        </div>
      </div>
      <React.Suspense fallback="">
        <SoftWareCategoryCourse softwareList={softwareList} />
      </React.Suspense>

      <React.Suspense fallback="">
        <InfrastructureCategoryCourse infrastructure={infrastructure} />
      </React.Suspense>

      {trendingCourse?.length > 0 && (
        <React.Suspense fallback="">
          <TrendingCourse trendingCourse={trendingCourse} />
        </React.Suspense>
      )}

      <React.Suspense fallback="">
        <OurKeySupports />
      </React.Suspense>

      <LetUsHelp />
      <React.Suspense fallback="">
        <TrendingVoucherAndAssessment />
      </React.Suspense>
    </>
  );
}

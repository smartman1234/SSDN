import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ELearningService from "../../Services/ELearningService/ELearningService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import Overview from "./Overview";
import SEO from "../SEO/SEO";
import Testimonial from "../Home/Testimonial/Testimonial";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Analytics = React.lazy(() => import("./Analytics"));

const ELearningRelatedCourse = React.lazy(() =>
  import("./ELearningRelatedCourse")
);

const CitrixReviewForm = React.lazy(() => import("../Course/CitrixReviewForm"));

export default function Elearning() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const param = useParams();
  const elearning = new ELearningService();
  const [data, setData] = useState({});

  useEffect(() => {
    ELearningCourseDetailApi();
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = (e) => {
    const header = document.querySelector(".menu-sticky2");
    const scrollTop = window.scrollY;
    if (scrollTop >= 300) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
    if (scrollTop >= 1600) {
      header.classList.remove("sticky");
    } else {
    }
  };

  const ELearningCourseDetailApi = async () => {
    try {
      let response = await elearning.elearningDetail(param.id);
      if (response) {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {" "}
      <SEO
        meta_title={data?.meta_title}
        meta_description={data?.meta_description}
        meta_keyword={data?.meta_keyword}
        breacrumb={data?.breadcrumb}
        ogTitle={data.og_title}
        OgImage={data.og_image}
        OgUrl={data.og_url}
      />
      <HeadingName name={data?.heading} home="Home" heading={data?.heading} />
      
      <Overview data={data} />
      <React.Suspense fallback="">
        <Analytics data={data} />
      </React.Suspense>
      <Testimonial />
      <div
        className="home-three-about edu-about-area edu-section-gap"
        id="Reviews"
      >
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-8 product-description-content">
              <React.Suspense fallback="">
                <CitrixReviewForm detailData={data} id={data.id} />
              </React.Suspense>
            </div>
          </div>
          <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
            <div className="shape-image shape-image-1">
              <LazyLoadImage
                src="/assets\images\shapes\shape-03-08.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
            <div className="shape-image shape-image-2">
              <LazyLoadImage
                src="/assets\images\shapes\shape-27.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <React.Suspense fallback="">
        <ELearningRelatedCourse relatedCourse={data?.related_courses} />
      </React.Suspense>
      <LetUsHelp />
    </>
  );
}

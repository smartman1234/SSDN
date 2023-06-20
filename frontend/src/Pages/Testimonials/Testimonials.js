import React, { useEffect, useState, useContext } from "react";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import SEO from "../SEO/SEO";
import { CartContext } from "../../Container/Context";
import ReactPaginate from "react-paginate";
import MetaService from "../../Services/MetaServices/MetaService";
import TestimonialService from "../../Services/TestimonialService";
import HeadingName from "../HeadingName/HeadingName";

const TestimonialSection = React.lazy(() => import("./TestimonialSection"));

const CourseList = React.lazy(() => import("./CourseList"));

export default function Testimonials() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const metaService = new MetaService();
  const serve = new TestimonialService();
  const [activebutton, setActiveButton] = useState(0);
  const [courseList, setCourseList] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [type, setType] = useState("retail");
  const [testimonialList, setTestimonialList] = useState([]);
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
  });
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const Activehandler = (id, type) => {
    setType(type);
    setActiveButton(id);
  };

  useEffect(() => {
    getmetaData("testimonials");
    setType(sessionStorage.getItem("testimonialtype") || "retail");
    setCourseId(sessionStorage.getItem("testimonialcourseid"));
    window.scroll(0, 0);
    CourseListApi();
    testimonialListApi();
    return () => {
      sessionStorage.removeItem("testimonialcourseid");
    };
  }, []);

  useEffect(() => {
    testimonialListApi();
  }, [courseId, type]);

  const CourseListApi = async () => {
    try {
      let response = await serve.course();
      if (response) {
        setCourseList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const apiCall = async (activity) => {
    try {
      let response = await serve.testimonial(activity);
      if (response) {
        setTestimonialList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const testimonialListApi = async () => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      course_id: courseId,
      testimonial_type: "all",
      type: type ? type : "retail",
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
      testimonial_type: "all",
      type: type ? type : "retail",
      course_id: courseId,
    };
    await apiCall(activity);
  };

  const gettingCourseid = (id) => {
    setCourseId(id);
  };

  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("testimonials");
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
      <HeadingName name="Testimonials" home="Home" heading="Testimonials" />
      
      <div className="edu-course-details-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row mb--30">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h3 className="title">
                  What Our Satisfied{" "}
                  <span className="down-mark-line">Clients</span> Say about us
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
          <React.Suspense fallback="Loading...">
          <CourseList
              courseList={courseList}
              gettingCourseid={gettingCourseid}
            />
            </React.Suspense>
          
            <React.Suspense fallback="Loading...">
              <TestimonialSection
                Activehandler={Activehandler}
                activebutton={activebutton}
                type={type}
                testimonialList={testimonialList}
              />
            </React.Suspense>

            <div className="col-md-4"></div>
            <div className="col-md-8 mt--20">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={
                  "edu-pagination justify-content-center"
                }
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>

      <LetUsHelp />
    </>
  );
}

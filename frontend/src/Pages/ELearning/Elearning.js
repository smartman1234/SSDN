import React, { useEffect, useState } from "react";
import ELearningService from "../../Services/ELearningService/ELearningService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import ELearningFaq from "./ELearningFaq";
import ReactPaginate from "react-paginate";
import ELearningCategory from "./ELearningCategory";
import HeadingName from "../HeadingName/HeadingName";
import Testimonial from "../Home/Testimonial/Testimonial";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ElearningCourse = React.lazy(() => import("./ElearningCourse"));

const ELearningPop = React.lazy(() => import("./ELearningPop"));

const SelfAnalysisTest = React.lazy(() => import("./SelfAnalysisTest"));

export default function Elearning() {
  const [isShown, setIsShown] = useState({});
  const [Categories, setCategories] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [CategoryName, setCategoryName] = useState("");
  const [CategoryHeading, setCategoryHeading] = useState("");
  const [offset, setOffset] = useState(0);
  const [data, setdata] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [active, setActive] = useState("");

  const [search, setSearch] = useState({
    start: 0,
    perPage: 6,
    searchTxt: "",
    searchField: "",
  });
  const elearning = new ELearningService();

  const apiCall = async (activity) => {
    try {
      let response = await elearning.courseList(activity);
      if (response.status === "success") {
        setTotalPages(response.count / 6);
        setTotalCount(response.count);
        setCourseList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    ELearningCategoryApi();
    ELearningCourseApi();
    const id = sessionStorage.getItem("elearningid");
    setActive(id);
    const name = sessionStorage.getItem("categoryname");
    setCategoryName(name);
    const heading = sessionStorage.getItem("categoryheading");
    setCategoryHeading(heading);
    return () => {
      sessionStorage.removeItem("elearningid");
      sessionStorage.removeItem("elearningslug");
    };
  }, []);

  useEffect(() => {
    ELearningCourseApi();
  }, [sessionStorage.getItem("elearningslug")]);

  const ELearningCategoryApi = async () => {
    try {
      let response = await elearning.categoryList();
      if (response) {
        setCategories(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const ELearningCourseApi = async () => {
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
      query: search?.searchTxt,
      category_slug: sessionStorage.getItem("elearningslug"),
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search?.perPage;
    setOffset(currentPage);
    let activity = {
      category_slug: sessionStorage.getItem("elearningslug"),
      limit: search?.perPage,
      offset: currentPage,
      query: search?.searchTxt,
    };
    await apiCall(activity);
  };

  const gettingCourseId = (id) => {
    setdata(id);
  };

  return (
    <>
      <HeadingName
        name={CategoryHeading ? CategoryHeading : "E-Learning"}
        home="Home"
        heading={CategoryHeading ? CategoryHeading : "E-Learning"}
      />
       <React.Suspense fallback="">
       <SelfAnalysisTest />
            </React.Suspense>
     
      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat">
        <div className="container eduvibe-animated-shape">
          <div className="row mt--20">
            <h1 className="ssdn-main-heading">Explore Free Online Courses</h1>

            <ELearningCategory
              Categories={Categories}
              active={active}
              setActive={setActive}
              setCategoryHeading={setCategoryHeading}
              setCategoryName={setCategoryName}
            />
            <React.Suspense fallback="">
              <ElearningCourse
                course={courseList}
                isShown={isShown}
                setIsShown={setIsShown}
                gettingCourseId={gettingCourseId}
              />
            </React.Suspense>

            {isShown && (
              <React.Suspense fallback="">
                <ELearningPop
                  isShown={isShown}
                  setIsShown={setIsShown}
                  data={data}
                />
              </React.Suspense>
            )}
          </div>
          <div className="row">
            <div className="col-lg-12 mt--20">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"edu-pagination justify-content-center"}
                activeClassName={"active"}
              />
            </div>
          </div>

          <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
            <div className="shape-image scene shape-image-1">
              <span data-depth="-2.2">
                <LazyLoadImage
                  src="/assets\images\shapes\shape-04-01.png"
                  alt="Shape Thumb"
                  height="116px"
                  width="87px"
                />
              </span>
            </div>
            <div className="shape-image shape-image-2">
              <LazyLoadImage
                src="assets\images\shapes\shape-02-08.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
            <div className="shape-image shape-image-3">
              <LazyLoadImage
                src="assets\images\shapes\shape-15.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>

      <Testimonial />

      <ELearningFaq />
      <LetUsHelp />
    </>
  );
}

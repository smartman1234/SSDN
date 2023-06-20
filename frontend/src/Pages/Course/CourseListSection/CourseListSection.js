import React, { useState, useEffect } from "react";
import CourseService from "../../../Services/CourseService/CourseService";
import ReactPaginate from "react-paginate";

const CourseCategoryList = React.lazy(() => import("./CourseCategoryList"));

const CourseListCard = React.lazy(() => import("./CourseListCard"));

export default function CourseListSection({
  params,
  gettingMainCategoryData,
  searchdata,
}) {
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [childId, setChildid] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [childCourseCategoryList, setChildCourseCategoryList] = useState({});
  const [category, setCategory] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 5,
    searchTxt: "",
    searchField: "",
  });
  const [categorySearch, setCategorySearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const courseServe = new CourseService();

  const gettingChildCategoryId = (id) => {
    sessionStorage.getItem("checkedId");
    setChildid(id);
  };

  useEffect(() => {
    const id = sessionStorage.getItem("checkedId");
    setChildid(id);
  }, [childId]);

  const apiCall = async (activity) => {
    try {
      let response = await courseServe.courseList(activity);
      if (response.status === "success") {
        setTotalPages(response.count / 5);
        setTotalCount(response.count);
        setCourseList(response.data);
        gettingMainCategoryData(response.main_category);
      }
    } catch (err) {
      throw err;
    }
  };

  const CourseListApi = async () => {
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
      query: searchdata?.searchTxt,
      category_slug: params,
      child_category_id: childId,
    };
    await apiCall(activity);
  };

  const courseCategoryList = async () => {
    let activity = {
      limit: categorySearch?.perPage,
      offset: categorySearch?.start,
      query: categorySearch?.searchTxt,
      category_id: 0,
    };
    try {
      let response = await courseServe.categorylist(activity);
      if (response) {
        setCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    CourseListApi();
  }, [params, childId]);

  useEffect(() => {
    CourseListApi();
  }, [searchdata]);

  useEffect(() => {
    courseCategoryList();
    return () => {
      sessionStorage.removeItem("checkedId");
    };
  }, []);

  const handlePageClick = async (data) => {
    window.scroll(0, 0);
    let currentPage = data.selected * search?.perPage;
    setOffset(currentPage);
    let activity = {
      category_slug: params,
      limit: search?.perPage,
      offset: currentPage,
      query: searchdata?.searchTxt,
    };
    await apiCall(activity);
  };

  return (
    <div>
      <div className="row mt--20">
        <React.Suspense fallback="">
          <CourseCategoryList
            category={category}
            courseCategoryList={courseCategoryList}
            search={search}
            setChildCourseCategoryList={setChildCourseCategoryList}
            childCourseCategoryList={childCourseCategoryList}
            params={params}
            gettingChildCategoryId={gettingChildCategoryId}
          />
        </React.Suspense>

        <div className="col-lg-9">
        <React.Suspense fallback="">
        <CourseListCard courseList={courseList} />
        </React.Suspense>
         
        </div>
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
            containerClassName={
              "edu-pagination justify-content-center"
            }
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}

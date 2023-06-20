import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryService from "../../Services/CategoryService";
export default function ExploreAssessmentCategory() {
  const navigate = useNavigate()
  const Serve = new CategoryService();
  const categoryServe = new CategoryService();
  const [category, setCategory] = useState([]);


  const courseCategoryList = async () => {
    try {
      let response = await Serve.categoryList(0);
      if (response) {
        setCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    courseCategoryList(); 
  }, []);
  const selectCategoryListHandle = async (categoryId, slug) => {
    try {
      let response = await categoryServe.categoryList(categoryId);
      if (response.status === "success") {
        localStorage.setItem(
          "categorymetatitle",
          response.main_category?.meta_title
        );
        localStorage.setItem(
          "categorymetakeyword",
          response.main_category?.meta_keyword
        );
        localStorage.setItem(
          "categorymetadescription",
          response.main_category?.meta_description
        );
        localStorage.setItem(
          "categorymetabreadcrumb",
          response.main_category?.breadcrumb
        );
        navigate(`/assessment/${slug}`);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <ul className="submenu data-menu">
      {category?.length > 0 &&
        category.map((v, i) => (
          <li className="service-card service-card-5" key={i}>
            <Link to={`assessment/${v.slug}`} className="p-0 border-0">
              <h6
                className="title"
                key={i}
                onClick={() => {
                  sessionStorage.setItem("assessmentheading", v.heading);
                  sessionStorage.setItem("assessmentslug", v.slug);
                  selectCategoryListHandle(v.id, v.slug);
                }}
              >
                {v.name}
              </h6>

              <p className="description">
                {v.assessment_count} Assessment
                {v.assessment_count > 1 ? "s" : ""}
              </p>
            </Link>
          </li>
        ))}
    </ul>
  );
}

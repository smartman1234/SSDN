import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ELearningService from "../../Services/ELearningService/ELearningService";
export default function ExploreELearningCategory() {
  const elearning = new ELearningService();
  const [category, setCategory] = useState([]);


  const ELearningCategoryApi = async () => {
    try {
      let response = await elearning.categoryList();
      if (response) {
        setCategory(response.data);
      }
    } catch (err) { 
      throw err;
    }
  };

  useEffect(() => {
    ELearningCategoryApi();
  }, []);
  return (
    <ul className="submenu data-menu">
      {category?.length > 0 && category.map((v, i) => (
        <li className="service-card service-card-5" key={i}>
          <Link
            to="/e-learning"
            className="p-0 border-0"
            onClick={() => {
              sessionStorage.setItem("elearningslug", v.slug);

            }}
          >
            <h6 className="title" key={i}>
              {v.name}
            </h6>

            <p className="description">
              {v.e_course_count} Course{v.e_course_count > 1 ? "s" : ""}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

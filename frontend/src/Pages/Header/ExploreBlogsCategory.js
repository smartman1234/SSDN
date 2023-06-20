import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ExploreBlogsCategory() {
  const [category, setCategory] = useState([]);

  const CategoryList = async () => {
    axios
      .get(
        "https://www.ssdntech.com/blog/wp-json/wp/v2/categories?page=1&per_page=100"
      )
      .then((response) => {
        setCategory(response.data); 
      });
  };

  useEffect(() => {
    CategoryList();
  }, []);

  return (
    <ul className="submenu data-menu">
      {category?.length > 0 &&
        category.map((v, i) => (
          <li className="service-card service-card-5" key={i}>
            <Link to={`blog/category/${v.slug}`} className="p-0 border-0">
              <h6
                className="title"
                key={i}
                onClick={() => {
                  localStorage.setItem("blogcategoryname", v.name);
                  localStorage.setItem("blogcategoryid", v.id);
                }}
              >
                {v.name}
              </h6>

              <p className="description">
                {v.count} Blog
                {v.count > 1 ? "s" : ""}
              </p></Link>
          </li>
        ))}
    </ul>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function BlogsCategoryList({
  category,
  BlogListApi,
  gettingcategoryid,
}) {
  return (
      <aside className="edu-course-sidebar">
        <div className="edu-course-widget widget-category">
            <h5 className="widget-title">Categories</h5>   
            <div className="content course-category-scroll">
              {category.length > 0 &&
                category.map((v, i) => (
                  <div
                    className="service-card service-card-5 course-class-warpper-inner"
                    key={i}
                  >
                    <div className="content" onClick={() => {}}>
                      <h6
                        className="title"
                        onClick={() => {
                          localStorage.setItem("blogcategoryid", v.id);
                          localStorage.setItem("blogcategoryname", v.name);
                          BlogListApi();
                          gettingcategoryid(v.id);
                        }}
                      >
                        <Link to={`/blog/category/${v.slug}`}>{v.name}</Link>
                      </h6>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </aside>  
  );
}

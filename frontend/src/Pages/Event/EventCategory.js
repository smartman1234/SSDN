import React from "react";
import { Link } from "react-router-dom";

export default function EventCategory({ gettingCourseid, category }) {
  return (
    <div className="col-lg-3">
      <aside className="edu-blog-sidebar card mt--0">
        <div className="edu-blog-widget-2 widget-categories card-body">
          <div className="inner">
            <h5 className="widget-title">Categories</h5>
            <div className="content">
              <ul className="category-list">
                {category?.length > 0 &&
                  category.map((v, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        sessionStorage.setItem("eventcategoryslug",v.slug)
                        gettingCourseid(v.slug);
                      }}
                    >
                      <Link to="#">
                        {v.name} <span>({v.events_count})</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

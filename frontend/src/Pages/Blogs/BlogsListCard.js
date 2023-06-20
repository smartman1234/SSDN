import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function BlogsListCard({ blogList, loading }) {
  return (
    <>
      <ul className="all-courses-liststyle">
        {loading ? (
          <div className="loaders"></div>
        ) : blogList.length > 0 ? (
          blogList.map((v, i) => (
            <li className="filter" key={i}>
              <div className="list-style-wrapper">
                <div
                  className="course-image-wrapper"
                  onClick={() => {
                    localStorage.setItem("relatedblog", v?.categories?.[0]);
                  }}
                >
                  <Link to={`/blog/${v.slug}`}>
                    <LazyLoadImage
                      src={v.yoast_head_json?.og_image?.[0]?.url}
                      alt="Full Stack Web Developer – MEAN Stack"
                      height="100%"
                      width="100%"
                    />
                  </Link>
                </div>
                <div className="course-detail-wrapper">
                  <div className="row ">
                    <div className="col-md-12">
                      <Link
                        to={`/blog/${v.slug}`}
                        onClick={() => {
                          localStorage.setItem("blogid", v.id);
                        }}
                        className="mb-1 list-style-course-name"
                      >
                          {v.title?.rendered}
                      </Link>
                      <div className="d-none d-xl-block">
                        <p
                          className="cat-key-skills ssdn-editor-font"
                          dangerouslySetInnerHTML={{
                            __html: v.excerpt?.rendered,
                          }}
                        />
                      </div>
                      <div className="course-detail-wrap">
                        <span className="collabaration-image">
                          <em> By SSDN Technologies</em>
                        </span>
                        <span className="collabaration-image">
                          {
                            v?.yoast_head_json?.schema?.["@graph"]?.[0]
                              ?.articleSection?.[0]
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No Data Available !</p>
        )}
      </ul>
    </>
  );
}

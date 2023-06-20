import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function RelatedBlogs() {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    BlogListApi();
  }, []);
  const BlogListApi = () => {
    axios
      .get(
        `http://blogs.ssdnemail.com/wp-json/wp/v2/posts?categories=${localStorage.getItem("relatedblog")}&page=1&per_page=2`
      )
      .then((response) => {
        setBlogList(response.data);
      });
  };

  const dated = (time) => {
    let d = time?.split("T");
     return d[0];
  };
  return (
    <>
      {" "}
      
      <aside className="edu-blog-sidebar mt--20">
      {blogList.length > 0 && (
        <div className="edu-blog-widget">
          <div className="inner">
            <h5 className="widget-title">You May Also Like</h5>
            <div className="content latest-post-list">
              {blogList.map((v, i) => (
                <div className="latest-post section-data" key={i}>
                  <div className="thumbnail">
                    <Link to={`/blog/${v.slug}`}>
                       <LazyLoadImage
                        src={v.yoast_head_json?.og_image?.[0]?.url}
                        alt="Blog Images"
                        height="100%"
                        width="100%"
                      />
                    </Link>
                  </div>
                  <div className="post-content">
                    <ul className="blog-meta">
                      <li>{dated(v?.date)}</li>
                    </ul>
                    <h6 className="title leading-tight1">
                      <Link to={`/blog/${v.slug}`}>{v?.title?.rendered}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </aside>
    </>
  );
}

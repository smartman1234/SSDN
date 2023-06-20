import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogsCategoryList from "./BlogsCategoryList";
import { CartContext } from "../../Container/Context";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const BlogComment = React.lazy(() => import("./BlogComment"));

const BlogEnquiryForm = React.lazy(() => import("./BlogEnquiryForm"));

const RelatedBlogs = React.lazy(() => import("./RelatedBlogs"));

export default function BlogDetail() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const [category, setCategory] = useState([]);
  const [data, setdata] = useState({});
  const [comment, setComment] = useState({});
  const [categoryid, setcategoryId] = useState("");
  useEffect(() => {
    BlogListsApi();
    BlogCommentApi();
    CategoryList();
  }, []);
  const CategoryList = async () => {
    axios
      .get(
        "http://blogs.ssdnemail.com/wp-json/wp/v2/categories?page=1&per_page=100"
      )
      .then((response) => {
        setCategory(response.data);
      });
  };
  const BlogListsApi = () => {
    axios
      .get(
        `http://blogs.ssdnemail.com/wp-json/wp/v2/posts/${localStorage.getItem(
          "blogid"
        )}`
      )
      .then((response) => {
        localStorage.setItem("relatedblog", response.data?.categories?.[0]);
        setcategoryId(response.data?.categories?.[0]);
        setdata(response.data);
      });
  };
  const BlogCommentApi = () => {
    axios
      .get(
        `http://blogs.ssdnemail.com/wp-json/wp/v2/comments?post=${localStorage.getItem(
          "blogid"
        )}`
      )
      .then((response) => {
        setComment(response.data);
      });
  };

  const dated = (time) => {
    let d = time?.split("T");
    return d?.[0];
  };

  return (
    <>
      <div
        className="edu-breadcrumb-area breadcrumb-style-1 bg-image"
        style={{
          backgroundImage: `url(${banner?.image_url + banner?.logo}) `,
        }}
      >
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <div className="page-title">
                  <h3 className="title">{data?.title?.rendered}</h3>
                </div>
                <nav className="edu-breadcrumb-nav">
                  <ol className="edu-breadcrumb d-flex justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="separator">
                      <i className="ri-arrow-drop-right-line"></i>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link to={`/blog/category/${data.slug}`}>Blogs</Link>
                    </li>
                    <li className="separator">
                      <i className="ri-arrow-drop-right-line"></i>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="/blogs">{data?.title?.rendered}</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="edu-event-grid-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <BlogsCategoryList category={category} />
              <React.Suspense fallback="">
                <RelatedBlogs  />
              </React.Suspense>

              <React.Suspense fallback="">
              <BlogEnquiryForm />
              </React.Suspense>

            
            </div>
            <div className="col-lg-9">
              <div className="blog-details-1 style-variation2 card mt--0">
                <div className="content-blog-top card-body">
                  <div className="thumbnail">
                     <LazyLoadImage
                      className="radius-small w-100 mb--30"
                      src={data?.yoast_head_json?.og_image?.[0]?.url}
                      alt="Blog Images"
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <ul className="blog-meta">
                    <li>Author : {data?.yoast_head_json?.author}</li>
                    <li>
                      <i className="ri-calendar-2-line me-2"></i>
                      {dated(data?.date)}
                    </li>
                    <li>
                      <i className="ri-discuss-line me-2"></i>
                      {comment?.length} Comment{comment?.length > 1 ? "s" : ""}
                    </li>
                  </ul>
                  <h4 className="title">{data?.title?.rendered}</h4>

                  <div className="blog-main-content">
                    <p
                      className="ssdn-editor-font1"
                      dangerouslySetInnerHTML={{
                        __html: data?.content?.rendered,
                      }}
                    />
                  </div>
                </div>
                <React.Suspense fallback="">
                  <BlogComment comment={comment} />
                </React.Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../Container/Context";
import UserService from "../../Services/UserService";
import ReactPaginate from "react-paginate";
import { Formik } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchEnquiry = React.lazy(() => import("./SearchEnquiry"));

export default function Search() {
  const navigate = useNavigate();
  const param = useParams();
  const [type, setType] = useState("all");
  const [count, setCount] = useState("");
  const [searchedKeyword, setSearchedKeyboard] = useState("");
  const [searcheditems, setSearchedItems] = useState([]);
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const serve = new UserService();
  const [values, setValues] = useState({
    searched: "",
  });

  useEffect(() => {
    setSearchedKeyboard(localStorage.getItem("searchedkeyword"));
    setType(localStorage.getItem("searchtype"));
    setCount(localStorage.getItem("searchdataCount"));
    setSearchedItems(JSON.parse(localStorage.getItem("searchedData") || "[]"));
  }, []);

  useEffect(() => {
    SearchData(param.id, localStorage.getItem("searchtype"));
  }, [type]);
  const SearchData = async (id, type) => {
    try {
      let response = await serve.searchdata(id, type);
      if (response) {
        localStorage.setItem("searchedData", JSON.stringify(response.data));
        setSearchedItems(response.data);
        setCount(response.count);
        setCount(localStorage.setItem("searchdataCount", response.count));
        navigate(`/search/${id}`);
      }
    } catch (err) {
      throw err;
    }
  };

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 5;
  const currentItems =
    searcheditems?.length > 0 && searcheditems?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(searcheditems?.length / 5);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % searcheditems.length;

    setItemOffset(newOffset);
  };

  const onSubmit = async (values) => {
    SearchData(values.searched, localStorage.getItem("searchtype"));
  };
  const onKeyDow = (e) => {
    if (e.keyCode === 13) {
      setSearchedKeyboard(e.target.value);
      localStorage.setItem("searchedkeyword", e.target.value);
      SearchData(e.target.value, localStorage.getItem("searchtype"));
    }
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
                <Formik
                  initialValues={values}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <div className="row">
                        <div className="col-lg-10">
                          <div className="form-group">
                            <input
                              type="text"
                              onChange={(e) => {
                                props.setFieldValue("searched", e.target.value);
                              }}
                              onKeyDown={(e) => onKeyDow(e)}
                              className="form-control ssdn-input"
                              name="searched"
                              placeholder="Search here..."
                            />
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="form-group">
                            <button
                              type="search"
                              className="edu-btn btn-medium left-icon header-button selft button"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-three-about edu-about-area about-style-4 bg-color-white edu-section-gap">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h3 className="title">
                  {localStorage.getItem("searchdataCount")} Results found for{" "}
                  {searchedKeyword || param.id}
                </h3>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row mt-4">
                <div className="col-lg-4">
                  <aside className="edu-course-sidebar">
                    <div className="edu-course-widget widget-category">
                      <React.Suspense fallback="">
                        <SearchEnquiry />
                      </React.Suspense>
                    </div>
                  </aside>
                </div>

                <div className="col-lg-8 course-details-content">
                  <ul
                    className="edu-course-tab nav nav-tabs justify-content-center"
                  >
                    <li className="nav-item mb--10">
                      <button
                        className={
                          type === "all" ? "nav-link active" : "nav-link"
                        }
                        type="button"
                        onClick={() => {
                          localStorage.setItem("searchtype", "all");
                          setType("all");
                        }}
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item mb--10">
                      <button
                        className={
                          type === "course" ? "nav-link active" : "nav-link"
                        }
                        type="button"
                        onClick={() => {
                          localStorage.setItem("searchtype", "course");
                          setType("course");
                        }}
                      >
                        Course
                      </button>
                    </li>
                    <li className="nav-item mb--10">
                      <button
                        className={
                          type === "e-learning" ? "nav-link active" : "nav-link"
                        }
                        type="button"
                        onClick={() => {
                          localStorage.setItem("searchtype", "e-learning");
                          setType("e-learning");
                        }}
                      >
                        E-Learning
                      </button>
                    </li>
                    <li className="nav-item mb--10">
                      <button
                        className={
                          type === "voucher" ? "nav-link active" : "nav-link"
                        }
                        type="button"
                        onClick={() => {
                          localStorage.setItem("searchtype", "voucher");
                          setType("voucher");
                        }}
                      >
                        Voucher
                      </button>
                    </li>
                    <li className="nav-item mb--10">
                      <button
                        className={
                          type === "assessment" ? "nav-link active" : "nav-link"
                        }
                        type="button"
                        onClick={() => {
                          localStorage.setItem("searchtype", "assessment");
                          setType("assessment");
                        }}
                      >
                        Assessment
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className={"tab-pane fade show active"}
                    >
                      <h4></h4>
                      <ul className="all-courses-liststyle">
                        {searcheditems.length > 0 ? (
                          searcheditems.map((v, i) => (
                            <li className="filter" key={i}>
                              <div className="list-style-wrapper">

                                <span className="badge badge-pill">
                                  {v.type}
                                </span>
                                <div className="course-image-wrapper">
                                  {v.type === "Course" && (
                                    <Link
                                      to={`/${v?.category?.slug
                                        }/${v.slug.replaceAll(
                                          "-{{in-varcity}}",
                                          ""
                                        )}`}
                                    >
                                      {v.media_type === "image" && (
                                        <LazyLoadImage
                                          src={v.media}
                                          alt="Full Stack Web Developer – MEAN Stack"
                                          height="100%"
                                          width="100%"
                                        />
                                      )}
                                      {v.media_type === "video" && (
                                        <LazyLoadImage
                                          src={v.thumb_image}
                                          alt="Full Stack Web Developer – MEAN Stack"
                                          height="100%"
                                          width="100%"
                                        />
                                      )}
                                    </Link>
                                  )}
                                  {v.type === "Assessment" && (
                                    <Link
                                      to={`/assessment/${v?.category?.slug}/${v.slug}`}
                                    >
                                      <LazyLoadImage
                                        src={v.image}
                                        alt="Full Stack Web Developer – MEAN Stack"
                                        height="100%"
                                        width="100%"
                                      />
                                    </Link>
                                  )}
                                  {v.type === "Voucher" && (
                                    <Link
                                      to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                                    >
                                      <LazyLoadImage
                                        src={v.logo}
                                        alt={v.logo_alt_tag}
                                        height="100%"
                                        width="100%"
                                      />
                                    </Link>
                                  )}
                                  {v.type === "E-learning" && (
                                    <Link to={`/e-learning/${v.slug}`}>
                                      {v.media_type === "image" && (
                                        <LazyLoadImage
                                          src={v.media}
                                          alt="Full Stack Web Developer – MEAN Stack"
                                          height="100%"
                                          width="100%"
                                        />
                                      )}
                                      {v.media_type === "video" && (
                                        <LazyLoadImage
                                          src={v.thumb_image}
                                          height="100%"
                                          width="100%"
                                          alt="Full Stack Web Developer – MEAN Stack"
                                        />
                                      )}
                                    </Link>
                                  )}
                                </div>
                                <div className="course-detail-wrapper">
                                  <div className="row align-items-center">
                                    <div className="col-md-8">
                                      <div className="list-style-detailwrapper">
                                        {v.type === "Course" && (
                                          <Link
                                            to={`/${v?.category?.slug
                                              }/${v.slug.replaceAll(
                                                "-{{in-varcity}}",
                                                ""
                                              )}`}
                                          >
                                            <h3 className="mb-1 list-style-course-name">
                                              {v.name.replaceAll(
                                                "{{in VARCITY}}",
                                                ""
                                              )}
                                            </h3>
                                          </Link>
                                        )}
                                        {v.type === "Assessment" && (
                                          <Link
                                            to={`/assessment/${v?.category?.slug}/${v.slug}`}
                                          >
                                            <h3 className="mb-1 list-style-course-name">
                                              {v.name}
                                            </h3>
                                          </Link>
                                        )}
                                        {v.type === "Voucher" && (
                                          <Link
                                            to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                                          >
                                            <h3 className="mb-1 list-style-course-name">
                                              {v.name}
                                            </h3>
                                          </Link>
                                        )}
                                        {v.type === "E-learning" && (
                                          <Link to={`/e-learning/${v.slug}`}>
                                            <h3 className="mb-1 list-style-course-name">
                                              {v.name}
                                            </h3>
                                          </Link>
                                        )}
                                        <div className="d-none d-lg-block">
                                          <p
                                            className="cat-key-skills ssdn-editor-font leading-tight2"
                                            dangerouslySetInnerHTML={{
                                              __html: v.overview,
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="list-style-detailwrapper">
                                        <div className="course-detail-wrap">
                                          <span className="collabaration-image">
                                            {v.category?.name}
                                          </span>
                                          {v.type === "Assessment" && (
                                            <>
                                              {" "}
                                              {Math.round(v.average_review) ==
                                                5 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                4 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                3 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                2 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                1 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                0 && (
                                                  <div className="rating">
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {v.feedback_count} out of 5
                                            </>
                                          )}
                                          {v.type === "Course" && (
                                            <>
                                              {" "}
                                              {Math.round(v.average_review) ==
                                                5 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                4 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                3 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                2 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                1 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                0 && (
                                                  <div className="rating">
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {v.review_count} out of 5
                                            </>
                                          )}
                                          {v.type === "E-learning" && (
                                            <>
                                              {" "}
                                              {Math.round(v.average_review) ==
                                                5 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                4 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                3 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                2 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                1 && (
                                                  <div className="rating">
                                                    <i className="icon-Star"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {Math.round(v.average_review) ==
                                                0 && (
                                                  <div className="rating">
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                    <i className="icon-Star off"></i>
                                                  </div>
                                                )}
                                              {v.review_count} out of 5
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4 ssdn-line">
                                      <div className="list-style-value-wrapper">
                                        <p className="m-0 text-center d-xl-block cat-list-btn-wrap">
                                          {v.type === "Course" && (
                                            <Link
                                              to={`/${v?.category?.slug
                                                }/${v.slug.replaceAll(
                                                  "-{{in-varcity}}",
                                                  ""
                                                )}`}
                                              className="list-style-view-btn"
                                            >
                                              View Details
                                            </Link>
                                          )}
                                          {v.type === "Assessment" && (
                                            <Link
                                              to={`/assessment/${v?.category?.slug}/${v.slug}`}
                                              className="list-style-view-btn"
                                            >
                                              View Details
                                            </Link>
                                          )}
                                          {v.type === "Voucher" && (
                                            <Link
                                              to={`/vouchers/${v?.category?.slug}/${v.slug}`}
                                              className="list-style-view-btn"
                                            >
                                              View Details
                                            </Link>
                                          )}
                                          {v.type === "E-learning" && (
                                            <Link
                                              to={`/e-learning/${v.slug}`}
                                              className="list-style-view-btn"
                                            >
                                              View Details
                                            </Link>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p className="text-center">
                            No E-Learning Course Found
                          </p>
                        )}
                      </ul>{" "}
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={pageCount}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

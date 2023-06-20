import React, { useEffect, useState, useContext } from "react";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import ReactPaginate from "react-paginate";
import EventService from "../../Services/EventService/EventService";
import EventCategory from "./EventCategory";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";
import SEO from "../SEO/SEO";

const RecentEvents = React.lazy(() => import("./RecentEvents"));
const PastEvents = React.lazy(() => import("./PastEvents"));

export default function EventAll() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const serve = new EventService();
  const [category, setCategory] = useState([]);
  const [recentEventList, setRecentEventList] = useState([]);
  const [pastEventList, setpastEventList] = useState([]);
  const [mainCategory, setMainCategory] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [pastSearch, setPastSearch] = useState({
    start: 0,
    perPage: 2,
  });
  const [recentSearch, setRecentSearch] = useState({
    start: 0,
    perPage: 2,
  });
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pasttotalpages, setpasttotalpages] = useState(0);

  useEffect(() => {
    setCategoryId(sessionStorage.getItem("eventcategoryslug"));
    window.scroll(0, 0);
    CategoryListApi();
    return () => {
      sessionStorage.removeItem("eventcategoryslug");
    };
  }, []);

  useEffect(() => {
    RecentEventsApi();
    PastEventsApi();
  }, [categoryId]);

  const CategoryListApi = async () => {
    try {
      let response = await serve.eventcategory();
      if (response) {
        setCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const apiCallForRecent = async (activity) => {
    try {
      let response = await serve.eventlist(activity);
      if (response) {
        setRecentEventList(response.data);
        setMainCategory(response.data?.main_category);
        setTotalPages(response.count / 2);
      }
    } catch (err) {
      throw err;
    }
  };
  const RecentEventsApi = async () => {
    let activity = {
      limit: recentSearch.perPage,
      offset: recentSearch.start,
      type: "recent",
      category_slug: categoryId,
    };
    await apiCallForRecent(activity);
  };
  const apiCallFotPast = async (activity) => {
    try {
      let response = await serve.eventlist(activity);
      if (response) {
        setpastEventList(response.data);
        setpasttotalpages(response.count / 2);
      }
    } catch (err) {
      throw err;
    }
  };

  const PastEventsApi = async () => {
    let activity = {
      limit: pastSearch.perPage,
      offset: pastSearch.start,
      type: "past",
      category_slug: categoryId,
    };
    await apiCallFotPast(activity);
  };

  const PastPageClick = async (data) => {
    let currentPage = data.selected * pastSearch.perPage;
    setOffset(currentPage);
    let activity = {
      limit: pastSearch.perPage,
      offset: currentPage,
      type: "past",
      category_slug: categoryId,
    };
    await apiCallFotPast(activity);
  };
  const handlePageClick = async (data) => {
    const currentPage = data.selected * recentSearch.perPage;
    setOffset(currentPage);
    let activity = {
      limit: recentSearch.perPage,
      offset: currentPage,
      type: "recent",
      category_slug: categoryId,
    };
    await apiCallForRecent(activity);
  };
  const gettingCourseid = (id) => {
    setCategoryId(id);
  };

  return (
    <>
      <SEO
        meta_title={mainCategory?.meta_title}
        meta_description={mainCategory?.meta_description}
        meta_keyword={mainCategory?.meta_keyword}
        breacrumb={mainCategory?.breadcrumb}
      />
        <HeadingName name="Event" home="Home" heading="Event" />
        
      <div className="edu-event-grid-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <EventCategory
              gettingCourseid={gettingCourseid}
              category={category}
            />
            <div className="col-md-9">
              <div className="row mb--30">
                <div className="col-lg-12">
                  <div className="section-title text-center">
                    <h3 className="title">Recently Events</h3>
                  </div>
                </div>
              </div>
              {recentEventList?.length > 0 ? (
                <>
                  <React.Suspense fallback="Loading...">
                    <RecentEvents recentEventList={recentEventList} />
                  </React.Suspense>

                  <div className=" mt--20">
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
                </>
              ) : (
                ""
              )}

              {pastEventList?.length > 0 ? (
                <>
                  {" "}
                  <div className="meter mt--50">
                    <span style={{ width: "100%" }}>
                      <span className="progress"></span>
                    </span>
                  </div>{" "}
                  <div className="row mb--30 mt--50">
                    <div className="col-lg-12">
                      <div className="section-title text-center">
                        <h3 className="title">Our Past Events</h3>
                      </div>
                    </div>
                  </div>
                  <React.Suspense fallback="Loading...">
                  <PastEvents pastEventList={pastEventList} />
                  </React.Suspense>
                
                  <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={pasttotalpages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={PastPageClick}
                    containerClassName={
                      "edu-pagination justify-content-center"
                    }
                    activeClassName={"active"}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <LetUsHelp />
    </>
  );
}

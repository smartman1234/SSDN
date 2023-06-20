import React from "react";
import BlogsCategoryList from "./BlogsCategoryList";
import ReactPaginate from "react-paginate";

const BlogsListCard = React.lazy(() => import("./BlogsListCard"));
const BlogEnquiryForm = React.lazy(() => import("./BlogEnquiryForm"));

export default function BlogData({
  blogList,
  loading,
  category,
  BlogListApi,
  gettingcategoryid,
  search,
  setSearch,
  totalPages,
}) {
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    setSearch({
      ...search,
      start: currentPage,
      category: localStorage.getItem("blogcategoryid"),
    });
  };
  return (
    <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white">
      <div className="container eduvibe-animated-shape">
        <div className="row mt--20">
          <div className="col-md-3 mb--20">
            <BlogsCategoryList
              category={category}
              BlogListApi={BlogListApi}
              gettingcategoryid={gettingcategoryid}
            />
            <React.Suspense fallback="">
              <BlogEnquiryForm />
            </React.Suspense>
          </div>
          <div className="col-lg-9">
            {loading ? (
              <div id="loader"></div>
            ) : (
              <React.Suspense fallback="">
                <BlogsListCard blogList={blogList} />
              </React.Suspense>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mt--20">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"edu-pagination justify-content-center"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

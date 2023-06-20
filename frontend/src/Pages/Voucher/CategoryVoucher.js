import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadingName from "../HeadingName/HeadingName";
import CategoryService from "../../Services/CategoryService";
import VoucherService from "../../Services/VoucherService/VoucherService";
import SEO from "../SEO/SEO";

const VoucherCard = React.lazy(() => import("./VoucherCard"));
const VoucherCategory = React.lazy(() => import("./VoucherCategory"));

export default function CategoryVoucher() {
  const navigate = useNavigate();
  const voucherServe = new VoucherService();
  const CategoryServer = new CategoryService();
  const [voucherList, setVoucherList] = useState([]);
  const [childId, setChildid] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [ChildcategoryList, SetChildcategoryList] = useState([]);
  const [active, setActive] = useState({});
  const [mixCat, setMixCat] = useState({});
  const [checked, setChecked] = useState([]);
  const [meta, setMeta] = useState({});
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  const GetChildCategory = async (id, slug, i, heading, name) => {
    sessionStorage.removeItem("vouchercategoryid");
    sessionStorage.removeItem("vouchercategoryslug");
    sessionStorage.removeItem("vouchercategorykey");
    sessionStorage.setItem("categoryvoucherslug", slug);
    sessionStorage.setItem("categoryvoucherkey", i);
    sessionStorage.setItem("voucherheading", heading);
    sessionStorage.setItem("vouchername", name);
    setSearch({ ...search, searchTxt: "" });
    if (id !== sessionStorage.getItem("categoryvoucherid")) {
      sessionStorage.removeItem("checkedId");
      sessionStorage.removeItem("categoryvoucherid");
      setChecked([]);
    }

    setActive({ [i]: true });
    SetChildcategoryList([]);
    try {
      let response = await CategoryServer.vouchercategoryList(id);
      if (response.status === "success") {
        setMeta(response.main_category);

        SetChildcategoryList(response.data);
        sessionStorage.setItem("categoryvoucherid", id);
        navigate(`/vouchers/${slug}`);
      }
    } catch (err) {
      throw err;
    }
  };

  const SetChildCat = async (e, id) => {
    let preSetMixCat;

    if (e.target.checked) {
      let mergecat = [...checked, id];

      setChecked(mergecat);
      sessionStorage.setItem("checkedId", mergecat.join());
    } else {
      preSetMixCat = checked.filter((v) => v != id);
      setChecked(preSetMixCat);
      sessionStorage.setItem("checkedId", preSetMixCat.join());
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let checkedcategory = sessionStorage.getItem("checkedId");
    checkedcategory = checkedcategory && checkedcategory.split(",");
    let arr =
      checkedcategory &&
      checkedcategory.map((v, i) => {
        return parseInt(v);
      });
    if (checkedcategory?.length) {
      setChecked(arr);
    }

    if (sessionStorage.getItem("vouchercategoryid")) {
      GetChildCategoryForfistTime(
        sessionStorage.getItem("vouchercategoryid"),
        sessionStorage.getItem("vouchercategoryslug"),
        sessionStorage.getItem("vouchercategorykey"),
        sessionStorage.getItem("voucherheading"),
        sessionStorage.getItem("vouchername")
      );
    } else {
      GetChildCategory(
        sessionStorage.getItem("categoryvoucherid"),
        sessionStorage.getItem("categoryvoucherslug"),
        sessionStorage.getItem("categoryvoucherkey"),
        sessionStorage.getItem("voucherheading"),
        sessionStorage.getItem("vouchername")
      );
    }
  }, []);

  useEffect(() => {
    VoucherListApi();
  }, [checked, search]);

  function searchVoucherList(e) {
    setSearch({ ...search, searchTxt: e.target.value, start: 0 });
  }

  const GetChildCategoryForfistTime = async (id, slug, i, heading, name) => {
    sessionStorage.removeItem("categoryvoucherid");
    sessionStorage.removeItem("categoryvoucherslug");
    sessionStorage.removeItem("categoryvoucherkey");
    sessionStorage.setItem("voucherheading", heading);
    sessionStorage.setItem("vouchername", name);
    setActive({ [i]: true });
    try {
      let response = await CategoryServer.vouchercategoryList(id);
      if (response.status === "success") {
        setMeta(response.main_category);

        SetChildcategoryList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const apiCall = async (activity) => {
    try {
      let response = await voucherServe.voucherList(activity);
      if (response) {
        setTotalPages(response.count / 12);
        setTotalCount(response.count);
        setVoucherList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const VoucherListApi = async () => {
    let checkedcategory = sessionStorage.getItem("checkedId");
    let activity = {
      limit: search.perPage,
      offset: search.start,
      category_slug: sessionStorage.getItem("vouchercategoryslug")
        ? sessionStorage.getItem("vouchercategoryslug")
        : sessionStorage.getItem("categoryvoucherslug"),
      voucher_child_category_id: checkedcategory,
      query: search?.searchTxt,
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search?.perPage;
    let checkedcategory = sessionStorage.getItem("checkedId");
    setOffset(currentPage);
    let activity = {
      category_slug: sessionStorage.getItem("vouchercategoryslug")
        ? sessionStorage.getItem("vouchercategoryslug")
        : sessionStorage.getItem("categoryvoucherslug"),
      voucher_child_category_id: checkedcategory,
      limit: search?.perPage,
      offset: currentPage,
      query: search?.searchTxt,
    };
    await apiCall(activity);
  };

  return (
    <>
      <SEO
        meta_title={meta?.meta_title}
        meta_description={meta?.meta_description}
        meta_keyword={meta?.meta_keyword}
        breacrumb={sessionStorage.getItem("categorymetabreadcrumb")}
      />
      <HeadingName name={sessionStorage.getItem("vouchername")} home="Home" heading={sessionStorage.getItem("vouchername")} />

      <div className="edu-course-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="edu-search-box-wrapper text-start">
                <div className="edu-search-box">
                  <form action="#">
                    <input
                      type="text"
                      value={search.searchTxt}
                      placeholder="Search voucher..."
                      onChange={(e) => searchVoucherList(e)}
                    />
                    <button className="search-button">
                      <i className="icon-search-line"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt--40">
          <React.Suspense fallback="">
          <VoucherCategory
              search={search}
              setSearch={setSearch}
              GetChildCategory={GetChildCategory}
              mixCat={mixCat}
              checked={checked}
              active={active}
              ChildcategoryList={ChildcategoryList}
              SetChildCat={SetChildCat}
            />
              </React.Suspense>
           
            <div className="col-lg-9">
              <React.Suspense fallback="">
                <VoucherCard
                  childId={childId}
                  name={name}
                  search={search}
                  categoryId={categoryId}
                  voucherList={voucherList}
                  handlePageClick={handlePageClick}
                  offset={offset}
                  totalCount={totalCount}
                  totalPages={totalPages}
                />
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

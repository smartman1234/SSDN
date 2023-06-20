import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaService from "../../Services/MetaServices/MetaService";

import VoucherService from "../../Services/VoucherService/VoucherService";
import HeadingName from "../HeadingName/HeadingName";
import SEO from "../SEO/SEO";

const VoucherCard = React.lazy(() => import("./VoucherCard"));

const VoucherCategory = React.lazy(() => import("./VoucherCategory"));

export default function Voucher() {
  const metaService = new MetaService();
  const voucherServe = new VoucherService();
  const navigate = useNavigate();
  const [voucherList, setVoucherList] = useState([]);
  const [childId, setChildid] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
  });
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getmetaData("voucher");
    VoucherListApi();
  }, []);
  useEffect(() => {
    VoucherListApi();
  }, [search]);

  function searchVoucherList(e) {
    setSearch({ ...search, searchTxt: e.target.value, start: 0 });
  }

  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("voucher");
      if (response.status === "success") {
        setMeta(response.data);
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
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search?.searchTxt,
    };
    await apiCall(activity);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search?.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search?.perPage,
      offset: currentPage,
      query: search?.searchTxt,
    };
    await apiCall(activity);
  };

  const GetChildCategory = async (id, slug, i, heading, name) => {
    sessionStorage.removeItem("categoryvoucherid");
    sessionStorage.removeItem("categoryvoucherslug");
    sessionStorage.removeItem("categoryvoucherkey");
    sessionStorage.setItem("vouchercategoryid", id);
    sessionStorage.setItem("vouchercategoryslug", slug);
    sessionStorage.setItem("vouchercategorykey", i);
    sessionStorage.setItem("voucherheading", heading);
    sessionStorage.setItem("vouchername", name);
    navigate(`/vouchers/${slug}`);
    setSearch({ ...search, searchTxt: "" });
  };

  return (
    <>
      <SEO
        meta_title={meta?.meta_title}
        meta_description={meta?.meta_description}
        meta_keyword={meta?.meta_keyword}
      />
      <HeadingName heading="Voucher" home="Home" name="voucher" />

      <div className="edu-course-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="edu-search-box-wrapper text-start">
                <div className="edu-search-box">
                  <form action="#">
                    <input
                      type="text"
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

          <React.Suspense fallback="Loading...">
          <VoucherCategory GetChildCategory={GetChildCategory} />
              </React.Suspense>
          
            <div className="col-lg-9">
              <React.Suspense fallback="Loading...">
                <VoucherCard
                  childId={childId}
                  name={name}
                  search={search}
                  categoryId={categoryId}
                  handlePageClick={handlePageClick}
                  offset={offset}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  voucherList={voucherList}
                />
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

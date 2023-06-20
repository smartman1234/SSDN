import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import SEO from "../SEO/SEO";
import MetaService from "../../Services/MetaServices/MetaService";
import axios from "axios";
import HeadingName from "../HeadingName/HeadingName";
import { CartContext } from "../../Container/Context";

const BlogData = React.lazy(() => import("./BlogData"));

export default function Blogs() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const params = useParams();
  const [category, setCategory] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const metaService = new MetaService();
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  const [search, setSearch] = useState({
    start: 1,
    perPage: 10,
    category: "",
    searchField: "",
  });
  const CategoryList = async () => {
    axios
      .get(
        "http://blogs.ssdnemail.com/wp-json/wp/v2/categories?page=1&per_page=100"
      )
      .then((response) => {
        setCategory(response.data);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    getmetaData("blogs");
    CategoryList();
    setSearch({
      ...search,
      category: localStorage.getItem("blogcategoryid"),
    });
    return () => {
      localStorage.removeItem("blogcategoryid");
      localStorage.removeItem("blogcategoryname");
    };
  }, []);
  const BlogListApi = () => {
    setLoading(true);
    if (localStorage.getItem("blogcategoryid")) {
      axios
        .get(
          `http://blogs.ssdnemail.com/wp-json/wp/v2/posts?categories=${localStorage.getItem(
            "blogcategoryid"
          )}&page=${search.start}&per_page=${search.perPage}`
        )
        .then((response) => {
          setBlogList(response.data);
          setLoading(false);
          setTotalPages(response.headers["x-wp-total"] / 10);
          setTotalCount(response.headers["x-wp-total"]);
        });
    } else {
      axios
        .get(
          `http://blogs.ssdnemail.com/wp-json/wp/v2/posts?page=${search.start}&per_page=${search.perPage}`
        )
        .then((response) => {
          setBlogList(response.data);
          setLoading(false);
          setTotalPages(response.headers["x-wp-total"] / 10);
          setTotalCount(response.headers["x-wp-total"]);
        });
    }
  };
  useEffect(() => {
    BlogListApi();
  }, [search, params.id]);
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("blogs");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  const gettingcategoryid = (id) => {
    setSearch({
      ...search,
      category: id,
    });
  };
  return (
    <>
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
        breacrumb={meta?.breadcrumb}
      />
      <HeadingName name={localStorage.getItem("blogcategoryname")
        ? localStorage.getItem("blogcategoryname")
        : "Blogs"} home="Home" heading={localStorage.getItem("blogcategoryname")
          ? localStorage.getItem("blogcategoryname")
          : "Blogs"} />
          
      <React.Suspense fallback="">
        <BlogData
          blogList={blogList}
          loading={loading}
          category={category}
          BlogListApi={BlogListApi}
          gettingcategoryid={gettingcategoryid}
          search={search}
          setSearch={setSearch}
          totalPages={totalPages}
        />
      </React.Suspense>


      <LetUsHelp />
    </>
  );
}

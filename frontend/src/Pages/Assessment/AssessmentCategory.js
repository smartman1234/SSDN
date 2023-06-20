import React, { useContext, useEffect, useState } from "react";
import CategoryService from "../../Services/CategoryService";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../Container/Context";

export default function AssessmentCategory({
  gettingChildCategoryId,
  categoryName,
  getCategoryListApiData,
  search,
  setSearch,
}) {
  const params = useParams();
  const navigate = useNavigate();
  const [categoryList, setcategoryList] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [mixCat, setMixCat] = useState({});
  const [active, setActive] = useState({});
  const [checked, setChecked] = useState([]);
  const category_id = sessionStorage.getItem("category_id");
  const checkedId = sessionStorage.getItem("checkedId");

  const categoryServe = new CategoryService();
  useEffect(() => {
    JSON.parse(localStorage.getItem("assessment"));
    AssessmentCategoryList(0);
    return () => {
      sessionStorage.removeItem("category_id");
    };
  }, []);

  useEffect(() => {
    if (category_id && categoryList && categoryList.length) {
      for (let catIndex = 0; catIndex < categoryList.length; catIndex++) {
        const getChildCatg = categoryList[catIndex];

        if (getChildCatg.id === parseInt(category_id)) {
          setActive({ [catIndex]: true });
          selectCategoryListHandle(category_id, getChildCatg.slug, catIndex);
        }
      }
    }
  }, [category_id, categoryList]);

  const AssessmentCategoryList = async (id) => {
    try {
      let response = await categoryServe.categoryList(id);
      setcategoryList(response.data);
    } catch (err) {
      throw err;
    }
  };

  const selectCategoryListHandle = async (categoryId, slug, id) => {
    if (categoryId !== category_id) {
      sessionStorage.removeItem("checkedId");
      sessionStorage.removeItem("category_id");
    }
    sessionStorage.setItem("category_id", categoryId);
    setMixCat({});
    setActive({ [id]: true });

    setChildCategory([]);
    try {
      let response = await categoryServe.categoryList(categoryId);
      if (response.status === "success") {
        localStorage.setItem(
          "categorymetatitle",
          response.main_category?.meta_title
        );
        localStorage.setItem(
          "categorymetakeyword",
          response.main_category?.meta_keyword
        );
        localStorage.setItem(
          "categorymetadescription",
          response.main_category?.meta_description
        );
        localStorage.setItem(
          "categorymetabreadcrumb",
          response.main_category?.breadcrumb
        );
        const splittedChildCat = checkedId?.split(",").map((v) => parseInt(v));
        if (splittedChildCat?.length) {
          setChecked(splittedChildCat);
          gettingChildCategoryId(checkedId);
        } else {
          gettingChildCategoryId();
          setChecked([]);
        }
        setChildCategory(response.data);
        getCategoryListApiData(response.main_category);
        navigate(`/assessment/${slug}`);
      }
    } catch (err) {
      throw err;
    }
  };

  const SetChildCat = async (e, id) => {
    let preSetMixCat;
    if (e.target.checked) {
      if (!checked.includes(id)) {
        preSetMixCat = [...checked, id];
        setChecked(preSetMixCat);
        sessionStorage.setItem("checkedId", preSetMixCat.join(","));
      }
    } else {
      preSetMixCat = checked.filter((v) => v != id);
      setChecked(preSetMixCat);
      sessionStorage.setItem("checkedId", preSetMixCat);
    }
    gettingChildCategoryId(preSetMixCat.join(","));
  };

  return (
    <>
      {" "}
      <div className="edu-course-widget widget-category mb--30 d-none d-md-block">
        <h5 className="widget-title">Categories</h5>
        <div className="content course-category-scroll">
          {categoryList?.map((v, i) => (
            <div
              className="edu-form-check"
              key={i}
              onClick={() => {
                categoryName(v?.heading, v?.slug, v?.description);
                setSearch({ ...search, searchTxt: "" });
              }}
            >
              <input
                type="radio"
                id={`categoryName${i}`}
                name="category"
                checked={v.slug === params.id}
                onChange={() => selectCategoryListHandle(v?.id, v?.slug, i)}
              />
              <label htmlFor={`categoryName${i}`}>{v?.name}</label>
              <div className="cat_list">
                {childCategory.length > 0 &&
                  active[i] &&
                  childCategory?.map((item_, key_) => (
                    <div className="edu-form-check" key={key_}>
                      <input
                        type="checkbox"
                        id={`check_box${key_}`}
                        name={`check_box${key_}`}
                        value={item_.id}
                        checked={checkedId?.includes(item_.id)}
                        onChange={(e) => SetChildCat(e, item_.id)}
                      />
                      <label htmlFor={`check_box${key_}`}>
                        {item_.name}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

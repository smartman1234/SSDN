import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../../Services/CourseService/CourseService";

export default function CourseCategoryList({
  gettingChildCategoryId,
  category,
  setChildCourseCategoryList,
  childCourseCategoryList,
  params,
}) {
  const navigate = useNavigate();
  const courseServe = new CourseService();
  const [mixCat, setMixCat] = useState({});
  const [checked, setChecked] = useState([]);
  const [active, setActive] = useState({});
  const category_id = sessionStorage.getItem("course_category_id");
  const checkedId = sessionStorage.getItem("checkedId");

  const courseCategoryData = async (data, index) => {
    navigate(`/${data.slug}`);
    sessionStorage.setItem("course_category_id", data.id);
    sessionStorage.setItem("categoryindex", index);
    setActive({ [index]: true });
    let activity = {
      category_id: data.id,
    };
    sessionStorage.removeItem("checkedId");
    setMixCat({});
    gettingChildCategoryId();
    try {
      let response = await courseServe.categorylist(activity);
      if (response.status === "success") {
        const splittedChildCat = checkedId?.split(",").map((v) => parseInt(v));

        setChildCourseCategoryList({ [index]: response.data });
        sessionStorage.setItem("childList", JSON.stringify(response.data));

      } else {
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

  useEffect(() => {
    const index = sessionStorage.getItem("categoryindex");
    setActive({ [index]: true });
    const childListdata = JSON.parse(sessionStorage.getItem("childList"));

    setChildCourseCategoryList({ [index]: childListdata });
  }, [category_id]);

  return (
    <div className="col-lg-3 mb-5">
      <aside className="edu-course-sidebar">
        <div className="edu-course-widget widget-category">
          <div className="inner">
            <h5 className="widget-title">Categories</h5>
            <div className="content course-category-scroll">
              {category?.map((v, i) => (
                <div className="edu-form-check" key={i}>
                  <input
                    type="radio"
                    id={`categoryName${i}`}
                    name="category"
                    checked={v.slug === params}
                    onChange={(e) => courseCategoryData(v, i)}
                  />
                  <label htmlFor={`categoryName${i}`}>{v?.name}</label>
                    <div className="cat_list">
                      {childCourseCategoryList?.[i]?.length > 0 &&
                        active[i] &&
                        childCourseCategoryList?.[i]?.map((item_, key_) => (
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
        </div>
      </aside>
    </div>
  );
}

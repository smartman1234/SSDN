
import React, { useEffect, useState } from "react";
import CategoryService from "../../Services/CategoryService";
import {  useParams } from "react-router-dom";

export default function VoucherCategory({

  GetChildCategory,
  SetChildCat,

  checked,
  active,
  ChildcategoryList,
}) {
  const param = useParams();
  const [categoryList, SetcategoryList] = useState([]);

  const CategoryServer = new CategoryService();

  useEffect(() => {
    VoucherCategorylist(0);
  }, []);

  const VoucherCategorylist = async (id) => {
    try {
      let response = await CategoryServer.vouchercategoryList(id);
      if (response.status === "success") {
        SetcategoryList(response.data);
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="col-lg-3 mb--30  d-none d-md-block">
        <aside className="edu-course-sidebar">
          <div className="edu-course-widget widget-category">
            <div className="inner">
              <h5 className="widget-title">Categories</h5>
              <div className="content course-category-scroll">
                {categoryList?.length > 0 &&
                  categoryList?.map((item, key) => (
                    <div className="edu-form-check" key={key}>
                      <input
                        type="radio"
                        id={"cat-check" + key}
                        name="main_cat"
                        value={item.id}
                        checked={item?.slug === param?.slug}
                        onChange={(e) =>
                          GetChildCategory(
                            item.id,
                            item.slug,
                            key,
                            item.heading,
                            item.name
                          )
                        }
                      />
                      <label htmlFor={"cat-check" + key}>{item.name}</label>
                        <div className="cat_list">
                          {active?.[key] &&
                            ChildcategoryList?.length > 0 &&
                            ChildcategoryList?.map((item_, key_) => (
                              <div className="edu-form-check" key={key_}>
                                <input
                                  type="checkbox"
                                  id={`check_box${key_}`}
                                  name={`check_box${key_}`}
                                  value={`${item_.slug}${item_.id}`}
                                  checked={checked?.includes(item_.id)}
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
    </>
  );
}

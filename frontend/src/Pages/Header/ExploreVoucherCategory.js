import React, { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import CategoryService from "../../Services/CategoryService";
export default function ExploreVoucherCategory() {
  const serve = new CategoryService();
  const [category, setCategory] = useState([]);


  const courseCategoryList = async () => {
    try {
      let response = await serve.vouchercategoryList(0);
      if (response) {
        setCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    courseCategoryList();
  }, []);
 
  return (
    <ul className="submenu data-menu">
      {category?.length > 0 &&
        category.map((v, i) => (
          <li className="service-card service-card-5" key={i}>
            <Link to={`/vouchers/${v.slug}`} className="p-0 border-0">
              <h6
                className="title"
                key={i}
                onClick={() => {
                  sessionStorage.removeItem("categoryvoucherid");
                  sessionStorage.removeItem("categoryvoucherslug");
                  sessionStorage.removeItem("categoryvoucherkey");
                  sessionStorage.removeItem("checkedId");
                  sessionStorage.setItem("voucherheading", v.heading);
                  sessionStorage.setItem("vouchername", v.slug);
                  sessionStorage.setItem("vouchercategorykey", i);
                  sessionStorage.setItem("vouchercategoryid", v.id);
                  sessionStorage.setItem("vouchercategoryslug", v.slug);
                }}
              >
                {v.name}
              </h6>

              <p className="description">
                {v.voucher_count} Voucher{v.voucher_count > 1 ? "s" : ""}
              </p></Link>
          </li>
        ))}
    </ul>
  );
}

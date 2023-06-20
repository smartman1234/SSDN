import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function DepartmentWise() {
  const url = process.env.REACT_APP_API_BASEURL;
  const [department, setDepartment] = useState([]);
  const GetContactData = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(`${url}web/contact-department`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setDepartment(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetContactData();
  }, []);
  return (
    <section className="git edu-section-gap" style={{ marginBottom: "100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title">Department Wise</h3>
            </div>
          </div>
          <div className="col-md-12">
            <div className="getintouchborder"></div>
            <div className="get-list">
              {department.length > 0 &&
                department.map((value, i) => (
                  <div className="get-list-item" key={i}>
                    <div className="item-image">
                      <LazyLoadImage
                        src="/assets/images/Admission.png"
                        alt="image"
                        height="100%"
                        width="100%"
                      />
                    </div>
                    <div className="get-data">
                      <strong>{value.name}</strong>
                      <a href={"mailto:" + value.email}>
                        <i className="ri-mail-open-line"></i> {value.email}
                      </a>
                      <a
                        href={
                          "tel:" + value.mobile_number.replaceAll("+91-", "")
                        }
                      >
                        <i className="ri-phone-fill"></i>
                        {value.mobile_number}
                      </a>
                      <a
                        href={
                          "https://wa.me/" +
                          value.whatsapp_number.replaceAll("+91-", "")
                        }
                      >
                        <i className="ri-whatsapp-line"></i>
                        {value.whatsapp_number}
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

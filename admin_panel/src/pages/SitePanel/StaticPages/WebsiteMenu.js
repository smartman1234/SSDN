import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function WebsiteMenu({ pageName, slug }) {
  const staticeService = new StaticpageService();
  const [values, setValues] = useState({
    page_name: "",
    page_slug: "",
    description: [{ title: "" }, { link: "" }],
  });
  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", pageName);
    formData.set("page_slug", slug);
    formData.set("description[menu]", JSON.stringify(values.description));

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "page/create-page-block",
        formData,
        config
      )
      .then((res) => {
        if (res.data?.status === "success") {
          toast.success("Record update successfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const ValidateSchema = Yup.object().shape({
    description: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
      })
    ),
  });

  useEffect(() => {
    getPageBlockData();
  }, [slug]);

  const getPageBlockData = async () => {
    try {
      let response = await staticeService.getDetails(slug);

      if (response.status === "success") {
        setValues({
          page_name: response.data.page_name,
          page_slug: response.data.page_slug,
          description: JSON.parse(response.data?.page_description?.menu||"[]"),
          title: response.data?.title,
          link: response.data.block_description,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
      >
        {(props) => (
          <form className="form theme-form" onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Page / Blocks <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="page_name"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={pageName}
                />
                {props.touched.page_name && props.errors.page_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.page_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="slug"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={slug}
                />
                {props.touched.slug && props.errors.slug ? (
                  <div className="formik-errors bg-error">
                    {props.errors.slug}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Explores</label>
                <hr />
              </div>{" "}
              <FieldArray
                name="description"
                render={(arrayHelpers) => (
                  <div>
                    {arrayHelpers?.form?.values?.description?.map(
                      (v, index) => (
                        <div className="row p-0" key={index}>
                          <div className="form-group col-md-5 p-0">
                            <label className="form-label">
                              Title <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name={`description.${index}.title`}
                              value={props.values.description?.[index]?.title}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              type="text"
                              placeholder="Enter  title"
                            />{" "}
                            {props.touched.description?.[index]?.title &&
                            props.errors.description?.[index]?.title ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description?.[index]?.title}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-5">
                            <label className="form-label">
                              Link <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name={`description.${index}.link`}
                              value={props.values.description?.[index]?.link}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              type="text"
                              placeholder="Enter link "
                            />{" "}
                            {props.touched.description?.[index]?.link &&
                            props.errors.description?.[index]?.link ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description?.[index]?.link}
                              </div>
                            ) : null}
                          </div>

                          {props.values.description.length > 1 && (
                            <div className="col-md-2 open-button">
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                -
                              </button>
                            </div>
                          )}
                          <hr />
                        </div>
                      )
                    )}
                    <button
                      className="btn btn-primary mb-4"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          title: "",
                          link: "",
                        })
                      }
                    >
                      +
                    </button>
                  <ToastContainer autoClose={1000} />
                  </div>
                )}
              />
            </div>
            <div className="form-group col-md-12 text-end">
              <button className="btn btn-primary me-2" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    <ToastContainer autoClose={1000} />
    </>
  );
}

import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../../container/Context";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import VoucherService from "../../../Services/VoucherService/VoucherService";
const DetailsForm = ({
  metaBackBtn,
  metavalues,
  voucherValue,
  priceValues,
  setMetaValues,
}) => {
  const params = useParams();
  const { voucherValues } = useContext(Context);
  const [voucher, setVoucher] = voucherValues;
  const navigate = useNavigate();
  const voucherServe = new VoucherService();

  const DetailFormHandle = async (values, e) => {
    setMetaValues(values);

    let arr = [];
    if (voucherValue?.related_assessment?.length) {
      arr = voucherValue?.related_assessment?.map((v, i) => ({
        value: v.value,
        label: v.label,
      }));
    }

    const formData = new FormData();
    if (params.id) {
      formData.set("id", params.id);
    }
    formData.set("name", voucherValue.name);
    formData.set("slug", voucherValue.slug.replaceAll(" ", "-").toLowerCase());
    formData.set("voucher_category_id", voucherValue.voucher_category_id);
    formData.set(
      "voucher_child_category_id",
      voucherValue.voucher_child_category_id
    );
    formData.set("title", voucherValue.title);
    formData.set("overview_heading", voucherValue.overview_heading);
    formData.set("logo", voucherValue.logo);
    formData.set("logo_alt_tag", voucherValue.logo_alt_tag);
    formData.set("overview", voucherValue.overview);
    formData.set(
      "recommended_knowledge_heading",
      voucherValue.recommended_knowledge_heading
    );
    formData.set("recommended_knowledge", voucherValue.recommended_knowledge);
    formData.set("exam_overview_heading", voucherValue.exam_overview_heading);
    formData.set(
      "exam_preparation_heading",
      voucherValue.exam_preparation_heading
    );
    formData.set("exam_preparation", voucherValue.exam_preparation);
    formData.set("exam_overview", voucherValue.exam_overview);
    formData.set("faq", voucherValue.faq);
    formData.set(
      "related_assessment",
      JSON.stringify(voucherValue.related_assessment)
    );

    formData.set("inr_price", priceValues.inr_price);

    formData.set("inr_min_discount_price", priceValues.inr_min_discount_price);
    formData.set("usd_price", priceValues.usd_price);
    formData.set("usd_min_discount_price", priceValues.usd_min_discount_price);
    formData.set("sgd_min_discount_price", priceValues.sgd_min_discount_price);
    formData.set("eur_min_discount_price", priceValues.eur_min_discount_price);
    formData.set("sgd_price", priceValues.sgd_price);
    formData.set("eur_price", priceValues.eur_price);
    if (priceValues.sgd_price) {
      formData.set("is_sgd_discount", priceValues.is_sgd_discount);
    }
    if (priceValues.eur_price) {
      formData.set("is_eur_discount", priceValues.is_eur_discount);
    }
    if (priceValues.usd_price) {
      formData.set("is_usd_discount", priceValues.is_usd_discount);
    }
    if (priceValues.inr_price) {
      formData.set("is_inr_discount", priceValues.is_inr_discount);
    }

    if (priceValues.is_inr_discount == "1") {
      formData.set("inr_discount_price", priceValues.inr_discount_price);
    }
    if (priceValues.is_usd_discount == "1") {
      formData.set("usd_discount_price", priceValues.usd_discount_price);
    }
    if (priceValues.is_sgd_discount =="1") {
      formData.set("sgd_discount_price", priceValues.sgd_discount_price);
    }
    if (priceValues.is_eur_discount == "1") {
      formData.set("eur_discount_price", priceValues.eur_discount_price);
    }

    formData.set("meta_title", values.meta_title);
    formData.set("meta_keyword", values.meta_keyword);
    formData.set("meta_description", values.meta_description);
    formData.set("breadcrumb", values.breadcrumb);
    formData.set("voucher_valid_for", values.related_voucher);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (params.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `voucher/update/${params.id}`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/vouchers-list");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "voucher/create",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record create successfully");
            setTimeout(() => {
              navigate("/vouchers-list");
            }, [1000]);
          } else {
            toast.error(
              res.data?.data?.usd_discount_price ||
                res.data?.data?.eur_discount_price ||
                res.data?.data?.sgd_discount_price
            );
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const ValidateSchema = Yup.object().shape({
    meta_title: Yup.string().required("Required"),
    meta_keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={metavalues}
        onSubmit={DetailFormHandle}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
      >
        {(props) => (
          <form className="form theme-form" onSubmit={props.handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Meta Tag Title <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="meta_title"
                    type="text"
                    placeholder="Enter meta tag title"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.meta_title}
                  />
                  {props.touched.meta_title && props.errors.meta_title ? (
                    <div className="formik-errors bg-error">
                      {props.errors.meta_title}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Meta Tag Keywords <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="meta_keyword"
                    type="text"
                    placeholder="Enter meta keyword"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.meta_keyword}
                  />
                  {props.touched.meta_keyword && props.errors.meta_keyword ? (
                    <div className="formik-errors bg-error">
                      {props.errors.meta_keyword}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Meta Tag Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="meta_description"
                    placeholder="Enter voucher meta tag description"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.meta_description}
                  />
                  {props.touched.meta_description &&
                  props.errors.meta_description ? (
                    <div className="formik-errors bg-error">
                      {props.errors.meta_description}
                    </div>
                  ) : null}
                </div>
                <br />
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Breadcrumb / Event Scheme Description
                  </label>
                  <textarea
                    className="form-control"
                    name="breadcrumb"
                    placeholder="Enter voucher Breadcrumb / Event Scheme description"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.breadcrumb}
                  />
                </div>
                <br />
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Voucher valid for Description
                  </label>
                  <textarea
                    className="form-control"
                    name="related_voucher"
                    placeholder="Enter voucher valid for description"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.related_voucher}
                  />
                </div>
                <div className="text-end btn-mb">
                  <button
                    className="btn btn-secondary me-3"
                    type="button"
                    onClick={metaBackBtn}
                  >
                    <i className="fa-solid fa-chevron-left"></i> Previous
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Submit <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          <ToastContainer autoClose={1000} />
          </form>
        )}
      </Formik>
    </>
  );
};

export default DetailsForm;

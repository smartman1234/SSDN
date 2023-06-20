import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import Select from "react-select";
import BuyTogetherService from "../../../Services/BuyTogetherServices/BuyTogetherService";

export default function BuyTogether() {
  const [comboCourse, setComboCourse] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [label, setLabel] = useState("");
  const BuyTogether = new BuyTogetherService();
  const params = useParams();
  const navigate = useNavigate();
  const [inrPrice, setInrPrice] = useState("");
  const [inrPrice1, setInrPrice1] = useState("");
  const [minSalePrice, setMinSalePrice] = useState("");
  const [minSalePrice1, setMinSalePrice1] = useState("");
  const [payablePrice, setPayablePrice] = useState("");
  const [payablePrice1, setPayablePrice1] = useState("");
  const [typecomboCourse, settypeComboCourse] = useState([]);
  const [values, setValues] = useState({
    heading: "",
    main_course: "",
    type_1: "",
    type_1_card: "",
    type_1_card_price: null,
    type_2: "",
    type_2_card: "",
    type_2_card_price: null,
  });

  const name = (
    <Link to="/buy-together" className="btn btn-primary">
      Back
    </Link>
  );

  const onSubmit = async (values) => {
    let obj = {
      heading: values.heading,
      main_course_id: values.main_course.value,
      other_course_1_type: values.type_1,
      other_course_1_id: values.type_1_card.value,
      other_course_1_inr_price: values.type_1_card_price,
      other_course_2_type: values.type_2,
      other_course_2_id: values.type_2_card.value,
      other_course_2_inr_price: values.type_2_card_price,
    };
    if (values.id) {
      obj["id"] = values.id;
    }

    if (values.id) {
      try {
        const response = await BuyTogether.updatecombo(obj);
        if (response) {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/buy-together");
          }, [1000]);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const response = await BuyTogether.createcombo(obj);
        if (response) {
          toast.success("Record created successfully");
          setTimeout(() => {
            navigate("/buy-together");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const VoucherSchema = Yup.object({
    heading: Yup.string().required("Required"),
    main_course: Yup.mixed().required("Required"),
    type_1: Yup.string().required("Required"),
    type_1_card: Yup.mixed().required("Required"),
    type_1_card_price: Yup.number().when("type_1", {
      is: (type_1) => type_1 === "voucher",
      then: Yup.number()
        .min(
          minSalePrice,
          `Voucher sale price can not be less than min. saling price.${
            minSalePrice + 1
          }`
        )
        .max(
          payablePrice,
          `Voucher sale price can not be greater than payable price.${
            payablePrice - 1
          }`
        )
        .required("Required"),
    }),
    type_2: Yup.string().required("Required"),
    type_2_card: Yup.mixed().required("Required"),
    type_2_card_price: Yup.number().when("type_2", {
      is: (type_2) => type_2 === "voucher",
      then: Yup.number()
        .min(
          minSalePrice1,
          `Voucher sale price can not be less than min. saling price.${
            minSalePrice1 + 1
          }`
        )
        .max(
          payablePrice1,
          `Voucher sale price can not be greater than payable price.${
            payablePrice1 - 1
          }`
        )
        .required("Required"),
    }),
  });

  const getAssessmentListApi = async () => {
    try {
      if (params.id) {
        let response = await BuyTogether.oneditassessment(params.id);
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.value, label: v.label };
          });
          setAssessment(arr);
        }
      } else {
        let response = await BuyTogether.assessment();
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.value, label: v.label };
          });
          setAssessment(arr);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const getvoucherListApi = async () => {
    try {
      if (params.id) {
        let response = await BuyTogether.oneditvoucher(params.id);
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.id, label: v.name };
          });
          setVoucher(arr);
        }
      } else {
        let response = await BuyTogether.voucher();
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.id, label: v.name };
          });
          setVoucher(arr);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const getCourseListApi = async () => {
    try {
      if (params.id) {
        let response = await BuyTogether.oneditcomboCourse(params.id);
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.value, label: v.label };
          });
          setComboCourse(arr);
        }
      } else {
        let response = await BuyTogether.comboCourse();
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.value, label: v.label };
          });
          setComboCourse(arr);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const typegetCourseListApi = async () => {
    try {
      if (params.id) {
        let response = await BuyTogether.typeoneditcomboCourse(params.id);
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.value, label: v.label };
          });
          settypeComboCourse(arr);
        }
      } else {
        let response = await BuyTogether.typecomboCourse();
        if (response) {
          const arr = response.data.map((v, i) => {
            return { value: v.value, label: v.label };
          });
          settypeComboCourse(arr);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const getDetailApi = async () => {
    try {
      let response = await BuyTogether.detail(params.id);
      if (response.status === "success") {
        setPayablePrice(response.data?.other_course_1?.payable_price);
        setPayablePrice1(response.data?.other_course_2?.payable_price);
        if (response.data?.other_course_1_type === "voucher") {
          setMinSalePrice(
            parseInt(response.data?.other_course_1?.inr_min_discount_price)
          );
        } else if (response.data?.other_course_2_type === "voucher") {
          setMinSalePrice1(
            parseInt(response.data?.other_course_2?.inr_min_discount_price)
          );
        }
        setValues({
          id: response.data.id,
          heading: response.data.heading,
          main_course: response.data.main_course,
          type_1: response.data.other_course_1_type,
          type_1_card: response.data.other_course_1,
          type_1_card_price: parseInt(response.data.other_course_1_inr_price),
          type_2: response.data.other_course_2_type,
          type_2_card: response.data.other_course_2,
          type_2_card_price: parseInt(response.data.other_course_2_inr_price),
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDetailApi();
    }
    getAssessmentListApi();
    getvoucherListApi();
    getCourseListApi();
    typegetCourseListApi();
  }, []);

  const courseChangeHandler = async (e, props, name, type, value) => {
    props.setFieldValue(value, e);
    try {
      let response = await BuyTogether.getPrice(name, e.value);
      if (response) {
        if (type === "type_1" && name === "assessment") {
          const inr = response.data?.inr_price
            ? response.data?.inr_price
            : "Free";
          setInrPrice(inr);
          localStorage.setItem("payableprice", response.data?.payable_price);
          setPayablePrice(parseInt(response.data?.payable_price));
        } else if (type === "type_1" && name === "course") {
          const inr = response.data?.inr_price
            ? response.data?.inr_price
            : "Free";
          setInrPrice(inr);
          localStorage.setItem("payableprice", response.data?.payable_price);
          setPayablePrice(parseInt(response.data?.payable_price));
        } else if (type === "type_2" && name === "assessment") {
          const inr = response.data?.inr_price
            ? response.data?.inr_price
            : "Free";
          setInrPrice1(inr);
          localStorage.setItem("payableprice", response.data?.payable_price);
          setPayablePrice1(parseInt(response.data?.payable_price));
        } else if (type === "type_2" && name === "course") {
          const inr = response.data?.inr_price
            ? response.data?.inr_price
            : "Free";
          setInrPrice(inr);
          localStorage.setItem("payableprice", response.data?.payable_price);
          setPayablePrice1(parseInt(response.data?.payable_price));
        } else if (type === "type_1" && name === "voucher") {
          const inr = response.data?.inr_price
            ? response.data?.inr_price
            : "Free";
          setInrPrice(inr);
        
          setMinSalePrice(parseInt(response.data?.inr_min_discount_price));
          localStorage.setItem("payableprice", response.data?.payable_price);
          setPayablePrice(parseInt(response.data?.payable_price));
        } else {
          const inr = response.data?.inr_price
            ? response.data?.inr_price
            : "Free";
          setInrPrice1(inr);
       
          setMinSalePrice1(parseInt(response.data?.inr_min_discount_price));
          localStorage.setItem("payableprice1", response.data?.payable_price);
          setPayablePrice1(parseInt(response.data?.payable_price));
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="page-body">
        <Breadcrumb
          heading={params.id ? "Edit Buy Together" : "Add Buy Together"}
          add={name}
        />

        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>
                    {params.id ? "Edit Buy Together" : "Add Buy Together"}
                  </h5>
                </div>
                <Formik
                  initialValues={values}
                  validationSchema={VoucherSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Heading <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="heading"
                              type="text"
                              value={props.values.heading}
                              placeholder="Enter heading"
                            />
                            {props.touched.heading && props.errors.heading ? (
                              <div className="formik-errors bg-error">
                                {props.errors.heading}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Main Course <span className="text-danger">*</span>
                            </label>

                            <Select
                              onChange={(e) => {
                                props.setFieldValue("main_course", e);
                              }}
                              options={comboCourse}
                              value={props.values.main_course}
                              name="main_course"
                            />
                            {props.touched.main_course &&
                            props.errors.main_course ? (
                              <div className="formik-errors bg-error">
                                {props.errors.main_course}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Type 1 <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select"
                              onChange={props.handleChange}
                              value={props.values.type_1}
                              name="type_1"
                            >
                              <option value="" select="false">
                                Select Type
                              </option>
                              <option value="assessment">Assessment</option>
                              <option value="voucher">Voucher</option>
                              <option value="course">Course</option>
                            </select>
                            {props.touched.type_1 && props.errors.type_1 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.type_1}
                              </div>
                            ) : null}
                          </div>
                          {props.values.type_1 === "assessment" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Assessment{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <Select
                                onChange={(e) => {
                                  courseChangeHandler(
                                    e,
                                    props,
                                    "assessment",
                                    "type_1",
                                    "type_1_card"
                                  );
                                }}
                                options={assessment}
                                value={props.values.type_1_card}
                                name="type_1_card"
                              />
                              {props.touched.type_1_card &&
                              props.errors.type_1_card ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_1_card}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_1 === "voucher" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Voucher <span className="text-danger">*</span>
                              </label>

                              <Select
                                onChange={(e) => {
                                  courseChangeHandler(
                                    e,
                                    props,
                                    "voucher",
                                    "type_1",
                                    "type_1_card"
                                  );
                                }}
                                options={voucher}
                                value={props.values.type_1_card}
                                name="type_1_card"
                              />
                              {props.touched.type_1_card &&
                              props.errors.type_1_card ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_1_card}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_1 === "course" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Course <span className="text-danger">*</span>
                              </label>

                              <Select
                                onChange={(e) => {
                                  courseChangeHandler(
                                    e,
                                    props,
                                    "course",
                                    "type_1",
                                    "type_1_card"
                                  );
                                }}
                                options={typecomboCourse}
                                value={props.values.type_1_card}
                                name="type_1_card"
                              />
                              {props.touched.type_1_card &&
                              props.errors.type_1_card ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_1_card}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_1 === "assessment" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Assessment Price{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="assessment_price"
                                value={
                                  inrPrice
                                    ? inrPrice
                                    : values.type_1_card?.inr_price
                                    ? values.type_1_card?.inr_price
                                    : values.type_1_card?.price_type
                                }
                                type="text"
                                placeholder="Enter price"
                              />
                            </div>
                          )}

                          {props.values.type_1 === "voucher" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Voucher Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                value={
                                  inrPrice
                                    ? inrPrice
                                    : values.type_1_card.inr_price
                                    ? values.type_1_card.inr_price
                                    : values.type_1_card.price_type
                                }
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                            </div>
                          )}
                          {props.values.type_1 === "course" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Course Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="course_1_price"
                                value={
                                  inrPrice
                                    ? inrPrice
                                    : values.type_1_card.inr_price
                                    ? values.type_1_card.inr_price
                                    : values.type_1_card.price_type
                                }
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                            </div>
                          )}
                          {props.values.type_1 === "assessment" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Assessment Sale Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="type_1_card_price"
                                value={props.values?.type_1_card_price}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                              {props.touched.type_1_card_price &&
                              props.errors.type_1_card_price ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_1_card_price}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_1 === "voucher" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Voucher Sale Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="type_1_card_price"
                                value={props.values?.type_1_card_price}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="number"
                                placeholder="Enter voucher sale price"
                              />
                              {props.touched.type_1_card_price &&
                              props.errors.type_1_card_price ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_1_card_price}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_1 === "course" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Course Sale Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="type_1_card_price"
                                value={props.values?.type_1_card_price}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter course sale price"
                              />
                              {props.touched.type_1_card_price &&
                              props.errors.type_1_card_price ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_1_card_price}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Type 2 <span className="text-danger">*</span>
                            </label>

                            <select
                              className="form-select"
                              onChange={props.handleChange}
                              value={props.values.type_2}
                              name="type_2"
                            >
                              <option value="" select="false">
                                Select Type
                              </option>
                              <option value="assessment">Assessment</option>
                              <option value="voucher">Voucher</option>
                              <option value="course">Course</option>
                            </select>
                            {props.touched.type_2 && props.errors.type_2 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.type_2}
                              </div>
                            ) : null}
                          </div>
                          {props.values.type_2 === "assessment" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Assessment 2{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <Select
                                onChange={(e) => {
                                  courseChangeHandler(
                                    e,
                                    props,
                                    "assessment",
                                    "type_2",
                                    "type_2_card"
                                  );
                                }}
                                options={assessment}
                                value={props.values.type_2_card}
                                name="type_2_card"
                              />
                              {props.touched.type_2_card &&
                              props.errors.type_2_card ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_2_card}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_2 === "voucher" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Voucher 2 <span className="text-danger">*</span>
                              </label>

                              <Select
                                onChange={(e) => {
                                  courseChangeHandler(
                                    e,
                                    props,
                                    "voucher",
                                    "type_2",
                                    "type_2_card"
                                  );
                                }}
                                options={voucher}
                                value={props.values.type_2_card}
                                name="type_2_card"
                              />
                              {props.touched.type_2_card &&
                              props.errors.type_2_card ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_2_card}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_2 === "course" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Course 2 <span className="text-danger">*</span>
                              </label>

                              <Select
                                onChange={(e) => {
                                  courseChangeHandler(
                                    e,
                                    props,
                                    "course",
                                    "type_2",
                                    "type_2_card"
                                  );
                                }}
                                options={typecomboCourse}
                                value={props.values.type_2_card}
                                name="type_2_card"
                              />
                              {props.touched.type_2_card &&
                              props.errors.type_2_card ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_2_card}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_2 === "assessment" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Assessment 2 Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="assessment_2_price"
                                value={
                                  inrPrice1
                                    ? inrPrice1
                                    : values.type_2_card.inr_price
                                    ? values.type_2_card.inr_price
                                    : values.type_2_card.price_type
                                }
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                            </div>
                          )}
                          {props.values.type_2 === "voucher" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Voucher 2 Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="voucher_2_price"
                                value={
                                  inrPrice1
                                    ? inrPrice1
                                    : values?.type_2_card?.inr_price
                                    ? values?.type_2_card?.inr_price
                                    : values?.type_2_card?.price_type
                                }
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                            </div>
                          )}
                          {props.values.type_2 === "course" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Course 2 Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                value={
                                  inrPrice1
                                    ? inrPrice1
                                    : values.type_2_card.inr_price
                                    ? values.type_2_card.inr_price
                                    : values.type_2_card.price_type
                                }
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                            </div>
                          )}
                          {props.values.type_2 === "assessment" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Assessment 2 Sale Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="type_2_card_price"
                                value={props.values?.type_2_card_price}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                              {props.touched.type_2_card_price &&
                              props.errors.type_2_card_price ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_2_card_price}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_2 === "voucher" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Voucher 2 Sale Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="type_2_card_price"
                                value={props.values?.type_2_card_price}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="number"
                                placeholder="Enter price"
                              />
                              {props.touched.type_2_card_price &&
                              props.errors.type_2_card_price ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_2_card_price}
                                </div>
                              ) : null}
                            </div>
                          )}
                          {props.values.type_2 === "course" && (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Course 2 Sale Price{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="type_2_card_price"
                                value={props.values?.type_2_card_price}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter price"
                              />
                              {props.touched.type_2_card_price &&
                              props.errors.type_2_card_price ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.type_2_card_price}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>

                        <div className="card-footer text-end">
                          <button className="btn btn-primary" type="submit">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

    <ToastContainer autoClose={1000} />
    </>
  );
}

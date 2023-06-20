import React, { useEffect, useState } from "react";
import { json, Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import { Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import DiscountCouponsService from "../../Services/DiscountCoupons/DiscountCouponsService";
import AssessmentService from "../../Services/AssessmentService";
import CourseService from "../../Services/CourseService/CourseService";
import MultiSelectAll from "./MultiSelectAllVoucher";
import SelectAllAssessment from "./SelectAllAssessment";
import SelectAllCourse from "./SelectAllCourse";

function CreateCoupons() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const assessmentServe = new AssessmentService();
  const [isSearchable, setIsSearchable] = useState(true);
  const [voucher, setVoucher] = useState([]);
  const [user, setUser] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [course, setCourse] = useState([]);
  const params = useParams();
  const [options, setOptions] = useState("");
  const [option, setOption] = useState(null);
  const [search, setSearch] = useState("");

  const [value, setValue] = useState({
    title: "",
    owner: "",
    start_date: "",
    end_date: "",
    user_limit: null,
    number_of_time: null,
    coupon_type: "",
    code: "",
    code_number: "",
    minimum_amount: null,
    maximum_discount_price: "",
    discount_coupon_type: "",
    discount_coupon_amount: "",
    usd_amount: "",
    user: [],
    assessment: [],
    course: [],
    voucher: [],
  });

  const serve = new DiscountCouponsService();
  const courseServe = new CourseService();

  useEffect(() => {
    if (params.id) {
      gettingDataByIdApi();
    }
    assessmentListApi();
    voucherListApi();
    courseListApi();
  }, []);

  const searchUserListApi = async (e, props) => {
    setSearch(e);
    props.setFieldValue("user", e);
  };

  useEffect(() => {
    let activity = {
      query: search,
    };
    if (search?.length === 3) {
      try {
        setIsLoading(true);
        serve.searchUser(activity).then((response) => {
          if (response.status === "success") {
            setUser(response.data);
            setIsLoading(false);
          } else {
            return;
          }
        });
      } catch (err) {
        throw err;
      }
    } else {
      setIsLoading(false);
      setUser("");
    }
  }, [search]);

  const courseListApi = async () => {
    try {
      let response = await courseServe.courseListforCoupon();
      if (response) {
        let items = [];
        for (const i of response.data) {
          items.push({
            id: i.value,
            value: i.value,
            label: i.label,
          });
        }
        setCourse(items);
      }
    } catch (err) {
      throw err;
    }
  };

  const assessmentListApi = async () => {
    try {
      let response = await assessmentServe.assessmentList();
      if (response) {
        let items = [];
        for (const i in response.data) {
          items.push({
            id: response.data[i].id,
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setAssessment(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const voucherListApi = async () => {
    try {
      let response = await assessmentServe.voucherList();
      if (response) {
        let items = [];
        for (const i in response.data) {
          items.push({
            id: response.data[i].id,
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setVoucher(items);
      }
    } catch (err) {
      throw err;
    }
  };

  const gettingDataByIdApi = async () => {
    try {
      let response = await serve.detail(params?.id);
      if (response) {
        setValue({
          id: response.data.id,
          title: response.data.title,
          owner: response.data.owner,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          user_limit: response.data.user_limit,
          number_of_time: response.data.number_of_time,
          coupon_type: response.data.coupon_type,
          code: response.data.code,
          code_number: response.data?.code_number,
          minimum_amount: response.data?.minimum_amount,
          maximum_discount_price:
            response.data?.maximum_discount_price === null
              ? ""
              : response.data?.maximum_discount_price,

          discount_coupon_type: response.data?.discount_coupon_type,
          discount_coupon_amount: parseInt(
            response.data?.discount_coupon_amount
          ),
          user: JSON.parse(response.data.user),
          assessment: JSON.parse(response.data?.assessment),
          course: JSON.parse(response.data.course),
          voucher: JSON.parse(response.data.voucher),
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    owner: Yup.string().required("Required"),
    start_date: Yup.date().required("Required"),
    end_date: Yup.date()
      .when(
        "start_date",
        (start_date, schema) => start_date && schema.min(start_date)
      )
      .required("Required"),
    user_limit: Yup.number("User limit must be number")
      .required("Required")
      .nullable(),
    number_of_time: Yup.number().required("Required").nullable(),
    coupon_type: Yup.string().required("Required"),
    code: Yup.string().when("coupon_type", {
      is: "code",
      then: Yup.string().required("Required"),
    }),
    code_number: Yup.string().when("coupon_type", {
      is: "random" && !params.id,
      then: Yup.string()
        .max(2, "You can write more the 2 digits")
        .required("code number is required."),
    }),
    minimum_amount: Yup.number().required("Required").nullable(),
    discount_coupon_type: Yup.string().required("Required"),
    maximum_discount_price: Yup.string().when("discount_coupon_type", {
      is: "percentage",
      then: Yup.string().required("Required").nullable(true),
    }),
    discount_coupon_amount: Yup.number().required("Required").nullable(),
  });

  const onSubmit = async (values) => {
    let activity = {
      title: values.title,
      owner: values.owner,
      start_date: values.start_date,
      end_date: values.end_date,
      user_limit: values.user_limit,
      number_of_time: parseInt(values.number_of_time),
      coupon_type: values.coupon_type,
      minimum_amount: values.minimum_amount,
      maximum_discount_price: values.maximum_discount_price,
      discount_coupon_type: values.discount_coupon_type,
      discount_coupon_amount: parseInt(values.discount_coupon_amount),
      user: values.user,
      assessment: values.assessment,
      course: values.course,
      voucher: values.voucher,
    };
    if (values.id) {
      activity["id"] = values.id;
    }
    if (values.discount_coupon_type === "percentage") {
      activity["maximum_discount_price"] = values.maximum_discount_price;
    }
    if (values.coupon_type === "random") {
      activity["code_number"] = parseInt(values.code_number);
    } else {
      activity["code"] = values.code;
    }

    let obj = { code: values.code };
    if (values.id) {
      obj["id"] = values.id;
    }
    try {
      let response = await serve.uniqueCode(obj);
      if (response.status === "success") {
        if (values.id) {
          let response = await serve.update(activity);
          if (response.status === "success") {
            toast.success("Coupon updated successfully");
            setTimeout(() => {
              navigate("/Coupons");
            }, [2000]);
          } else {
            toast.error(response.message);
          }
        } else {
          let response = await serve.create(activity);
          if (response.status === "success") {
            toast.success("coupon created successfully");
            setTimeout(() => {
              navigate("/Coupons");
            }, [2000]);
          } else {
            toast.error(response.message);
          }
        }
      } else {
        toast.error(response.data.code);
      }
    } catch (err) {
      throw err;
    }
  };

  const ResetForm = () => {
    window.location.reload();
    setValue({
      title: "",
      owner: "",
      start_date: "",
      end_date: "",
      user_limit: null,
      number_of_time: null,
      coupon_type: "",
      code: "",
      code_number: "",
      minimum_amount: null,
      maximum_discount_price: null,
      discount_coupon_type: "",
      discount_coupon_amount: null,
      user: "",
      assessment: [],
      course: [],
      voucher: [],
    });
  };

  const handleNameClick = (value, formProps) => {
    formProps.setFieldValue("user", [{ value: value.id, label: value.name }]);
    setUser([]);
  };

  const name = (
    <Link to="/Coupons">
      <button className="btn btn-primary" id="nextBtn" type="button">
        Back
      </button>
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb
        heading={params.id ? "Edit Discount Coupon" : "Add Discount Coupon"}
        params={params.id}
        add={name}
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>
                  {params.id ? "Edit Discount Coupon" : "Add Discount Coupon"}
                </h5>
              </div>
              <Formik
                initialValues={value}
                onSubmit={onSubmit}
                enableReinitialize={true}
                validationSchema={ValidateSchema}
              >
                {(props) => (
                  <form
                    className="form theme-form"
                    onSubmit={props.handleSubmit}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="title"
                            type="text"
                            autoComplete="false"
                            placeholder="Enter coupon title"
                            onChange={(event) => {
                              props.setFieldValue("title", event.target.value);
                            }}
                            onBlur={props.handleBlur}
                            value={props.values.title}
                          />
                          {props.touched.title && props.errors.title ? (
                            <div className="formik-errors bg-error">
                              {props.errors.title}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Owner <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="owner"
                            type="text"
                            autoComplete="false"
                            placeholder="Enter owner name"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.owner}
                          />
                          {props.touched.owner && props.errors.owner ? (
                            <div className="formik-errors bg-error">
                              {props.errors.owner}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Start Date <span className="text-danger">*</span>
                          </label>

                          <input
                            className="form-control"
                            name="start_date"
                            type="date"
                            min={new Date().toISOString().replace(/T.*/, "")}
                            autoComplete="false"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.start_date}
                          />
                          {props.touched.start_date &&
                          props.errors.start_date ? (
                            <div className="formik-errors bg-error">
                              {props.errors.start_date}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            End Date <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="end_date"
                            autoComplete="false"
                            type="date"
                            min={new Date().toISOString().replace(/T.*/, "")}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.end_date}
                          />
                          {props.touched.end_date && props.errors.end_date ? (
                            <div className="formik-errors bg-error">
                              {props.errors.end_date}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Per User Limit <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="user_limit"
                            type="text"
                            autoComplete="false"
                            placeholder="Enter user limit"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.user_limit}
                          />
                          {props.touched.user_limit &&
                          props.errors.user_limit ? (
                            <div className="formik-errors bg-error">
                              {props.errors.user_limit}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            No. of Time <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="number_of_time"
                            type="text"
                            autoComplete="false"
                            placeholder="Enter number of time"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.number_of_time}
                          />
                          {props.touched.number_of_time &&
                          props.errors.number_of_time ? (
                            <div className="formik-errors bg-error">
                              {props.errors.number_of_time}
                            </div>
                          ) : null}
                        </div>
                        {params.id ? (
                          <div
                            className="form-group col-md-6 m-checkbox-inline custom-radio-ml"
                            disabled
                          >
                            <label className="form-label ">
                              Coupon Type <span className="text-danger">*</span>
                            </label>
                            <br></br>
                            <div className="radio radio-primary">
                              
                              <input
                                className=""
                                id="code"
                                name="coupon_type"
                                disabled
                                type="radio"
                                onChange={props.handleChange}
                                checked={props.values.coupon_type === "code"}
                                onBlur={props.handleBlur}
                                value="code"
                              />
                              <label className="form-label" htmlFor="code">
                                Coupon Code
                              </label>
                            </div>
                            <div className="radio radio-primary">
                              <input
                                className=""
                                id="random"
                                name="coupon_type"
                                disabled
                                type="radio"
                                onChange={props.handleChange}
                                checked={props.values.coupon_type === "random"}
                                value="random"
                              />
                              <label className="form-label" htmlFor="random">
                                Random
                              </label>
                            </div>
                            {props.touched.coupon_type &&
                            props.errors.coupon_type ? (
                              <div className="formik-errors bg-error">
                                {props.errors.coupon_type}
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="form-group col-md-6 m-checkbox-inline custom-radio-ml">
                            <label className="form-label">
                              Coupon Type <span className="text-danger">*</span>
                            </label>
                            <br />
                            <div className="radio radio-primary">
                              
                              <input
                                className=""
                                id="code"
                                name="coupon_type"
                                type="radio"
                                onChange={props.handleChange}
                                checked={props.values.coupon_type === "code"}
                                onBlur={props.handleBlur}
                                value="code"
                              />
                              <label className="form-label" htmlFor="code">
                                Coupon Code
                              </label>
                            </div>
                            <div className="radio radio-primary">
                              <input
                                className=""
                                id="random"
                                name="coupon_type"
                                type="radio"
                                onChange={props.handleChange}
                                checked={props.values.coupon_type === "random"}
                                value="random"
                              />
                              <label className="form-label" htmlFor="random">
                                Random
                              </label>
                            </div>
                            {props.touched.coupon_type &&
                            props.errors.coupon_type ? (
                              <div className="formik-errors bg-error">
                                {props.errors.coupon_type}
                              </div>
                            ) : null}
                          </div>
                        )}
                        <div className="form-group col-md-6">
                          {props.values.coupon_type === "random" ? (
                            <>
                              {!params.id && (
                                <>
                                  
                                  <label className="form-label">
                                    Number Of Token
                                  </label>
                                  <input
                                    className="form-control"
                                    name="code_number"
                                    type="text"
                                    autoComplete="false"
                                    placeholder="Enter number Of token"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.code_number}
                                  />
                                </>
                              )}
                              {props.touched.code_number &&
                              props.errors.code_number ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.code_number}
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <>
                              
                              <label className="form-label">Coupon Code</label>
                              <input
                                className="form-control"
                                name="code"
                                type="text"
                                autoComplete="false"
                                placeholder="Enter coupon code"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.code}
                              />
                              {props.touched.code && props.errors.code ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.code}
                                </div>
                              ) : null}
                            </>
                          )}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Minimum Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="minimum_amount"
                            type="text"
                            autoComplete="false"
                            placeholder="Enter minimum amount"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.minimum_amount}
                          />
                          {props.touched.minimum_amount &&
                          props.errors.minimum_amount ? (
                            <div className="formik-errors bg-error">
                              {props.errors.minimum_amount}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Select Coupon Type <span className="text-danger">*</span>
                          </label>

                          <select
                            className="form-select"
                            name="discount_coupon_type"
                            onChange={(e) => {
                              props.setFieldValue(
                                "discount_coupon_type",
                                e.target.value
                              );
                            }}
                            value={props.values.discount_coupon_type}
                          >
                            <option value="0">Select coupon type</option>
                            <option value="percentage">Percentage</option>
                            <option value="flat">Flat</option>
                          </select>
                          {props.touched.discount_coupon_type &&
                          props.errors.discount_coupon_type ? (
                            <div className="formik-errors bg-error">
                              {props.errors.discount_coupon_type}
                            </div>
                          ) : null}
                        </div>
                        {props.values.discount_coupon_type === "percentage" && (
                          <>
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Percentage <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="discount_coupon_amount"
                                type="text"
                                autoComplete="false"
                                placeholder="Enter discount coupon amount"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.discount_coupon_amount}
                              />
                              {props.touched.discount_coupon_amount &&
                              props.errors.discount_coupon_amount ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.discount_coupon_amount}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Maximum Amount <span className="text-danger">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="maximum_discount_price"
                                type="text"
                                autoComplete="false"
                                placeholder="Enter maximum amount"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.maximum_discount_price}
                              />
                              {props.touched.maximum_discount_price &&
                              props.errors.maximum_discount_price ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.maximum_discount_price}
                                </div>
                              ) : null}
                            </div>
                          </>
                        )}
                       
                        {props.values.discount_coupon_type === "flat" && (
                          <>
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Amount <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="discount_coupon_amount"
                                type="text"
                                autoComplete="false"
                                placeholder="Enter amount"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.discount_coupon_amount}
                              />
                              {props.touched.discount_coupon_amount &&
                              props.errors.discount_coupon_amount ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.discount_coupon_amount}
                                </div>
                              ) : null}
                            </div>
                          </>
                        )}
                        <div className="form-group col-md-6">
                          <label className="form-label">Search User</label>
                         
                          <input
                            className="form-select"
                            type="search"
                            onChange={(e) => {
                              searchUserListApi(e.target.value, props);
                            }}
                            value={props.values.user?.[0]?.label}
                            name="user"
                            autoComplete="false"
                            placeholder="search user"
                          />
                          {isLoading ? (
                            <div
                              className="spinner-border text-success"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            <>
                              {search?.length === 3 && user.length > 0
                                ? user?.map((v, i) => {
                                    return (
                                      <div
                                        className="pt-2 search-person"
                                        key={i}
                                        onClick={() =>
                                          handleNameClick(v, props)
                                        }
                                      >
                                        {v.name}
                                      </div>
                                    );
                                  })
                                : ""}
                            </>
                          )}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Assessment</label>
                          <SelectAllAssessment
                            props={props}
                            assessment={assessment}
                          />
                          {props.touched.assessment &&
                          props.errors.assessment ? (
                            <div className="formik-errors bg-error">
                              {props.errors.assessment}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Course</label>
                          <SelectAllCourse props={props} course={course} />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Voucher
                          </label>
                          <MultiSelectAll voucher={voucher} props={props} />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-end">
                      <button className="btn btn-primary me-2" type="submit">
                        Submit
                      </button>

                      {params.id ? (
                        <button
                          className="btn btn-danger"
                          type="reset"
                          onClick={ResetForm}
                          disabled
                        >
                          Reset
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger"
                          type="reset"
                          onClick={ResetForm}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </Formik>
            <ToastContainer autoClose={1000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCoupons;

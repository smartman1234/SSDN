import React, { useState, useContext, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FieldArray, Formik } from "formik";
import Select from "react-select";
import { Context } from "../../../container/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentCourseService from "../../../Services/AssessmentCourseService";
import AssessmentService from "../../../Services/AssessmentService";
import SubQuestion from "./SubQuestion";
import { Editor } from "@tinymce/tinymce-react";

const convert = (num) => {
  if (num < 1) {
    return "";
  }
  if (num >= 40) {
    return "XL" + convert(num - 40);
  }
  if (num >= 10) {
    return "X" + convert(num - 10);
  }
  if (num >= 9) {
    return "IX" + convert(num - 9);
  }
  if (num >= 5) {
    return "V" + convert(num - 5);
  }
  if (num >= 4) {
    return "IV" + convert(num - 4);
  }
  if (num >= 1) {
    return "I" + convert(num - 1);
  }
};
const imageApi = async (image, params, props, type, flag = 0) => {
  try {
    let images = [];
    images.push(image);
    const imageData = new FormData();
    imageData.append("image", image);
    imageData.append("type", type);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    let loading = false;
    const res = await axios.post(
      process.env.REACT_APP_API_BASEURL + "upload-image",
      imageData,
      config
    );
    if (res.data?.status === "success") {
      props?.setFieldValue(params, res.data.data);
      toast.success("Image uploaded successfully");
      if (flag === 1) {
        return res.data.path;
      }
    } else if (res.data?.status === "fail") {
      toast.error("image size is too large");
    }
  } catch (error) {
    toast.error("image snot uploaded");
  }
};

function LastForm({
  eventForm,
  eventBackBtn,
  value,
  voucherIds,
  metavalues,
  setValue,
  setVoucherIds,
  setMetaValues,
  gettingId,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const courseServe = new AssessmentCourseService();
  const assessmentServe = new AssessmentService();
  const { voucherValues } = useContext(Context);
  const [voucherArr, setVoucherArr] = useState([]);
  const [Highlights, setHighlights] = useState("");
  const [image, setImage] = useState("");
  const [voucher, setVoucher] = voucherValues;
  const [assessmentList, setAssessmentList] = useState([]);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
    }
  };
  const [eventValues, setEventValues] = useState({
    assessment_ids: [],
    voucher_ids: [],
  });

  useEffect(() => {
    if (params?.id) {
      CourseByIdApi();
    }
    voucherListApi();
  }, []);

  const EventFormHandle = async (values, e) => {
    setEventValues(values);
    let arr = [];
    if (values?.voucher_ids?.length) {
      arr = values?.voucher_ids?.map((v, i) => ({
        value: v.value,
        label: v.label,
      }));
      setVoucherArr(arr);
    }

    const assArr =
      values?.assessment_ids?.length > 0 &&
      values?.assessment_ids?.map((v) => ({
        value: v.value,
        label: v.label,
      }));

    const formData = new FormData(e.target);
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("name", value.name);
    formData.set("slug", value.slug.replaceAll(" ", "-").toLowerCase());
    formData.set("heading", value.heading);
    formData.set("categories_id", value.categories_id);
    formData.set("description", value.description);
    formData.set("highlights", JSON.stringify(value.highlights));
    formData.set("image", value.image);
    formData.set("image_alt_tag", value.image_alt_tag);
    formData.set("exam_instruction", value.exam_instruction);
    formData.set("price_type", voucherIds.price_type);
    if (voucherIds.price_type === "paid") {
      formData.set("inr_price", voucherIds.inr_price);
      formData.set("usd_price", voucherIds.usd_price);
      formData.set("is_inr_discount", voucherIds.is_inr_discount);
      formData.set("is_usd_discount", voucherIds.is_usd_discount);
      if (voucherIds.is_inr_discount === "1") {
        formData.set("inr_discount_price", voucherIds.inr_discount_price);
      }
      if (voucherIds.is_usd_discount === "1") {
        formData.set("usd_discount_price", voucherIds.usd_discount_price);
      }
    }

    formData.set("meta_title", voucherIds.meta_title);
    formData.set("meta_keyword", voucherIds.meta_keyword);
    formData.set("meta_description", voucherIds.meta_description);
    formData.set("level", metavalues.level);
    formData.set("duration", metavalues.duration);
    formData.set("is_re_attempt", metavalues.is_re_attempt);
    formData.set("total_marks", metavalues.total_marks);
    formData.set("number_of_question", metavalues.number_of_question);
    formData.set("passing_marks", metavalues.passing_marks);
    formData.set("result_declaration", metavalues.result_declaration);

    formData.set("is_certificate", metavalues.is_certificate);
    {
      metavalues.is_certificate === "1" &&
        formData.set("certificate_name", metavalues.certificate_name);
    }

    formData.set("breadcrumb", voucherIds.breadcrumb);

    formData.set("assessment_ids", JSON.stringify(assArr));
    formData.set("voucher_ids", JSON.stringify(arr));

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `assessment-update/${values.id}`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/assessment-courses");
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
          process.env.REACT_APP_API_BASEURL + "assessment-create",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Assessment created successfully");
            setTimeout(() => {
              navigate("/assessment-courses");
            }, [1000]);
          } else if (res.data?.status === "fail") {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const CourseByIdApi = async () => {
    try {
      let response = await courseServe.getCourseDetails(params?.id);
      if (response) {

        gettingId(response.data.id);
        setValue({
          name: response.data.name,
          slug: response.data.slug,
          heading: response.data.heading,
          categories_id: response.data.categories_id,
          image: response.data.image,
          image_alt_tag: response.data.image_alt_tag,
          description: response.data.description,
          exam_instruction: response.data.exam_instruction,
          highlights: JSON.parse(response.data.highlights),
        });
        setVoucherIds({
          price_type: response.data.price_type,
          inr_price: response.data.inr_price,
          is_inr_discount: response.data.is_inr_discount.toString(),
          inr_discount_price: response.data.inr_discount_price,
          usd_price: response.data.usd_price,
          usd_discount_price: response.data.usd_discount_price,
          meta_title: response.data.meta_title,
          meta_keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb ? response.data.breadcrumb : "",
        });
        setMetaValues({
          level: response.data.level,
          duration: response.data.duration,
          total_marks: response.data.total_marks,
          number_of_question: response.data.number_of_question,
          passing_marks: response.data.passing_marks,
          is_re_attempt: response.data.is_re_attempt.toString(),
          is_certificate: response.data.is_certificate.toString(),
          certificate_name: response.data.certificate_name,
          result_declaration: response.data.result_declaration,
        });
        setEventValues({
          id: response.data.id,
          assessment_ids: JSON.parse(response.data.assessment_ids),
          voucher_ids: JSON.parse(response.data.voucher_ids),
          add_questions: response.data.add_questions,
          questions: response.data.questions,
          question_file: "",
        });
      } else {
        toast.error(response?.error);
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

  return (
    <Formik
      initialValues={eventValues}
      onSubmit={EventFormHandle}
      enableReinitialize={true}
    >
      {(props) => (
        <form className="" onSubmit={props.handleSubmit}>
          {eventForm && (
            <>
              <div className="tab" style={eventForm && { display: "block" }}>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label htmlFor="contact">Voucher List</label>
                    <Select
                      onChange={(value) =>
                        props.setFieldValue("voucher_ids", value)
                      }
                      options={voucher}
                      value={props.values.voucher_ids}
                      name="voucher_ids"
                      isMulti
                    />
                    {props.touched.voucher_ids && props.errors.voucher_ids ? (
                      <div className="formik-errors bg-error">
                        {props.errors.voucher_ids}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-end btn-mb mt-3">
                  <button
                    className="btn btn-secondary me-3"
                    id="activeForm"
                    type="button"
                    onClick={eventBackBtn}
                    style={eventForm && { display: "inline" }}
                  >
                    <i className="fa-solid fa-chevron-left"></i> Previous
                  </button>
                  <button
                    className="btn btn-primary"
                    id="nextBtn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              <ToastContainer autoClose={1000} />
              </div>
            </>
          )}
        </form>
      )}
    </Formik>
  );
}

export default LastForm;

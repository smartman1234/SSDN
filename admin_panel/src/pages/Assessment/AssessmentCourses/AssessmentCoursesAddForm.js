import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentService from "../../../Services/AssessmentService";
import AssessmentCourseService from "../../../Services/AssessmentCourseService";
import LastForm from "./LastForm";
import DetailsForm from "./DetailsForm";
import PriceForm from "./PriceForm";
import FirstForm from "./FirstForm";

function AssessmentCoursesAddForm() {
  const params = useParams();
  const assessmentServe = new AssessmentService();
  const courseServe = new AssessmentCourseService();

  const [basicDetail, setBasicDetail] = useState(true);
  const [voucherForm, setVoucherForm] = useState(false);
  const [id, setId] = useState(null);
  const [eventForm, setEventForm] = useState(false);
  const [metaForm, setMetaForm] = useState(false);

  const [value, setValue] = useState({
    name: "",
    slug: "",
    heading: "",
    categories_id: "",
    description: "",
    image: "",
    image_alt_tag: "",
    exam_instruction: "",
    highlights: [""],
  });
  const [voucherIds, setVoucherIds] = useState({
    price_type: "",
    inr_price: "",
    is_inr_discount: "",
    inr_discount_price: "",
    usd_price: "",
    is_usd_discount: "",
    usd_discount_price: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    breadcrumb: "",
  });
  const [metavalues, setMetaValues] = useState({
    level: "",
    duration: "",
    total_marks: "",
    number_of_question: "",
    passing_marks: "",
    is_re_attempt: "",
    is_certificate: "",
    certificate_name: "",
    result_declaration: "",
  });

  const prevBtnHandle = () => {
    setBasicDetail(true);
    setVoucherForm(false);
  };

  const FirstFormValues = (allValues) => {
    setValue(allValues);
  };

  const metaBackBtn = () => {
    setBasicDetail(false);
    setVoucherForm(true);
    setMetaForm(false);
    setEventForm(false);
  };

  const eventBackBtn = () => {
    setBasicDetail(false);
    setVoucherForm(false);
    setEventForm(false);
    setMetaForm(true);
  };

  const onSubmit = async (values) => {
    setValue(values);
    let obj = { name: values.name, slug: values.slug, id: id };
    try {
      let response = await courseServe.uniqueValues(obj);
      if (response.status === "success") {
        setBasicDetail(false);
        setVoucherForm(true);
      } else {
        toast.error(response.data.name || response.data.slug);
        setBasicDetail(true);
        setVoucherForm(false);
      }
    } catch (err) {
      throw err;
    }
  };

  const takingLastFormValue = (dataId) => {
    setId(dataId);
  };
  const onSubmitVoucher = async (values) => {
    setVoucherIds(values);
    setBasicDetail(false);
    setVoucherForm(false);
    setMetaForm(true);
  };

  const metaFormHandle = async (values) => {
    setMetaValues(values);
    setBasicDetail(false);
    setVoucherForm(false);
    setMetaForm(false);
    setEventForm(true);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>{params.id ? "Edit" : "Add"} Assessment Courses</h5>
        </div>
        <div className="card-body">
          {
            (basicDetail && (
              <div className="pb-3">
                <h5>Basic Details</h5>
              </div>
            )) ||
              (voucherForm && (
                <div className="pb-3">
                  <h5>Pricing</h5>
                </div>
              )) ||
              (metaForm && (
                <div className="pb-0">
                  <h5>Other Details</h5>
                </div>
              ))
          }

          <FirstForm
            onSubmit={onSubmit}
            initialValues={value}
            basicDetail={basicDetail}
            FirstFormValues={FirstFormValues}
          />
          <PriceForm
            onSubmit={onSubmitVoucher}
            prevBtnHandle={prevBtnHandle}
            voucherForm={voucherForm}
            initialValues={voucherIds}
          />

          <DetailsForm
            onSubmit={metaFormHandle}
            metaForm={metaForm}
            metaBackBtn={metaBackBtn}
            initialValues={metavalues}
          />

          <LastForm
            value={value}
            voucherIds={voucherIds}
            metavalues={metavalues}
            eventForm={eventForm}
            eventBackBtn={eventBackBtn}
            setValue={setValue}
            setVoucherIds={setVoucherIds}
            setMetaValues={setMetaValues}
            gettingId={takingLastFormValue}
          />
          <div className="text-center">
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
          </div>
        </div>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}

export default AssessmentCoursesAddForm;

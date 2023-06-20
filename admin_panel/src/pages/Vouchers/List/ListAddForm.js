import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VoucherAdd from "./VoucherAdd";
import PriceForm from "./PriceForm";
import DetailsForm from "./DetailsForm";
import VoucherCategoryService from "../../../Services/VoucherService/VoucherCategoryService";
import VoucherService from "../../../Services/VoucherService/VoucherService";

const ListAddForm = () => {
  const params = useParams();
  const voucherServe = new VoucherService();
  const [voucherDetail, setVoucherDetail] = useState(true);
  const [catId, setCatId] = useState(null);
  const [priceDetail, setPriceDetail] = useState(false);
  const [metaDetail, setMetaDetail] = useState(false);
  const [id, setId] = useState(null);
  const voucherCategoryServe = new VoucherCategoryService();
  const [parentCategory, setParentCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [image, setImage] = useState("");
  const [voucherValue, setVoucherValue] = useState({
    voucher_category_id: "",
    voucher_child_category_id: 0,
    name: "",
    slug: "",
    title: "",
    logo: "",
    logo_alt_tag: "",
    overview_heading: "",
    overview: "",
    exam_preparation_heading: "",
    recommended_knowledge_heading: "",
    recommended_knowledge: "",
    exam_overview_heading: "",
    exam_preparation: "",
    exam_overview: "",
    faq: "",
    related_assessment: [],
  });
  const [priceValues, setpriceValues] = useState({
    inr_price: "",
    inr_min_discount_price: "",
    is_inr_discount: "",
    inr_discount_price: "",
    usd_price: "",
    usd_min_discount_price: "",
    is_usd_discount: "",
    usd_discount_price: "",
      sgd_price: "",
      sgd_min_discount_price: "",
      is_sgd_discount: "",
      sgd_discount_price: "",
        eur_price: "",
        eur_min_discount_price: "",
        is_eur_discount: "",
        eur_discount_price: "",
  });
  const [metavalues, setMetaValues] = useState({
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    breadcrumb: "",
    related_voucher: "",
  });
  const prevBtnHandle = () => {
    setVoucherDetail(true);
    setPriceDetail(false);
    getChildCategory(catId)
  };

  const priceDetailForm = (values) => {
    setpriceValues(values);
    setVoucherDetail(false);
    setPriceDetail(false);
    setMetaDetail(true);
  };

  const metaBackBtn = () => {
    setVoucherDetail(false);
    setPriceDetail(true);
    setMetaDetail(false);
  };

  const takingLastFormValue = (dataId) => {
    setId(dataId);
  };

  const onSubmit = async (values) => {
    let obj = { name: values.name, slug: values.slug, id: values.id };
    try {
      let response = await voucherServe.uniqueName(obj);
      if (response.status === "success") {
        setVoucherValue(values);
        setPriceDetail(true);
        setMetaDetail(false);
        setVoucherDetail(false);
      } else {
        toast.error(response.data.name || response.data.slug);
        setVoucherDetail(true);
        setPriceDetail(false);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    getParentCategory();
  }, []);
  const getParentCategory = async () => {
    let activity = {
      parent_id: 0,
    };
    try {
      let response = await voucherCategoryServe.parentCategory(activity);
      if (response) {
        setParentCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const parentCategoryHandler = (props, e, categoryid) => {
    props.setFieldValue("voucher_category_id", e.target.value);
  
    getChildCategory(e.target.value || catId);
  };

  const getChildCategory = async (id) => {
    let activity = {
      parent_id: id || catId,
    };
    try {
      let response = await voucherCategoryServe.parentCategory(activity);
      if (response) {
        setChildCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>{params.id ? "Edit Voucher" : "Add Voucher "}</h5>
        </div>
        <div className="card-body">
          {voucherDetail && (
            <VoucherAdd
              voucherDetail={voucherDetail}
              setVoucherDetail={setVoucherDetail}
              voucherValue={voucherValue}
              voucherDetailForm={onSubmit}
              setMetaValues={setMetaValues}
              setVoucherValue={setVoucherValue}
              setpriceValues={setpriceValues}
              gettingId={takingLastFormValue}
              setCatId={setCatId}
              catId={catId}
              parentCategory={parentCategory}
              parentCategoryHandler={parentCategoryHandler}
              getChildCategory={getChildCategory}childCategory={childCategory}
              setImage={setImage}
              image={image}
            />
          )}
          {priceDetail && (
            <PriceForm
              priceValues={priceValues}
              setPriceDetail={setPriceDetail}
              priceDetailForm={priceDetailForm}
              prevBtnHandle={prevBtnHandle}
              setpriceValues={setpriceValues}
            />
          )}

          {metaDetail && (
            <DetailsForm
              voucherValue={voucherValue}
              setVoucherValue={setVoucherValue}
              setpriceValues={setpriceValues}
              priceValues={priceValues}
              metavalues={metavalues}
              setMetaDetail={setMetaDetail}
              metaBackBtn={metaBackBtn}
              gettingId={takingLastFormValue}
              setMetaValues={setMetaValues}
            />
          )}
        </div>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default ListAddForm;

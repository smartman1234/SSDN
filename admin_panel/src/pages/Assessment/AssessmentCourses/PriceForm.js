import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

function PriceForm({ onSubmit, prevBtnHandle, voucherForm, initialValues }) {
  const [showQuestion, setShowQuestion] = useState(0);
  const [usdDis, setUsdDis] = useState(false);
  const [discount, setDiscount] = useState(false);

  const VoucherSchema = Yup.object().shape({
    price_type: Yup.string().required("Required"),
    inr_price: Yup.number()
      .when("price_type", {
        is: (price_type) => price_type && price_type === "paid",
        then: Yup.number().required("Please provide INR Price"),
      })
      .nullable(),
    is_inr_discount: Yup.number()
      .when("price_type", {
        is: (price_type) => price_type === "paid",
        then: Yup.number().required("Is INR Discount Required"),
      })
      .nullable(),
    inr_discount_price: Yup.number()
      .when("is_inr_discount", {
        is: (is_inr_discount) => is_inr_discount && is_inr_discount === "1",
        then: Yup.number()
          .min(0, "Min value 0.")
          .max(100, "Percentage can not be more than 100%.")
          .required(),
      })
      .nullable(),

    meta_title: Yup.string().required("Required"),
    meta_keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
  });
  const PriceHandle = (i) => {
    setShowQuestion(i);
  };
  const InrDiscount = () => {
    setDiscount(true);
  };
  const UsdDiscount = () => {
    setUsdDis(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={VoucherSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(props) => (
        <form className="" onSubmit={props.handleSubmit}>
          {voucherForm && (
            <>
              <div className="tab" style={voucherForm && { display: "block" }}>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="contact">
                      Price Type <span className="text-danger">*</span>
                    </label>
                    <div className="col">
                      <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                        <div
                          className="radio radio-primary"
                          onClick={() => PriceHandle(1)}
                        >
                          <input
                            id="free"
                            type="radio"
                            name="price_type"
                            value="free"
                            onChange={props.handleChange}
                            checked={props.values.price_type === "free"}
                          />
                          <label className="mb-0" htmlFor="free">
                            Free
                          </label>
                        </div>
                        <div
                          className="radio radio-primary"
                          onClick={() => PriceHandle(2)}
                        >
                          <input
                            id="paid"
                            type="radio"
                            name="price_type"
                            checked={props.values.price_type === "paid"}
                            onChange={props.handleChange}
                            value="paid"
                          />
                          <label className="mb-0" htmlFor="paid">
                            Paid
                          </label>
                        </div>
                      </div>
                      {props.touched.price_type && props.errors.price_type ? (
                        <div className="formik-errors bg-error">
                          {props.errors.price_type}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {showQuestion === 2 || props.values.price_type === "paid" ? (
                  <>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label className="col-form-label">
                          Actual Price (INR)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="actualprice"
                          name="inr_price"
                          placeholder="Actual price in INR"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.inr_price}
                        />
                        {props.touched.inr_price && props.errors.inr_price ? (
                          <div className="formik-errors bg-error">
                            {props.errors.inr_price}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="contact">
                          Discount (INR) <span className="text-danger">*</span>
                        </label>
                        <div className="col">
                          <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                            <div
                              className="radio radio-primary"
                              onClick={InrDiscount}
                            >
                           
                              <input
                                id="is_inr"
                                type="radio"
                                name="is_inr_discount"
                                value="1"
                                checked={props.values.is_inr_discount === "1"}
                                onChange={props.handleChange}
                              />
                              <label className="mb-0" htmlFor="is_inr">
                                Yes
                              </label>
                            </div>
                            <div
                              className="radio radio-primary"
                              onClick={() => setDiscount(false)}
                            >
                              <input
                                id="inr_discount"
                                type="radio"
                                name="is_inr_discount"
                                onChange={props.handleChange}
                                checked={props.values.is_inr_discount === "0"}
                                value="0"
                              />
                              <label className="mb-0" htmlFor="inr_discount">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        {props.touched.is_inr_discount &&
                        props.errors.is_inr_discount ? (
                          <div className="formik-errors bg-error">
                            {props.errors.is_inr_discount}
                          </div>
                        ) : null}
                      </div>
                    
                      {(discount || props.values.is_inr_discount === "1") && (
                        <div className="form-group col-md-3">
                          <label className="col-form-label">
                            INR Discount (%)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="actualprice"
                            name="inr_discount_price"
                            placeholder="INR Discount (%)"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.inr_discount_price}
                          />
                          {props.touched.inr_discount_price &&
                          props.errors.inr_discount_price ? (
                            <div className="formik-errors bg-error">
                              {props.errors.inr_discount_price}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  
                  </>
                ) : null}
                <div className="form-group col-md-12"></div>

                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="exampleFormControlInput1">
                      Meta Tag Title <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control digits"
                      type="text"
                      name="meta_title"
                      placeholder="Title of category"
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
                    <label className="control-label">
                      Meta Tag Keywords <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control digits"
                      placeholder="Meta Keywords of category"
                      type="text"
                      name="meta_keyword"
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
                    <label className="control-label">
                      Meta Tag Description
                      <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control digits"
                      placeholder="Meta Description of category"
                      type="text"
                      name="meta_description"
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
                  <div className="form-group">
                    <label className="control-label">
                      Breadcrumb / Event Scheme Description
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Scheme for Breadcrumb & Event"
                      name="breadcrumb"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.breadcrumb}
                    ></textarea>
                    {props.touched.breadcrumb && props.errors.breadcrumb ? (
                      <div className="formik-errors bg-error">
                        {props.errors.breadcrumb}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-end btn-mb">
                  <button
                    className="btn btn-secondary me-3"
                    type="button"
                    onClick={prevBtnHandle}
                    style={voucherForm && { display: "inline" }}
                  >
                    <i className="fa-solid fa-chevron-left"></i> Previous
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Next <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      )}
    </Formik>
  );
}

export default PriceForm;

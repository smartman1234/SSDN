import React, { useEffect, useState } from "react";
import { FieldArray, Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import VoucherService from "../../../Services/VoucherService/VoucherService";
const PriceForm = ({ priceValues, priceDetailForm, prevBtnHandle,setpriceValues }) => {
  const [discount, setDiscount] = useState(false);
  const [usdDiscountPrice, setUsdDiscountprice] = useState(false);
  const params = useParams();
  const InrDiscount = () => {
    setDiscount(true);
  };

  const usdDiscount = () => {
    setUsdDiscountprice(true);
  };
  const voucherServe = new VoucherService();


  const ValidateSchema = Yup.object().shape({
    inr_price: Yup.number().required(),
    inr_min_discount_price: Yup.number()
      .lessThan(Yup.ref("inr_price"))
      .required(),
    is_inr_discount: Yup.number().required(),
    inr_discount_price: Yup.number()
      .when("is_inr_discount", {
        is: (is_inr_discount) => is_inr_discount && is_inr_discount === 1,
        then: Yup.number()
          .min(0, "Min value 0.")
          .max(100, "Percentage can not be more than 100%.")
          .required(),
      })
      .nullable(),
  });

  
  return (
    <>
      
      <Formik
        initialValues={priceValues}
        onSubmit={priceDetailForm}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
      >
        {(props) => (
          <form className="form theme-form" onSubmit={props.handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-12">
                  <label className="form-label">Currency INR </label>
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Max. Retail Price <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="inr_price"
                    type="text"
                    placeholder="Enter voucher original price"
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
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Min. Selling Price <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="inr_min_discount_price"
                    type="text"
                    placeholder="Enter voucher min sale "
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.inr_min_discount_price}
                  />
                  {props.touched.inr_min_discount_price &&
                  props.errors.inr_min_discount_price ? (
                    <div className="formik-errors bg-error">
                      {props.errors.inr_min_discount_price}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Discount <span className="text-danger">*</span>
                  </label>
                  <div className="col">
                    <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="is_inr"
                          type="radio"
                          className="form-label"
                          name="is_inr_discount"
                          value={1}
                          checked={props.values.is_inr_discount === "1"}
                          onChange={props.handleChange}
                          onClick={InrDiscount}
                        />
                        <label className="form-label" htmlFor="is_inr">
                          Yes
                        </label>
                      </div>
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="inr_discount"
                          type="radio"
                          name="is_inr_discount"
                          onChange={props.handleChange}
                          checked={props.values.is_inr_discount === "0"}
                          value={0}
                          onClick={() => setDiscount(false)}
                        />
                        <label className="form-label" htmlFor="inr_discount">
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
                {(discount ||props.values.is_inr_discount==="1")&& (
                  <div className="form-group col-md-6">
                    <label className="col-form-label"> Discount (%)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="inr_discount_price"
                      placeholder="Discount (%)"
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
                
              </div><hr/>
              <div className="row">
                <div className="form-group col-md-12">
                  <label className="form-label">Currency USD </label>
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Max. Retail Price 
                  </label>
                  <input
                    className="form-control"
                    name="usd_price"
                    type="text"
                    placeholder="Enter voucher original price"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.usd_price}
                  />
                  {props.touched.usd_price && props.errors.usd_price ? (
                    <div className="formik-errors bg-error">
                      {props.errors.usd_price}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Min. Selling Price 
                  </label>
                  <input
                    className="form-control"
                    name="usd_min_discount_price"
                    type="text"
                    placeholder="Enter voucher min sale "
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.usd_min_discount_price}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Discount 
                  </label>
                  <div className="col">
                    <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="is_usd"
                          type="radio"
                          className="form-label"
                          name="is_usd_discount"
                          value={1}
                          checked={props.values.is_usd_discount === "1"}
                          onChange={props.handleChange}
                        />
                        <label className="form-label" htmlFor="is_usd">
                          Yes
                        </label>
                      </div>
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="usd_discount"
                          type="radio"
                          name="is_usd_discount"
                          onChange={props.handleChange}
                          checked={props.values.is_usd_discount === "0"}
                          value={0}
                        />
                        <label className="form-label" htmlFor="usd_discount">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {(props.values.is_usd_discount==="1")&& (
                  <div className="form-group col-md-6">
                    <label className="col-form-label"> Discount (%)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="usd_discount_price"
                      placeholder="Discount (%)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.usd_discount_price}
                    />
                  </div>
                )}
                
              </div><hr/>
              <div className="row">
                <div className="form-group col-md-12">
                  <label className="form-label">Currency SGD </label>
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Max. Retail Price 
                  </label>
                  <input
                    className="form-control"
                    name="sgd_price"
                    type="text"
                    placeholder="Enter voucher original price"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.sgd_price}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Min. Selling Price 
                  </label>
                  <input
                    className="form-control"
                    name="sgd_min_discount_price"
                    type="text"
                    placeholder="Enter voucher min sale "
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.sgd_min_discount_price}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Discount 
                  </label>
                  <div className="col">
                    <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="is_sgd"
                          type="radio"
                          className="form-label"
                          name="is_sgd_discount"
                          value={1}
                          checked={props.values.is_sgd_discount === "1"}
                          onChange={props.handleChange}
                        />
                        <label className="form-label" htmlFor="is_sgd">
                          Yes
                        </label>
                      </div>
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="sgd_discount"
                          type="radio"
                          name="is_sgd_discount"
                          onChange={props.handleChange}
                          checked={props.values.is_sgd_discount === "0"}
                          value={0}
                        />
                        <label className="form-label" htmlFor="sgd_discount">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {(discount ||props.values.is_sgd_discount==="1")&& (
                  <div className="form-group col-md-6">
                    <label className="col-form-label"> Discount (%)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sgd_discount_price"
                      placeholder="Discount (%)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.sgd_discount_price}
                    />
                  </div>
                )}
              </div><hr/>
              <div className="row">
                <div className="form-group col-md-12">
                  <label className="form-label">Currency EUR </label>
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Max. Retail Price 
                  </label>
                  <input
                    className="form-control"
                    name="eur_price"
                    type="text"
                    placeholder="Enter voucher original price"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.eur_price}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Min. Selling Price 
                  </label>
                  <input
                    className="form-control"
                    name="eur_min_discount_price"
                    type="text"
                    placeholder="Enter voucher min sale "
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.eur_min_discount_price}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Discount 
                  </label>
                  <div className="col">
                    <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="is_eur"
                          type="radio"
                          className="form-label"
                          name="is_eur_discount"
                          value={1}
                          checked={props.values.is_eur_discount === "1"}
                          onChange={props.handleChange}
                        />
                        <label className="form-label" htmlFor="is_eur">
                          Yes
                        </label>
                      </div>
                      <div
                        className="radio radio-primary"
                      >
                        <input
                          id="eur_discount"
                          type="radio"
                          name="is_eur_discount"
                          onChange={props.handleChange}
                          checked={props.values.is_eur_discount === "0"}
                          value={0}
                        />
                        <label className="form-label" htmlFor="eur_discount">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {(discount ||props.values.is_eur_discount==="1")&& (
                  <div className="form-group col-md-6">
                    <label className="col-form-label"> Discount (%)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="eur_discount_price"
                      placeholder="Discount (%)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.eur_discount_price}
                    />
                  </div>
                )}
                
                <div className="text-end btn-mb">
                  <button
                    className="btn btn-secondary me-3"
                    type="button"
                    onClick={prevBtnHandle}
                  >
                    <i className="fa-solid fa-chevron-left"></i> Previous
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Next <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PriceForm;

import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import CurrencyService from "../../../Services/SitePanelServices/CurrencyService";

export default function CurrencyForm() {
  const [trainingMode, setTrainingMode] = useState([]);
  const currency = new CurrencyService();
  const [course, setCourse] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    currency: "",
    amount: "",
    symbol: "",
    payment_gateway: "",
    transaction_charge:""
  });

  const name = (
    <Link to="/currency" className="btn btn-primary">
      Back
    </Link>
  );

  const onSubmit = async (values) => {
    let obj = {
      currency: values.currency,
      currency_amount: values.amount,
      payment_gateway: values.payment_gateway,
      currency_symbol: values.symbol,
      transaction_charge:values.transaction_charge
    };
    if (values.id) {
      obj["id"] = values.id;
    }

    if (values.id) {
      try {
        const response = await currency.update(obj);
        if (response) {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/currency");
          }, [1000]);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const response = await currency.create(obj);
        if (response) {
          toast.success("Record created successfully");
          setTimeout(() => {
            navigate("/currency");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const VoucherSchema = Yup.object().shape({
    currency: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
    symbol: Yup.string().required("Required"),
    payment_gateway: Yup.string().required("Required"),
    transaction_charge:Yup.string().required("Required").nullable(),
  });

  const getDetailApi = async () => {
    try {
      let response = await currency.getDetail(params.id);
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          currency: response.data.currency,
          symbol: response.data.currency_symbol,
          amount: response.data.currency_amount,
          payment_gateway: response.data.payment_gateway,
          transaction_charge:response.data.transaction_charge
        });
      } 
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDetailApi();
    }
  }, []);
  return (
    <div className="page-body">
      <Breadcrumb
        heading={params.id ? "Edit Currency" : "Add Currency"}
        add={name}
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>{params.id ? "Edit Currency" : "Add Currency"}</h5>
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
                      <div className="form-group">
                        <div className="row">
                          <div className="form-group  col-md-6">
                            <label className="form-label">
                              Currency <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={props.values.currency}
                              name="currency"
                              onChange={props.handleChange}
                              placeholder="Enter currency"
                            />
                            {props.touched.currency && props.errors.currency ? (
                              <div className="formik-errors bg-error">
                                {props.errors.currency}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group  col-md-6">
                            <label className="form-label">
                              Amount <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={props.values.amount}
                              name="amount"
                              onChange={props.handleChange}
                              placeholder="Enter amount"
                            />
                            {props.touched.amount && props.errors.amount ? (
                              <div className="formik-errors bg-error">
                                {props.errors.amount}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Symbol <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={props.values.symbol}
                              name="symbol"
                              onChange={props.handleChange}
                              placeholder="Enter symbol"
                            />
                            {props.touched.symbol && props.errors.symbol ? (
                              <div className="formik-errors bg-error">
                                {props.errors.symbol}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Payment Gateway <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select"
                              onChange={props.handleChange}
                              name="payment_gateway"
                              value={props.values.payment_gateway}
                            >
                              <option value="" select="false">
                                Select payment gatway
                              </option>
                              <option value="razorpay">Razorpay</option>
                              <option value="stripe">Stripe</option>
                            </select>
                            {props.touched.payment_gateway &&
                            props.errors.payment_gateway ? (
                              <div className="formik-errors bg-error">
                                {props.errors.payment_gateway}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Transaction Charges <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={props.values.transaction_charge}
                              name="transaction_charge"
                              onChange={props.handleChange}
                              placeholder="Enter transaction charge"
                            />
                            {props.touched.transaction_charge && props.errors.transaction_charge ? (
                              <div className="formik-errors bg-error">
                                {props.errors.transaction_charge}
                              </div>
                            ) : null}
                          </div>
                        </div>
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
    <ToastContainer autoClose={1000} />
    </div>
  );
}

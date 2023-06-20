import React,{useState} from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const TopCard = ({ data ,typeChangeHanlder,type,dashboard}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [value, setValue] = useState({
    start: "",
    end: "",
  });
  const onSubmit = async (values) => {
    setStartDate(values.start);
    setEndDate(values.end);
    let activity = {
      type: type,
      start_date: values.start,
      end_date: values.end,
    };
    await dashboard(activity);
    setValue({
      start: "",
    end: "",
    })
  };
 const ValidateSchema = Yup.object().shape({
    start: Yup.string().required("Required"),
    end: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="card-header">
        <h5>Dashboard</h5>
      </div>
      <div className="card-body btn-showcase">
      <button
          type="button"
          className="btn btn-primary me-3"
          onClick={() => {
            typeChangeHanlder("all");
          }}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-primary me-3"
          onClick={() => {
            typeChangeHanlder("today");
          }}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-info  me-3"
          onClick={() => {
            typeChangeHanlder("yesterday");
          }}
        >
          Yesterday
        </button>
        <button
          type="button"
          className="btn btn-warning  me-3"
          onClick={() => {
            typeChangeHanlder("month");
          }}
        >
          Month
        </button>
        <button
          type="button"
          className="btn btn-success  me-3"
          onClick={() => {
            typeChangeHanlder("custom");
          }}
        >
          Custom
        </button>
      </div>
      {type === "custom" && (
        <div className="">
          <Formik
            initialValues={value}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={ValidateSchema}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label className="form-label">From Date</label>
                    <input
                      className="form-control"
                      name="start"
                      type="date"
                      onChange={props.handleChange}
                      value={props.values.start}
                    />
                    {props.touched.start && props.errors.start ? (
                      <div className="formik-errors bg-error">
                        {props.errors.start}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-4">
                    <label className="form-label">To Date</label>
                    <input
                      className="form-control"
                      name="end"
                      type="date"
                      onChange={props.handleChange}
                      value={props.values.end}
                    />
                    {props.touched.end && props.errors.end ? (
                      <div className="formik-errors bg-error">
                        {props.errors.end}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-4 open-button">
                    <button type="submit" className="btn btn-primary">
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
      <div className="card-body pb-0">
        <div className="card">
          <div className="card-header">
            <h5>Transaction</h5>
          </div>
          <div className="card-body pb-0">
            <div className="row">
              <div className="col-sm-6 col-xl-3 xl-25 col-lg-6 box-col-6">
                <div className="card social-widget-card">
                  <div className="card-body">
                    <div
                      className="redial-social-widget radial-bar-70"
                      data-label="50%"
                    >
                      <i className="fa fa-dollar font-primary"></i>
                    </div>
                    <h5 className="b-b-light">Total <br/> Transactions</h5>
                    <div className="row">
                      <div className="col text-center b-r-light">
                        <span>INR</span>
                        <h4 className="counter mb-0">
                          {data?.razorpay?.total_transaction}
                        </h4>
                      </div>
                      <div className="col text-center">
                        <span>USD</span>
                        <h4 className="counter mb-0">
                          {data?.stripe?.total_transaction}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3 xl-25 col-lg-6 box-col-6">
                <div className="card social-widget-card">
                  <div className="card-body">
                    <div
                      className="redial-social-widget radial-bar-70"
                      data-label="50%"
                    >
                      <i className="fa fa-dollar font-primary"></i>
                    </div>
                    <h5 className="b-b-light">Total<br/> Amount</h5>
                    <div className="row">
                      <div className="col text-center b-r-light">
                        <span>INR</span>
                        <h4 className="counter mb-0">
                          {data?.razorpay?.total_amount.toFixed(2)}
                        </h4>
                      </div>
                      <div className="col text-center">
                        <span>USD</span>
                        <h4 className="counter mb-0">
                          {data?.stripe?.total_amount.toFixed(2)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3 xl-25 col-lg-6 box-col-6">
                <div className="card social-widget-card">
                  <div className="card-body">
                    <div
                      className="redial-social-widget radial-bar-70"
                      data-label="50%"
                    >
                      <i className="fa fa-dollar font-primary"></i>
                    </div>
                    <h5 className="b-b-light">Transaction<br/> Charges (1%)</h5>
                    <div className="row">
                      <div className="col text-center b-r-light">
                        <span>INR</span>
                        <h4 className="counter mb-0">
                          {data?.razorpay?.total_transaction.toFixed(2)}
                        </h4>
                      </div>
                      <div className="col text-center">
                        <span>USD</span>
                        <h4 className="counter mb-0">
                          {data?.stripe?.total_transaction.toFixed(2)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3 xl-25 col-lg-6 box-col-6">
                <div className="card social-widget-card">
                  <div className="card-body">
                    <div
                      className="redial-social-widget radial-bar-70"
                      data-label="50%"
                    >
                      <i className="fa fa-calculator font-primary"></i>
                    </div>
                    <h5 className="b-b-light">GST (18%)<br/> Collection</h5>
                    <div className="row">
                      <div className="col text-center b-r-light">
                        <span>INR</span>
                        <h4 className="counter mb-0">
                          {" "}
                          {data?.razorpay?.total_gst.toFixed(2)}
                        </h4>
                      </div>
                      <div className="col text-center">
                        <span>USD</span>
                        <h4 className="counter mb-0">
                          {" "}
                          {data?.stripe?.total_gst.toFixed(2)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3 xl-25 col-lg-6 box-col-6">
                <div className="card social-widget-card">
                  <div className="card-body">
                    <div
                      className="redial-social-widget radial-bar-70"
                      data-label="50%"
                    >
                      <i className="fa fa-cubes-stacked font-primary"></i>
                    </div>
                    <h5 className="b-b-light">Stock<br/> value</h5>
                    <div className="row">
                      <div className="col text-center b-r-light">
                        <span>INR</span>
                        <h4 className="counter mb-0">742</h4>
                      </div>
                      <div className="col text-center">
                        <span>USD</span>
                        <h4 className="counter mb-0">209</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3 xl-25 col-lg-6 box-col-6">
                <div className="card social-widget-card">
                  <div className="card-body">
                    <div
                      className="redial-social-widget radial-bar-70"
                      data-label="50%"
                    >
                      <i className="fa fa-dollar font-primary"></i>
                    </div>
                    <h5 className="b-b-light">Revenue<br/> Amount</h5>
                    <div className="row">
                      <div className="col text-center b-r-light">
                        <span>INR</span>
                        <h4 className="counter mb-0">742</h4>
                      </div>
                      <div className="col text-center">
                        <span>USD</span>
                        <h4 className="counter mb-0">209</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3 xl-25 col-lg-6 box-col-6">
                <div className="card social-widget-card">
                  <div className="card-body">
                    <div
                      className="redial-social-widget radial-bar-70"
                      data-label="50%"
                    >
                      <i className="fa fa-dollar font-primary"></i>
                    </div>
                    <h5 className="b-b-light">Purchase<br/> Amount</h5>
                    <div className="row">
                      <div className="col text-center b-r-light">
                        <span>INR</span>
                        <h4 className="counter mb-0">742</h4>
                      </div>
                      <div className="col text-center">
                        <span>USD</span>
                        <h4 className="counter mb-0">209</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCard;

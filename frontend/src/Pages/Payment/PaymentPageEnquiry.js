import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Captcha from "react-numeric-captcha";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";
import PaymentServices from "../../Services/PaymentService/PaymentService";

export default function PaymentPageEnquiry({ active, setActive }) {
	const serve = new PaymentServices();
	const [verify, setVerify] = useState(false);
	const [error, setError] = useState("");
	const [loader, setLoader] = useState(false);
	const [ip, setIP] = useState("");
	const [values, setValues] = useState({
		name: "",
		email: "",
		course: "",
		mobile: "",
		ip_address: "",
		message: "",
		country_code: "91",
		enquiry_type: "",
		attendees: "",
		company_name: "",
	});

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const res = await axios.get("https://api.ipify.org/?format=json");
		setIP(res.data.ip);
	};
	const onSubmit = async (values) => {
		let obj = {
			country_code: values.country_code,
			course_voucher_assessment: values.course,
			name: values.name,
			mobile: values.mobile,
			country_code: values.country_code,
			email: values.email,
			enquiry_type: values.enquiry_type,
			message: values.message,
			ip_address: ip,
		};
		if (values.enquiry_type === "company") {
			obj["company_name"] = values.company_name;
			obj["attendees"] = values.attendees;
		}
		if (verify) {
			setError();
			setLoader(true);
			try {
				const response = await serve.enquiry(obj);
				if (response) {
					setLoader(false);
					toast.success(response.message);
					setActive(false);
					setValues({
						name: "",
						email: "",
						mobile: "",
						ip_address: "",
						message: "",
						course: "",
						country_code: "",
					});
				} else {
					setLoader(false);
					toast.error(response.message);
				}
			} catch (err) {
				throw err;
			}
		} else {
			setError(" Please fill Recapcha correctly ");
		}
	};

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const VoucherSchema = Yup.object().shape({
		enquiry_type: Yup.string().required("Required"),
		name: Yup.string().required("Required"),
		email: Yup.string().required("Required"),
		course: Yup.string().required("Required"),
		message: Yup.string().required("Required"),
		mobile: Yup.string()
			.matches(phoneRegExp, "Phone number is not valid")
			.required("Required")
			.min(10, "too short")
			.max(10, "too long"),
		country_code: Yup.string().required("Required"),
		attendees: Yup.string()
			.when("enquiry_type", {
				is: (enquiry_type) => enquiry_type && enquiry_type === "company",
				then: Yup.string().required("Required"),
			})
			.nullable(),
		company_name: Yup.string()
			.when("enquiry_type", {
				is: (enquiry_type) => enquiry_type && enquiry_type === "company",
				then: Yup.string().required("Required"),
			})
			.nullable(),
	});
	return (
		<div
			className={active ? "modal fade show" : "modal fade"}
			id="view-details"
			style={active ? { display: "block" } : { display: "none" }}
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							Enquire Now
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={() => {
								setActive(false);
							}}
						></button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={values}
							validationSchema={VoucherSchema}
							onSubmit={onSubmit}
							enableReinitialize={true}
						>
							{(props) => (
								<form className="row p-2 pt-0" onSubmit={props.handleSubmit}>
									<div className="col-lg-12 d-flex">
										<div className="comment-form-consent input-box mb--10">
											<input
												id="radio-1"
												type="radio"
												name="enquiry_type"
												checked={props.values.enquiry_type === "individual"}
												onChange={props.handleChange}
												value="individual"
											/>
											<label htmlFor="radio-1">Individual</label>
										</div>
										<div className="comment-form-consent input-box mb--10 pl--20">
											<input
												id="radio-2"
												type="radio"
												name="enquiry_type"
												onChange={props.handleChange}
												value="company"
												checked={props.values.enquiry_type === "company"}
											/>
											<label htmlFor="radio-2">Company</label>
										</div>
									</div>
									{props.touched.enquiry_type && props.errors.enquiry_type ? (
										<div className="formik-errors bg-error">
											{props.errors.enquiry_type}
										</div>
									) : null}
									<div className="col-md-12 form-group">
										<input
											type="text"
											className="form-control"
											name="course"
											onChange={props.handleChange}
											value={props.values.course}
											placeholder="Enter course name"
										/>
										{props.touched.course && props.errors.course ? (
											<div className="formik-errors bg-error">
												{props.errors.course}
											</div>
										) : null}
									</div>
									{props.values.enquiry_type === "company" ? (
										<>
											<div className="col-md-6 form-group">
												<input
													type="text"
													className="form-control"
													name="company_name"
													onChange={props.handleChange}
													value={props.values.company_name}
													placeholder="Enter company name"
												/>
												{props.touched.company_name &&
													props.errors.company_name ? (
													<div className="formik-errors bg-error">
														{props.errors.company_name}
													</div>
												) : null}
											</div>
											<div className="col-md-6 form-group">
												<input
													type="text"
													className="form-control"
													name="name"
													onChange={props.handleChange}
													value={props.values.name}
													placeholder="Contact person name"
												/>
												{props.touched.name && props.errors.name ? (
													<div className="formik-errors bg-error">
														{props.errors.name}
													</div>
												) : null}
											</div>
											<div className="col-md-6 form-group">
												<input
													type="email"
													className="form-control"
													name="email"
													onChange={props.handleChange}
													value={props.values.email}
													placeholder="Contact person email"
												/>
												{props.touched.email && props.errors.email ? (
													<div className="formik-errors bg-error">
														{props.errors.email}
													</div>
												) : null}
											</div>
											<div className="col-md-6 form-group">
												<input
													type="text"
													className="form-control"
													onChange={props.handleChange}
													name="attendees"
													value={props.values.attendees}
													placeholder="No of employee"
												/>
												{props.touched.attendees && props.errors.attendees ? (
													<div className="formik-errors bg-error">
														{props.errors.attendees}
													</div>
												) : null}
											</div>
											<div className="col-lg-4 col-6 form-group">
												<PhoneInput
													className="form-select me-3"
													country={"in"}
													enableSearch={true}
													value={props.values.country_code}
													onChange={(e) => {
														props.setFieldValue("country_code", e);
													}}
												/>
												{props.touched.country_code &&
													props.errors.country_code ? (
													<div className="formik-errors bg-error">
														{props.errors.country_code}
													</div>
												) : null}
											</div>
											<div className="col-lg-8 col-6 form-group">
												<input
													type="text"
													className="form-control"
													name="mobile"
													onChange={props.handleChange}
													value={props.values.mobile}
													placeholder="Phone"
												/>
												{props.touched.mobile && props.errors.mobile ? (
													<div className="formik-errors bg-error">
														{props.errors.mobile}
													</div>
												) : null}
											</div>
											<div className="col-md-12 form-group">
												<textarea
													className="form-control"
													onChange={props.handleChange}
													value={props.values.message}
													name="message"
													placeholder="Your Message"
												/>
												{props.touched.message && props.errors.message ? (
													<div className="formik-errors bg-error">
														{props.errors.message}
													</div>
												) : null}
											</div>
										</>
									) : (
										<>
											<div className="col-lg-12 form-group">
													<input
														name="name"
														onChange={props.handleChange}
														value={props.values.name}
														type="text"
														className="form-control form-control-lg"
														placeholder="Name*"
													/>
													{props.touched.name && props.errors.name ? (
														<div className="formik-errors bg-error">
															{props.errors.name}
														</div>
													) : null}
												</div>
											<div className="col-lg-12 form-group">
													<input
														type="email"
														className="form-control form-control-lg"
														name="email"
														onChange={props.handleChange}
														value={props.values.email}
														placeholder="Email*"
													/>
													{props.touched.email && props.errors.email ? (
														<div className="formik-errors bg-error">
															{props.errors.email}
														</div>
													) : null}
											</div>
											<div className="col-lg-4 col-6 form-group">
													<PhoneInput
														className="form-select me-3"
														country={"in"}
														enableSearch={true}
														value={props.values.country_code}
														onChange={(e) => {
															props.setFieldValue("country_code", e);
														}}
													/>
													{props.touched.country_code &&
														props.errors.country_code ? (
														<div className="formik-errors bg-error">
															{props.errors.country_code}
														</div>
													) : null}
											</div>
											<div className="col-lg-8 col-6 form-group">
													<input
														type="text"
														className="form-control"
														name="mobile"
														onChange={props.handleChange}
														value={props.values.mobile}
														placeholder="Phone"
													/>
													{props.touched.mobile && props.errors.mobile ? (
														<div className="formik-errors bg-error">
															{props.errors.mobile}
														</div>
													) : null}
											</div>
											<div className="col-lg-12 form-group">
													<textarea
														className="form-control"
														onChange={props.handleChange}
														value={props.values.message}
														name="message"
														placeholder="Your Message"
													/>
													{props.touched.message && props.errors.message ? (
														<div className="formik-errors bg-error">
															{props.errors.message}
														</div>
													) : null}
											</div>
										</>
									)}
									<div className="col-lg-12">
										<div className="form-group">
										<Captcha onChange={(e) => setVerify(e)} />
											<div className="formik-errors bg-error">{error}</div>
										</div></div>
									<div className="col-lg-12">
										{loader ? (
											<div className="col-lg-12 text-center mt-1">
											<strong className="me-2">Loading...</strong>
											<div className="spinner-border text-warning"
											></div>
										</div>
										) : (
											<button className="edu-btn w-100" type="submit">
												Submit Now
											</button>
										)}
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
			<ToastContainer autoClose={1000} />
		</div>
	);
}

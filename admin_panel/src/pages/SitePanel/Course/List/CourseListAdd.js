import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import CourseCourseService from "../../../../Services/CourseService/CourseCourseService";
import CourseService from "../../../../Services/CourseService/CourseService";
import CourseListForm from "./courseListForm";
import Curriculum from "./Curriculum";
import CourseBlog from "./CourseBlog";

function ListAdd() {
  const params = useParams();
  const [ogImage, setOgImage] = useState("");
  const [blogForm, setBlogForm] = useState(false);
  const [mainForm, setMainForm] = useState(true);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [curriculumForm, setCurriculumForm] = useState(false);
  const [categoryLists, setCategoryLists] = useState([]);
  const [values, setValues] = useState({
    default_course_categories_id: "",
    sub_category_id: "",
    heading: "",
    name: "",
    slug: "",
    price_type: "",
    mode1: "",
    mode2: "",
    inr_price: "",
    is_inr_discount: "",
    inr_discount_price: "",
    media_type: "",
    video_type: "",
    media: "",
    thumb_image: "",
    image_alt_tag: "",
    assignments: "",
    code: "",
    live_project: "",
    course_overview: "",
    course_duration: "",
    course_duration_time: "",
    free_demo_description: "",
    about_title: "",
    about: "",

    certification_title: "",
    certification: "",
    certification_image: "",
    certification_image_alt_tag: "",
    project_title: "",
    project: "",
    project_image: "",
    project_image_alt_tag: "",
    project_what_will_get_title: "",
    project_what_will_get: "",
    project_pre_request_title: "",
    project_pre_request: "",
    project_target_audience_title: "",
    project_target_audience: "",
    cities: "",
    city_slug: "",
    related_course: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    breadcrumb: "",
    og_title: "",
    og_url: "",
    og_image: "",
    og_description: "",
  });
  const [curriculumValue, setCurriculumValue] = useState({
    curriculum_title: "",
    curriculum: "",
    curriculum_accordion: [{ title: "", description: "" }],
    faqs: [{ title: "", description: "" }],
    pdf: "",
  });
  const [blogValue, setBlogValue] = useState({
    label1: "",
    link1: "",
    label1_image: "",
    date1: "",
    label2: "",
    link2: "",
    image2: "",
    date2: "",
    label3: "",
    link3: "",
    label3_image: "",
    date3: "",
  });
  const categoryServe = new CourseService();
  const courseServe = new CourseCourseService();
  const VoucherSchema = Yup.object().shape({
    default_course_categories_id: Yup.mixed().required("Required"),
    sub_category_id: Yup.array().required("Required"),
    name: Yup.string().required("Required"),
    heading: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    mode1: Yup.string().required("Required"),
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
    media_type: Yup.string().required("Required"),
    video_type: Yup.string()
      .when("media_type", {
        is: (media_type) => media_type && media_type === "video",
        then: Yup.string().required(),
      })
      .nullable(),
    media: Yup.mixed().required("Required"),
    thumb_image: Yup.mixed().when("media_type", {
      is: (media_type) => media_type === "video",
      then: Yup.mixed().required("Required"),
    }),
    image_alt_tag: Yup.string().when("media_type", {
      is: "image",
      then: Yup.string().required("Required").nullable(),
    }),

    meta_title: Yup.string().required("Required"),
    meta_keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    setValues(values);
    setCurriculumForm(true);
    setMainForm(false);
    setBlogForm(false);
  };

  const getParentCategory = async () => {
    let obj = { parent_id: "-1" };
    try {
      let response = await categoryServe.parentcategory(obj);
      if (response) {
        setAllCategoryList(response.data);
        setCategoryLists(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (params.id) {
      getDataById();
    }
    getParentCategory();
  }, []);

  const getDataById = async () => {
    try {
      let response = await courseServe.getData(params.id);

      const mode = response.data.course_mode.split(" ");
      if (response) {
        setValues({
          id: response.data.id,
          default_course_categories_id: response.data.select_default_category
            ? response.data.select_default_category
            : "",
          sub_category_id: response.data.selected_category
            ? response.data.selected_category
            : "",
          name: response.data.name ? response.data.name : "",
          heading: response.data.heading ? response.data.heading : "",
          slug: response.data.slug ? response.data.slug : "",
          price_type: response.data.price_type,
          inr_price: response.data.inr_price,
          is_inr_discount: response.data.is_inr_discount,
          inr_discount_price: response.data.inr_discount_price,
          media_type: response.data.media_type,
          video_type: response.data.video_type,
          media: response.data.media,
          image_alt_tag: response.data.media_alt_tag
            ? response.data.media_alt_tag
            : "",
          thumb_image: response.data.thumb_image,
          code: response.data.code ? response.data.code : "",
          assignments: response.data.assignments
            ? response.data.assignments
            : "",
          live_project: response.data.live_project
            ? response.data.live_project
            : "",
          course_overview: response.data.course_overview
            ? response.data.course_overview
            : "",
          course_duration: response.data.course_duration
            ? response.data.course_duration
            : "",
          course_duration_time: response.data.course_duration_time
            ? response.data.course_duration_time
            : "",
          mode1: mode[0],
          mode2: mode[1],
          about_title: response.data.about_title
            ? response.data.about_title
            : "",
          free_demo_description: response.data.free_demo_description
            ? response.data.free_demo_description
            : "",
          about: response.data.about ? response.data.about : "",
          certification_title: response.data.certification_title?response.data.certification_title:"",
          certification: response.data.certification?response.data.certification:"",
          certification_image: response.data.certification_image? response.data.certification_image:"",
          certification_image_alt_tag:
            response.data.certification_image_alt_tag?response.data.certification_image_alt_tag:"",
          project: response.data.project?response.data.project:"",
          project_title: response.data.project_title?response.data.project_title:"",
          project_image: response.data.project_image?response.data.project_image:"",
          project_image_alt_tag: response.data.project_image_alt_tag?response.data.project_image_alt_tag:"",
          project_what_will_get_title:
            response.data.project_what_will_get_title?response.data.project_what_will_get_title:"",
          project_what_will_get: response.data.project_what_will_get?response.data.project_what_will_get:"",
          project_pre_request_title: response.data.project_pre_request_title?response.data.project_pre_request_title:"",
          project_pre_request: response.data.project_pre_request?response.data.project_pre_request:"",
          project_target_audience_title:
            response.data.project_target_audience_title?response.data.project_target_audience_title:"",
          project_target_audience: response.data.project_target_audience?response.data.project_target_audience:"",
          cities: response.data.selected_cities?response.data.selected_cities:"",
          related_course: response.data.selected_related_course?response.data.selected_related_course:"",
          meta_title: response.data.meta_title,
          meta_keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
          og_title: response.data.og_title ? response.data.og_title : "",
          og_url: response.data.og_url ? response.data.og_url : "",
          og_description: response.data.og_description
            ? response.data.og_description
            : "",
          og_image: response.data.og_image ? response.data.og_image : "",

          ssdn_title: response.data.ssdn_title?response.data.ssdn_title:"",
          why_chose_ssdn: response.data.why_chose_ssdn?response.data.why_chose_ssdn:"",
          breadcrumb: response.data.breadcrumb ? response.data.breadcrumb : "",
        });

        setCurriculumValue({
          curriculum_title: response.data.curriculum_title?response.data.curriculum_title:"",
          curriculum: response.data.curriculum?response.data.curriculum:"",
          curriculum_accordion: response.data.curriculum_accordion?response.data.curriculum_accordion:"",
          faqs: response.data.faqs?response.data.faqs:"",
          pdf: response.data.pdf?response.data.pdf:"",
        });
        setBlogValue({
          label1: response.data.blogs?.[0]?.title,
          link1: response.data.blogs?.[0]?.link,
          label1_image: response.data.blogs?.[0]?.image,
          date1: response.data.blogs?.[0]?.date,
          label3_image: response.data.blogs?.[2]?.image,
          label2: response.data.blogs?.[1]?.title,
          link2: response.data.blogs?.[1]?.link,
          image2: response.data.blogs?.[1]?.image,
          date2: response.data.blogs?.[1]?.date,
          label3: response.data.blogs?.[2]?.title,
          link3: response.data.blogs?.[2]?.link,
          date3: response.data.blogs?.[2]?.date,
        });
      } else {
        toast.error(response);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="page-body">
      <Breadcrumb heading={params.id?"Edit Course":"Add Course" }/>
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                {mainForm && <h5>{params.id?"Edit":"Add"} Course</h5>}
                {curriculumForm && <h5> FAQs and Curriculum</h5>}
                {blogForm && <h5> Blogs</h5>}
              </div>
              <div className="card-body">
                {mainForm && (
                  <Formik
                    initialValues={values}
                    validationSchema={VoucherSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                  >
                    {(props) => (
                      <CourseListForm
                        props={props}
                        allCategoryList={allCategoryList}
                        values={values}
                        categoryLists={categoryLists}
                        ogImage={ogImage}
                        setOgImage={setOgImage}
                      />
                    )}
                  </Formik>
                )}

                {curriculumForm && (
                  <Curriculum
                    params={params.id}
                    setBlogForm={setBlogForm}
                    setMainForm={setMainForm}
                    setCurriculumForm={setCurriculumForm}
                    curriculumValue={curriculumValue}
                    setCurriculumValue={setCurriculumValue}
                  />
                )}
                {blogForm && (
                  <CourseBlog
                    setBlogForm={setBlogForm}
                    setMainForm={setMainForm}
                    setCurriculumForm={setCurriculumForm}
                    blogValue={blogValue}
                    values={values}
                    setBlogValue={setBlogValue}
                    curriculumValue={curriculumValue}
                  />
                )}
              </div>
            </div>
          <ToastContainer autoClose={1000} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListAdd;

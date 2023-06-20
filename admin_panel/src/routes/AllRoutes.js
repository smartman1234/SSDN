import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../container/DefaultLayout";
import LoginPage from "../pages/Login/LoginPage";
import ForgetPassword from "../pages/Login/ForgetPassword";
import Home from "../pages/Home/Home";
import StaticPage from "../pages/SitePanel/StaticPages/StaticPage";

import Members from "../pages/Configeration/Members/Members";
import MemberAdd from "../pages/Configeration/Members/MemberAdd";

import Services from "../pages/SitePanel/Services/Services";
import ServiceAdd from "../pages/SitePanel/Services/ServiceAdd";
import CourseCategory from "../pages/SitePanel/Course/Category/CourseCategory";
import CourseList from "../pages/SitePanel/Course/List/CourseList";
import CourseListAdd from "../pages/SitePanel//Course/List/CourseListAdd";
import Combo from "../pages/SitePanel/Course/Combo/Combo";
import ComboAdd from "../pages/SitePanel/Course/Combo/ComboAdd";
import Testimonials from "../pages/SitePanel/Testimonials/Testimonials";
import Faqs from "../pages/SitePanel/Faqs/Faqs";
import FaqAdd from "../pages/SitePanel/Faqs/FaqAdd";
import BatchDetails from "../pages/SitePanel/BatchDetails/BatchDetails";
import CourseMenu from "../pages/SitePanel/CourseMenu/CourseMenu";
import CourseMenuAdd from "../pages/SitePanel/CourseMenu/CourseMenuAdd";
import DepartmentWise from "../pages/SitePanel/StaticPages/ContactUs/DepartmentWise/DepartmentWise";
import DepartmentWiseEdit from "../pages/SitePanel/StaticPages/ContactUs/DepartmentWise/DepartmentWiseEdit";
import BranchLocation from "../pages/SitePanel/StaticPages/ContactUs/BranchLocation/BranchLocation";
import GetInTouch from "../pages/SitePanel/StaticPages/ContactUs/GetInTouch/GetInTouch";
import GetInTouchEdit from "../pages/SitePanel/StaticPages/ContactUs/GetInTouch/GetInTouchEdit";
import MailToEdit from "../pages/SitePanel/StaticPages/ContactUs/GetInTouch/MailToEdit";
import WorkingEdit from "../pages/SitePanel/StaticPages/ContactUs/GetInTouch/WorkingEdit";
import ContactUsStrip from "../pages/SitePanel/StaticPages/ContactUsStrip/ContactUsStrip";
import MetaTag from "../pages/SitePanel/MetaTag/MetaTag";
import Subscribers from "../pages/SitePanel/Subscribers/Subscribers";

import VideoFeedback from "../pages/SitePanel/Course/Feedback/VideoFeedback";
import FeedbackCourse from "../pages/SitePanel/Course/Feedback/FeedbackCourse";
import Client from "../pages/Aboutus/Client/Client";
import ClientAdd from "../pages/Aboutus/Client/ClientAdd";

import AssessmentCategory from "../pages/Assessment/AssessmentCategory/AssessmentCategory";
import AssessmentCourses from "../pages/Assessment/AssessmentCourses/AssessmentCourses";
import AssessmentCoursesAdd from "../pages/Assessment/AssessmentCourses/AssessmentCoursesAdd";

import Category from "../pages/Vouchers/Category/Category";
import List from "../pages/Vouchers/List/List";
import ListAdd from "../pages/Vouchers/List/ListAdd";
import Enquiry from "../pages/Vouchers/Enquiry/Enquiry";

import How from "../pages/Aboutus/How/How";
import Gallery from "../pages/Aboutus/Gallery/Gallery";
import GalleryAdd from "../pages/Aboutus/Gallery/GalleryAdd";
import Timeline from "../pages/Aboutus/Timeline/Timeline";
import TimelineAdd from "../pages/Aboutus/Timeline/TimelineAdd";
import OurCompany from "../pages/Aboutus/OurCompany/OurCompany";
import Companies from "../pages/Aboutus/Companies/Companies";
import CompaniesAdd from "../pages/Aboutus/Companies/CompaniesAdd";
import RewardAdd from "../pages/Aboutus/Rewards/RewardAdd";

import CategoryForm from "../pages/Assessment/AssessmentCategory/CategoryForm";
import ReportedQuestions from "../pages/Assessment/ReportedQuestions/ReportedQuestions";
import ReportedQuestionForm from "../pages/Assessment/ReportedQuestions/ReportedQuestionForm";
import AssessmentFeedback from "../pages/Assessment/Feedback/AssessmentFeedback";
import QuestionList from "../pages/Assessment/AssessmentCourses/Question/QuestionList";
import QuestionEditForm from "../pages/Assessment/AssessmentCourses/Question/QuestionEditForm";
import CategoryAddForm from "../pages/Vouchers/Category/CategoryAddForm";
import QuestionForm from "../pages/Assessment/AssessmentCourses/Question/QuestionForm";

import EventManagementCategory from "../pages/EventManagement/EventManagementCategory/EventManagementCategory";
import EventManagementList from "../pages/EventManagement/EventManagementList/EventManagementList";

import SOCategory from "../pages/SpecialOffer/SOCategory/SOCategory";
import SOCategoryAdd from "../pages/SpecialOffer/SOCategory/SOCategoryAdd";
import SOList from "../pages/SpecialOffer/SOList/SOList";
import SOListListAdd from "../pages/SpecialOffer/SOList/SOListListAdd";

import CreateCoupons from "../pages/DiscountCoupons/CreateCoupons";
import CouponsList from "../pages/DiscountCoupons/CouponsList";
import BranchLocationAddForm from "../pages/SitePanel/StaticPages/ContactUs/BranchLocation/BranchLocationAddForm";
import CategoryAdd from "../pages/SitePanel/Course/Category/CategoryAdd";
import ContactEnquiry from "../pages/SitePanel/StaticPages/ContactUs/ContactEnquiry/ContactEnquiry";
import Related from "../pages/SitePanel/Course/List/Related";
import TrendingList from "../pages/SitePanel/Course/List/TrendingList";
import WhySsdn from "../pages/SitePanel/Course/List/WhySsdn";
import TrustedPartners from "../pages/SitePanel/Course/TrustedPartners";
import TrustedPartnersList from "../pages/SitePanel/Course/TrustedPartnersList";
import BuyTogether from "../pages/SitePanel/Course/BuyTogether";
import BuyTogetherList from "../pages/SitePanel/Course/BuyTogetherList";
import UpcomingBatchesList from "../pages/SitePanel/Course/UpcomingCourse/UpcomingBatchesList";
import UpcomingBatches from "../pages/SitePanel/Course/UpcomingCourse/UpcomingBatches";
import Enquirylist from "../pages/SitePanel/Course/Enquiry/Enquirylist";
import TrainingList from "../pages/SitePanel/Course/TrainingList";
import TrainingForm from "../pages/SitePanel/Course/TrainingForm";
import EnrollmentList from "../pages/SitePanel/Course/UpcomingCourse/EnrollmentList";
import CityList from "../pages/SitePanel/Course/City/CityList";
import CreateCity from "../pages/SitePanel/Course/City/CreateCity";
import CreateVideoFeedback from "../pages/SitePanel/Course/Feedback/CreateVideoFeedback";
import GeneralEnquery from "../pages/GeneralEnquery/GeneralEnquery";
import CurrencyList from "../pages/SitePanel/Currency/CurrencyList";
import CurrencyForm from "../pages/SitePanel/Currency/CurrencyForm";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import ELearningCategoryList from "../pages/ELearning/Category/ELearningCategoryList";
import ELearningCreateCategory from "../pages/ELearning/Category/ELearningCreateCategory";
import ELearningCourseForm from "../pages/ELearning/Course/ELearningCourseForm";
import ELearningCourseList from "../pages/ELearning/Course/ELearningCourseList";
import ELearningCreateVideo from "../pages/ELearning/ELearningCourseVideo/ELearningCreateVideo";
import CreateELearningFaq from "../pages/ELearning/FAQS/CreateELearningFaq";
import TestimonialsAdd from "../pages/SitePanel/Testimonials/TestimonialAdd";
import Blogs from "../pages/LmsPanel/Blogs/Blogs";
import BlogForm from "../pages/LmsPanel/Blogs/BlogForm";
import StudentsList from "../pages/Placement/Students/StudentsList";
import RecruiterList from "../pages/Placement/Recruiters/RecruiterList";
import StudentAddForm from "../pages/Placement/Students/StudentAddForm";
import RecruiterAddForm from "../pages/Placement/Recruiters/RecruiterAddForm";
import JobOpeningAddForm from "../pages/Placement/JobOpening/JobOpeningAddForm";
import JobOpeningList from "../pages/Placement/JobOpening/JobOpeningList";
import WebinarForm from "../pages/EventManagement/Webinar/WebinarForm";
import WebinarList from "../pages/EventManagement/Webinar/WebinarList";
import WebinarRegistrationList from "../pages/EventManagement/Webinar/WebinarRegistrationList";
import EventManagementListForm from "../pages/EventManagement/EventManagementList/EventManagementListForm";
import EvenManagementCategoryAddForm from "../pages/EventManagement/EventManagementCategory/EventManagementCategoryAddForm";
import EventManagementCategoryList from "../pages/EventManagement/EventManagementCategory/EventManagementCategoryList";
import SubscribersList from "../pages/SitePanel/Subscribers/SubscribersList";
import ManageUser from "../pages/ManageUser/ManageUser";
import UserTransaction from "../pages/ManageUser/UserTransaction";
import EventManagementRegistrationList from "../pages/EventManagement/EventManagementRegistration/EventManagementRegistrationList";
import EmailSetting from "../pages/EmailSetting/EmailSetting";
import RoleList from "../pages/Configeration/Role/RoleList";
import CreateRole from "../pages/Configeration/Role/CreateRole";
import PermissionList from "../pages/Configeration/Permission/PermissionList";
import CreatePermission from "../pages/Configeration/Permission/createPermission";
import PermissionRole from "../pages/Configeration/Permission/PermissionRole";
import RewardList from "../pages/Aboutus/Rewards/RewardsList";
import ClientList from "../pages/Aboutus/Client/ClientList";
import CompaniesList from "../pages/Aboutus/Companies/CompaniesList";

function AllRoutes({ isAuthenticated, setIsAuthenticated }) {
  return isAuthenticated ? (
    <DefaultLayout handleAuthState={setIsAuthenticated}>
      <Routes>
        <Route
          exact
          path="/event-management-category"
          element={<EventManagementCategoryList />}
        />
        <Route exact path="/webinar" element={<WebinarList />} />
        <Route exact path="/create-webinar" element={<WebinarForm />} />
        <Route exact path="/edit-webinar/:id" element={<WebinarForm />} />
        <Route
          exact
          path="/webinar-registrations/:id"
          element={<WebinarRegistrationList />}
        />
        <Route exact path="/order-history" element={<OrderHistory />} />
        <Route
          exact
          path="/event-management-category-add"
          element={<EvenManagementCategoryAddForm />}
        />
        <Route
          exact
          path="/event-management-category-edit/:id"
          element={<EvenManagementCategoryAddForm />}
        />
        <Route
          exact
          path="/event-management-list"
          element={<EventManagementList />}
        />
        <Route
          exact
          path="/event-management-list-add"
          element={<EventManagementListForm />}
        />
        <Route
          exact
          path="/event-management-list-edit/:id"
          element={<EventManagementListForm />}
        />
        <Route
          exact
          path="/event-management-registration"
          element={<EventManagementRegistrationList />}
        />
        <Route
          exact
          path="/e-learning-category"
          element={<ELearningCategoryList />}
        />
        <Route
          exact
          path="/create-e-learning-category"
          element={<ELearningCreateCategory />}
        />
        <Route
          exact
          path="/edit-e-learning-category/:id"
          element={<ELearningCreateCategory />}
        />
        <Route
          exact
          path="/e-learning-create-course"
          element={<ELearningCourseForm />}
        />
        <Route
          exact
          path="/e-learning-course"
          element={<ELearningCourseList />}
        />
        <Route
          exact
          path="/e-learning-edit-course/:id"
          element={<ELearningCourseForm />}
        />
        <Route
          exact
          path="/create-e-learning-course-video/:id"
          element={<ELearningCreateVideo />}
        />
        <Route
          exact
          path="/edit-e-learning-course-video/:id"
          element={<ELearningCreateVideo />}
        />
        <Route
          exact
          path="/create-e-learning-faqs"
          element={<CreateELearningFaq />}
        />
        <Route
          exact
          path="/create-testimonials"
          element={<TestimonialsAdd />}
        />
        <Route
          exact
          path="/edit-testimonials/:id"
          element={<TestimonialsAdd />}
        />
        <Route exact path="/special-offer-category" element={<SOCategory />} />
        <Route
          exact
          path="/special-offer-category-add"
          element={<SOCategoryAdd />}
        />
        <Route exact path="/special-offer-list" element={<SOList />} />
        <Route
          exact
          path="/special-offer-list-add"
          element={<SOListListAdd />}
        />
        <Route exact path="/how" element={<How />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/gallery/:id" element={<GalleryAdd />} />
        <Route exact path="/timeline" element={<Timeline />} />
        <Route exact path="/timeline/:id" element={<TimelineAdd />} />
        <Route exact path="/our-company" element={<OurCompany />} />
        <Route exact path="/companies" element={<CompaniesList />} />
        <Route exact path="/companies-add" element={<CompaniesAdd />} />
        <Route exact path="/companies-edit/:id" element={<CompaniesAdd />} />
        <Route exact path="/rewards" element={<RewardList />} />
        <Route exact path="/reward-add" element={<RewardAdd />} />
        <Route exact path="/reward-edit/:id" element={<RewardAdd />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/roles" element={<RoleList />} />
        <Route exact path="/role-add" element={<CreateRole />} />
        <Route exact path="/role-edit/:id" element={<CreateRole />} />
        <Route exact path="/permissions" element={<PermissionList />} />
        <Route exact path="/create-permission" element={<CreatePermission />} />
        <Route exact path="/edit-permission/:id" element={<CreatePermission />} />
        <Route exact path="/permission/role" element={<PermissionRole />} />
        <Route exact path="/members" element={<Members />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/create-blog" element={<BlogForm />} />
        <Route exact path="/edit-blog/:id" element={<BlogForm />} />
        <Route exact path="/member-add" element={<MemberAdd />} />
        <Route exact path="/member-edit/:id" element={<MemberAdd />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/service-add" element={<ServiceAdd />} />
        <Route exact path="/testimonials" element={<Testimonials />} />
        <Route exact path="/faqs" element={<Faqs />} />
        <Route exact path="/faq-add" element={<FaqAdd />} />
        <Route exact path="/batch-details" element={<BatchDetails />} />
        <Route exact path="/course-menu" element={<CourseMenu />} />
        <Route exact path="/course-menu-add" element={<CourseMenuAdd />} />
        <Route exact path="/department-wise" element={<DepartmentWise />} />
        <Route
          exact
          path="/department-wise-edit/:id"
          element={<DepartmentWiseEdit />}
        />
        <Route exact path="/getin-touch" element={<GetInTouch />} />
        <Route exact path="/getin-touch-edit" element={<GetInTouchEdit />} />
        <Route exact path="/mailto-edit" element={<MailToEdit />} />
        <Route exact path="/working-edit" element={<WorkingEdit />} />
        <Route exact path="/contactus-strip" element={<ContactUsStrip />} />
        <Route exact path="/branch-location" element={<BranchLocation />} />
        <Route exact path="/trending-list" element={<TrendingList />} />
        <Route
          exact
          path="/trusted-partners"
          element={<TrustedPartnersList />}
        />
        <Route exact path="/create-partner" element={<TrustedPartners />} />
        <Route exact path="/edit-partner/:id" element={<TrustedPartners />} />
        <Route exact path="/buy-together" element={<BuyTogetherList />} />
        <Route exact path="/create-buy-together" element={<BuyTogether />} />
        <Route exact path="/edit-buy-together/:id" element={<BuyTogether />} />
        <Route exact path="/create-batch" element={<UpcomingBatches />} />
        <Route exact path="/edit-batch/:id" element={<UpcomingBatches />} />
        <Route exact path="/batch-list" element={<UpcomingBatchesList />} />
        <Route exact path="/enroll-list/:id" element={<EnrollmentList />} />
        <Route exact path="/cities-list" element={<CityList />} />
        <Route exact path="/feedback-course" element={<FeedbackCourse />} />
        <Route exact path="/video-feedback" element={<VideoFeedback />} />
        <Route exact path="/create-video" element={<CreateVideoFeedback />} />
        <Route exact path="/edit-video/:id" element={<CreateVideoFeedback />} />
        <Route exact path="/create-city" element={<CreateCity />} />
        <Route exact path="/edit-city/:id" element={<CreateCity />} />
        <Route exact path="/course-enquiry" element={<Enquirylist />} />
        <Route exact path="/training" element={<TrainingList />} />
        <Route exact path="/create-training" element={<TrainingForm />} />
        <Route exact path="/edit-training/:id" element={<TrainingForm />} />
        <Route exact path="/related-form" element={<Related />} />
        <Route exact path="/related-form/:id" element={<Related />} />
        <Route
          exact
          path="/branch-location-add/"
          element={<BranchLocationAddForm />}
        />
        <Route exact path="/contactus-enquiry" element={<ContactEnquiry />} />
        <Route
          exact
          path="/branch-location-edit/:id"
          element={<BranchLocationAddForm />}
        />
        <Route exact path="/meta-tag" element={<MetaTag />} />
        <Route exact path="/subscribers" element={<SubscribersList />} />

        <Route exact path="/client" element={<ClientList />} />
        <Route exact path="/client-add" element={<ClientAdd />} />
        <Route exact path="/client-edit/:id" element={<ClientAdd />} />
        <Route exact path="/students" element={<StudentsList />} />
        <Route exact path="/student-add" element={<StudentAddForm />} />
        <Route exact path="/edit-student/:id" element={<StudentAddForm />} />
        <Route exact path="/recruiters" element={<RecruiterList />} />
        <Route exact path="/recruiter-add" element={<RecruiterAddForm />} />
        <Route
          exact
          path="/recruiter-edit/:id"
          element={<RecruiterAddForm />}
        />
        <Route exact path="/job-opening" element={<JobOpeningList />} />
        <Route exact path="/job-opening-add" element={<JobOpeningAddForm />} />
        <Route
          exact
          path="/job-opening-edit/:id"
          element={<JobOpeningAddForm />}
        />
        <Route exact path="/vouchers-category" element={<Category />} />
        <Route
          exact
          path="/voucher-category-add"
          element={<CategoryAddForm />}
        />
        <Route
          exact
          path="/voucher-category-edit/:id"
          element={<CategoryAddForm />}
        />
        <Route exact path="/vouchers-list" element={<List />} />
        <Route exact path="/voucher-list-add" element={<ListAdd />} />
        <Route exact path="/voucher-list-edit/:id" element={<ListAdd />} />
        <Route exact path="/voucher-enquiry" element={<Enquiry />} />
        <Route exact path="/course-category" element={<CourseCategory />} />
        <Route exact path="/course-category-add" element={<CategoryAdd />} />
        <Route
          exact
          path="/course-category-edit/:id"
          element={<CategoryAdd />}
        />
        <Route exact path="/course-list" element={<CourseList />} />
        <Route exact path="/course-list-add" element={<CourseListAdd />} />
        <Route exact path="/course-list-edit/:id" element={<CourseListAdd />} />
        <Route exact path="/why-ssdn" element={<WhySsdn />} />
        <Route exact path="/course-combo" element={<Combo />} />
        <Route exact path="/course-combo-add" element={<ComboAdd />} />
        <Route
          exact
          path="/assessment-category"
          element={<AssessmentCategory />}
        />
        <Route exact path="/exam-categories-add" element={<CategoryForm />} />
        <Route
          exact
          path="/exam-categories-edit/:id"
          element={<CategoryForm />}
        />
        <Route
          exact
          path="/assessment-courses"
          element={<AssessmentCourses />}
        />
        <Route
          exact
          path="/user-transaction/:id"
          element={<UserTransaction />}
        />
        <Route exact path="/question_form/:id" element={<QuestionForm />} />
        <Route
          exact
          path="/assessment-courses-add"
          element={<AssessmentCoursesAdd />}
        />
        <Route exact path="/question-list/:id" element={<QuestionList />} />
        <Route
          exact
          path="/exam-question-edit/:id"
          element={<QuestionEditForm />}
        />
        <Route
          exact
          path="/assessment-courses-edit/:id"
          element={<AssessmentCoursesAdd />}
        />
        <Route
          exact
          path="/reported-questions"
          element={<ReportedQuestions />}
        />
        <Route
          exact
          path="/view-reported-questions/:id"
          element={<ReportedQuestionForm />}
        />
        <Route exact path="/currency" element={<CurrencyList />} />
        <Route exact path="/create-currency" element={<CurrencyForm />} />
        <Route exact path="/edit-currency/:id" element={<CurrencyForm />} />
        <Route
          exact
          path="/assessment-feedback"
          element={<AssessmentFeedback />}
        />
        <Route exact path="/static-pages" element={<StaticPage />} />
        <Route exact path="/general-enquiry" element={<GeneralEnquery />} />
        <Route exact path="/general-enquiry" element={<GeneralEnquery />} />
        <Route exact path="/add-coupons" element={<CreateCoupons />} />
        <Route exact path="/edit-coupons/:id" element={<CreateCoupons />} />
        <Route exact path="/manage-user" element={<ManageUser />} />
        <Route exact path="/email-setting" element={<EmailSetting />} />
        <Route exact path="/Coupons" element={<CouponsList />} />
        <Route path="*" exact element={<Navigate to="/home" />} />
      </Routes>
    </DefaultLayout>
  ) : (
    <Routes>
      <Route
        exact
        path="/login"
        element={<LoginPage handleAuthState={setIsAuthenticated} />}
      />
      <Route exact path="/forgot_password" element={<ForgetPassword />} />
      <Route path="*" exact element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AllRoutes;

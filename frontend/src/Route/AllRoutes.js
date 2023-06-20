import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DefaultLayout from "../Container/DefaultLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Thankyou from "../Pages/ELearning/ELearningStudy/Thankyou";

import ContactUs from "../Pages/ContactUs/ContactUs";
//import AssessmentDetail from "../Pages/Assessment/AssessmentDetail";
import Login from "../Pages/Login/Login";
import VoucherDetails from "../Pages/Voucher/VoucherDetail/VoucherDetails";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";

import EnquiryThankyou from "../Pages/Course/EnquiryThankyou";
import TermsConditionsPolicy from "../Pages/TermCondition/TermsConditionsPolicy";



const OurRecruiters = React.lazy(() =>
  import("../Pages/Placement/OurRecruiters")
);

const Voucher = React.lazy(() => import("../Pages/Voucher/Voucher"));

const CourseDetails = React.lazy(() => import("../Pages/Course/CourseDetails"));

const Course = React.lazy(() => import("../Pages/Course/Course"));

const CourseCategory = React.lazy(() =>
  import("../Pages/Course/CourseCategory")
);

const RecentPlacementAll = React.lazy(() =>
  import("../Pages/Placement/RecentPlacementAll")
);

const MyVoucher = React.lazy(() => import("../Pages/Profile/MyVoucher"));

const MyCourse = React.lazy(() => import("../Pages/Profile/MyCourse"));

const Testimonials = React.lazy(() =>
  import("../Pages/Testimonials/Testimonials")
);

const MyELearning = React.lazy(() => import("../Pages/Profile/MyELearning"));

const ElearningDetails = React.lazy(() =>
  import("../Pages/ELearning/ElearningDetails")
);

const Elearning = React.lazy(() => import("../Pages/ELearning/Elearning"));

const Search = React.lazy(() => import("../Pages/Search/Search"));

const PaymentDetails = React.lazy(() =>
  import("../Pages/Payment/PaymentDetails")
);

const Enroll = React.lazy(() => import("../Pages/Enroll/Enroll"));

const JobDetail = React.lazy(() => import("../Pages/Placement/JobDetail"));

const Cart = React.lazy(() => import("../Pages/Cart/Cart"));

const EventDetails = React.lazy(() => import("../Pages/Event/EventDetails"));

const MyAssessment = React.lazy(() => import("../Pages/Profile/MyAssessment"));

const TestQuestionList = React.lazy(() =>
  import("../Pages/TestQuestion/TestQuestionList")
);

const PaymentThankYou = React.lazy(() =>
  import("../Pages/Cart/PaymentThankYou")
);

const Payment = React.lazy(() => import("../Pages/Cart/Payment"));

const VoucherThankyou = React.lazy(() =>
  import("../Pages/Cart/VoucherThankyou")
);

const EventStripePayment = React.lazy(() =>
  import("../Pages/Event/EventStripePayemnt")
);

const EnrollPayment = React.lazy(() => import("../Pages/Course/EnrollPayment"));

const OfflineStripePayment = React.lazy(() =>
  import("../Pages/Payment/OfflineStripepayment")
);

const OfflinePaymentThankyou = React.lazy(() =>
  import("../Pages/Cart/OfflinePaymentThankyou")
);

const MyEnroll = React.lazy(() => import("../Pages/Profile/MyEnroll"));

const BlogDetail = React.lazy(() => import("../Pages/Blogs/BlogDetail"));

const PurchaseHistory = React.lazy(() =>
  import("../Pages/Profile/PurchaseHistory")
);

const UpcomingBatches = React.lazy(() =>
  import("../Pages/UpcomingBatches/UpcomingBatches")
);

const AllJobs = React.lazy(() => import("../Pages/Placement/AllJobs"));

const Career = React.lazy(() => import("../Pages/Career/Career"));

const EditProfile = React.lazy(() => import("../Pages/Profile/EditProfile"));

const Event = React.lazy(() => import("../Pages/Event/Event"));

const EventAll = React.lazy(() => import("../Pages/Event/EventAll"));

const Placement = React.lazy(() => import("../Pages/Placement/Placement"));

const Franchise = React.lazy(() => import("../Pages/Franchise/Franchise"));

const SignUp = React.lazy(() => import("../Pages/Login/SignUp"));

const ResetPassword = React.lazy(() => import("../Pages/Login/ResetPassword"));

const ForgetPassword = React.lazy(() =>
  import("../Pages/Login/ForgetPassword")
);

const Otp = React.lazy(() => import("../Pages/Login/Otp"));

const Service = React.lazy(() => import("../Pages/Service/Service"));

const ELearningStudy = React.lazy(() =>
  import("../Pages/ELearning/ELearningStudy/ELearningStudy")
);

const International = React.lazy(() =>
  import("../Pages/International/International")
);

const CategoryVoucher = React.lazy(() =>
  import("../Pages/Voucher/CategoryVoucher")
);

const ExamResult = React.lazy(() => import("../Pages/TestQuestion/ExamResult"));

const ChangePassword = React.lazy(() =>
  import("../Pages/Profile/ChangePassword")
);

const Assessment = React.lazy(() => import("../Pages/Assessment/Assessment"));

const NotFound = React.lazy(() => import("../Pages/NotFound/NotFound"));

const CategoryAssessment = React.lazy(() =>
  import("../Pages/Assessment/CategoryAssessment")
);

const AssessmentDetail = React.lazy(() =>
  import("../Pages/Assessment/AssessmentDetail")
);

const Blogs = React.lazy(() =>
  import("../Pages/Blogs/Blogs")
);

export default function AllRoutes() {
  return (
    <DefaultLayout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/404"
          element={
            <React.Suspense fallback="">
              <NotFound />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/search/:id"
          element={
            <React.Suspense fallback="">
              <Search />
            </React.Suspense>
          }
        />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          exact
          path="/terms-and-conditions"
          element={<TermsConditionsPolicy />}
        />

        <Route
          exact
          path="/services"
          element={
            <React.Suspense fallback="">
              <Service />
            </React.Suspense>
          }
        />
        <Route exact path="/about-us" element={<About />} />
        <Route
          exact
          path="/testimonials"
          element={
            <React.Suspense fallback="">
              <Testimonials />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/upcoming-batch"
          element={
            <React.Suspense fallback="">
              <UpcomingBatches />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/enroll/:id"
          element={
            <React.Suspense fallback="">
              <Enroll />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/upcoming-events"
          element={
            <React.Suspense fallback="">
              <Event />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/event-all"
          element={
            <React.Suspense fallback="">
              <EventAll />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/event/:id"
          element={
            <React.Suspense fallback="">
              <EventDetails />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/franchise"
          element={
            <React.Suspense fallback="">
              <Franchise />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/stripe-payment"
          element={
            <React.Suspense fallback="">
              <Payment />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/event/stripe-payment"
          element={
            <React.Suspense fallback="">
              <EventStripePayment />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/enroll/stripe-payment"
          element={
            <React.Suspense fallback="">
              <EnrollPayment />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/ofline/stripe-payment"
          element={
            <React.Suspense fallback="">
              <OfflineStripePayment />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/course"
          element={
            <React.Suspense fallback="">
              <CourseCategory />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/:id"
          element={
            <React.Suspense fallback="">
              <Course />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/:id/:id"
          element={
            <React.Suspense fallback="">
              <CourseDetails />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/e-learning"
          element={
            <React.Suspense fallback="">
              <Elearning />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/thank-you"
          element={
            <React.Suspense fallback="">
              <Thankyou />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/e-learning/:id"
          element={
            <React.Suspense fallback="">
              <ElearningDetails />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/e-learning-study/:id"
          element={
            <React.Suspense fallback="">
              <ELearningStudy />
            </React.Suspense>
          }
        />
        <Route exact path="/enquiry-thankyou" element={<EnquiryThankyou />} />
        <Route
          exact
          path="/international-students"
          element={
            <React.Suspense fallback="">
              <International />
            </React.Suspense>
          }
        />

        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route
          exact
          path="/assessment"
          element={
            <React.Suspense fallback="">
              <Assessment />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/assessment/:id"
          element={
            <React.Suspense fallback="">
              <CategoryAssessment />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/assessment/:id/:id"
          element={
            <React.Suspense fallback="">
              <AssessmentDetail />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <React.Suspense fallback="">
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/Checkout"
          element={
            <React.Suspense fallback="">
              <Cart />
            </React.Suspense>
          }
        />
        <Route exact path="/ordersuccess" element={<PaymentThankYou />} />
        <Route
          exact
          path="/order-success"
          element={
            <React.Suspense fallback="">
              <VoucherThankyou />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/offline-payment"
          element={
            <React.Suspense fallback="">
              <OfflinePaymentThankyou />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/my-profile"
          element={
            <React.Suspense fallback="">
              <EditProfile />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/my-assessment"
          element={
            <React.Suspense fallback="">
              <MyAssessment />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/my-elearning"
          element={
            <React.Suspense fallback="">
              <MyELearning />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/my-voucher"
          element={
            <React.Suspense fallback="">
              <MyVoucher />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/my-course"
          element={
            <React.Suspense fallback="">
              <MyCourse />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/my-enroll"
          element={
            <React.Suspense fallback="">
              <MyEnroll />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/change-password"
          element={
            <React.Suspense fallback="">
              <ChangePassword />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/purchase-history"
          element={
            <React.Suspense fallback="">
              <PurchaseHistory />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/vouchers"
          element={
            <React.Suspense fallback="">
              <Voucher />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/vouchers/:slug"
          element={
            <React.Suspense fallback="">
              <CategoryVoucher />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/vouchers/:id/:id"
          element={
            <React.Suspense fallback="">
              <VoucherDetails />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/placement"
          element={
            <React.Suspense fallback="">
              <Placement />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/career"
          element={
            <React.Suspense fallback="">
              <Career />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/recent-placementall"
          element={
            <React.Suspense fallback="">
              <RecentPlacementAll />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/payment/"
          element={
            <React.Suspense fallback="">
              <PaymentDetails />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/our-recruiters"
          element={
            <React.Suspense fallback="">
              <OurRecruiters />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/all-jobs"
          element={
            <React.Suspense fallback="">
              <AllJobs />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/job-detail/:id"
          element={
            <React.Suspense fallback="">
              <JobDetail />
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/do-assessment/:id"
          element={
            <React.Suspense fallback="">
              <TestQuestionList />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/exam-result/:id"
          element={
            <React.Suspense fallback="">
              <ExamResult />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/Result"
          element={
            <React.Suspense fallback="">
              <ExamResult />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/blog/"
          element={
            <React.Suspense fallback="">
              <Blogs />
            </React.Suspense>
          }
        />
        <Route exact path="/blog/category/:id" element={  <React.Suspense fallback="">
        <Blogs />
            </React.Suspense>} />

        <Route
          exact
          path="/blog/:id"
          element={
            <React.Suspense fallback="">
              <BlogDetail />
            </React.Suspense>
          }
        />
        {!window.user?.data?.auth_token && (
          <>
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/otp"
              element={
                <React.Suspense fallback="">
                  <Otp />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/otp/:id/:id/:id"
              element={
                <React.Suspense fallback="">
                  <Otp />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <React.Suspense fallback="">
                  <SignUp />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/forget-password"
              element={
                <React.Suspense fallback="">
                  <ForgetPassword />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/reset-password/:token/:email"
              element={
                <React.Suspense fallback="">
                  <ResetPassword />
                </React.Suspense>
              }
            />
          </>
        )}
        <Route exact path="*" element={<Navigate to="/404" />} />
      </Routes>
    </DefaultLayout>
  );
}

import React, { useEffect, useState } from "react";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import MetaService from "../../Services/MetaServices/MetaService";
import SEO from "../SEO/SEO";
import HeadingName from "../HeadingName/HeadingName";
import Help from "./Help";
import FirstRows from "./FirstRows";

const Transportation = React.lazy(() => import("./Transportation"));

const IndustryExpert = React.lazy(() => import("./IndustryExpert"));

const StartToFinish = React.lazy(() => import("./StartToFinish"));

const Flight = React.lazy(() => import("./Flight"));

const VisaHelpDesk = React.lazy(() => import("./VisaHelpDesk"));

const Facility = React.lazy(() => import("./Facility"));

const Accomodation = React.lazy(() => import("./Accomodation"));

const InternationalReviews = React.lazy(() => import("./InternationalReviews"));

export default function International() {
  const [visa, setVisa] = useState([]);
  const [data, setData] = useState({});
  const [detailData, setDetailData] = useState({});
  const [cards, setCards] = useState([]);
  const [faq, setFaq] = useState([]);
  const [students, setStudents] = useState([]);
  const [accommodation, setAccommodation] = useState([]);
  const [meta, setMeta] = useState({});

  const [services, setServices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPageBlock();
    getMetaDataDetail();
  }, []);
  const metaService = new MetaService();

  const getPageBlock = async () => {
    try {
      let response = await metaService.service("international");
      if (response.status === "success") {
        setData(response.data);
        setDetailData(response.data?.page_description);
        setVisa(
          JSON.parse(response.data?.page_description?.country_visa || "[]")
        );
        setFaq(JSON.parse(response.data?.page_description?.faqs || "[]"));
        setStudents(
          JSON.parse(response.data?.page_description?.students || "[]")
        );
        setAccommodation(
          JSON.parse(response.data?.page_description?.accomodations || "[]")
        );
        const arr =
          response.data?.page_description?.flights_services.split(",");
        setServices(arr);

        setCards(
          JSON.parse(
            response.data?.page_description?.fastest_growing_card || "[]"
          )
        );
      }
    } catch (err) {
      throw err;
    }
  };
  const getMetaDataDetail = async () => {
    try {
      let response = await metaService.getMetadetail("international");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
      />
      
      <HeadingName name="International" home="Home" heading="International" />
      
      <FirstRows />
      <React.Suspense fallback="">
        <VisaHelpDesk detailData={detailData} visa={visa} students={students} />
      </React.Suspense>

      <React.Suspense fallback="">
      <IndustryExpert detailData={detailData} />
      </React.Suspense>
     
      <React.Suspense fallback="Loading...">
        <Accomodation detailData={detailData} accommodation={accommodation} />
      </React.Suspense>

      <React.Suspense fallback="">
      <StartToFinish detailData={detailData} />
      </React.Suspense>

      <React.Suspense fallback="">
      <Transportation detailData={detailData} />
      </React.Suspense>
     
     

      <React.Suspense fallback="">
      <Flight detailData={detailData} services={services} />
      </React.Suspense>
    
      <Help detailData={detailData} />

      <React.Suspense fallback="">
      <Facility detailData={detailData} />
      </React.Suspense>
     
      <React.Suspense fallback="">
        <InternationalReviews />
      </React.Suspense>
      <LetUsHelp />
    </>
  );
}

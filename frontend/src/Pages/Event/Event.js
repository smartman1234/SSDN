import React, { useEffect, useState, useContext } from "react";
import SEO from "../SEO/SEO";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import MetaService from "../../Services/MetaServices/MetaService";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";

const Webinar = React.lazy(() => import("./Webinar/Webinar"));
const UpcomingEvent = React.lazy(() => import("./UpcomingEvent"));
export default function Event() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const metaService = new MetaService();
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  useEffect(() => {
    window.scroll(0, 0);
    getmetaData("event");
  }, []);
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("event");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb,
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
        breacrumb={meta?.breadcrumb}
      />
      <HeadingName name="Event / Webinar" home="Home" heading="Event / Webinar" />
      
      <React.Suspense fallback="">
      <UpcomingEvent />
      </React.Suspense>
     
      <React.Suspense fallback="">
        <Webinar />
      </React.Suspense>

      <LetUsHelp />
    </>
  );
}

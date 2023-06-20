import React,{useState,useEffect} from "react";
import CourseService from "../../Services/CourseService/CourseService";

const WhySsdnCard1 = React.lazy(() => import("./WhySsdnCard1"));

const WhySsdncard2 = React.lazy(() => import("./WhySsdncard2"));

const WhySSDNCard3 = React.lazy(() => import("./WhySSDNCard3"));

const WhySSDNCard4 = React.lazy(() => import("./WhySSDNCard4"));

const WhySSdNCard5 = React.lazy(() => import("./WhySSdNCard5"));

const WhySSDNCard6 = React.lazy(() => import("./WhySSDNCard6"));

export default function WhySsdn({ detailData }) {
  const data = detailData?.city_name;
  const [ssdnData, setSsdnData] = useState({});
  const courseServe = new CourseService();
  useEffect(() => {
    whyssdnApi();
  }, []);
  const whyssdnApi = async () => {
    try {
      let response = await courseServe.whyssdn();
      if (response) {
        setSsdnData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat">
      <div className="container eduvibe-animated-shape">
        <div className="col-lg-12">
          <div className="section-title text-start">
            <h3 className="title mb--10">
              {data
                ? ssdnData?.title.replaceAll("{{in VARCITY}}", data)
                : ssdnData?.title?.replaceAll("{{in VARCITY}}", "")}
            </h3>
            <p
              className="ssdn-editor-font"
              dangerouslySetInnerHTML={{
                __html: data
                  ? ssdnData?.description &&
                    ssdnData?.description.replaceAll("{{in VARCITY}}", data)
                  : ssdnData?.description?.replaceAll("{{in VARCITY}}", ""),
              }}
            />
          </div>
        </div>
        <div className="row mt--20">
          <React.Suspense fallback="">
            <WhySsdnCard1 ssdnData={ssdnData} />
          </React.Suspense>

          <React.Suspense fallback="">
            <WhySsdncard2 ssdnData={ssdnData} />
          </React.Suspense>

          <React.Suspense fallback="">
            <WhySSDNCard3 ssdnData={ssdnData} />
          </React.Suspense>

          <React.Suspense fallback="">
            <WhySSDNCard4 ssdnData={ssdnData} />
          </React.Suspense>
          <React.Suspense fallback="">
            <WhySSdNCard5 ssdnData={ssdnData} />
          </React.Suspense>
          <React.Suspense fallback="">
            <WhySSDNCard6 ssdnData={ssdnData} />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}

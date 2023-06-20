import React, { useState, useEffect, useContext } from "react";
import UpComingBatchesService from "../../Services/UpComingBatchesService/UpComingBatchesService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import moment from "moment";
import SEO from "../SEO/SEO";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";
import { Link } from "react-router-dom";
import MetaService from "../../Services/MetaServices/MetaService";

export default function UpcomingBatches() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const batchServe = new UpComingBatchesService();
  const metaService = new MetaService();
  const [batches, setBatches] = useState([]);
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  const [data, setData] = useState({});
  const [category, setCategory] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    upcomimgBatchesListApi();
    coursePageApi();
    getmetaData("upcoming-batches");
  }, []);

  const upcomimgBatchesListApi = async () => {
    try {
      let response = await batchServe.batches();
      if (response) {
        let arr = [];
        for (const property in response.data) {
          arr.push(JSON.parse(property));
          setCategory(response.data);
          setBatches(response.data[property]);
        }
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  const getAnimalsContent = (data) => {
    let content = [];
    for (let item in data) {
      const items = JSON.parse(item);
      const values = data[item];
      content.push(
        <div className="edu-accordion-02" id="accordionExample1">
          <div className="edu-accordion-item bg-active">
            <div className="edu-accordion-header" id="headingOne">
              <button
                className="edu-accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="panel-heading">
                  <div className="heading_block">
                    <h3>{items.name}</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample1"
            >
              <div className="edu-accordion-body">
                <div className="edu-event event-list radius-small">
                  <div className="row">
                    <div className="upcomingBatch">
                      <table className="table table-responsive-desk">
                        <thead>
                          <tr className="align-middle">
                            <th className="text-center">Courses Code</th>
                            <th className="text-center">Courses Name</th>
                            <th className="text-center">Training Methods</th>
                            <th className="text-center">Type of Batch</th>
                            <th className="batchStartdt text-center">
                              {" "}
                              Start Date{" "}
                            </th>
                            <th className="batchPrice text-center">Price</th>
                            <th className="batchEnroll text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.map((v, i) => (
                            <tr key={i}>
                              <td className="align-middle text-center">
                                <Link to="#" className="upcomming-baches-link">
                                  {v?.course?.code
                                    ? v?.course?.code.replaceAll("null", "-")
                                    : "-"}
                                </Link>
                              </td>
                              <td className="align-middle text-center">
                                <Link
                                  to={`/${v.course_category?.slug}/${v?.course?.slug}`}
                                  className="upcomming-baches-link"
                                >
                                  {v?.course?.name}
                                </Link>
                              </td>
                              <td className="align-middle text-center text-nowrap">
                                {v?.training_mode}
                              </td>
                              <td className="align-middle text-center text-nowrap">
                                {v?.mode === "fast_track"
                                  ? "Fast Track"
                                  : "Normal"}
                              </td>
                              <td className="align-middle text-center text-nowrap">
                                {moment(v.start_date).format("MMM Do YYYY")}
                                <p className="mb--0 text-center">
                                  Time : {v.start_time}
                                </p>
                              </td>
                              <td className="align-middle batchPrice text-center">
                                {v.inr_price}
                              </td>
                              <td className="align-middle text-center text-nowrap">
                                <Link
                                  to={`/enroll/${v?.course?.slug}&${
                                    v.batch_id
                                  }&${v.inr_price ? v.inr_price : 0}`}
                                  className="edu-btn btn-dark"
                                >
                                  Enroll Now
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return content;
  };

  const coursePageApi = async () => {
    try {
      let response = await batchServe.pageBlock("upcoming-batches");
      if (response) {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("upcoming-batches");
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
      <HeadingName name="Upcoming Batches" home="Home" heading="Upcoming Batches" />

      <div className="edu-event-grid-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center sal-animate"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                <h3 className="title">{data.block_title}</h3>
              </div>
            </div>
            <div className="col-md-12">
              <p>{data.block_description}</p>
            </div>
            {getAnimalsContent(category)}
          </div>
        </div>
      </div>
      <LetUsHelp />
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function CourseDetailUpComingBatches({
  upcomimgBatches,
  detailData,
}) {
  return (
    <>
      {" "}
      {upcomimgBatches?.length > 0 && (
        <section id={"Upcomimg"}>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="section-title ssdn-bg-color-action text-start">
                  <h4 className="title">Upcoming Batches Courses</h4>
                  <div className="upcomingBatch mt--20">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="text-center">Courses Code</th>
                          <th className="text-center">Courses Name</th>
                          <th className="text-center">Training Methods</th>
                          <th className="text-center">Type of Batch</th>
                          <th className="batchStartdt text-center">
                            Start Date
                          </th>
                          <th className="batchPrice text-center">Price</th>
                          <th className="batchEnroll text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomimgBatches?.map((v, i) => (
                          <tr key={i}>
                            <td className="align-middle text-center">
                              <Link to="#" className="upcomming-baches-link">
                                {v.course?.code}
                              </Link>
                            </td>
                            <td className="align-middle text-center">
                              <Link to="#" className="upcomming-baches-link">
                                {detailData?.city_name
                                  ? v.course?.name?.replaceAll(
                                      "{{in VARCITY}}",
                                      detailData?.city_name
                                    )
                                  : v.course?.name?.replaceAll(
                                      "{{in VARCITY}}",
                                      ""
                                    )}
                              </Link>
                            </td>
                            <td className="align-middle text-center">
                              {detailData?.city_name
                                ? v?.training_mode?.replaceAll(
                                    "{{in VARCITY}}",
                                    detailData?.city_name
                                  )
                                : v?.training_mode?.replaceAll(
                                    "{{in VARCITY}}",
                                    ""
                                  )}
                            </td>
                            <td className="align-middle text-center">
                              {v?.mode === "normal" ? "Normal" : "Fast Track"}
                            </td>
                            <td className="align-middle text-center">
                              {moment(v?.start_date).format("MMM Do YYYY")}
                              <p className="mb--0  text-center">
                                Time: {v?.start_time}
                              </p>
                            </td>
                            <td className="align-middle batchPrice text-center">
                              {v?.inr_price === null ? "-" : v?.inr_price}
                            </td>
                            <td className="align-middle text-center">
                              <Link
                                to={`/enroll/${detailData?.slug}&${
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
        </section>
      )}
    </>
  );
}

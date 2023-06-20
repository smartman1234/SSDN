import React from "react";

export default function CitrixTrainingParts({ active, detailData }) {
  return (
    <div className="tab-content data-conter-inner">
      {active === 0 && (
        <div
          className={
            active === 0
              ? "tab-pane fade show active height-match-section"
              : "tab-pane fade height-match-section"
          }
        >
          <div className="course-tab-content1">
            <div className="our-mission">
              <div className="section-title text-start">
                <p
                  className="ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: detailData?.city_name
                      ? detailData?.project_what_will_get
                          ?.replaceAll("{{in VARCITY}}", detailData?.city_name)
                          ?.replaceAll(
                            "{{<strong>in VARCITY</strong>}}",
                            detailData?.city_name
                          )
                      : detailData?.project_what_will_get
                          ?.replaceAll("{{in VARCITY}}", "")
                          ?.replaceAll("{{<strong>in VARCITY</strong>}}", ""),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {active === 1 && (
        <div
          className={
            active === 1
              ? "tab-pane fade show active height-match-section"
              : "tab-pane fade height-match-section"
          }
        >
          <div className="course-tab-content1">
            <div className="our-mission">
              <div className="section-title text-start">
                <p
                  className="ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: detailData?.city_name
                      ? detailData?.project_pre_request?.replaceAll(
                          "{{in VARCITY}}",
                          detailData?.city_name
                        )
                      : detailData?.project_pre_request?.replaceAll(
                          "{{in VARCITY}}",
                          ""
                        ),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      )}
      {active === 2 && (
        <div
          className={
            active === 2
              ? "tab-pane fade show active height-match-section"
              : "tab-pane fade height-match-section"
          }
        >
          <div className="course-tab-content1">
            <div className="our-mission">
              <div className="section-title text-start">
                <p
                  className="ssdn-editor-font"
                  dangerouslySetInnerHTML={{
                    __html: detailData?.city_name
                      ? detailData?.project_target_audience?.replaceAll(
                          "{{in VARCITY}}",
                          detailData?.city_name
                        )
                      : detailData?.project_target_audience?.replaceAll(
                          "{{in VARCITY}}",
                          ""
                        ),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

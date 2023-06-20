import React, { useState, useEffect } from "react";
import CourseService from "../../Services/CourseService/CourseService";
import { Link } from "react-router-dom";

export default function VideoReviewList({ detailData }) {
  const course = new CourseService();
  const [reviewList, setReviewlist] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 5,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    reviewListApi();
  }, [search]);

  const reviewListApi = async () => {
    let activity = {
      limit: search?.perPage,
      offset: search?.start,
      course_slug: detailData,
    };
    try {
      let response = await course.videoreviewList(activity);
      if (response.status === "success") {
        setTotalCount(response.count);
        setReviewlist(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const loadMoreHandler = () => {
    setSearch({ ...search, perPage: search.perPage + 1 });
  };

  return (
    <>
      {" "}
      {reviewList?.length > 0 && (
        <div className="col-lg-4 text-center">
          <div className="section-title text-center">
            <h3 className="title">Video Reviews</h3>
          </div>
          <div style={{ height: "1000px", overflow: "auto" }}>
            {reviewList.map((v, i) => (
              <div
                className="eduvibe-sidebar course-details-sidebar p-0 mt--20"
                key={i}
              >
                <div className="inner">
                  <div className="eduvibe-widget">
                    <div className="video-area">
                      {v.video_type === "media_file" ? (
                        <div className="thumbnail video-popup-wrapper">
                          <video
                            controls
                            poster={v.thumb_image}
                            style={{ height: "390px" }}
                          >
                            <source
                              src={v.video}
                              type="video/mp4"
                              height="100%"
                              width="100%"
                            />
                          </video>
                        </div>
                      ) : (
                        <div
                          className="thumbnail video-popup-wrapper"
                          dangerouslySetInnerHTML={{
                            __html: v.video.replaceAll(
                              `<iframe loading="lazy" width="560" height="315" `,
                              `<iframe loading="lazy" height="245" title="myFrame"`
                            ),
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {reviewList?.length >= totalCount ? (
              ""
            ) : (
              <div className="eduvibe-widget mt--20">
                <div className="eduvibe-widget-details">
                  <div className="widget-content">
                    <div
                      className="read-more-btn mt--15"
                      onClick={loadMoreHandler}
                    >
                      <Link className="edu-btn w-100 text-center" to="#">
                        See More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

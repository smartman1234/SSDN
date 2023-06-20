import React, { useState, useEffect } from "react";

const HorizontalTimelineContent = React.lazy(() =>
  import("./HorizontalTimeLineContent")
);

export default function Timelane() {
  const [description, setDescription] = useState([]);

  const url = process.env.REACT_APP_API_BASEURL;
  const [Timeline, setTimeline] = useState([]);
  const GetTimeline = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(`${url}web/about/time-line`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setTimeline(result.data);
          let arr = [];
          let description = [];

          arr = result.data.map((v, i) => {
            return v.date;
          });

          description = result.data.map((v, i) => {
            return v.discription;
          });
          setDescription(description.reverse());
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetTimeline();
  }, []);

  const data = Timeline.map((game, index) => {
    return {
      date: game.date,
      component: (
        <div className="card mt-0" style={{ width: "80%", margin: "0 auto" }}>
          <div className="card-body horizontal-timeline">
            <div dangerouslySetInnerHTML={{ __html: game?.discription }}></div>
          </div>
        </div>
      ),
    };
  });
  return (
    <div
      className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image"
      style={{ backgroundColor: "#343a40" }}
    >
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title text-white">Our Timeline</h3>
            </div>
          </div>

          <div className="root-div mt--20">
            <React.Suspense fallback="">
              <HorizontalTimelineContent content={data} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

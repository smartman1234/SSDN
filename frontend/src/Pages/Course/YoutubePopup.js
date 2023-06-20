import React from "react";

export default function YoutubePopup({
  activebutton,
  setActiveButton,
  detailData,
}) {
  return (
    <div
      className={activebutton ? "modal fade show" : "modal fade"}
      id="view-details"
      style={activebutton ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setActiveButton(false)}
            ></button>
          </div>
          <div className="modal-body">            
                <div
                  className="form-group"
                  dangerouslySetInnerHTML={{
                    __html: detailData.we_delvery_video_link.replaceAll(
                      `<iframe loading="lazy" width="560" height="315" `,
                      `<iframe loading="lazy" height="400" title="myFrame"`
                    ),
                  }}
                ></div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

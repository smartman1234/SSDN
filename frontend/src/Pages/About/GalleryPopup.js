import React, {  useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function GalleryPopup({ i, active, setActive, data, setdata,id }) {
  const [selectedIndex, setSelectedIndex] = useState(id);
  const ToggleNext = () => {
    if (selectedIndex == data?.length - 1) {
      return;
    } else {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  };
  const TogglePrev = () => {
    if (selectedIndex == 0) {
      return;
    } else {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    }
  };
  return (
    <>
      <div>
        <Modal open={active} onClose={() => setActive({ [i]: false })} center>
          {" "}
          <div className="edu-gallery-grid">
            <div className="inner">
              <div className="thumbnail ">
                 <LazyLoadImage
                  src={data[selectedIndex].image}
                  style={{ width: "100%" }}
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
          <div className="myDiv">
            <div className="d-flex justify-content-between">
              <div onClick={TogglePrev}>
                <Link to="#" className="previous">
                  &laquo; Previous
                </Link>
              </div>
              <div onClick={() => ToggleNext()}>
                <Link to="#" className="next">
                  Next &raquo;
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

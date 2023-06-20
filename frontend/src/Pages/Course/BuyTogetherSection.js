import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Container/Context";
import { ToastContainer } from "react-toastify";
import BuyTogetherServices from "../../Services/BuyTogetherService/BuyTogetherService";
import FirstRowCourse from "./FirstRowCourse";
import BuyTogetherCardTotal from "./BuyTogetherCardTotal";

const CourseDetailOverview = React.lazy(() =>
  import( "./CourseDetailOverview")
);

const CourseModes = React.lazy(() =>
  import( "./CourseModes")
);

const BuyTogetherCourse2 = React.lazy(() =>
  import( "./BuyTogetherCourse2")
);

const BuyTogetherOtherCourse2Voucher = React.lazy(() =>
  import( "./BuyTogetherOtherCourse2Voucher")
);

const BuyTogetherOtherCourse2Assessment = React.lazy(() =>
  import("./BuyTogetherOtherCourse2Assessment")
);

const BuyTogetherCourse1 = React.lazy(() =>
  import("./BuyTogetherCourse1")
);

const BuyTogethermainCourse = React.lazy(() =>
  import("./BuyTogethermainCourse")
);

const BuyTogetherOtherCourse1Assessment = React.lazy(() =>
  import("./BuyTogetherOtherCourse1Assessment")
);

const BuyTogetherOtherCourse1Voucher = React.lazy(() =>
  import("./BuyTogetherOtherCourse1Voucher")
);

export default function BuyTogetherSection({
  detailData,
  setCourseEnquiry,
  params,
  currency,
}) {
  const { cartData } = useContext(CartContext);

  const buy_together = new BuyTogetherServices();

  const [buytogether, setBuyTogether] = useState({});

  const [addedtoCart, setAddedToCart] = useState({});
  const [checked, setChecked] = useState([{ type: "", id: "" }]);
  const [coursePrice, setCoursePrice] = useState([]);
  const [addOnPrice, setAddOnPrice] = useState(0);
  const [totalPrice, settotalPrice] = useState(
    buytogether?.main_course?.payable_price
  );

  const buyTogetherApi = async () => {
    try {
      let response = await buy_together.buyTogether(params);
      if (response) {
        setBuyTogether(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    buyTogetherApi();
    settotalPrice(buytogether?.main_course?.payable_price);
  }, []);

  const selectedCourseHandler = (e, id, type, price) => {
    let preSetMixCat;
    let prices = [...coursePrice];
    if (e.target.checked) {
      if (!checked.includes(id)) {
        preSetMixCat = [...checked, { id: id, type: type }];
        setChecked(preSetMixCat);
        prices = [...coursePrice, price];
        const sumWithInitial = prices.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        setAddOnPrice(sumWithInitial);
        settotalPrice(buytogether?.main_course?.payable_price + sumWithInitial);
        setCoursePrice(() => [...coursePrice, price]);
      }
      setChecked(() => [...checked, { id: id, type: type }]);
    } else {
      preSetMixCat = checked.filter((v) => {
        return v.id != id;
      });
      prices.splice(prices.indexOf(id), 1);
      const sumWithInitial = prices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      settotalPrice(
        buytogether?.main_course?.payable_price + parseInt(sumWithInitial)
      );
      setAddOnPrice(sumWithInitial);
      setCoursePrice(prices);
      setChecked(preSetMixCat);
    }
  };

  useEffect(() => {
    if (cartData.length) {
      if (cartData[0]?.length) {
        for (const item of cartData[0]) {
          setAddedToCart((prevState) => ({
            ...prevState,
            [item.course?.id]: true,
          }));
        }
      }
    }
  }, [cartData]);

  return (
    <>
      <FirstRowCourse />

      <div
        className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat pb--30 "
        id="Overview"
        style={{
          backgroundImage: "url(/assets/images/SSDN_BG.png)",
        }}
      >
        <div className="container eduvibe-animated-shape">
        <React.Suspense fallback="">
        <CourseDetailOverview detailData={detailData} />
              </React.Suspense>

              <React.Suspense fallback="">
              <CourseModes
            detailData={detailData}
            setCourseEnquiry={setCourseEnquiry}
          />
              </React.Suspense>
        
         

          {detailData?.price_type === "paid" && (
            <>
              {" "}
              <div className="row mt--30">
                <h2 className="ssdn-heading text-center text-white mb--4">
                  {buytogether?.heading}
                </h2>
              </div>
              <div className="row mt--0">
                <div className="col-md-9">
                  <div className="row d-flex">
                    <React.Suspense fallback="">
                      <BuyTogethermainCourse
                        buytogether={buytogether}
                        currency={currency}
                      />
                    </React.Suspense>
                    <React.Suspense fallback="">
                      <BuyTogetherOtherCourse1Assessment
                        buytogether={buytogether}
                        currency={currency}
                        selectedCourseHandler={selectedCourseHandler}
                      />
                    </React.Suspense>
                    <React.Suspense fallback="">
                      <BuyTogetherOtherCourse1Voucher
                        buytogether={buytogether}
                        currency={currency}
                        selectedCourseHandler={selectedCourseHandler}
                      />
                    </React.Suspense>

                    <React.Suspense fallback="">
                      <BuyTogetherCourse1
                        buytogether={buytogether}
                        currency={currency}
                        selectedCourseHandler={selectedCourseHandler}
                      />
                    </React.Suspense>
                    <React.Suspense fallback="">
                      <BuyTogetherOtherCourse2Assessment
                        buytogether={buytogether}
                        currency={currency}
                        selectedCourseHandler={selectedCourseHandler}
                      />
                    </React.Suspense>

                    <React.Suspense fallback="">
                      <BuyTogetherOtherCourse2Voucher
                        buytogether={buytogether}
                        currency={currency}
                        selectedCourseHandler={selectedCourseHandler}
                      />
                    </React.Suspense>

                    <React.Suspense fallback="">
                      <BuyTogetherCourse2
                        buytogether={buytogether}
                        currency={currency}
                        selectedCourseHandler={selectedCourseHandler}
                      />
                    </React.Suspense>
                  </div>
                </div>
                <BuyTogetherCardTotal
                  buytogether={buytogether}
                  currency={currency}
                  checked={checked}
                  setAddedToCart={setAddedToCart}
                  addedtoCart={addedtoCart}
                  addOnPrice={addOnPrice}
                  totalPrice={totalPrice}
                />
              </div>
            </>
          )}
        </div>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}

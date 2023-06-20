import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import UserService from "../../Services/UserService";
import moment from "moment";

export default function PurchaseHistoryDetail({ active, setActive, id,data }) {
  const [historyDetail, setHistoryDeatil] = useState({});
  const [puchase, setPurchase] = useState([]);
  const userServe = new UserService();
  useEffect(() => {
    PurchaseHistoryListApi();
  }, []);
  const PurchaseHistoryListApi = async () => {
    try {
      let res = await userServe.purchaseHistorydetail(id);
      if (res) {
        setPurchase([res.data]);
        setHistoryDeatil(res.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div
      className={active ? "modal fade show" : "modal fade"}
      id="view-details"
      style={active ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              View Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setActive(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="eduvibe-widget-details">
                <div className="widget-content card-body pt--0">
                  <ul>
                    <li>
                      {puchase.length > 0 &&
                        puchase.map((v, i) => (
                          <>
                            <span  key={i}>
                              <>
                                {v.assessment?.length > 0 &&
                                  v.assessment.map((assessment, i) => (
                                    <>{assessment?.name} </>
                                  ))}{" "}
                                {v.voucher?.length > 0 &&
                                  v?.voucher.map((voucher, i) => (
                                    <>{voucher?.name} </>
                                  ))}
                                {v?.course?.length > 0 &&
                                  v?.course?.map((course, i) => course.name)}
                              </>
                            </span>
                          </>
                        ))}
                    </li>

                    <li>
                      <span>Date </span>
                      <span className="design-data1">-</span>
                      <span>
                        {data.transaction_date
                          ? moment(data.transaction_date).format(
                              "DD-MM-YYYY"
                            )
                          : moment(data.created_at).format(
                              "DD-MM-YYYY"
                            )}
                      </span>
                    </li>

                    <li>
                      <span>Payment Id </span>
                      <span className="design-data1">-</span>
                      <span>{historyDetail?.payment_id}</span>
                    </li>

                    <li>
                      <span>MRP </span>
                      <span className="design-data1">-</span>
                      <span>
                        {historyDetail.currency_symbol}{" "}
                        {historyDetail?.mrp ? historyDetail?.mrp : "0"}
                      </span>
                    </li>
                    <li>
                      <span>Discount on MRP </span>
                      <span className="design-data1">-</span>
                      <span>
                        {historyDetail.currency_symbol}
                        {historyDetail?.discount_on_mrp
                          ? historyDetail?.discount_on_mrp
                          : "0"}
                      </span>
                    </li>
                    <li>
                      <span>GST </span>
                      <span className="design-data1">-</span>
                      <span>
                        {historyDetail.currency_symbol}
                        {historyDetail?.gst ? historyDetail?.gst : 0}
                      </span>
                    </li>
                    <li>
                      <span>Transaction Charge </span>
                      <span className="design-data1">-</span>
                      <span>
                        {historyDetail.currency_symbol}
                        {historyDetail?.transaction_charge_amount
                          ? historyDetail?.transaction_charge_amount
                          : 0}
                      </span>
                    </li>
                    <li>
                      <span>Total Amount</span>
                      <span className="design-data1">-</span>
                      <span>
                        {historyDetail.currency_symbol}
                        {historyDetail?.payable_price
                          ? historyDetail?.payable_price
                          : 0}
                      </span>
                    </li>
                    <li>
                      <span>Payment Status </span>
                      <span className="design-data1">-</span>
                      <span
                        className={
                          historyDetail.status === "success"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {historyDetail.status}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

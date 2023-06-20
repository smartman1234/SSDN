import React from "react";
import Utils from "../../utils/Utils";
const DiscountCoupons = ({ data }) => {
  return (
    <>
      <div className="card-body pb-0">
        <div className="card">
          <div className="card-header">
            <h5>Discount Coupons</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-lg-9">
                <div className="card o-hidden border-0">
                  <div className="card-header p-0">
                    <h6>Top 5 saler</h6>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Coupon Owner</th>
                          <th scope="col">Coupon Code</th>
                          <th scope="col">No of Uses</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.top_saler  &&
                          data.top_saler.map((v, i) => (
                            <tr key={i}>
                              <th scope="row">{i+1}</th>
                              <td>{Utils.titleCase(v?.coupon?.owner)}</td>
                              <td>{v?.coupon?.code}</td>
                              <td>{v.total_use}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card o-hidden border-0">
                  <div className="bg-primary b-r-4 card-body">
                    <div className="media static-top-widget">
                      <div className="align-self-center text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-database"
                        >
                          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                      </div>
                      <div className="media-body">
                        <span className="m-0">Expiring in 10 days</span>
                        <h4 className="mb-0 counter">6659</h4>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-database icon-bg"
                        >
                          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountCoupons;

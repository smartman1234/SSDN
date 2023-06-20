import React from "react";
import Utils from "../../Utils/Utils";
import moment from "moment";

export default function PaymentUserDetailCard({ payment }) {
  return (
    <>
      {" "}
      <div className="d-none d-md-block">
        <table className="table table-bordered mb--30">
          <tbody>
            <tr>
              <td>
                <strong>Name :</strong> {Utils.titleCase(payment?.name)}
              </td>
              <td className="text-end">
                <strong>Date : </strong>
                {moment(payment?.date).format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Email :</strong> {payment?.email}
              </td>
              <td className="text-end">
                <strong>Order ID :</strong> {payment?.order_id}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Contact :</strong>{" "}
                {payment?.contact_no ||
                  payment?.contact_number ||
                  payment?.mobile}
              </td>
              <td className="text-end">
                <strong>Invoice ID :</strong> {payment?.invoice_id}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-md-none">
        <table className="table table-bordered mb--30">
          <tbody>
            <tr>
              <td>
                <strong>Name :</strong> {Utils.titleCase(payment?.name)}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Date : </strong>
                {moment(payment?.date).format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Email :</strong> {payment?.email}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Order ID :</strong> {payment?.order_id}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Contact :</strong>{" "}
                {payment?.contact_no ||
                  payment?.contact_number ||
                  payment?.mobile}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Invoice ID :</strong> {payment?.invoice_id}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

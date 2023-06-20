import React from 'react'
import Utils from "../../Utils/Utils";
import moment from "moment";

export default function EnrollAndEventUserDetailPaymentCard({payment}) {
  return (
    <table className="table table-bordered mb--30">
    <tbody>
      <tr>
        <td>
          <strong>Name:</strong>{" "}
          {Utils.titleCase(
            payment?.data?.name ||
              payment?.data?.billing_details?.name
          )}
        </td>
        <td className="text-end">
          <strong>Date : </strong>
          {moment(payment?.date).format("DD-MM-YYYY")}
        </td>
      </tr>
      <tr>
        <td>
          <strong>Email :</strong>{" "}
          {payment?.data?.email ||
            payment?.data?.billing_details?.email}
        </td>
        <td className="text-end">
          <strong>Order ID :</strong>{" "}
          {payment?.data?.order_id}
        </td>
      </tr>
      <tr>
        <td>
          <strong>Contact :</strong>{" "}
          {payment?.data?.contact_no ||
            payment?.data?.contact_number ||
            payment?.data?.mobile ||
            payment?.data?.billing_details?.contact_number}
        </td>
        <td className="text-end">
          <strong>Invoice ID :</strong>{" "}
          {payment?.data?.invoice_id}
        </td>
      </tr>
    </tbody>
  </table>
  )
}

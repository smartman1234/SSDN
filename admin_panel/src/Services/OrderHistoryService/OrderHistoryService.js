import Utils from "../../utils/Utils";
export default class OrderHistoryService {

  list(payload) {
    return Utils.sendApiRequest(
      "order-history",
      "POST",
      true,
      payload
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  getData(payload) {
    return Utils.sendApiRequest(
      "about/get-contact-block",
      "GET",
      true,
      payload
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  enquiryList(payload) {
    return Utils.sendApiRequest(
      "contact/contact-us",
      "POST",
      true,
      payload
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
 
}

import Utils from "../../Utils/Utils";
export default class EnquiryService {
  enquiry(payload) {
    return Utils.sendApiRequest("web/enquiry", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

}

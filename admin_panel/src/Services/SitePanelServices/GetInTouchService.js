import Utils from "../../utils/Utils";
export default class ContactusService {
  contact(payload) {
    return Utils.sendApiRequest(
      "contact/update-getintouch",
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
  get(payload) {
    return Utils.sendApiRequest("contact/get-getintouch", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

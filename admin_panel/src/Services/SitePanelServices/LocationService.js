import Utils from "../../utils/Utils";
export default class MetaTagsService {
  getData(id) {
    return Utils.sendApiRequest("contact/get-location/" + id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updatedata(payload) {
    return Utils.sendApiRequest(
      "contact/update-location",
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
  createdata(payload) {
    return Utils.sendApiRequest(
      "contact/create-location",
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

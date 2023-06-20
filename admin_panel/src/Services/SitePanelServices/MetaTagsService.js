import Utils from "../../utils/Utils";
export default class MetaTagsService {
  createmeta(payload) {
    return Utils.sendApiRequest(
      "meta/create-update-meta",
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

  getMetadetail(id) {
    return Utils.sendApiRequest("meta/get-meta/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

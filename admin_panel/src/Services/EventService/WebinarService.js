import Utils from "../../utils/Utils";
export default class PlacementService {
  List(payload) {
    return Utils.sendApiRequest("webinar/webinar-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  registrationlist(payload) {
    return Utils.sendApiRequest("webinar/webinar-register-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getDetail(id) {
    return Utils.sendApiRequest("webinar/webinar-detail/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(id) {
    return Utils.sendApiRequest("webinar/webinar-delete/" + id, "DELETE", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  Status(payload) {
    return Utils.sendApiRequest(
      "webinar/active-inactive-webinar",
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

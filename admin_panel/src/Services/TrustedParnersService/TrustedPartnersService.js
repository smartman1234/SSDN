import Utils from "../../utils/Utils";
export default class TrendingService {
  partnerslist(payload) {
    return Utils.sendApiRequest(
      "partner/get-our-partner-list",
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

  createpartner(payload) {
    return Utils.sendApiRequest(
      "partner/create-our-partner",
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

  updatepartner(payload) {
    return Utils.sendApiRequest(
      "partner/update-our-partner",
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

  deletepartner(id) {
    return Utils.sendApiRequest(
      "partner/delete-our-partner/" + id,
      "DELETE",
      true,
      id
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  getDetail(id) {
    return Utils.sendApiRequest(
      "partner/get-our-partner/" + id,
      "GET",
      true,
      id
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

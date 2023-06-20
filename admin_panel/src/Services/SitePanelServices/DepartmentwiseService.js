import Utils from "../../utils/Utils";
export default class ContactusService {
  update(payload) {
    return Utils.sendApiRequest(
      "contact/update-department",
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

  create(payload) {
    return Utils.sendApiRequest(
      "contact/create-department",
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

  get(id) {
    return Utils.sendApiRequest("contact/get-department/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  list(payload) {
    return Utils.sendApiRequest(
      "contact/get-department-list",
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
}

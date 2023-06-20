import Utils from "../../utils/Utils";
export default class CurrencyService {
  list(payload) {
    return Utils.sendApiRequest(
      "currency/get-currency-list",
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
      "currency/create-currency",
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
  update(payload) {
    return Utils.sendApiRequest(
      "currency/update-currency",
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
  getDetail(id) {
    return Utils.sendApiRequest(
      "currency/get-currency-detail/" + id,
      "GET",
      true
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  status(payload) {
    return Utils.sendApiRequest("currency/change-status", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  delete(id) {
    return Utils.sendApiRequest(
      "currency/delete-currency/" + id,
      "DELETE",
      true
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

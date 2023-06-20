import Utils from "../../Utils/Utils";
export default class CurrencyService {
  currency(payload) {
    return Utils.sendApiRequest("web/get-currency-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  detail(id) {
    return Utils.sendApiRequest("web/get-currency-detail/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

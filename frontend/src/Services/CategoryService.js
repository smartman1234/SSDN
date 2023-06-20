import Utils from "../Utils/Utils";
export default class CategoryService {
  categoryList(id) {
    return Utils.sendApiRequest(
      "web/assessment-category-list/" + id,
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
  vouchercategoryList(id) {
    return Utils.sendApiRequest(`web/voucher-category-list/${id}`, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

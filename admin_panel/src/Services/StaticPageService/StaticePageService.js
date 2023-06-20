import Utils from "../../utils/Utils";
export default class StaticpageService {
  static(payload) {
    return Utils.sendApiRequest("page/create-page-block", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getDetails(id) {
    return Utils.sendApiRequest("page/get-page-block/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  realtedList(payload) {
    return Utils.sendApiRequest("course/course-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

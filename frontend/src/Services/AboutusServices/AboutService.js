import Utils from "../../Utils/Utils";
export default class AboutService {
  AboutList(payload) {
    return Utils.sendApiRequest("web/about-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  whoweare(payload) {
    return Utils.sendApiRequest("web/about/about-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

import Utils from "../../Utils/Utils";
export default class MetaService {


  getintouch(payload) {
    return Utils.sendApiRequest("web/contact-get-in-touch" , "GET", payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  query(payload) {
    return Utils.sendApiRequest("web/contact-us" , "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

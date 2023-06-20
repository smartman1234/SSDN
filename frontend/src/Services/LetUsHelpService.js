import Utils from "../Utils/Utils";
export default class CategoryService {
  contact(id) {
    return Utils.sendApiRequest(
      "web/contact-block" ,
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

}

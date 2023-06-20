import Utils from "../../utils/Utils";
export default class BlogService {
  getDetail(id) {
    return Utils.sendApiRequest("blog/get-blog/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  list(payload) {
    return Utils.sendApiRequest("blog/get-blog-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(id) {
    return Utils.sendApiRequest("blog/delete-blog/" + id, "DELETE", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  frontChange(payload) {
    return Utils.sendApiRequest(
      "blog/front-category-blog",
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

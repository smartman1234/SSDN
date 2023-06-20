import Utils from "../../utils/Utils";
export default class ELearningCategoryService {
  list(payload) {
    return Utils.sendApiRequest("e-learning/categories", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  edit(id) {
    return Utils.sendApiRequest("e-learning/category/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  parentcategory(payload) {
    return Utils.sendApiRequest(
      "e-learning/category-list",
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

  delete(id) {
    return Utils.sendApiRequest(
      "e-learning/delete-category/" + id,
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

  uniqueslug(payload) {
    return Utils.sendApiRequest(
      "e-learning/category-list",
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

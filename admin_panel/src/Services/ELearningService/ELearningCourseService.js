import Utils from "../../utils/Utils";
export default class ELearningCourseService {
  list(payload) {
    return Utils.sendApiRequest(
      "e-learning/get-course-list",
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

  edit(id) {
    return Utils.sendApiRequest("e-learning/get-courses/" + id, "GET", true)
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

  uniqueslug(payload) {
    return Utils.sendApiRequest(
      "e-learning/name-slug-unique",
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

  delete(id) {
    return Utils.sendApiRequest(
      "e-learning/delete-courses/" + id,
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

  status(payload) {
    return Utils.sendApiRequest(
      "e-learning/change-course-status",
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
  faqList(payload) {
    return Utils.sendApiRequest("e-learning/faq-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  faqDelete(id) {
    return Utils.sendApiRequest("e-learning/delete-faq/" + id, "DELETE", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

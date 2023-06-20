import Utils from "../../Utils/Utils";
export default class ELearningService {
  courseList(payload) {
    return Utils.sendApiRequest(
      "web/e-learning-course-list",
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

  categoryList(payload) {
    return Utils.sendApiRequest(
      "web/e-learning-category-list",
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

  elearningDetail(id) {
    return Utils.sendApiRequest("web/e-learning-course/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  videoList(id) {
    return Utils.sendApiRequest("user/e-learning-course-video/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  myelearning(payload) {
    return Utils.sendApiRequest("user/my-e-learning-course-list" , "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  elearningfaqs(payload) {
    return Utils.sendApiRequest("web/e-course-faq" , "GET", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

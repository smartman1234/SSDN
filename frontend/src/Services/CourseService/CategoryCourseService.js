import Utils from "../../Utils/Utils";
export default class CategoryCourseService {
  softwarecategory(payload) {
    return Utils.sendApiRequest(
      "web/course-category-type/software",
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
  infrastructurecategory(payload) {
    return Utils.sendApiRequest(
      "web/course-category-type/infrastructure",
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
  trndingcourse(payload) {
    return Utils.sendApiRequest(
      "web/trending-course-list",
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
  courseList(id) {
    return Utils.sendApiRequest("web/course-list/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  trendingassessmentandvoucher(payload) {
    return Utils.sendApiRequest(
      "web/trending-voucher-assessment",
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

  staticPage(id) {
    return Utils.sendApiRequest("web/get-page-block/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

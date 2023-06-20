import Utils from "../../utils/Utils";
export default class CourseService {
  courseList(payload) {
    return Utils.sendApiRequest("course/categories", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  createCourseCategory(payload) {
    return Utils.sendApiRequest("course/category-create", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updateCourseCategory(payload) {
    return Utils.sendApiRequest("course/update-category", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getCourseCategorydata(id) {
    return Utils.sendApiRequest("course/category/" + id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  parentcategory(payload) {
    return Utils.sendApiRequest("course/category-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  frontPage(payload) {
    return Utils.sendApiRequest("course/font-page", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(id) {
    return Utils.sendApiRequest(
      "course/delete-category/" + id,
      "DELETE",
      true,
      id
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  whyssdn(payload) {
    return Utils.sendApiRequest("why-ssdn/create-update", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  whyssdndetail(payload) {
    return Utils.sendApiRequest("why-ssdn/get", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  courseListforCoupon(payload) {
    return Utils.sendApiRequest("course/course-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

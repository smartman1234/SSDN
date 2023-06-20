import Utils from "../../utils/Utils";
export default class CourseService {
  courseList(payload) {
    return Utils.sendApiRequest("course/get-course-list", "POST", true, payload)
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

  changeStatus(payload) {
    return Utils.sendApiRequest("course/change-status", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(id) {
    return Utils.sendApiRequest("course/delete-list/" + id, "DELETE", true, id)
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

  ListOfCities(payload) {
    return Utils.sendApiRequest("city/cities", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getData(id) {
    return Utils.sendApiRequest("course/get-course/" + id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  relatedassessment(payload) {
    return Utils.sendApiRequest(
      "assessment-list/trending",
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
  editrelatedassessment(id) {
    return Utils.sendApiRequest(
      "assessment-list/trending/"+id,
      "GET",
      true,
      
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  relatedvoucher(payload) {
    return Utils.sendApiRequest("voucher-list/trending", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  editrelatedvoucher(id) {
    return Utils.sendApiRequest("voucher-list/trending/"+id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  uniqueslug(payload) {
    return Utils.sendApiRequest(
      "course/name-slug-unique",
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

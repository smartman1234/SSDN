import Utils from "../../Utils/Utils";
export default class CourseService {
  courseList(payload) {
    return Utils.sendApiRequest("web/course-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  categorylist(payload) {
    return Utils.sendApiRequest(
      "web/course-category-list",
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

  detailCourse(id) {
    return Utils.sendApiRequest("web/course/" + id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  whyssdn(payload) {
    return Utils.sendApiRequest("web/get-why-ssdn", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  query(payload) {
    return Utils.sendApiRequest("web/enquiry", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  enroll(payload) {
    return Utils.sendApiRequest("web/enroll", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  enrollPayment(payload) {
    return Utils.sendApiRequest("web/enroll-payment-callback", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
enrollstripepayment(payload) {
  return Utils.sendApiRequest("web/enroll-payment-stripe-callback", "POST", true, payload)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
}

  mycourse(payload) {
    return Utils.sendApiRequest("user/my-course-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  reviewForm(payload) {
    return Utils.sendApiRequest("web/add-course-review", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  reviewList(payload) {
    return Utils.sendApiRequest("web/course-review-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  videoreviewList(payload) {
    return Utils.sendApiRequest("web/course-video-review-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

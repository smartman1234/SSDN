import Utils from "../../utils/Utils";
export default class BatchService {
  create(payload) {
    return Utils.sendApiRequest("course/create-batch", "Post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  update(payload) {
    return Utils.sendApiRequest("course/update-batch", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getDetail(id) {
    return Utils.sendApiRequest("course/get-batch/" + id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  batchlist(payload) {
    return Utils.sendApiRequest("course/get-batch-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  enrolllist(payload, id) {
    return Utils.sendApiRequest(
      "course/enroll-list/" + id,
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
    return Utils.sendApiRequest("course/delete-batch/" + id, "DELETE", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  courseList(payload) {
    return Utils.sendApiRequest("course/course-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  trainingMode(payload) {
    return Utils.sendApiRequest("traning/get-all-mode", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  enquiry(payload) {
    return Utils.sendApiRequest("course-enquires", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  generalenquiry(payload) {
    return Utils.sendApiRequest("enquires", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

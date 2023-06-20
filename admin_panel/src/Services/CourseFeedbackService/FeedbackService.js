import Utils from "../../utils/Utils";
export default class FeedbackService {
  feedback(payload) {
    return Utils.sendApiRequest("course/feedback-list", "Post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  changestatus(payload) {
    return Utils.sendApiRequest("course/feedback-update", "Post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteFeedback(id) {
    return Utils.sendApiRequest("course/feedback-delete/"+id, "DELETE", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  videoFeedbackList(payload) {
    return Utils.sendApiRequest("course-feedback/list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  createVideoFeedback(payload) {
    return Utils.sendApiRequest("course-feedback/create", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updateVideoFeedback(payload) {
    return Utils.sendApiRequest("course-feedback/update", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  detailVideoFeedback(id) {
    return Utils.sendApiRequest("course-feedback/detail/"+id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  deleteVideoFeedback(id) {
    return Utils.sendApiRequest("course-feedback/delete/"+id, "DELETE", true, id)
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


}

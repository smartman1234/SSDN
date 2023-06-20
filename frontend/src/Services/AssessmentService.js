import Utils from "../Utils/Utils";
export default class AssessmentService {
  assessmentList(payload) {
    return Utils.sendApiRequest("web/assessment-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  assessmentDetail(id) {
    return Utils.sendApiRequest("web/get-assessment/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  myAssessment(payload) {
    return Utils.sendApiRequest(
      "user/my-assessment-list",
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

  assessmentFeedback(payload) {
    return Utils.sendApiRequest(
      "web/assessment-feedback",
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

  reviewList(payload) {
    return Utils.sendApiRequest(
      "web/assessment-feedback-list",
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

  assessmentlog(id) {
    return Utils.sendApiRequest(
      "user/assessment-result-list/"+id,
      "GET",
      true
      
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  questionlog(id) {
    return Utils.sendApiRequest(
      "user/assessment-result-detail/"+id,
      "GET",
      true
      
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  repurchase(payload) {
    return Utils.sendApiRequest(
      "user/re-purchase-assessment",
      "POST",
      true,payload
      
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

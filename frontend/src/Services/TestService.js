import Utils from "../Utils/Utils";
export default class TestService {
  testQuestionList(payload) {
    return Utils.sendApiRequest(
      "user/assessment-test-start",
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

  testsubmitted(payload) {
    return Utils.sendApiRequest(
      "user/assessment-test-end",
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

  answersubmitted(payload) {
    return Utils.sendApiRequest(
      "user/assessment-submit-answer",
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

  testResultData(id) {
    return Utils.sendApiRequest("user/assessment-result-detail/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  reportQuestion(payload) {
    return Utils.sendApiRequest(
      "user/assessment-report-question",
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

  certificate(id) {
    return Utils.sendApiRequest(
      "web/download-certificate/"+id,
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
}

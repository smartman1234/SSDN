import Utils from "../utils/Utils";
export default class ReportedQuestionService {
  reportedQuestionsList(payload) {
    return Utils.sendApiRequest(
      "assessment-reported-questions",
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

  questionDetail(dataId) {
    return Utils
      .sendApiRequest("assessment-reported-question/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updateQuestion(payload) {
    return Utils
      .sendApiRequest("assessment-reported-question-update", "post", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

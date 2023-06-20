import Utils from "../utils/Utils";
export default class QuestionService {
  questionList(payload) {
    return Utils.sendApiRequest("assessment-questions", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  createQuestion(payload) {
    return Utils.sendApiRequest(
      "assessment-question-create",
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

  questionDetail(payload) {
    return Utils.sendApiRequest(
      "assessment-question-detail",
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

  imageApi(payload) {
    return Utils.sendApiRequest("assessment-list", "post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updateQuestion(dataId, payload) {
    return Utils.sendApiRequest(
      "assessment-question-update/" + dataId,
      "post",
      payload
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }


  deleteOption(dataId) {
    return Utils.sendApiRequest(
      "assessment-option-delete/" + dataId,
      "DELETE",
      true
    ).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  deleteQuestion(dataId) {
    return Utils.sendApiRequest(
      "assessment-question-delete/" + dataId,
      "DELETE",
      true
    ).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }
}

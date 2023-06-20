import Utils from "../utils/Utils";
export default class AssessmentFeedbackService {
  assessmentfeedback(payload) {
    return Utils.sendApiRequest(
      "assessment-feedback-list",
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

  editFeedback(payload) {
    return Utils.sendApiRequest(
      "assessment-feedback-update",
      "POST",
      true,
      payload
    ).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  deleteFeedback(dataId) {
    return Utils.sendApiRequest(
      "assessment-feedback-delete/" + dataId,
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

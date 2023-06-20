import Utils from "../../utils/Utils";
export default class ChooseTrainingService {
  trainingList(payload) {
    return Utils.sendApiRequest("traning/get-mode-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  trainingDetail(id) {
    return Utils.sendApiRequest("traning/get-mode/"+id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deletetraining(id) {
    return Utils.sendApiRequest("traning/delete-mode/" + id, "DELETE", true, id)
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

  courseList(payload) {
    return Utils.sendApiRequest(
      "course/course-list",
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
}

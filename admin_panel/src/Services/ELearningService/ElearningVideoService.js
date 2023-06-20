import Utils from "../../utils/Utils";
export default class ElearningVideoService {
  createLecture(payload) {
    return Utils.sendApiRequest(
      "e-learning/create-section",
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
  editSection(payload) {
    return Utils.sendApiRequest(
      "e-learning/update-section",
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
  videoList(id) {
    return Utils.sendApiRequest(
      "e-learning/get-lecture-list/" + id,
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
  editvideo(id) {
    return Utils.sendApiRequest(
      "e-learning/get-lecture-detail/" + id,
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
  sectiondetail(id) {
    return Utils.sendApiRequest("e-learning/get-section/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(id) {
    return Utils.sendApiRequest(
      "e-learning/delete-lecture/" + id,
      "DELETE",
      true
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  sectionlist(id) {
    return Utils.sendApiRequest(
      "e-learning/get-section-list/" + id,
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

  deletesection(id) {
    return Utils.sendApiRequest(
      "e-learning/delete-section/" + id,
      "DELETE",
      true
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  status(payload) {
    return Utils.sendApiRequest(
      "e-learning/lecture-change-status",
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

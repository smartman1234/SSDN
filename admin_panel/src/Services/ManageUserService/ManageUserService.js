import Utils from "../../utils/Utils";
export default class ManageUserService {
  list(payload) {
    return Utils.sendApiRequest("admin/user-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  status(payload) {
    return Utils.sendApiRequest("admin/user-status", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  password(payload) {
    return Utils.sendApiRequest(
      "admin/change-user-password",
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

  userexamlist(id) {
    return Utils.sendApiRequest("admin/user-assessment-exam/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  assessgnment(id) {
    return Utils.sendApiRequest(
      "assessment-list/assign_assessment" ,
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

  assessgnmentassigntouser(payload) {
    return Utils.sendApiRequest("admin/assign-assessment", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  usertransactionlist(payload) {
    return Utils.sendApiRequest("admin/user-transactions", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

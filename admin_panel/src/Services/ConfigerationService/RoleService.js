import Utils from "../../utils/Utils";
export default class RoleService {
  create(payload) {
    return Utils.sendApiRequest("admin/create-role", "Post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  detail(id) {
    return Utils.sendApiRequest("admin/role-detail/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  update(payload) {
    return Utils.sendApiRequest("admin/update-role", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  List(payload) {
    return Utils.sendApiRequest("admin/role-list", "Post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(dataId) {
    return Utils.sendApiRequest(
      "admin/role-delete/" + dataId,
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

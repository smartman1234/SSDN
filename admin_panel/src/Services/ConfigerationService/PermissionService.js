import Utils from "../../utils/Utils";
export default class PermissionService {
  permissionlist(payload) {
    return Utils.sendApiRequest("admin/permissions", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  detail(id) {
    return Utils.sendApiRequest("admin/permission-detail/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  List(payload) {
    return Utils.sendApiRequest("admin/permission-list", "Post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(dataId) {
    return Utils.sendApiRequest(
      "admin/permission-delete/" + dataId,
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

  roles(payload) {
    return Utils.sendApiRequest("admin/roles", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  assignpermissiontorole(id) {
    return Utils.sendApiRequest("admin/get-role-permission/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  updateassignpermissiontorole(payload) {
    return Utils.sendApiRequest("admin/create-update-role-permission" , "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

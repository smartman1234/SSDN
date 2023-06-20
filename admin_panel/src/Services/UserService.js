import Utils from "../utils/Utils";
export default class UserService {
  login(email, password) {
    return Utils.sendApiRequest("admin/login", "POST", true, email, password)
      .then(
        (response) => {
          if (!response.error && response?.status === "success") {
            localStorage.setItem("user", JSON.stringify(response));
            window.user = response;
            return window.user;
          } else {
            return response;
          }
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }

  logout() {
    return Utils.sendApiRequest("admin/logout", "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  emailsettingcreate(payload) {
    return Utils.sendApiRequest("mail-setting", "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getmailsetting(payload) {
    return Utils.sendApiRequest("get-mail-setting", "GET", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  dashboard(payload) {
    return Utils.sendApiRequest("dashboard", "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

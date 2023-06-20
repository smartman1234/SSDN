import Utils from "../Utils/Utils";
export default class UserService {
  login(loginType, email, password) {
    return Utils.sendApiRequest(
      "user/login",
      "POST",
      true,
      loginType,
      email,
      password
    )
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
    return Utils.sendApiRequest("user/logout", "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  sigup(payload) {
    return Utils.sendApiRequest("user/register", "POST", true, payload)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }

  forgetpassword(email) {
    return Utils.sendApiRequest("user/forget-password", "POST", true, email)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }

  resetPassword(payload) {
    return Utils.sendApiRequest("user/reset-password", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  changePassword(payload) {
    return Utils.sendApiRequest("user/change-password", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  updateProfile(payload) {
    return Utils.sendApiRequest("user/update-profile", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  getProfile(payload) {
    return Utils.sendApiRequest("user/profile", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  verifyToken(payload) {
    return Utils.sendApiRequest("user/mail-verification", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  resendOtp(payload) {
    return Utils.sendApiRequest("user/resend-otp", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  purchaseHistory(payload) {
    return Utils.sendApiRequest("user/purchase-history", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  purchaseHistorydetail(id) {
    return Utils.sendApiRequest(
      "user/purchase-history-detail/" + id,
      "GET",
      true
    )
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  enrollList(payload) {
    return Utils.sendApiRequest("user/my-enroll-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  searchList(payload) {
    return Utils.sendApiRequest("web/search-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  searchdata(id, type) {
    return Utils.sendApiRequest(`web/search/${type}/` + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }
}

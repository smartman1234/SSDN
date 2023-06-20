import Utils from "../../utils/Utils";
export default class DiscountCouponsService {
  comboCourse(payload) {
    return Utils.sendApiRequest(
      "course/course-list/buytogether",
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
  typecomboCourse(payload) {
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
  oneditcomboCourse(id) {
    return Utils.sendApiRequest(
      "course/course-list/buytogether/" + id,
      "GET",
      true,
      id
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  typeoneditcomboCourse(id) {
    return Utils.sendApiRequest(
      "course/course-list/" + id,
      "GET",
      true,
      id
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  createcombo(payload) {
    return Utils.sendApiRequest(
      "course/create-buytogether",
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

  updatecombo(payload) {
    return Utils.sendApiRequest(
      "course/update-buytogether",
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

  detail(id) {
    return Utils.sendApiRequest("course/get-buytogether/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  comboCourseList(payload) {
    return Utils.sendApiRequest(
      "course/get-buytogether-list",
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

  searchUser(payload) {
    return Utils.sendApiRequest("user/user-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  uniqueCode(payload) {
    return Utils.sendApiRequest(
      "coupon/unique-coupon-code",
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

  changeStatus(payload) {
    return Utils.sendApiRequest(
      "course/change-buytogether-status",
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

  getPrice(type, id) {
    return Utils.sendApiRequest(`course/get-price/${type}/` + id, "GET", true, id).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  delete(dataId) {
    return Utils.sendApiRequest(
      "course/delete-combo-course/" + dataId,
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

  assessment(payload) {
    return Utils.sendApiRequest(
      "assessment-list/buytogether",
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
  oneditassessment(id) {
    return Utils.sendApiRequest(
      "assessment-list/buytogether/"+id,
      "GET",
      true,
      id
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  voucher(payload) {
    return Utils.sendApiRequest("voucher-list/buytogether", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  oneditvoucher(id) {
    return Utils.sendApiRequest("voucher-list/buytogether/"+id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  
}

import Utils from "../../utils/Utils";
export default class DiscountCouponsService {
  create(payload) {
    return Utils.sendApiRequest("coupon/create-coupon", "Post", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  detail(id) {
    return Utils.sendApiRequest("coupon/get-coupon/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  update(payload) {
    return Utils.sendApiRequest("coupon/update-coupon", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  List(payload) {
    return Utils.sendApiRequest("coupon/get-coupon-list", "Post", true, payload)
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
      "coupon/change-public-status",
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

  delete(dataId) {
    return Utils.sendApiRequest(
      "coupon/delete-coupon/" + dataId,
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

import Utils from "../../utils/Utils";
export default class VoucherService {
  voucherList(payload) {
    return Utils.sendApiRequest("vouchers", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  parentCategory(payload) {
    return Utils.sendApiRequest("voucher/category-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  createVoucherCategory(payload) {
    return Utils.sendApiRequest(
      "voucher/category-create",
      "Post",
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

  updateVoucherCategory(payload) {
    return Utils.sendApiRequest(
      "voucher/update-category",
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

  uniqueName(payload) {
    return Utils.sendApiRequest(
      "voucher/name-slug-unique",
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

  toggleVoucher(payload) {
    return Utils.sendApiRequest(
      "voucher-status-change",
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

  getVoucherDetails(dataId) {
    return Utils.sendApiRequest("voucher/detail/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteVoucher(dataId) {
    return Utils.sendApiRequest(
      "voucher/delete/" + dataId,
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

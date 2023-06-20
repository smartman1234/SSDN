import Utils from "../../utils/Utils";
export default class VoucherCategoryService {
  voucherList(payload) {
    return Utils.sendApiRequest("voucher/categories", "POST", true, payload)
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
      "voucher/category-name-slug-unique",
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

  toggleVoucherCategory(payload) {
    return Utils.sendApiRequest(
      "voucher/category-status-change",
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

  getVoucherCategoryDetails(dataId) {
    return Utils.sendApiRequest("voucher/category/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteVoucherCategory(dataId) {
    return Utils.sendApiRequest(
      "voucher/category-delete/" + dataId,
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

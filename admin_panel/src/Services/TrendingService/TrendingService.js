import Utils from "../../utils/Utils";
export default class TrendingService {
    trendinglist(payload) {
        return Utils.sendApiRequest(
          "trending-voucher-assessment/get",
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

  createtrending(payload) {
    return Utils.sendApiRequest(
      "trending-voucher-assessment/create",
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

  updatetrending(payload) {
    return Utils.sendApiRequest(
      "trending-voucher-assessment/update",
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

  deletetrending(id) {
    return Utils.sendApiRequest(
      "trending-voucher-assessment/delete/"+id,
      "DELETE",
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
  data(id) {
    return Utils.sendApiRequest(
      "trending-voucher-assessment/detail/"+id,
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


}

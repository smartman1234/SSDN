import Utils from "../../Utils/Utils";
export default class WeOfferService {
  voucherCategory(id) {
    return Utils.sendApiRequest(
      "web/voucher-category-list/0/" + id,
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

  assessmentCategory(id) {
    return Utils.sendApiRequest(
      "web/assessment-category-list/0/" + id,
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

  courseCategory(payload) {
    return Utils.sendApiRequest(
      "web/course-category-list",
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
  latestCourse(payload) {
    return Utils.sendApiRequest("web/course-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  latestVoucher(payload) {
    return Utils.sendApiRequest("web/voucher-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  latestAssessment(payload) {
    return Utils.sendApiRequest("web/assessment-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  trendingcertication(payload) {
    return Utils.sendApiRequest(
      "web/trending-certification-exam",
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
  availOffer(payload) {
    return Utils.sendApiRequest(
      "web/avail-offer",
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
}

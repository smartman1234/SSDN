import Utils from "../../Utils/Utils";
export default class MetaService {
  getMetadetail(id) {
    return Utils.sendApiRequest("web/meta/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  service(id) {
    return Utils.sendApiRequest("web/get-page-block/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  blogs(id) {
    return Utils.sendApiRequest("web/blogs/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  placeduserlist(id) {
    return Utils.sendApiRequest("web/placed-user-list/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  joblist(limit, offset) {
    return Utils.sendApiRequest(
      `web/get-job-list/${limit}/${offset}`,
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

  recruitlist(limit, offset) {
    return Utils.sendApiRequest(
      `web/recruiter-list/${limit}/${offset}`,
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

  studentlist(limit, offset) {
    return Utils.sendApiRequest(
      `web/placed-user-list/${limit}/${offset}`,
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

  jobdetail(id) {
    return Utils.sendApiRequest("web/get-job-detail/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  jobapply(payload) {
    return Utils.sendApiRequest("web/apply-job", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  subscriber(payload) {
    return Utils.sendApiRequest("web/subscriber", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

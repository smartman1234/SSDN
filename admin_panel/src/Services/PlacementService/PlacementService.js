import Utils from "../../utils/Utils";
export default class PlacementService {

  list(payload) {
    return Utils.sendApiRequest(
      "placement/placed-user-list",
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

  getDetail(id) {
    return Utils.sendApiRequest(
      "placement/placed-user-detail/"+id,
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

  delete(id) {
    return Utils.sendApiRequest(
      "placement/delete-placed-user/"+id,
      "DELETE",
      true
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  recruiterList(payload) {
    return Utils.sendApiRequest(
      "recruiter/recruiter-list",
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

  jobList(payload) {
    return Utils.sendApiRequest(
      "job/job-list",
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

  getjobDetail(id) {
    return Utils.sendApiRequest(
      "job/job-detail/"+id,
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

  deleterecruiter(id) {
    return Utils.sendApiRequest(
      "recruiter/delete-recruiter/"+id,
      "DELETE",
      true,
      
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deletejob(id) {
    return Utils.sendApiRequest(
      "job/delete-job/"+id,
      "DELETE",
      true
      
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  jobStatus(payload) {
    return Utils.sendApiRequest(
      "job/active-inactive-job",
      "POST",
      true,payload
      
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
 
}

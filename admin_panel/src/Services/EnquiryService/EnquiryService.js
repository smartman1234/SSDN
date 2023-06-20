import Utils from "../../utils/Utils";
export default class AssessmentCourseService {
  enquiryList(payload) {
    return Utils.sendApiRequest("vouchers-enquires", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

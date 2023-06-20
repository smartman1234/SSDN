import Utils from "../../Utils/Utils";
export default class UpComingBatchesService {
  batches(payload) {
    return Utils.sendApiRequest("web/upcoming-course-batches", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  pageBlock(id) {
    return Utils.sendApiRequest("web/get-page-block/"+id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }


}

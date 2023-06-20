import Utils from "../../utils/Utils";
export default class TestimonialService {
  List(payload) {
    return Utils.sendApiRequest(
      "testimonial/testimonial-list",
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

  getdata(id) {
    return Utils.sendApiRequest(
      "testimonial/testimonial-detail/" + id,
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

  changeStatus(payload) {
    return Utils.sendApiRequest(
      "testimonial/testimonial-featured",
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

  delete(id) {
    return Utils.sendApiRequest(
      "testimonial/testimonial-delete/" + id,
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

  courselist(payload) {
    return Utils.sendApiRequest("course/course-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  subscriber(payload) {
    return Utils.sendApiRequest("subscriber-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deletesubscriber(id) {
    return Utils.sendApiRequest("subscriber-delete/"+id, "DELETE", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

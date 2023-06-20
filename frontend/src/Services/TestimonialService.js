import Utils from "../Utils/Utils";
export default class TestimonialService {
  review(payload) {
    return Utils.sendApiRequest("web/testimonials", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  course(payload) {
    return Utils.sendApiRequest(
      "web/testimonials-course-list",
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

  testimonial(payload) {
    return Utils.sendApiRequest("web/testimonials", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

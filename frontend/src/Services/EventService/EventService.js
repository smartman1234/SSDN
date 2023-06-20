import Utils from "../../Utils/Utils";
export default class EventService {
  webinarlist(payload) {
    return Utils.sendApiRequest("web/upcoming-webinar", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  webinarregister(payload) {
    return Utils.sendApiRequest("web/webinar-register", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  eventcategory(payload) {
    return Utils.sendApiRequest("web/event-category-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  eventlist(payload) {
    return Utils.sendApiRequest("web/events", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  eventdetail(id) {
    return Utils.sendApiRequest("web/event/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  eventregister(payload) {
    return Utils.sendApiRequest("web/event-register" , "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  eventcallback(payload) {
    return Utils.sendApiRequest("web/event-register-callback" , "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  stripecallback(payload) {
    return Utils.sendApiRequest("web/event-register-stripe-callback" , "POST", true,payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

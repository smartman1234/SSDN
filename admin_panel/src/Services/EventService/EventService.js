import Utils from "../../utils/Utils";
export default class EventService {
  List(payload) {
    return Utils.sendApiRequest("event/event-categories", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(id) {
    return Utils.sendApiRequest("event/delete-event-category/" + id, "DELETE", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  detail(id) {
    return Utils.sendApiRequest(
      "event/get-event-category/" + id,
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

  eventlist(payload) {
    return Utils.sendApiRequest("event/event-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  eventcategorydropdownlist(payload) {
    return Utils.sendApiRequest("event/event-category-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  relatedeventlist(payload) {
    return Utils.sendApiRequest("event/events", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  eventlistdetail(id) {
    return Utils.sendApiRequest("event/event-detail/"+id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  eventdelete(id) {
    return Utils.sendApiRequest("event/delete-event/"+id, "DELETE", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  eventstatus(payload) {
    return Utils.sendApiRequest("event/active-inactive-event", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  eventregistrationlist(payload) {
    return Utils.sendApiRequest("event/registration-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

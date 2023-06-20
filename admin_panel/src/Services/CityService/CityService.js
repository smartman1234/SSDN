import Utils from "../../utils/Utils";
export default class CityService {
  cityList(payload) {
    return Utils.sendApiRequest("city/get-city-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  createcity(payload) {
    return Utils.sendApiRequest("city/create-city", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updatecity(payload) {
    return Utils.sendApiRequest("city/update-city", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getCourseCitydata(id) {
    return Utils.sendApiRequest("city/get-city/" + id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }


  delete(id) {
    return Utils.sendApiRequest("city/delete-city/" + id, "DELETE", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  changeStatus(payload) {
    return Utils.sendApiRequest("city/change-city" , "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  realtedList(payload) {
    return Utils.sendApiRequest("course/course-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  ListOfCities(payload) {
    return Utils.sendApiRequest("city/cities", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getData(id) {
    return Utils.sendApiRequest("course/get-course/" + id, "GET", true, id)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  relatedassessment(payload) {
    return Utils.sendApiRequest("assessment-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  relatedvoucher(payload) {
    return Utils
      .sendApiRequest("voucher-list", "GET", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

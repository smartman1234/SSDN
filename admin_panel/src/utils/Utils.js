import moment from "moment";
class Request {
  async sendApiRequest(url, method, setauth, body) {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
      body: JSON.stringify(body),
    };
    if (method === "DELETE") {
      delete requestOptions.body;
    }
    if (method === "GET") {
      delete requestOptions.body;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASEURL + url,
        requestOptions
      );
      let body = await response.text();
      if (response.status !== 200) {
        throw body;
      }
      const data = body.includes("{") ? JSON.parse(body) : body;
      return data;
    } catch (e) {
      throw e;
    }
  }
  start_time(time) {
    let appointmentTime = moment(time).format("DD/MM/YYYY");
    return appointmentTime;
  }

  alphabet = (num) => {
    const letter = String.fromCharCode(num + "A".charCodeAt(0));
    return letter;
  };

  titleCase(str) {
    var splitStr = str?.length > 0 && str?.toLowerCase()?.split(" ");
    for (var i = 0; i < splitStr?.length; i++) {
      splitStr[i] =
        splitStr?.[i]?.charAt(0)?.toUpperCase() + splitStr?.[i]?.substring(1);
    }
    return splitStr && splitStr?.join(" ");
  }
}

export default new Request();

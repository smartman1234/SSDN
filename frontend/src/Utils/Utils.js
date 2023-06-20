
class Request {
  async sendApiRequest(url, method, setauth, body) {
    const requestOptions = {
      method: method,

      headers: window.user?.data?.auth_token
        ? {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
            Accept: "application/json",
            AUTHTOKEN: window.user?.data?.auth_token,
            "guest-user-id": localStorage.getItem("custumer_id"),
            currency: localStorage.getItem("currency") || "INR",
          }
        : {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
            Accept: "application/json",
            "guest-user-id": localStorage.getItem("custumer_id"),
            currency: localStorage.getItem("currency") || "INR",
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



  titleCase(str) {
    var splitStr = str?.toLowerCase()?.split(" ");
    for (var i = 0; i < splitStr?.length; i++) {
      splitStr[i] =
        splitStr[i]?.charAt(0)?.toUpperCase() + splitStr[i]?.substring(1);
    }
    return splitStr?.join(" ");
  }

  alphabet = (num) => {
    const letter = String.fromCharCode(num + "A".charCodeAt(0));
    return letter;
  };

  time(duration) {
    var date = new Date(duration * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    var t = hh + ":" + mm + ":" + ss;
    return t;
  }

  nameToInitials(fullName) {
    const namesArray = fullName && fullName?.trim().split(" ");
    if (namesArray?.length === 1) return `${namesArray[0].charAt(0)}`;
    else
      return `${namesArray[0].charAt(0)}${namesArray[
        namesArray?.length - 1
      ].charAt(0)}`;
  }
}

export default new Request();

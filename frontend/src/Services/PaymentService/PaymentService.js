import Utils from "../../Utils/Utils";
export default class PaymentServices {
    paymentOrder(payload) {
        return Utils.sendApiRequest("web/offline-course-payment-order", "POST", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }
    razorpaycallback(payload) {
        return Utils.sendApiRequest("web/offline-course-callback", "POST", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }

    stripecallback(payload) {
        return Utils.sendApiRequest("web/offline-course-stripe-callback", "POST", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }


   enquiry(payload) {
        return Utils.sendApiRequest("web/enquiry", "POST", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }

    courselist(payload) {
        return Utils.sendApiRequest("web/search-list/course", "GET", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }

}

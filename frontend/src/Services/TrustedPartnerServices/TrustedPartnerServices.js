import Utils from "../../Utils/Utils";
export default class TrustedPartnerServices {
    trustedPartner(payload) {
        return Utils.sendApiRequest("web/about/our-partners", "GET", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }

}

import Utils from "../../Utils/Utils";
export default class VoucherService {
    voucherList(payload) {
        return Utils.sendApiRequest("web/voucher-list", "POST", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }

    voucherDetail(id) {
        return Utils.sendApiRequest("web/voucher/" + id, "GET", true)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }

    myVoucher(payload) {
        return Utils.sendApiRequest(
            "user/my-voucher-list",
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
}

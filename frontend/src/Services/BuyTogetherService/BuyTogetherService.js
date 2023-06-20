import Utils from "../../Utils/Utils";
export default class BuyTogetherService {
    buyTogether(id) {
        return Utils.sendApiRequest("web/course-buy-together/"+id, "GET", true)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }

}

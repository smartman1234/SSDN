import Utils from "../utils/Utils";
export default class AssessmentService {
   
    voucherList(payload) {
        return Utils
          .sendApiRequest("voucher-list", "GET", true, payload)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      }

      assessmentList(payload) {
        return Utils
          .sendApiRequest("assessment-list", "GET", true, payload)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      }

      uniqueValues(payload) {
        return Utils
          .sendApiRequest("category-name-slug-unique", "POST", true, payload)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      }

      parentList(payload) {
        return Utils
          .sendApiRequest("category-list", "POST", true, payload)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      }

      categoryList(payload) {
        return Utils
          .sendApiRequest("categories", "Post", true, payload)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      }

      getCategoryDetails(dataId) {
        return Utils
          .sendApiRequest("category/" + dataId, "GET", true)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      }

      updateCategory(payload) {
        return Utils.sendApiRequest("update-category", "POST", true, payload).then(
          (response) => {
            return response;
          },
          (error) => {
            throw error;
          }
        );
      }

      deleteCategory(dataId) {
        return Utils.sendApiRequest("category-delete/" + dataId, "DELETE", true).then(
          (response) => {
            return response;
          },
          (error) => {
            throw new Error(error);
          }
        );
      }
      activefront(payload) {
        return Utils.sendApiRequest("category-change-front" , "POST", true,payload).then(
          (response) => {
            return response;
          },
          (error) => {
            throw new Error(error);
          }
        );
      }
}

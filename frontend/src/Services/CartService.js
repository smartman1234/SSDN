import Utils from "../Utils/Utils";
export default class CartService {
  addTocart(payload) {
    return Utils.sendApiRequest("web/add-cart", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  gettingCartList(payload) {
    return Utils.sendApiRequest("web/get-cart-list", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteAssessmentCart(payload) {
    return Utils.sendApiRequest("web/delete-cart/", "POST", true, payload).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  placeOrder(payload) {
    return Utils.sendApiRequest("user/order-placed", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  payment(payload) {
    return Utils.sendApiRequest("user/payment", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updateQuantity(payload) {
    return Utils.sendApiRequest("web/cart-quantity", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  stripePayment(payload) {
    return Utils.sendApiRequest("user/stripe-payment", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}

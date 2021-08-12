import http from "./../http-common";
import authHeader from "./auth-header";

class SubscribeService {
  async subscribe(email) {
    return await http
      .post("/subscribe/create", email, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new SubscribeService();

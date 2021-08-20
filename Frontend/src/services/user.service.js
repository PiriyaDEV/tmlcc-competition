import http from "./../http-common";
import authHeader from "./auth-header";

class UserService {
  async checkDuplicated(user) {
    return await http
      .post("/user/checkDuplicated", user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async getRole(user) {
    return await http
      .get(`/user/getRole?user_id=${user.user_id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async getAllUsers() {
    return await http
      .get("/user/getAllUsers", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async getAllStaffs() {
    return await http
      .get("/user/getAllStaffs", {
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

export default new UserService();

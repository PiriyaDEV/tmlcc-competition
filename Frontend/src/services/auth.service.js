import http from "./../http-common";
import authHeader from "./auth-header";

class AuthService {
  async register(user) {
    return await http
      .post("/auth/register", user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async login(user) {
    return await http
      .post("/auth/login", user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async checkResetPassword(user) {
    return await http
      .post("/auth/checkResetPassword", user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async resetPassword(user) {
    return await http
      .post("/auth/resetPassword", user, {
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

export default new AuthService();

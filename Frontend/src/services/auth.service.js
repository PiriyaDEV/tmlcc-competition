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

  async logout() {
    localStorage.removeItem("accessToken");
  }
}

export default new AuthService();

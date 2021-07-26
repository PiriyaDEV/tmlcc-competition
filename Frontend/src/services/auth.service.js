import axios from "axios";
import authHeader from "./auth-header";
const PORT = require("../config/port.config").PORT;

const URL = `${PORT}/api/auth/`;

class AuthService {
  async register(user) {
    const res = await axios.post(URL + "register", user, {
      headers: authHeader(),
    });

    if (res.data.token) {
      localStorage.setItem("user", res.data.token, { expires: 1 });
      return res;
    }
  }

  async login(user) {
    const res = await axios.post(URL + "login", user, {
      headers: authHeader(),
    });

    if (res.data.token) {
      localStorage.setItem("user", res.data.token, { expires: 1 });
    }

    return res;
  }

  async logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();

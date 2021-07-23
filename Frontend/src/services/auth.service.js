import axios from "axios";
import authHeader from "./auth-header";
const PORT = require("../config/port.config").PORT;

const URL = `${PORT}/api/auth/`;

class AuthService {
  // async login(user) {
  //   const res = await axios.post(URL + "signin", user);
  //   if (res.data.token) {
  //     localStorage.setItem("user", res.data.token, { expires: 1 });
  //   }
  //   if (res.data) {
  //     return res;
  //   }
  // }

  // logout() {
  //   localStorage.removeItem("user");
  //   window.location.href = "/";
  // }

  async register(user) {
    const res = await axios.post(URL + "register", user, {
      headers: authHeader(),
    });

    if (res.data.token) {
      localStorage.setItem("user", res.data.token, { expires: 1 });
      return res;
    }
  }

  // async checkUniqueExists(user) {
  //   const res = await axios.post(URL + "checkUniqueExists", {
  //     username: user.username,
  //     email: user.email,
  //     phone: user.phone
  //   });
  //   if (res) {
  //     return res.data;
  //   }
  // }
}

export default new AuthService();

import http from "./../http-common";
import authHeader from "./auth-header";

class VideoService {
  async create(video) {
    return await http
      .post("/video/create", video, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async update(video) {
    return await http
      .post("/video/update", video, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async delete(video) {
    return await http
      .post("/video/delete", video, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async getAll() {
    return await http
      .get("/video/getAll", {
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

export default new VideoService();

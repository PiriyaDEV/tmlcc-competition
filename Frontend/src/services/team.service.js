import http from "./../http-common";
import authHeader from "./auth-header";

class TeamService {
  async create(team) {
    return await http
      .post("/team/create", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async checkDuplicated(team) {
    return await http
      .post("/team/checkDuplicated", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async rename(team) {
    return await http
      .post("/team/rename", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async delete(team) {
    return await http
      .post("/team/delete", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async approve(team) {
    return await http
      .post("/team/approve", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async reject(team) {
    return await http
      .post("/team/reject", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async join(team) {
    return await http
      .post("/team/join", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async leave(team) {
    return await http
      .post("/team/leave", team, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async checkTeam(user) {
    return await http
      .post("/team/checkTeam", user, {
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
      .get("/team/getAll", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async getInfo(team) {
    return await http
      .get(`/team/getInfo?team_id=${team.team_id}`, {
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

export default new TeamService();

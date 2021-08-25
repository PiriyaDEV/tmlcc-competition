import http from "./../http-common";
import authHeader from "./auth-header";
import url from "./../api-url";

class MaterialService {
  async upload(materials) {
    console.log(materials);
    let query = "";
    if (materials.description) {
      query = `?folder=${materials.folderName}&description=${materials.description}`;
    } else {
      query = `?folder=${materials.folderName}`;
    }
    return await http
      .post("/material/upload" + query, materials.files, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...authHeader(),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async update(materials) {
    return await http
      .post("/material/update", materials, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async deleteFolder(folder) {
    return await http
      .post("/material/deleteFolder", folder, {
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
      .get("/material/getAll", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  download(query) {
    return (
      url +
      `/material/download?folder=${query.folderName}&fileName=${query.fileName}`
    );
  }
}

export default new MaterialService();

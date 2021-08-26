import http from "./../http-common";
import authHeader from "./auth-header";
import url from "./../api-url";

class MaterialService {
  async upload(materials) {
    console.log(materials);
    let query = "";
    if (materials.folder_id) {
      if (materials.description) {
        query = `?folder_id=${materials.folder_id}&description=${materials.description}`;
      } else {
        query = `?folder_id=${materials.folder_id}`;
      }
    } else {
      if (materials.description) {
        query = `?folder=${materials.folderName}&description=${materials.description}`;
      } else {
        query = `?folder=${materials.folderName}`;
      }
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

  async checkDuplicated(folder) {
    return await http
      .post("/material/checkDuplicated", folder, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async updateFolder(folder) {
    return await http
      .post("/material/updateFolder", folder, {
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

  async deleteFile(material) {
    return await http
      .post("/material/deleteFile", material, {
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

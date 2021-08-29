import http from "./../http-common";
import authHeader from "./auth-header";

class MaterialService {
  async uploadToNewFolder(materials) {
    let query = "";
    if (materials.description) {
      query = `?folderName=${materials.folderName}&description=${materials.description}`;
    } else {
      query = `?folderName=${materials.folderName}`;
    }

    return await http
      .post("/material/uploadToNewFolder" + query, materials.files, {
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

  async uploadToExistFolder(materials) {
    return await http
      .post(
        `/material/uploadToExistFolder?folder_id=${materials.folder_id}`,
        materials.files,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...authHeader(),
          },
        }
      )
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

  async getAllByFolder(folder) {
    return await http
      .post("/material/getAllByFolder", folder, {
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
}

export default new MaterialService();

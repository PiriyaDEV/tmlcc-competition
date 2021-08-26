const controller = require("../controllers/material.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/material/upload", auth, controller.upload);

  app.post("/api/material/checkDuplicated", auth, controller.checkDuplicated);

  app.post("/api/material/updateFolder", auth, controller.updateFolder);

  app.post("/api/material/deleteFolder", auth, controller.deleteFolder);

  app.post("/api/material/deleteFile", auth, controller.deleteFile);

  app.get("/api/material/getAll", auth, controller.getAll);

  app.get("/api/material/download", controller.download);
};

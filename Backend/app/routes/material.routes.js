const controller = require("../controllers/material.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/material/upload", auth, controller.upload);

  app.post("/api/material/update", auth, controller.update);

  app.post("/api/material/deleteFolder", auth, controller.deleteFolder);

  app.get("/api/material/getAll", auth, controller.getAll);

  app.get("/api/material/download", controller.download);
};

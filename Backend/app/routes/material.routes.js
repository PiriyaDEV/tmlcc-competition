const controller = require("../controllers/material.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/material/upload", auth, controller.upload);

  app.post("/api/material/update", auth, controller.update);

  app.get("/api/material/getAll", auth, controller.getAll);
};

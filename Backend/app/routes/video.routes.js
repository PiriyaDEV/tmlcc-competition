const controller = require("../controllers/video.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/video/create", auth, controller.create);

  app.post("/api/video/update", auth, controller.update);

  app.post("/api/video/delete", auth, controller.delete);

  app.get("/api/video/getAll", auth, controller.getAll);
};

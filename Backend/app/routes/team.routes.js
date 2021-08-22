const controller = require("../controllers/team.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/team/create", auth, controller.create);

  app.post("/api/team/checkDuplicated", auth, controller.checkDuplicated);

  app.post("/api/team/rename", auth, controller.rename);

  app.post("/api/team/delete", auth, controller.delete);

  app.post("/api/team/approve", auth, controller.approve);

  app.post("/api/team/reject", auth, controller.reject);

  app.post("/api/team/join", auth, controller.join);

  app.post("/api/team/leave", auth, controller.leave);

  app.post("/api/team/checkTeam", auth, controller.checkTeam);

  app.get("/api/team/getAll", auth, controller.getAll);

  app.get("/api/team/getInfo", auth, controller.getInfo);
};

const controller = require("../controllers/team.controller");

module.exports = (app) => {
  app.post("/api/team/create", controller.create);

  app.post("/api/team/checkDuplicated", controller.checkDuplicated);

  app.post("/api/team/rename", controller.rename);

  app.post("/api/team/delete", controller.delete);

  app.post("/api/team/approve", controller.approve);

  app.post("/api/team/reject", controller.reject);
  
  app.post("/api/team/join", controller.join);

  app.post("/api/team/leave", controller.leave);

  app.get("/api/team/getAll", controller.getAll);

  app.get("/api/team/getInfo", controller.getInfo);
};

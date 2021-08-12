const controller = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/api/user/checkDuplicated", controller.checkDuplicated);

  app.get("/api/user/getRole", controller.getRole);

  app.get("/api/user/getAllUsers", controller.getAllUsers);

  app.get("/api/user/getAllStaffs", controller.getAllStaffs);
};

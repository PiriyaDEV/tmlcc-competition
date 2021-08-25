const controller = require("../controllers/user.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/user/checkDuplicated", controller.checkDuplicated);

  app.get("/api/user/getRole", auth, controller.getRole);

  app.get("/api/user/getAllUsers", auth, controller.getAllUsers);

  app.get("/api/user/getAllStaffs", auth, controller.getAllStaffs);

  app.get("/api/user/getInfo", auth, controller.getInfo);
};

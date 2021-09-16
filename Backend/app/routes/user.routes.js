const controller = require("../controllers/user.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/user/checkDuplicated", controller.checkDuplicated);

  app.post("/api/user/update", auth, controller.update);

  app.get("/api/user/getRole", auth, controller.getRole);

  app.get("/api/user/getAllUsers", auth, controller.getAllUsers);

  app.get("/api/user/getAllStaffs", auth, controller.getAllStaffs);

  app.get("/api/user/getDataToExport", auth, controller.getDataToExport);

  app.get("/api/user/getInfo", auth, controller.getInfo);
};

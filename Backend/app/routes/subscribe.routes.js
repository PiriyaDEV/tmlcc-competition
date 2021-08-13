const controller = require("../controllers/subscribe.controller");

module.exports = (app) => {
  app.post("/api/subscribe/create", controller.create);
};

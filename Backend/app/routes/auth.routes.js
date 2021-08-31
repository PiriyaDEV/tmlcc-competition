const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.post("/api/auth/register", controller.register);

  app.post("/api/auth/login", controller.login);

  app.post("/api/auth/checkResetPassword", controller.checkResetPassword);

  app.post("/api/auth/resetPassword", controller.resetPassword);
};

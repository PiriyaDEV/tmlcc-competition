const auth = require("../controllers/auth.controller");

module.exports = (app) => {
  app.post("/api/auth/register", auth.register);
  
  app.post("/api/auth/login", auth.login);
};

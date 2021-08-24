const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authConfig = require("./app/config/auth.config");

const app = express();

let corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(cookieParser(authConfig.secretKey));

// parse requests of content-type: application/json
app.use(bodyParser.json({ limit: "20mb" }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tmlcc-competition API server!" });
});

// authorization routes
require("./app/routes/auth.routes")(app);
// user service routes
require("./app/routes/user.routes")(app);
// team service routes
require("./app/routes/team.routes")(app);
// material service routes
//require("./app/routes/material.routes")(app);
// video service routes
require("./app/routes/video.routes")(app);
// subscribe service routes
require("./app/routes/subscribe.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`tmlcc-competition API services is running on port ${PORT}.`);
});

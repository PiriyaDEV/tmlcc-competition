const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authConfig = require("./app/config/auth.config")

const app = express();
const secretKey = authConfig.secret;

var corsOptions = {
    origin: "*",
    credentials: false,
  };

app.use(cors(corsOptions));
app.use(cookieParser(secretKey));

// parse requests of content-type: application/json
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tmlcc-competition API server!" });
});

require("./app/routes/auth.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`tmlcc-competition API server is running on port ${PORT}.`);
  });
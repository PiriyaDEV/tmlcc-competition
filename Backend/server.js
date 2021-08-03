const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authConfig = require("./app/config/auth.config");

const app = express();

let corsOptions = {
  origin: "*",
  credentials: false,
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

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`tmlcc-competition API server is running on port ${PORT}.`);
});

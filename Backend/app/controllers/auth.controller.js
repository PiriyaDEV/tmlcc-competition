const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./../models/user.model");
const authConfig = require("./../config/auth.config");

exports.register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let user = req.body;

  user.password = bcrypt.hashSync(user.password, 8);
  user.role = "user";
  user.created_at = new Date().getTime();
  user.updated_at = new Date().getTime();

  User.create(user, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new user!",
      });
    }

    let token = jwt.sign(
      {
        username: result.username,
        role: result.role,
      },
      authConfig.secretKey,
      { expiresIn: 86400 }
    );

    res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

    return res.status(200).send({
      username: result.username,
      role: result.role,
      token: token,
    });
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let user = req.body;

  User.findByUsername(user, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while finding the user!",
      });
    }

    if (!result.isFound) {
      return res.status(200).send({
        message: "User not found!",
      });
    }

    if (bcrypt.compareSync(user.password, result.password)) {
      let token = jwt.sign(
        {
          username: result.username,
          role: result.role,
        },
        authConfig.secretKey,
        { expiresIn: 86400 }
      );

      res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

      return res.status(200).send({
        username: result.username,
        role: result.role,
        token: token,
      });
    } else {
      return res.status(200).send({
        message: "Invalid password!",
      });
    }
  });
};

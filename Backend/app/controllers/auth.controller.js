const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const authConfig = require("../config/auth.config");

exports.register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.getCount((err, count) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while getting the number of users!",
      });
    }

    count++;
    count = count.toString();

    let user = req.body;

    if (!user.email || !user.password) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    user.user_id = "US" + count.padStart(6, "0");
    user.email = user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password, 8);
    user.role = "user";
    user.lastLogin = Date.now();
    user.createdAt = Date.now();
    user.updatedAt = Date.now();

    User.create(user, (err, result) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the new user!",
        });
      }

      let token = jwt.sign(
        {
          user_id: result.user_id,
          displayName: result.displayName,
          lastLogin: result.lastLogin,
        },
        authConfig.secretKey,
        { expiresIn: 86400 }
      );

      res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

      return res.status(201).send({
        user_id: result.user_id,
        displayName: result.displayName,
        lastLogin: result.lastLogin,
        token: token,
      });
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

  if (!user.email || !user.password) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  user.email = user.email.toLowerCase();

  User.find(user, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while finding the user!",
      });
    }

    if (!result.isFound) {
      return res.status(403).send({
        message: "User not found!",
      });
    }

    if (bcrypt.compareSync(user.password, result.password)) {
      User.update(
        { user_id: result.user_id, lastLogin: Date.now() },
        (err, update_result) => {
          if (err) {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while updating user data!",
            });
          }

          let token = jwt.sign(
            {
              user_id: result.user_id,
              displayName: result.displayName,
              lastLogin: update_result.lastLogin,
            },
            authConfig.secretKey,
            { expiresIn: 86400 }
          );

          res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

          return res.status(200).send({
            user_id: result.user_id,
            displayName: result.displayName,
            lastLogin: update_result.lastLogin,
            token: token,
          });
        }
      );
    } else {
      return res.status(403).send({
        message: "Invalid password!",
      });
    }
  });
};
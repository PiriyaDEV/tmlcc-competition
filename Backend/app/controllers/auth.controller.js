var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const authConfig = require("../config/auth.config");

exports.register = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    let user = req.body;

    user.password = bcrypt.hashSync(req.body.password, 8);
    user.role = "user";
    user.created_at = new Date().getTime();
    user.updated_at = new Date().getTime();

    User.create(user, (err, user) => {
      if (err) return res.status(500).json({ message: err.message });

      let token = jwt.sign({ 
        username : user.username, 
        role : user.role
      }, authConfig.secret, { expiresIn: 86400 });

      res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

      res.status(200).send({
        username: user.username, 
        role: user.role,
        token: token
      });
    })
  };
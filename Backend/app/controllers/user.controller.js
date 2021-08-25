const User = require("../models/user.model");

exports.checkDuplicated = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let user = req.body;

  User.find(user, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while checking duplicated user!",
      });
    }

    return res.status(200).send({
      isFound: result.isFound,
    });
  });
};

exports.getRole = (req, res) => {
  if (!req.query.user_id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let user = {
    user_id: req.query.user_id,
  };

  User.find(user, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while finding the user role!",
      });
    }

    return res.status(200).send({
      role: result.role,
    });
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while getting all users!",
      });
    }

    return res.status(200).send(result);
  });
};

exports.getAllStaffs = (req, res) => {
  User.getAllStaffs((err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while getting all staffs!",
      });
    }

    return res.status(200).send(result);
  });
};

exports.getInfo = (req, res) => {
  if (!req.query.user_id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let user = { 
    user_id: req.query.user_id 
  };

  User.getInfo(user, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while getting user information!",
      });
    }

    return res.status(200).send(result.user);
  });
};

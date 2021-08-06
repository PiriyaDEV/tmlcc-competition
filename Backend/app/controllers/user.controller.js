const User = require("./../models/user.model");

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
      isFound: result.isFound
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
      role: result.role
    });
  });
};

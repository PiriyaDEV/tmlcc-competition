const Subscribe = require("../models/subscribe.model");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let subscribe = req.body;

  if (!subscribe.email) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  subscribe.email = subscribe.email.toLowerCase().trim();

  Subscribe.create(subscribe, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the subscribed email!",
      });
    }

    return res.status(201).send({
      message: "Subscribed email!",
    });
  });
};

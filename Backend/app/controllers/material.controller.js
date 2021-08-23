const Material = require("../models/material.model");

exports.upload = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Material.getCount((err, count) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while getting the number of materials!",
      });
    }

    count++;
    count = count.toString();

    let material = req.body;

    material.material_id = "MA" + count.padStart(6, "0");
    material.status = "active";
    material.createdAt = Date.now();
    material.updatedAt = Date.now();

    Material.create(material, (err, result) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the new material!",
        });
      }

      return res.status(201).send({
        material_id: result.material_id,
        status: result.status,
        message: "Material created!",
      });
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let material = req.body;

  Material.update(material, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while updating material information!",
      });
    }

    return res.status(200).send({
      material_id: result.material_id,
      message: "Material updated!",
    });
  });
};

exports.getAll = (req, res) => {
  Material.getAll((err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while getting all materials!",
      });
    }

    return res.status(200).send(result);
  });
};

const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;

const Material = require("../models/material.model");
const Folder = require("../models/folder.model");

const materials_dir = __dirname + "../../../uploads/materials";

const storage = multer.diskStorage({
  destination: function (req, files, callback) {
    callback(null, materials_dir + "/" + req.query.folder);
  },
  filename: function (req, files, callback) {
    const match = ["application/pdf"];

    if (match.indexOf(files.mimetype) === -1) {
      let message = `${files.originalname} is invalid. Only accept pdf.`;
      return callback(message, null);
    }

    callback(null, files.originalname);
  },
});

const upload = multer({ storage: storage }).array("material-files", 20);

exports.upload = (req, res) => {
  if (!req.query.folder || req.query.folder_id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Folder.find({ folderName: req.query.folder }, (err, find) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while finding the folder!",
      });
    }

    var folder_id = req.query.folder_id;

    if (!find.isFound) {
      fsPromises
        .mkdir(
          materials_dir + "/" + req.query.folder,
          { recursive: true },
          (err) => {
            return res.status(500).send({
              message:
                err.message ||
                "Some error occurred while making a new directory!",
            });
          }
        )
        .then(() => {
          Folder.getCount((err, count) => {
            if (err) {
              return res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while getting the number of folders!",
              });
            }

            count++;
            count = count.toString();

            let folder = {};

            folder.folder_id = "FO" + count.padStart(6, "0");
            folder.folderName = req.query.folder;
            folder.description = req.query.description;
            folder.status = "active";
            folder.createdAt = Date.now();
            folder.updatedAt = Date.now();

            Folder.create(folder, (err, result) => {
              if (err) {
                return res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while creating the new folder!",
                });
              }
              folder_id = result.folder_id;
              upload(req, res, (err) => {
                if (res.req.files.length > 0) {
                  Material.getCount((err, count) => {
                    let materials = [];
                    if (err) {
                      console.log(
                        err.message ||
                          "Some error occurred while getting the number of materials!"
                      );
                    }
                    res.req.files.forEach((file) => {
                      count++;
                      count = count.toString();

                      let material = [
                        "MA" + count.padStart(6, "0"),
                        folder_id,
                        file.originalname,
                        "active",
                        Date.now(),
                        Date.now(),
                      ];

                      materials.push(material);
                    });

                    Material.create(materials, (err, result) => {
                      if (err) {
                        console.log(
                          err.message ||
                            "Some error occurred while creating the new material!"
                        );
                      }

                      return res.status(201).send({
                        upload: `${result.length} file(s)`,
                        message: "Material folder created!",
                      });
                    });
                  });
                }
              });
            });
          });
        });
    } else {
      folder_id = find.folder_id;
      upload(req, res, (err) => {
        if (res.req.files.length > 0) {
          Material.getCount((err, count) => {
            let materials = [];
            if (err) {
              console.log(
                err.message ||
                  "Some error occurred while getting the number of materials!"
              );
            }
            res.req.files.forEach((file) => {
              count++;
              count = count.toString();

              let material = [
                "MA" + count.padStart(6, "0"),
                folder_id,
                file.originalname,
                "active",
                Date.now(),
                Date.now(),
              ];

              materials.push(material);
            });

            Material.create(materials, (err, result) => {
              if (err) {
                console.log(
                  err.message ||
                    "Some error occurred while creating the new material!"
                );
              }

              return res.status(201).send({
                upload: `${result.length} file(s)`,
                message: "Material folder created!",
              });
            });
          });
        }
      });
    }
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

exports.deleteFolder = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let folder = req.body;

  folder.status = "deleted";

  Folder.update(folder, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating folder!",
      });
    }

    let material = {
      folder_id: result.folder_id,
      status: "deleted",
    };

    Material.folderDelete(material, (err, result) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while updating material!",
        });
      }

      Folder.find(folder, (err, find_result) => {
        if (err) {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while finding folder name!",
          });
        }

        if (!find_result.isFound) {
          return res.status(200).send({
            message: "Folder not found!",
          });
        }

        fsPromises
          .rmdir(
            materials_dir + "/" + find_result.folderName,
            { recursive: true, force: true },
            (err) => {
              return res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while deleting the directory!",
              });
            }
          )
          .then(() => {
            return res.status(200).send({
              folder_id: result.folder_id,
              message: "Folder deleted!",
            });
          });
      });
    });
  });
};

exports.getAll = (req, res) => {
  Material.getAll((err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while getting all materials!",
      });
    }

    return res.status(200).send(result);
  });
};

exports.download = (req, res) => {
  if (!req.query.folder || !req.query.fileName) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let folderName = req.query.folder;
  let fileName = req.query.fileName;

  let directoryPath = materials_dir + "/" + folderName + "/" + fileName;

  return res.download(directoryPath, fileName, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Could not download the file.",
      });
    }
  });
};

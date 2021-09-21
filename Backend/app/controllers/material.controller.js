const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;

const Material = require("../models/material.model");
const Folder = require("../models/folder.model");

const materials_dir = __dirname + "../../../uploads/materials";

const storage = multer.diskStorage({
  destination: function (req, files, callback) {
    callback(null, materials_dir + "/" + req.query.folderName);
  },
  filename: function (req, files, callback) {
    const match = [
      "application/pdf",
      "application/zip",
      "application/x-zip",
      "application/x-zip-compressed",
      "application/octet-stream",
    ];

    if (match.indexOf(files.mimetype) === -1) {
      let message = `${files.originalname} is invalid. Only accept pdf or zip.`;
      return callback(message, null);
    }

    callback(null, files.originalname);
  },
});

const upload = multer({ storage: storage }).array("material-files", 20);

exports.uploadToNewFolder = (req, res) => {
  if (!req.query.folderName) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  fsPromises
    .mkdir(
      materials_dir + "/" + req.query.folderName,
      { recursive: true },
      (err) => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while making a new directory!",
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

        let folder = {
          folder_id: "FO" + count.padStart(6, "0"),
          folderName: req.query.folderName,
          description: req.query.description,
          status: "active",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        Folder.create(folder, (err, result) => {
          if (err) {
            return res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the new folder!",
            });
          }
          upload(req, res, (err) => {
            if (err) {
              return res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while uploading file to the folder!",
              });
            }

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
                    result.folder_id,
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
                        "Some error occurred while creating the new materials!"
                    );
                  }

                  return res.status(201).send({
                    upload: `${res.req.files.length} file(s)`,
                    message: "Material folder created!",
                  });
                });
              });
            }
          });
        });
      });
    });
};

exports.uploadToExistFolder = (req, res) => {
  if (!req.query.folder_id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let folder = {
    folder_id: req.query.folder_id,
  };

  Folder.find(folder, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while checking duplicated folder!",
      });
    }

    if (result.status == "deleted") {
      return res.status(200).send({
        message: "Folder does not exist!",
      });
    }

    req.query.folderName = result.folderName;
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message ||
            "Some error occurred while uploading file to the folder!",
        });
      }

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
              result.folder_id,
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
                  "Some error occurred while creating the new materials!"
              );
            }

            return res.status(201).send({
              upload: `${res.req.files.length} file(s)`,
              message: "Material added to the folder!",
            });
          });
        });
      }
    });
  });
};

exports.checkDuplicated = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let folder = req.body;

  Folder.find(folder, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while checking duplicated folder!",
      });
    }

    if (result.status == "deleted") {
      result.isFound = false;
    }

    return res.status(200).send({
      isFound: result.isFound,
    });
  });
};

exports.updateFolder = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let folder = req.body;

  Folder.find(folder, (err, find) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while finding folder name!",
      });
    }

    if (!find.isFound) {
      return res.status(200).send({
        message: "Folder not found!",
      });
    }

    let currentName = find.folderName;
    let newName = folder.folderName;

    fsPromises
      .rename(
        materials_dir + "/" + currentName,
        materials_dir + "/" + newName,
        (err) => {
          return res.status(500).send({
            message:
              err.message ||
              "Some error occurred while deleting the directory!",
          });
        }
      )
      .then(() => {
        Folder.update(folder, (err, result) => {
          if (err) {
            return res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating folder information!",
            });
          }

          return res.status(200).send({
            folder_id: result.folder_id,
            message: "Folder updated!",
          });
        });
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

        let path = materials_dir + "/" + find_result.folderName;

        if (fs.existsSync(path)) {
          const files = fs.readdirSync(path);

          if (files.length > 0) {
            files.forEach((filename) => {
              if (fs.statSync(path + "/" + filename).isDirectory()) {
                removeDir(path + "/" + filename);
              } else {
                fs.unlinkSync(path + "/" + filename);
              }
            });
            fs.rmdirSync(path);
            return res.status(200).send({
              folder_id: result.folder_id,
              message: "Folder deleted!",
            });
          } else {
            fs.rmdirSync(path);
            return res.status(200).send({
              folder_id: result.folder_id,
              message: "Folder deleted!",
            });
          }
        } else {
          return res.status(500).send({
            message:
              err.message ||
              "Some error occurred while deleting the directory!",
          });
        }
        // fsPromises
        //   .rmdir(
        //     materials_dir + "/" + find_result.folderName,
        //     { recursive: true },
        //     (err) => {
        //       return res.status(500).send({
        //         message:
        //           err.message ||
        //           "Some error occurred while deleting the directory!",
        //       });
        //     }
        //   )
        //   .then(() => {
        //     return res.status(200).send({
        //       folder_id: result.folder_id,
        //       message: "Folder deleted!",
        //     });
        //   });
      });
    });
  });
};

exports.deleteFile = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let material = req.body;

  Material.find(material, (err, find_result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while finding material!",
      });
    }

    if (!find_result.isFound) {
      return res.status(200).send({
        message: "Material not found!",
      });
    }

    if (find_result.status == "deleted") {
      return res.status(200).send({
        message: "Material already deleted!",
      });
    }

    Folder.find({ folder_id: find_result.folder_id }, (err, findF_result) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while finding folder name!",
        });
      }

      if (!findF_result.isFound) {
        return res.status(200).send({
          message: "Folder not found!",
        });
      }

      material.status = "deleted";

      Material.update(material, (err, result) => {
        if (err) {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while updating material!",
          });
        }

        fsPromises
          .unlink(
            materials_dir +
              "/" +
              findF_result.folderName +
              "/" +
              find_result.fileName,
            { recursive: true, force: true },
            (err) => {
              return res.status(500).send({
                message:
                  err.message || "Some error occurred while deleting the file!",
              });
            }
          )
          .then(() => {
            return res.status(200).send({
              material_id: result.material_id,
              message: "Material deleted!",
            });
          });
      });
    });
  });
};

exports.getAllByFolder = (req, res) => {
  if (!req.body.folderName) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let folder = {
    folderName: req.body.folderName,
  };

  Material.getAllByFolder(folder, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while getting all materials in the folder!",
      });
    }

    return res.status(200).send(result);
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

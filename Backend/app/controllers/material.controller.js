// const multer = require("multer");
// const fs = require("fs");
// const fsPromises = fs.promises;
// const path = require("path");

// const Material = require("../models/material.model");

// const materials_dir = "./file/materials";

// const storage = multer.diskStorage({
//   destination: function async(req, file, callback) {
//     callback(null, materials_dir);
//   },
//   filename: function (req, file, callback) {
//     //
//     const match = ["application/pdf"];

//     if (match.indexOf(file.mimetype) === -1) {
//       let message = `${file.originalname} is invalid. Only accept pdf.`;
//       return callback(message, null);
//     }

//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).array("material-files", 10);
// const uploadFiles = util.promisify(upload);

// exports.upload = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Content can not be empty!",
//     });
//   }

//   await uploadFiles(req.res);
//   console.log(req);

//   return res.status(201).send({
//     message: "Material files uploaded!",
//   });

//   Material.getCount((err, count) => {
//     if (err) {
//       return res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while getting the number of materials!",
//       });
//     }

//     count++;
//     count = count.toString();

//     let material = req.body;

//     material.material_id = "MA" + count.padStart(6, "0");
//     material.status = "active";
//     material.createdAt = Date.now();
//     material.updatedAt = Date.now();

//     Material.create(material, (err, result) => {
//       if (err) {
//         return res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the new material!",
//         });
//       }

//       return res.status(201).send({
//         material_id: result.material_id,
//         status: result.status,
//         message: "Material created!",
//       });
//     });
//   });
// };

// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Content can not be empty!",
//     });
//   }

//   let material = req.body;

//   Material.update(material, (err, result) => {
//     if (err) {
//       return res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while updating material information!",
//       });
//     }

//     return res.status(200).send({
//       material_id: result.material_id,
//       message: "Material updated!",
//     });
//   });
// };

// exports.getAll = (req, res) => {
//   Material.getAll((err, result) => {
//     if (err) {
//       return res.status(500).send({
//         message:
//           err.message || "Some error occurred while getting all materials!",
//       });
//     }

//     return res.status(200).send(result);
//   });
// };

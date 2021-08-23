const sql = require("../database/db.connection");

const Material = function (material) {
  this.material_id = material.material_id;
  this.folder_id = material.folder_id;
  this.filePath = material.filePath;
  this.description = material.description;
  this.status = material.status;
  this.createdAt = material.createdAt;
  this.updatedAt = material.updatedAt;
};

Material.create = (material, result) => {
  sql.query("INSERT INTO Materials SET ?", material, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: new material file created -> ${material.material_id}`);
    result(null, material);
    return;
  });
};

Material.update = (material, result) => {
  material.updatedAt = Date.now();

  sql.query(
    `UPDATE Materials SET ? WHERE 
      material_id = '${material.material_id}'`,
    material,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: material updated -> ${material.material_id}`);
      result(null, material);
      return;
    }
  );
};

Material.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Materials", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: ${res[0].count} file(s)`);
    result(null, res[0].count);
    return;
  });
};

Material.getAll = (result) => {
  sql.query(
    `SELECT
      material_id,
      (
          SELECT
              F.folderName
          FROM
              Folders F
          WHERE
              F.folder_id = M.folder_id
      ) AS folderName,
      description
     FROM
         Materials M
     WHERE
         status = 'active'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} file(s)`);
      result(null, res);
      return;
    }
  );
};

module.exports = Material;
